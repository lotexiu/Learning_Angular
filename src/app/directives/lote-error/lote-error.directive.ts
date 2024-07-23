import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[loteError]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LoteError,
    multi: true
  }],
})
export class LoteError implements Validator {
  @Input() disabled: boolean = false;
  @Input() loteError: boolean = false;
  @Input() loteErrorMessage: string = 'campo invalido';
  
  validate(control: AbstractControl) : ValidationErrors | null {
    if(this.disabled){
      return null
    }
    return this.loteError ? {'loteError': this.loteErrorMessage} : null
  }
}
