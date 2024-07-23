import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { Subject, debounceTime } from 'rxjs';
import { componentBaseImports, componentImports } from '../../imports/import';
import { DefaultImplements } from '../../interfaces/angular.interfaces';
import { ObjectUtils } from '../../utils/object-utils';
import { InputData, InputTypes } from './interfaces/input-types.interface';
import { InputUtils } from './utils/input-utils';

@Component({
  selector: 'lote-input',
  standalone: true,
  imports: [
    ...componentBaseImports,
    ...componentImports,
  ],
  templateUrl: './lote-input.component.html',
  styleUrl: './lote-input.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    provideNgxMask(),
  ]
})
export class LoteInputComponent implements DefaultImplements {
  @Input() title = "";
  @Input() type: InputTypes = "text";
  @Input() required: boolean = false;
  @Input() debounce: number = 300;

  @Input() min?: number|Date;
  @Input() max?: number|Date;
  @Input() invalidNumbers?: number[];
  @Input() decimals?: number;
  @Input() values?: any[];
  @Input() step?: number;

  @Output() ngModelChange = new EventEmitter<any>();
  @Input() ngModel: any = null;
  private lastValue: any = null;
  
  onInputValueChange = new Subject<string>();
  inputData!: InputData;
  valid: boolean = false;
  
  ngOnInit(): void {
    this.onInputValueChange
    .pipe(debounceTime(this.debounce))
    .subscribe((): void => {
      this.onNgModelChange();
    });
  }

  ngOnDestroy(): void {
    this.onInputValueChange.unsubscribe()
  }

  ngAfterViewInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateSettings()
  }
  
  updateSettings(): void{
    this.inputData = InputUtils.getInputData(this.type, this)
    this.valid = this.inputData.isValid(this.ngModel)
  }

  onNgModelChange(): void {
    this.valid = this.inputData.isValid(this.ngModel)
    if (this.valid){
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