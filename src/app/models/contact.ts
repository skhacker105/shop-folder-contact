import { SelectableBaseModel } from "shop-folder-store";

export interface IContact {
    phoneNumber: string
}

export class Contact extends SelectableBaseModel<any> {}