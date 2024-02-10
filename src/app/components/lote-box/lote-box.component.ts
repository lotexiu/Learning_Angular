import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../../directives/icon.directive';

@Component({
  selector: 'lote-box',
  standalone: true,
  imports: [
    CommonModule,
    IconDirective,
  ],
  templateUrl: './lote-box.component.html',
  styleUrl: './lote-box.component.scss'
})
export class LoteBoxComponent implements OnInit{
  @Input() title?: string;
  @Input() allowMinimize: boolean = true;
  @Input() minimized: boolean = false;
  
  closeIcon: "eye" | undefined;

  ngOnInit(): void {
    this.closeIcon = 'eye'
  }
}
