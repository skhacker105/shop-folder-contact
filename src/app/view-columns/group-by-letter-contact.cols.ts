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
            flex: 7,
            hide: false,
            rowGroup: false,
            editable: true,
            cellEditor: 'agTextCellEditor'
        },
        {
            headerName: 'Phone',
            field: 'mainPhoneNumber',
            flex: 5,
            hide: false,
            rowGroup: false,
            resizable: false,
            editable: true,
        },
        {
            field: 'types',
            rowGroup: false,
            hide: true,
        }
    ],
    autoGroupColumnDef: {
        headerName: '',
        width: 125,
        flex: undefined,
        suppressSizeToFit: true,
        cellClass: 'letter-col',
        headerClass: 'letter-col',
        sort: 'asc',
        comparator: undefined,
        cellStyle: undefined
    }
};
