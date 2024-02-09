import { IGridView } from "shop-folder-core";

export const DEFAULT_COLUMNS: IGridView = {
    viewName: 'FLAT',
    isDefault: true,
    columnDefs: [
        {
            headerName: 'Contact',
            field: 'name',
            flex: 7,
            hide: false,
            rowGroup: false,
            editable: true,
            cellDataType: false,
        },
        {
            headerName: 'Phone',
            field: 'mainPhoneNumber',
            flex: 5,
            hide: false,
            rowGroup: false,
            editable: true,
        },
        {
            field: 'types',
            rowGroup: false,
            hide: true,
        }
    ],
    autoGroupColumnDef: undefined
};
