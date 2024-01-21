import { Component, OnInit } from '@angular/core';
import { DynamicLayoutComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'
import { GridService, IContact, IGridView } from 'shop-folder-core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models';
import { CommonModule } from '@angular/common';

// AG Grid
import { GridOptions } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// Views
import { DEFAULT_COLUMNS } from '../../view-columns';

const ContactPageViews: IGridView[] = [
  DEFAULT_COLUMNS
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DynamicLayoutComponent, MatIconModule, AgGridModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent extends GridService<IContact> implements OnInit {

  go: GridOptions = {};
  defaultColDef: any = {};

  constructor(public route: ActivatedRoute) {
    super(ContactPageViews, route);
  }

  ngOnInit(): void {
    this.loadDummyData();
  }

  loadDummyData() {
    this.data = [
      this.createContact('+91 8886161092','Saurabh Kumar'),
      this.createContact('+91 1234567890','Diksha Bharti'),
      this.createContact('+91 4567891230','John Doe'),
      this.createContact('+91 1231230456','Shikhar'),
      this.createContact('+91 7894560789','Mahendra Singh Dhoni'),
      this.createContact('+91 6546549870','John Okawa'),
      this.createContact('+91 8886161092','John Okawa'),
      this.createContact('+91 1234567890','John Okawa'),
      this.createContact('+91 4567891230','John Okawa'),
      this.createContact('+91 1231230456','John Okawa'),
      this.createContact('+91 7894560789','John Okawa'),
      this.createContact('+91 6546549870','John Okawa'),
      this.createContact('+91 8886161092','John Okawa'),
      this.createContact('+91 1234567890','John Okawa'),
      this.createContact('+91 4567891230','John Okawa'),
      this.createContact('+91 1231230456','John Okawa'),
      this.createContact('+91 7894560789','John Okawa'),
      this.createContact('+91 6546549870','John Okawa'),
    ].sort((a,b) => a.name.localeCompare(b.name));
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

  handleSelectModeChange(selectMode: boolean) {
    if (selectMode != this.selectMode) {
      this.selectMode = selectMode;
      if (this.selectMode) this.addCheckBoxes();
      else this.removeCheckBoxes();
    }
  }

  addCheckBoxes() {}

  removeCheckBoxes() {}
}
