import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactPayload, GetContactsResult, PhonePayload } from '@capacitor-community/contacts';
import { Observable, forkJoin, from, mergeMap, of, take } from 'rxjs';
import { DBService, IConfirmation, IContact, IContactGroup, IContactType, IInput, IUser, UserService } from 'shop-folder-core';
import { Contact } from '../models';
import { Table } from 'dexie';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, InputComponent } from 'shop-folder-component';
import { ContactGroup } from '../models/contact-group';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactTable: Table<IContact, number>;
  contactTypeTable: Table<IContactType, number>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dbService: DBService,
    private dialog: MatDialog
  ) {
    this.contactTable = dbService.currentDB.contacts;
    this.contactTypeTable = dbService.currentDB.contactTypes;
  }

  getPhoneContacts(): Observable<GetContactsResult> {
    // if (!environment.local)
    // return from(Contacts.getContacts({
    //   projection: {
    //     name: true,
    //     emails: true,
    //     organization: true,
    //     phones: true,
    //     postalAddresses: true
    //   }
    // }))
    // else
    return this.http.get<GetContactsResult>('assets/sampleData/phone-contacts.json')
  }

  triggerSync(existingData: IContact[]): Observable<number[]> {
    return this.getPhoneContacts()
      .pipe(
        mergeMap(phoneContacts => this.processPhoneContacts(phoneContacts, existingData))
      )
  }

  processPhoneContacts(phoneContacts: GetContactsResult, existingData: IContact[]): Observable<number[]> {
    const toAdd = this.filterContactsToAdd(phoneContacts, existingData);
    const toUpdate = this.filterContactsToUpdate(phoneContacts, existingData);
    const obs = [this.contactTable.bulkAdd(toAdd), this.contactTable.bulkPut(toUpdate)];
    console.log({toAdd, toUpdate});
    return forkJoin(obs)
    // return of([]);
  }

  filterContactsToAdd(phoneContacts: GetContactsResult, existingData: IContact[]): IContact[] {
    return phoneContacts.contacts.reduce((arr, phoneContact) => {
      if (existingData.some(uploadedContact => phoneContact.name && phoneContact.name.display && uploadedContact.name.indexOf(phoneContact.name.display) >= 0))
        return arr;

      const convertedContact = this.phoneToLocalContact(phoneContact);
      if (!convertedContact) return arr;

      arr.push(convertedContact);
      return arr;
    }, [] as IContact[]);
  }

  filterContactsToUpdate(phoneContacts: GetContactsResult, existingData: IContact[]): IContact[] {
    return phoneContacts.contacts.reduce((arr, phoneContact) => {
      const existing = existingData.find(uploadedContact => phoneContact.name && phoneContact.name.display && uploadedContact.name.indexOf(phoneContact.name.display) >= 0)
      if (!existing) return arr;

      const newNumbers = phoneContact.phones?.filter(p => !existing.otherPhoneNumbers.some(op => op === p.number) && p.number !== existing.mainPhoneNumber);
      if (!newNumbers) return arr;

      const extractedNumbers = this.phoneToLocalPayload(newNumbers)
      existing.otherPhoneNumbers = existing.otherPhoneNumbers.concat(extractedNumbers);
      arr.push(existing);
      return arr;
    }, [] as IContact[]);
  }

  phoneToLocalPayload(phonePayload: PhonePayload[]): string[] {
    return phonePayload.reduce((arr, pc) => {
      if (pc.number) arr.push(pc.number);
      return arr;
    }, [] as string[]);
  }

  phoneToLocalContact(phoneContact: ContactPayload): Contact | undefined {
    if (!phoneContact.name || !phoneContact.phones) return;
    return new Contact(this.userService.getUser(), {
      name: phoneContact.name.display,
      mainPhoneNumber: phoneContact.phones[0].number,
      otherPhoneNumbers: phoneContact.phones.slice(1, phoneContact.phones.length).map(p => p.number),
      openingBalance: 0,
      createdBy: 0
    });
  }

  handleDeleteClick(confirmDeleteConfig: IConfirmation, selectedIds: number[]): Observable<void | null> {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmDeleteConfig
    });
    return ref.afterClosed()
      .pipe(
        take(1),
        mergeMap(res => res ? this.deleteSelectedContacts(selectedIds) : of(null))
      )
  }

  deleteSelectedContacts(selectedIds: number[]): Observable<void> {
    return from(this.contactTable.bulkDelete(selectedIds));
  }

  handleAddNewContactType(config: IInput, currentUser: IUser): Observable<IContactType | null> {
    const ref = this.dialog.open(InputComponent, { data: config });
    return ref.afterClosed()
      .pipe(
        take(1),
        mergeMap(res => res ? this.addNewContactType(res, currentUser) : of(null))
      );
  }

  addNewContactType(typeName: string, currentUser: IUser): Observable<IContactType> {
    return from(new Promise<IContactType>(async (resolve, reject) => {
      const data: IContactType = {
        name: typeName,
        isSelected: false,
        createdOn: new Date(),
        createdBy: currentUser.selectedFolderContactId ? currentUser.selectedFolderContactId : 0
      };
      try {
        const id = await this.contactTypeTable.add(data);
        const newData = await this.contactTypeTable.get(id);
        newData ? resolve(newData) : reject('Not able to find contact type added just now.');
      } catch (err) {
        reject(err);
      }
    }));
  }

  updateContactTypes(contacts: Contact[], tags: string[]): Observable<number[]> {
    const obsArr: Observable<number>[] = [];
    contacts.map(c => {
      c.updateType(tags);
      const p = this.contactTable.put(c, c.id);
      obsArr.push(from(p));
    });
    return forkJoin(obsArr);
  }

  createNewGroup(groupName: string, contacts: IContact[], isBusinessAccount = false): Observable<number> {
    const grp: any = new ContactGroup(this.userService.getUser(), this.dbService.currentDB.contacts, {
      name: groupName,
      isBusinessAccount,
      members: [
        {
          memberId: 0,
          member: this.userService.getUser(),
          isAdmin: true
        },
        ...contacts.map(c => {
          return {
            memberId: c.id,
            member: c,
            isAdmin: false
          }
        })
      ]
    });
    delete grp['contactTable'];

    return from(this.dbService.currentDB.contactGroups.add(grp));
  }
}
