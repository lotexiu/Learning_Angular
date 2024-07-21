import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { componentImports } from '../../imports/import';
import { LoteBorderComponent } from '../lote-border/lote-border.component';
import { InputData, InputTypes } from './interfaces/input-types.interface';
import { InputUtils } from './utils/input-utils';
import { DefaultImplements } from '../../interfaces/angular.interfaces';
import { provideNgxMask } from 'ngx-mask';
import { ObjectUtils } from '../../utils/object-utils';

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
  providers: [provideNgxMask()]
})
export class LoteInputComponent implements DefaultImplements {
  @Input() title = "";
  @Input() type: InputTypes = "text";

  @Input() min?: number|Date;
  @Input() max?: number|Date;
  @Input() invalidNumbers?: number[];
  @Input() decimals?: number;
  @Input() values?: any[];
  @Input() step?: number;

  @Output() ngModelChange = new EventEmitter<any>();
  @Input() ngModel: any = null;
  private lastValue: any = null;

  inputData!: InputData;
  
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateSettings()
  }
  
  updateSettings(): void{
    this.inputData = InputUtils.getInputData(this.type, this)
    this.inputData.required = true
  }

  onNgModelChange(): void {
    if (this.inputData.isValid(this.ngModel)){
      if(!ObjectUtils.equals(this.ngModel, this.lastValue)){
        this.lastValue = this.ngModel
        this.ngModelChange.emit(this.ngModel)
      }
    }else{
      this.ngModelChange.emit(null)
    }
  }

  getMask(): string {
    return InputUtils.getMask(this.type)
  }
  
}