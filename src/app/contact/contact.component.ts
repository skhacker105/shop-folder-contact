import { Component } from '@angular/core';
import { DynamicLayoutComponent } from 'shop-folder-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [DynamicLayoutComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
