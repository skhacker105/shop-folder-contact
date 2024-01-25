import { ICompareOutput, IContact } from "shop-folder-core";

export class Contact implements IContact {
    name: string;
    mainPhoneNumber: string;
    otherPhoneNumbers: string[];
    openingBalance: number;
    isMe: boolean;
    id?: number | undefined;
    createdBy: number;
    createdOn: Date;
    isSelected: boolean;
    types: string[];

    constructor(userContactNumber: string, userContactId: number, contactObj?: any) {
        this.name = contactObj && contactObj.name ? contactObj.name : '';
        this.mainPhoneNumber = contactObj && contactObj.mainPhoneNumber ? contactObj.mainPhoneNumber : '';
        this.otherPhoneNumbers = contactObj && contactObj.otherPhoneNumbers ? contactObj.otherPhoneNumbers : [];
        this.openingBalance = contactObj && contactObj.openingBalance ? contactObj.openingBalance : 0;
        this.types = contactObj && contactObj.types ? contactObj.types : [];
        this.isMe = this.checkIfItIsMe(userContactNumber);
        this.createdBy = contactObj && contactObj.createdBy ? contactObj.createdBy : userContactId;
        this.createdOn = contactObj && contactObj.createdOn ? contactObj.createdOn : new Date();
        this.isSelected = false;
    }

    markSelected(): void {
        this.isSelected = true;
    }
    markUnselected(): void {
        this.isSelected = false;
    }
    toggleSelection(): void {
        this.isSelected = !this.isSelected;
    }

    checkIfItIsMe(phoneNumber: string): boolean {
        return this.mainPhoneNumber === phoneNumber || this.otherPhoneNumbers.indexOf(phoneNumber) >= 0;
    }
    compare(ct: IContact): ICompareOutput {
        return {
            mainPhoneIsDifferent: ct.mainPhoneNumber != ct.mainPhoneNumber,
            otherPhonesUpdateNeeded: ct.otherPhoneNumbers.some(pn => this.otherPhoneNumbers.indexOf(pn) < 0)
        }
    }
    getName(): string {
        return this.name;
    }
}