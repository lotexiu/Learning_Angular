import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { componentImports } from '../../imports/import';
import { LoteBorderComponent } from '../lote-border/lote-border.component';

@Component({
  selector: 'lote-input',
  standalone: true,
  imports: [
    ...componentImports,
    LoteBorderComponent,
  ],
  templateUrl: './lote-input.component.html',
  styleUrl: './lote-input.component.scss',
})
export class LoteInputComponent {

}
