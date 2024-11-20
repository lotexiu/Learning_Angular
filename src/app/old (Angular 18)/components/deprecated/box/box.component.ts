import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Input() title:string = '';
}
