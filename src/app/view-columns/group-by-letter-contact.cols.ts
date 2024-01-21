import { IGridView } from "shop-folder-core";

export const GROUP_BY_LETTER_COLUMNS: IGridView = {
    viewName: 'Group By Letter',
    isDefault: true,
    columnDefs: [
        {
            headerName: '',
            valueGetter: (params) => params.data.name.toUpperCase()[0],
            hide: true,
            rowGroup: true

        },
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
    autoGroupColumnDef: {
        headerName: '',
        width: 85,
        cellClass: 'letter-col',
        headerClass: 'letter-col'
    }
};
