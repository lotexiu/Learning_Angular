import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentUtils } from '../../utils/component-utils';

@Directive({
  selector: '[mask]',
  standalone: true,
  providers: [
    ComponentUtils.ngValueAcessor(LoteMaskDirective)
  ]
})
export class LoteMaskDirective implements ControlValueAccessor {
  @Input() ngModelChange?: Function;
  
  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    el.nativeElement.onkeydown = ComponentUtils.λ(this, 'onInput')
  }
  registerOnChange(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {
    console.log(obj)
  }

  onInput(e: KeyboardEvent){    
    e.preventDefault()
    let target: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    target.value = 's'

    const newEvent = new KeyboardEvent('input', {
      ...e,
      bubbles: true,
      cancelable: true,
    });
    // target.dispatchEvent(newEvent)
  }

}
