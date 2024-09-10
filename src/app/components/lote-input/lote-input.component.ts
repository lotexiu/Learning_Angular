import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { componentImports } from '../../imports/import';
import { DefaultImplements } from '../../interfaces/angular.interfaces';
import { InputDataReturn, InputDataTypes, InputTypes } from './interfaces/input-types.interface';
import { InputUtils } from './utils/input-utils';
import { GridConfig } from '../lote-border/interfaces/grid-template.interface';
import { isNull } from '../../utils/object-utils';

@Component({
  selector: 'lote-input',
  standalone: true,
  imports: [
    ...componentImports,
  ],
  templateUrl: './lote-input.component.html',
  styleUrl: './lote-input.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
  ]
})

export class LoteInputComponent implements DefaultImplements {
  @Input() title = "";
  @Input() type: InputTypes = "text";
  @Input() required: boolean = false;
  @Input() debounce: number = 300;
  @Input() errorMessage?: string

  @Input() suffix?: string
  @Input() prefix?: string
  @Input() min?: string | number | Date;
  @Input() max?: string | number | Date;
  @Input() invalidNumbers: number[] = [];
  @Input() decimals: number = 2;
  @Input() values: any[] = [];
  @Input() step: number = 1;

  @Output() ngModelChange = new EventEmitter<any>();
  @Input() ngModel: any = null;
  private lastValue: any = null;

  debounceTrigger = new Subject<string>();
  inputData!: InputDataTypes;
  valid: boolean = false;

  gridTemplate: GridConfig = {
    column: {
      defaultSize: 'auto'
    },
    row: {
      defaultSize: 'auto',
      size: ['', '0fr']
    }
  };

  ngOnDestroy(): void {
    this.debounceTrigger.unsubscribe()
  }

  ngOnInit(): void {
    this.debounceTrigger
      .pipe(debounceTime(this.debounce))
      .subscribe((): void => {
        this.onDebounce()
      });
    this.updateSettings()
    this.onNgModelChange()
  }

  ngAfterViewInit(): void {

  }

  onNgModelChange(): void {
    this.updateSettings()    
    this.valid = this.inputData.isValid(this.ngModel) && isNull(this.errorMessage, '')
    this.gridTemplate.row!.size![1] = this.valid ? '0fr' : '1fr'
  }


  onDebounce(): void{
    // if (this.valid) {
    //   if (!equals(this.ngModel, this.lastValue)) {
    //     this.lastValue = this.ngModel
    //     this.ngModelChange.emit(this.ngModel)
    //     console.log(this.ngModel)
    //   }
    // } else {
    //   this.lastValue = this.ngModel
    //   this.ngModelChange.emit(null)
    //   console.log(null)
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSettings()
  }

  updateSettings(): void {
    this.inputData = InputUtils.getInputData(this.type, this)
    if(['percent','money'].includes(this.type)){
      this.suffix = this.getInputData('number').suffix
      this.prefix = this.getInputData('number').prefix
    }
    this.valid = this.inputData.isValid(this.ngModel)
  }

  getInputData<T extends InputTypes>(type: T): InputDataReturn<T>{
    return this.inputData as InputDataReturn<T>
  }

}