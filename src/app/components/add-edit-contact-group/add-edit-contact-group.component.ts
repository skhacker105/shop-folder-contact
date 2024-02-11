import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DBService, GridService, IContact, IContactType, IGridView, IInput, ISortBy, UserService } from 'shop-folder-core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { DynamicLayoutComponent } from 'shop-folder-component';
import { take, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { ContactService } from '../../service/contact.service';
import { ShopFolderLoggerService } from 'shop-folder-logger';
import { Contact } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { GROUP_BY_TYPE_COLUMNS } from '../../view-columns';

const gridView: IGridView = {
  columnDefs: [
    {
      field: 'name',
      checkboxSelection: true,
      sort: 'asc'
    },
    {
      field: 'mainPhoneNumber',
    }
  ],
  isDefault: true,
  viewName: ''
}

@Component({
  selector: 'app-add-edit-contact-group',
  standalone: true,
  imports: [CommonModule, MatInputModule, AgGridModule, MatIconModule, FormsModule, ReactiveFormsModule, DynamicLayoutComponent, MatButtonModule, MatChipsModule],
  templateUrl: './add-edit-contact-group.component.html',
  styleUrl: './add-edit-contact-group.component.scss',
})
export class AddEditContactGroupComponent extends GridService<IContact> implements OnInit {

  private defaultSort: ISortBy = {
    column: 'name',
    order: 'asc'
  };

  creationType: 'group' | 'tag' = 'group';
  conactSearchCtrl = new FormControl<string>('');
  contactSelectionCompleted = false;
  contactGroupNameCtrl = new FormControl<string>('');
  selectedContacts: Contact[] = [];
  contactTypes: IContactType[] = [];
  selectedOptions: IContactType[] = [];

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private logger: ShopFolderLoggerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super({
      allViews: [gridView],
      route: route
    });
    this.useTable(this.dbService.currentDB.contacts);
    this.setPageSize(50000);
    this.setSortBy(this.defaultSort);
  }

  get creationTypeHeaderText(): string {
    if (this.creationType === 'group') return 'Add Group';
    else if (this.creationType === 'tag') return 'Tag Contacts'
    return '';
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.refreshData();
    this.subscribeToSearchChange();
    this.subscribeToParams();
  }

  get contactTypeSelected(): number {
    return this.contactTypes.filter(ct => ct.isSelected).length;
  }

  subscribeToSearchChange() {
    this.conactSearchCtrl.valueChanges
      .pipe(takeUntil(this.isComponentActive))
      .subscribe({
        next: res => this.gridApi.setGridOption('quickFilterText', (res ? res : ''))
      });
  }

  subscribeToParams() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe((params: any) => {
        this.selectedIds = params.selectedIds ? params.selectedIds.split(',').map((id: string) => +id) : [];
        this.creationType = params.creationType ? params.creationType : this.creationType;
        this.loadSelectedIdsAndProceed();
        this.loadContactTypes();
      });
  }

  override createPageFilters(): void {
    // throw new Error('Method not implemented.');
  }
  override handleSelectModeOn(): void {
    // throw new Error('Method not implemented.');
  }
  override handleSelectModeOff(): void {
    // throw new Error('Method not implemented.');
  }

  async loadSelectedIdsAndProceed() {
    if (this.selectedIds.length === 0 || !this.selectedTable) return;

    this.selectedContacts = (await this.selectedTable.where('id').anyOf(...this.selectedIds).toArray()).map(c => new Contact(this.userService.getUser(), c));
    if (this.selectedContacts.length > 0) this.proceed();
  }

  proceed() {
    this.contactSelectionCompleted = true;
  }

  async loadContactTypes() {
    if (this.creationType !== 'tag') return;
    this.selectedOptions = [];

    this.contactTypes = await this.dbService.currentDB.contactTypes.orderBy('name').toArray();
  }

  addNewContactType() {
    const inputConfig: IInput = {
      color: 'primary',
      label: 'New Tag',
      placeHolder: '...',
      okDisplay: 'Save',
      title: 'Add'
    };
    this.contactService.handleAddNewContactType(inputConfig, this.userService.getUser())
      .pipe(
        take(1)
      ).subscribe({
        next: res => {
          this.loadContactTypes();
        },
        error: err => this.logger.logError('Error while adding contact type')
      });
  }

  onValueChange(changeValue: MatChipListboxChange) {
    this.selectedOptions = changeValue.value;
  }

  updateTags() {
    if (this.selectedIds.length === 0 || this.selectedOptions.length === 0) return;

    const selectedStr = this.selectedOptions.map(o => o.name);
    this.contactService.updateContactTypes(this.selectedContacts, selectedStr)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.toastr.success(`Tags updated`);
          this.router.navigateByUrl(`/contact?view=${GROUP_BY_TYPE_COLUMNS.viewName}`);
          // this.router.navigateByUrl(environment.contact);
        },
        error: err => this.logger.logError('Error while updating contact types.')
      });
  }

  addNewGroup() {
    if (!this.contactGroupNameCtrl.value || this.selectedIds.length === 0) return;

    this.contactService.createNewGroup(this.contactGroupNameCtrl.value, this.getSelectedData())
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.toastr.success('Contact group created.');
          // this.router.navigate([])
        },
        error: err => {
          this.logger.logError(err);
        }
      });
  }

  goBackToContactSelection() {
    this.contactSelectionCompleted = false;
    setTimeout(() => {
      this.updateSelectedIdsToGrid();
    }, 100);
  }

  updateSelectedIdsToGrid() {
    this.gridApi?.forEachNode(row => {
      if (this.selectedIds.some(id => row.data.id === id)) row.setSelected(true);
    });
  }

}
