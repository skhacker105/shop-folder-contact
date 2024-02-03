import { IContact, IContactGroup, IContactGroupMember, IUser } from "shop-folder-core";
import { Table } from 'dexie';

export class ContactGroup implements IContactGroup {
    id?: number | undefined;
    createdBy: number;
    createdOn: Date;
    isSelected: boolean;
    name: string;
    isBusinessAccount: boolean;
    members: IContactGroupMember[];

    constructor(deviceUser: IUser, public contactTable: Table<IContact, number>, contactObj?: any) {
        this.id = contactObj ? contactObj.id : undefined;
        this.createdBy = contactObj && contactObj.createdBy ? contactObj.createdBy : deviceUser.selectedFolderContactId;
        this.createdOn = contactObj && contactObj.createdOn ? contactObj.createdOn : new Date();
        this.isSelected = false;
        this.name = contactObj && contactObj.name ? contactObj.name : '';
        this.isBusinessAccount = contactObj && contactObj.isBusinessAccount ? contactObj.isBusinessAccount : false;
        this.members = contactObj && contactObj.members ? contactObj.members : [];
        this.loadMemberContacts();
    }

    async loadMemberContacts() {
        const contacts = (await this.contactTable.where('id').anyOf(...this.members.filter(m => m.memberId !== 0).map(m => m.memberId)).toArray());
        contacts.forEach(c => {
            const existingMember = this.members.find(m => m.memberId === c.id)
            if (existingMember) existingMember.member = c;
        });
    }

    addMember(contact: IContact, isAdmin = false): void {
        if (!contact.id) return;

        if (this.members.findIndex(m => m.memberId === contact.id) < 0) {
            this.members.push({
                isAdmin,
                member: contact,
                memberId: contact.id
            });
        }
    }
    removeMember(contactId: number): void {
        const existing_member = this.members.findIndex(m => m.memberId === contactId);
        if (existing_member >= 0) this.members.splice(existing_member, 1);
    }
    setAdmin(contactId: number): void {
        const existing_member = this.members.find(m => m.memberId === contactId);
        if (existing_member) existing_member.isAdmin = true;
    }
    markSelected?(): void {
        // throw new Error("Method not implemented.");
    }
    markUnselected?(): void {
        // throw new Error("Method not implemented.");
    }
    toggleSelection?(): void {
        // throw new Error("Method not implemented.");
    }

}