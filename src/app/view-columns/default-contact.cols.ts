import { IGridView } from "shop-folder-core";

export const DEFAULT_COLUMNS: IGridView = {
    viewName: 'DEFAULT',
    isDefault: true,
    columnDefs: [
        {
            headerName: 'Contact',
            field: 'name',
            flex: 7
        },
        {
            headerName: 'Phone',
            field: 'mainPhoneNumber',
            flex: 5
        }
    ],
    autoGroupColumnDef: undefined
};
