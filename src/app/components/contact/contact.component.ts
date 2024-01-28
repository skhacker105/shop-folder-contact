import { Component, OnInit } from '@angular/core';
import { DynamicLayoutComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'
import { DBService, GridService, IContact, IGridView } from 'shop-folder-core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Contact } from '../../models';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

// AG Grid
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Views
import { DEFAULT_COLUMNS, GROUP_BY_LETTER_COLUMNS, GROUP_BY_NAME_COLUMNS, GROUP_BY_TYPE_COLUMNS } from '../../view-columns';

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

  constructor(public route: ActivatedRoute, private dbService: DBService) {
    super(ContactPageViews, route);
    this.useTable(this.dbService.currentDB.contacts);
  }

  ngOnInit(): void {
    this.loadDummyData();
    this.grid.suppressHorizontalScroll = true;
    // const ct = new Contact('', 0, { name: 'Some Name' });
    // console.log('db = ', this.dbService.currentDB);
    // this.dbService.currentDB.contacts.add(ct).then(res => {
    //   this.refreshData().then(res1 => {
    //     console.log({ res, res1 });
    //   });
    // });
  }

  loadDummyData() {
    this.data = [];
    const realNames = [
      "Saurabh Kumar",
      "Diksha Bharti",
      "John Doe",
      "Shikhar",
      "Mahendra Singh Dhoni",
      "Alice Johnson",
      "Bob Smith",
      "Catherine Brown",
      "David Miller",
      "Shikhar",
      "Mahendra Singh Dhoni",
      "Alice Johnson",
      "Bob Smith",
      "Catherine Brown",
      "David Miller",
      "Shikhar",
      "Mahendra Singh Dhoni",
      "Alice Johnson",
      "Bob Smith",
      "Catherine Brown",
      "David Miller",
      "Emily Davis",
      "Frank Wilson",
      "Grace Martinez",
      "Henry Taylor",
      "Isabel Anderson",
      "Jack White",
      "Katherine Harris",
      "Liam Martin",
      "Mia Thompson",
      "Nathan Jackson",
      "Olivia Garcia",
      "Peter Robinson",
      "Quinn Lee",
      "Rachel Turner",
      "Samuel Harris",
      "Liam Martin",
      "Mia Thompson",
      "Nathan Jackson",
      "Olivia Garcia",
      "Peter Robinson",
      "Quinn Lee",
      "Rachel Turner",
      "Samuel Harris",
      "Sophia Martinez",
      "Thomas Clark",
      "Uma Patel",
      "Victor Adams",
      "Wendy Parker",
      "Xander Turner",
      "Yvonne Mitchell",
      "Zachary Wright",
      "Alice Johnson",
      "Bob Smith",
      "Catherine Brown",
      "David Miller",
    ];
    const types = [
      'Supplier', 'Customer', 'Employee', 'Family',
      'Supplier', 'Customer', 'Employee', 'Family'
    ]
    for (let i = 0; i < 56; i++) {
      let phone = `+91 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
      let name = realNames[Math.floor(Math.random() * realNames.length)];
      const isMe = i % 25 === 0;
      const start = Math.floor((Math.random() * 8));
      const end = Math.floor((Math.random() * 8));
      this.data.push(this.createContact(phone, name, types.slice(start, end), isMe));
    }
    this.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  createContact(mainPhoneNumber: string, name: string, types: string[] = [], isMe = false) {
    return new Contact('', 0, {
      createdBy: 0,
      createdOn: new Date(),
      isMe,
      isSelected: false,
      mainPhoneNumber,
      name,
      openingBalance: 0,
      otherPhoneNumbers: [],
      types
    })
  }

  handleSelectModeOn() {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = true;
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
    this.gridApi.autoSizeAllColumns();
  }

  handleSelectModeOff() {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = false;
      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef
      });
    } else {
      if (this.selectedView)
        this.selectedView.columnDefs[0].checkboxSelection = false;
      this.gridApi.updateGridOptions({
        columnDefs: this.selectedView?.columnDefs
      });
    }
    this.gridApi.autoSizeAllColumns();
  }

  triggerSync() {}
}
