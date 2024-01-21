import { Component, OnInit } from '@angular/core';
import { DynamicLayoutComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'
import { GridService, IContact, IGridView } from 'shop-folder-core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

// AG Grid
import { GridApi, GridOptions } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Views
import { DEFAULT_COLUMNS, GROUP_BY_LETTER_COLUMNS, GROUP_BY_NAME_COLUMNS } from '../../view-columns';

const ContactPageViews: IGridView[] = [
  DEFAULT_COLUMNS,
  GROUP_BY_LETTER_COLUMNS,
  GROUP_BY_NAME_COLUMNS
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DynamicLayoutComponent, MatIconModule, AgGridModule, MatMenuModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends GridService<IContact> implements OnInit {

  prevGroupColWidth: number | undefined;

  constructor(public route: ActivatedRoute) {
    super(ContactPageViews, route);
  }

  ngOnInit(): void {
    this.loadDummyData();
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
    for (let i = 0; i < 56; i++) {
      let phone = `+91 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
      let name = realNames[Math.floor(Math.random() * realNames.length)];;
      this.data.push(this.createContact(phone, name));
    }
    this.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  createContact(mainPhoneNumber: string, name: string, isMe = false) {
    return new Contact('', 0, {
      createdBy: 0,
      createdOn: new Date(),
      isMe,
      isSelected: false,
      mainPhoneNumber,
      name,
      openingBalance: 0,
      otherPhoneNumbers: []
    })
  }

  handleSelectModeOn() {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = true;
      this.prevGroupColWidth = this.selectedView.autoGroupColumnDef.width;
      this.selectedView.autoGroupColumnDef.width = (this.prevGroupColWidth ? this.prevGroupColWidth : 0) + 35;
      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef
      });
    }
  }

  handleSelectModeOff() {
    if (this.selectedView?.autoGroupColumnDef) {
      this.selectedView.autoGroupColumnDef.checkboxSelection = false;
      this.selectedView.autoGroupColumnDef.width = this.prevGroupColWidth;
      this.prevGroupColWidth = undefined;
      this.gridApi.updateGridOptions({
        autoGroupColumnDef: this.selectedView.autoGroupColumnDef
      });
    }
  }
}
