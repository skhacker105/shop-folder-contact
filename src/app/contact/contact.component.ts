import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DynamicLayoutComponent, TableViewComponent } from 'shop-folder-component';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [DynamicLayoutComponent, TableViewComponent, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  rowData: any[] = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make', cellClass: 'default-col-width' }
  ];
}
