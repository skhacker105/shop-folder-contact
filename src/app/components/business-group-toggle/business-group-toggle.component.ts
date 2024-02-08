import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IContactGroup } from 'shop-folder-core';

@Component({
  selector: 'app-business-group-toggle',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './business-group-toggle.component.html',
  styleUrl: './business-group-toggle.component.scss'
})
export class BusinessGroupToggleComponent implements ICellRendererAngularComp {

  contactGroup: IContactGroup | undefined;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.contactGroup = params.data;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

}
