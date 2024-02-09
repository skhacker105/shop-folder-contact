import { Component, OnInit } from '@angular/core';
import { DynamicLayoutComponent, InputComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'
import { DBService, FilterFunction, GridService, IContact, IFilterOption, IGridView, IInput, IMultiValueFilter, ISortBy, UserService, anyFilters, isMultiValueFilter } from 'shop-folder-core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../models';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

// AG Grid
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Views
import { DEFAULT_COLUMNS, GROUP_BY_LETTER_COLUMNS, GROUP_BY_NAME_COLUMNS, GROUP_BY_TYPE_COLUMNS } from '../../view-columns';
import { ContactService } from '../../service/contact.service';
import { take } from 'rxjs';
import { ShopFolderLoggerService } from 'shop-folder-logger';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Collection } from 'dexie';
import { GroupLogoComponent } from 'shop-folder-logo';
import { CellClassParams, ColTypeDef, EditableCallbackParams } from 'ag-grid-enterprise';

const ContactPageViews: IGridView[] = [
  DEFAULT_COLUMNS,
  GROUP_BY_LETTER_COLUMNS,
  GROUP_BY_NAME_COLUMNS,
  GROUP_BY_TYPE_COLUMNS
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicLayoutComponent, MatIconModule, AgGridModule, MatMenuModule, GroupLogoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ContactService]
})
export class ContactComponent extends GridService<IContact> implements OnInit {

  isGroupMenuOpened = false;
  isViewMenuOpened = false;
  // columnTypes: {
  //   [key: string]: ColTypeDef;
  // } = {
  //   editableColumn: {
  //     editable: (params: EditableCallbackParams<any>) => true,
  //     cellStyle: (params: CellClassParams<any>) => {
  //       return { backgroundColor: '#2244CC44' };
  //     },
  //   }
  // };
  private defaultSort: ISortBy = {
    column: 'name',
    order: 'asc'
  }

  constructor(
    public route: ActivatedRoute,
    private dbService: DBService,
    private contactService: ContactService,
    private logger: ShopFolderLoggerService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService
  ) {
    super({
      allViews: ContactPageViews,
      objectCreator: (obj: any) => this.contactObjectCreator(obj),
      route,
      table: dbService.currentDB.contacts
    });
    this.setPageSize(50000);
    this.setSortBy(this.defaultSort);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.grid.suppressHorizontalScroll = true;
    this.createPageFilters();
    this.mapParamsToFilter();
    this.handleSelectModeChange(false);
  }

  contactObjectCreator(obj: any) {
    return new Contact(this.userService.getUser(), obj);
  }

  createPageFilters() {
    if (!this.selectedTable) return;

    this.pageFilters = [
      {
        column: 'types',
        description: 'Filter your data by tags',
        filterType: 'multiValue',
        name: 'Categories',
        options: [] as IFilterOption[],
        type: 'checkbox',
        selectedOptions: [],
        createMultiFilter: (selectedOptions) => {
          return selectedOptions.length === 0 ? undefined : (collection: Collection<IContact, number>) => {
            return collection.filter(contact =>
              contact.types.some(type =>
                selectedOptions.some(option => option.label === type)
              )
            );
          }
        },
        getOptions: async () => {
          const data: IFilterOption[] = (
            await this.dbService.currentDB.contactTypes.orderBy('name').toArray()
          )
            .map(contactType => {
              return {
                label: contactType.name,
                value: contactType.id
              } as IFilterOption
            });
          return data;
        },
      } as IMultiValueFilter
    ]
  }

  handleSelectModeOn(): void {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = true;
      if (this.selectedView.autoGroupColumnDef.width)
        this.selectedView.autoGroupColumnDef.width = this.selectedView.autoGroupColumnDef.width + 35;

      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef,
        columnDefs: this.selectedView?.columnDefs
      });
    } else {
      if (this.selectedView)
        this.selectedView.columnDefs[0].checkboxSelection = true;
      this.gridApi.updateGridOptions({
        autoGroupColumnDef: undefined,
        columnDefs: this.selectedView?.columnDefs
      });
    }
  }

  handleSelectModeOff(): void {
    if (!this.gridApi) return;

    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = false;
      if (this.selectedView.autoGroupColumnDef.width)
        this.selectedView.autoGroupColumnDef.width = this.selectedView.autoGroupColumnDef.width - 35;

      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef,
        columnDefs: this.selectedView?.columnDefs
      });
    } else {
      if (this.selectedView)
        this.selectedView.columnDefs[0].checkboxSelection = false;
      this.gridApi.updateGridOptions({
        autoGroupColumnDef: undefined,
        columnDefs: this.selectedView?.columnDefs
      });
    }
  }

  handleGroupClick() {
    const groupCreateConfig: IInput = {
      color: 'primary',
      label: 'Group Name',
      title: 'New Group',
    };
    const dialofref = this.dialog.open(InputComponent, { data: groupCreateConfig });
    dialofref.afterClosed()
      .pipe(take(1))
      .subscribe({
        next: res => res ? this.addNewGroup(res) : null
      });
  }

  addNewGroup(groupName: string) {
    if (this.selectedIds.length === 0) return;

    this.contactService.createNewGroup(groupName, this.getSelectedData())
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.toastr.success('Contact group created.');
          // this.updateSelectedView(GROUP_BY_TYPE_COLUMNS);
          // this.handleSelectModeOff();
        },
        error: err => this.logger.logError('Error while adding new group.')
      });
  }

  triggerSync() {
    if (!this.selectedTable) return;

    this.contactService.triggerSync(this.data)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.toastr.success('Sync completed');
          this.createPageFilters();
          this.updateFilters([]);
          this.refreshData();
          this.handleSelectModeChange(false);
        },
        error: err => this.logger.logError('Error while syncing database: ', err)
      });
  }

  handleDeleteClick() {
    if (!this.selectedTable) return;

    this.contactService.handleDeleteClick(this.confirmDeleteConfig, this.selectedIds)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.refreshData();
          this.handleSelectModeChange(false);
        },
        error: err => this.logger.logError('Error while deleting contacts: ', err)
      });
  }

  handleContactTagClick() {
    if (this.selectedIds.length === 0) return;

    this.router.navigateByUrl(`/contact/addEditGroup?creationType=tag&selectedIds=${this.selectedIds}`);
  }

  handleFilterOptions(updatedFilters: anyFilters[]) {
    super.handleFilterUpdate(this.convertFiltersToFunctions(updatedFilters));
    this.pageFilters = updatedFilters;
  }

}
