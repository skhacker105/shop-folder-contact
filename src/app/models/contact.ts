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

    constructor(userContactNumber: string, userContactId: number, obj?: any) {
        this.name = obj && obj.name ? obj.name : '';
        this.mainPhoneNumber = obj && obj.mainPhoneNumber ? obj.mainPhoneNumber : '';
        this.otherPhoneNumbers = obj && obj.otherPhoneNumbers ? obj.otherPhoneNumbers : [];
        this.openingBalance = obj && obj.openingBalance ? obj.openingBalance : 0;
        this.isMe = this.checkIfItIsMe(userContactNumber);
        this.createdBy = obj && obj.createdBy ? obj.createdBy : userContactId;
        this.createdOn = obj && obj.createdOn ? obj.createdOn : new Date();
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