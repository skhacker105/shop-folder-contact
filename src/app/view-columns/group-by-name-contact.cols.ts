import { IGridView } from "shop-folder-core";

export const GROUP_BY_NAME_COLUMNS: IGridView = {
    viewName: 'Group By Name',
    isDefault: true,
    columnDefs: [
        {
            headerName: 'Contact',
            valueGetter: (params) => params.data.name.toUpperCase(),
            hide: true,
            rowGroup: true
        },
        {
            headerName: 'Phone',
            field: 'mainPhoneNumber',
            flex: 5
        }
    ],
    autoGroupColumnDef: {
        headerName: 'Contact',
        flex: 10,
    }
};
