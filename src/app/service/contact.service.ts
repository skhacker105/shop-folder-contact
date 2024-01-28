import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactPayload, GetContactsResult, PhonePayload } from '@capacitor-community/contacts';
import { Observable } from 'rxjs';
import { IContact } from 'shop-folder-core';
import { Contact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

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

  phoneToLocalPayload(phonePayload: PhonePayload[]): string[] {
    return phonePayload.reduce((arr, pc) => {
      if (pc.number) arr.push(pc.number);
      return arr;
    }, [] as string[]);
  }

  phoneToLocalContact(phoneContact: ContactPayload): Contact | undefined {
    if (!phoneContact.name || !phoneContact.phones) return;
    return new Contact('', 0, {
      name: phoneContact.name.display,
      mainPhoneNumber: phoneContact.phones[0].number,
      otherPhoneNumbers: phoneContact.phones.slice(1, phoneContact.phones.length).map(p => p.number),
      openingBalance: 0,
      createdBy: 0
    });
  }
}
