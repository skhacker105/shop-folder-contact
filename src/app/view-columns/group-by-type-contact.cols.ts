import { IGridView } from "shop-folder-core";

export const GROUP_BY_TYPE_COLUMNS: IGridView = {
    viewName: 'Tag View',
    isDefault: false,
    columnDefs: [
        {
            field: 'types',
            rowGroup: true,
            valueGetter: (params) => params.data.types ? params.data.types.join(',') : '',
            hide: true,
        },
        {
            headerName: 'Contact',
            field: 'name',
            flex: 1,
            rowGroup: false,
        }
    ],
    autoGroupColumnDef: {
        headerName: 'Type',
        flex: 1,
        sort: 'asc',
        comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
            if (!valueA) valueA = [];
            if (!valueB) valueB = [];
            
            if (valueA.length === 0 && valueB.length === 0) return nodeA.data.name.localeCompare(nodeB.data.name);
            else if (valueA.length > 0 && valueB.length === 0) return -1;
            else if (valueB.length > 0 && valueA.length === 0) return 1;
            else {
                return valueA.localeCompare(valueB)
            }
        },
        cellStyle: {
            'font-size': '10px'
        }
    }
};
