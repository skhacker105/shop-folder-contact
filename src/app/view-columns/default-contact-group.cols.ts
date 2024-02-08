import { IContactGroupMember, IGridView } from "shop-folder-core";
import { BusinessGroupToggleComponent } from "../components/business-group-toggle/business-group-toggle.component";

export const DEFAULT_GROUP_COLUMNS: IGridView = {
    viewName: 'FLAT',
    isDefault: true,
    columnDefs: [
        {
            headerName: 'Group',
            field: 'name',
            flex: 5
        },
        {
            headerName: '',
            field: 'members',
            valueGetter: (params: any) => params.data.members.length.toString(),
            flex: 1
        },
        {
            headerName: '',
            field: 'isBusinessAccount',
            cellRenderer: BusinessGroupToggleComponent,//!params.data.isBusinessAccount ? '<div class="business_tick"></div>' : '',
            width: 50
        }
    ],
    autoGroupColumnDef: undefined
};
