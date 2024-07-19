import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { componentImports } from '../../imports/import';
import { LoteBorderComponent } from '../lote-border/lote-border.component';
import { InputTypes } from './interfaces/input-types.interface';
import { InputUtils } from './utils/input-utils';

@Component({
  selector: 'lote-input',
  standalone: true,
  imports: [
    ...componentImports,
    LoteBorderComponent,
  ],
  templateUrl: './lote-input.component.html',
  styleUrl: './lote-input.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoteInputComponent implements OnInit {
  @Input() title = "test";
  @Input() type: InputTypes = "text";
  @Input() ngModel: any = "";
  
  
  public ngOnInit(): void {
    
  }

  public getMask(): string {
    return InputUtils.getMask(this.type)
  }
  
}