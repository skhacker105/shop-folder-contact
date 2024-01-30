import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent, DynamicLayoutComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'
import { DBService, GridService, IConfirmation, IContact, IGridView, ISortBy, UserService } from 'shop-folder-core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Contact } from '../../models';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

// AG Grid
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Views
import { DEFAULT_COLUMNS, GROUP_BY_LETTER_COLUMNS, GROUP_BY_NAME_COLUMNS, GROUP_BY_TYPE_COLUMNS } from '../../view-columns';
import { ContactService } from '../../service/contact.service';
import { forkJoin, takeUntil } from 'rxjs';
import { ShopFolderLoggerService } from 'shop-folder-logger';
import { GetContactsResult } from '@capacitor-community/contacts';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

const ContactPageViews: IGridView[] = [
  DEFAULT_COLUMNS,
  GROUP_BY_LETTER_COLUMNS,
  GROUP_BY_NAME_COLUMNS,
  GROUP_BY_TYPE_COLUMNS
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicLayoutComponent, MatIconModule, AgGridModule, MatMenuModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends GridService<IContact> implements OnInit {

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
    public userService: UserService 
  ) {
    super({
      allViews: ContactPageViews,
      userService,
      route
    }, Contact);
    this.useTable(this.dbService.currentDB.contacts);
    this.setPageSize(50000);
    this.setSortBy(this.defaultSort);
  }

  ngOnInit(): void {
    this.grid.suppressHorizontalScroll = true;
    this.refreshData();
  }

  handleSelectModeOn(): void {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = true;
      if (this.selectedView.autoGroupColumnDef.width)
        this.selectedView.autoGroupColumnDef.width = this.selectedView.autoGroupColumnDef.width + 35;

      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef
      });
    } else {
      if (this.selectedView)
        this.selectedView.columnDefs[0].checkboxSelection = true;
      this.gridApi.updateGridOptions({
        columnDefs: this.selectedView?.columnDefs
      });
    }
  }

  handleSelectModeOff(): void {
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
        columnDefs: this.selectedView?.columnDefs
      });
    }
  }

  triggerSync(): void {
    this.contactService.getPhoneContacts()
      .pipe(takeUntil(this.isComponentActive))
      .subscribe({
        next: res => this.processPhoneContacts(res),
        error: err => this.logger.logError('Error while getting phone contact')
      });
  }

  processPhoneContacts(phoneContacts: GetContactsResult) {
    const toAdd = this.filterContactsToAdd(phoneContacts)
    const toUpdate = this.filterContactsToUpdate(phoneContacts)
    const obs = [this.selectedTable?.bulkAdd(toAdd), this.selectedTable?.bulkPut(toUpdate)];
    forkJoin(obs)
      .pipe(takeUntil(this.isComponentActive))
      .subscribe({
        next: res => {
          this.refreshData();
          this.toastr.success('Sync completed')
        },
        error: err => this.logger.logError('Error while sync: ', err)
      });
  }

  filterContactsToAdd(phoneContacts: GetContactsResult): IContact[] {
    return phoneContacts.contacts.reduce((arr, phoneContact) => {
      if (this.data.some(uploadedContact => phoneContact.name && phoneContact.name.display && uploadedContact.name.indexOf(phoneContact.name.display) >= 0))
        return arr;

      const convertedContact = this.contactService.phoneToLocalContact(phoneContact);
      if (!convertedContact) return arr;

      arr.push(convertedContact);
      return arr;
    }, [] as IContact[]);
  }

  filterContactsToUpdate(phoneContacts: GetContactsResult): IContact[] {
    return phoneContacts.contacts.reduce((arr, phoneContact) => {
      const existing = this.data.find(uploadedContact => phoneContact.name && phoneContact.name.display && uploadedContact.name.indexOf(phoneContact.name.display) >= 0)
      if (!existing) return arr;

      const newNumbers = phoneContact.phones?.filter(p => !existing.otherPhoneNumbers.some(op => op === p.number) && p.number !== existing.mainPhoneNumber);
      if (!newNumbers) return arr;

      const extractedNumbers = this.contactService.phoneToLocalPayload(newNumbers)
      existing.otherPhoneNumbers = existing.otherPhoneNumbers.concat(extractedNumbers);
      arr.push(existing);
      return arr;
    }, [] as IContact[]);
  }

  handleDeleteClick() {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: this.confirmDeleteConfig
    });
    ref.afterClosed()
      .pipe(takeUntil(this.isComponentActive))
      .subscribe({
        next: res => res ? this.deleteSelectedContacts() : null,
        error: err => this.logger.log('Error while delete confirmation: ', err)
      });
  }

  async deleteSelectedContacts() {
    if (!this.selectedTable) return;
    this.isDataLoading = true;

    try {
      await this.selectedTable.bulkDelete(this.selectedIds);
      this.refreshData();
      this.handleSelectModeChange(false);
    } catch (err) { }
    finally { this.isDataLoading = false; }
  }

}
