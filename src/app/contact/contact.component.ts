import { Component } from '@angular/core';
import { DynamicLayoutComponent, TableViewComponent } from 'shop-folder-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [DynamicLayoutComponent, TableViewComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
