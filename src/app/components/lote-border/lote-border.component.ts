import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lote-border',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lote-border.component.html',
  styleUrl: './lote-border.component.scss'
})
export class LoteBorderComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
