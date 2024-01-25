import { IGridView } from "shop-folder-core";

export const GROUP_BY_TYPE_COLUMNS: IGridView = {
    viewName: 'Tag View',
    isDefault: false,
    columnDefs: [
        {
            headerName: 'Contact',
            field: 'name',
            flex: 1,
            rowGroup: true,
            hide: true,
        },
        {
            headerName: 'Tags',
            field: 'types',
            flex: 3,
            cellStyle: {
                'font-size': '10px'
            },
            hide: false,
            rowGroup: false
        }
    ],
    autoGroupColumnDef: {
        headerName: 'Contact',
        flex: 1,
        sort: 'asc',
    }
};
