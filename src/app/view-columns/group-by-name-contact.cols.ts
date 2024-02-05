import { IGridView } from "shop-folder-core";

export const GROUP_BY_NAME_COLUMNS: IGridView = {
    viewName: 'Group By Name',
    isDefault: false,
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
            flex: 5,
            hide: false,
            rowGroup: false
        },
        {
            field: 'types',
            rowGroup: false,
            hide: true,
        }
    ],
    autoGroupColumnDef: {
        headerName: 'Contact',
        flex: 10,
        width: undefined,
        sort: 'asc',
        cellStyle: undefined,
        comparator: undefined
    }
};
