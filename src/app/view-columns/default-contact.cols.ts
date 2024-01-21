import { IGridView } from "shop-folder-core";

export const DEFAULT_COLUMNS: IGridView = {
    viewName: 'DEFAULT',
    isDefault: true,
    columnDefs: [
        {
            headerName: '',
            field: 'name',
            valueGetter: (params) => params.data.name.toUpperCase()[0],
            resizable: false,
            hide: true,
            rowGroup: true

        },
        {
            headerName: 'Contact',
            field: 'name',
            cellClass: 'name-col',
            headerClass: 'name-col',
            resizable: false,
            flex: 7
        },
        {
            headerName: 'Phone',
            field: 'mainPhoneNumber',
            cellClass: 'phone-col',
            headerClass: 'phone-col',
            resizable: false,
            flex: 5
        }
    ],
    autoGroupColumnDef: {
        headerName: '',
        flex: 3,
        cellClass: 'letter-col',
        headerClass: 'letter-col',
        cellRendererParams: {
            suppressCount: true,
        },
    }
};
