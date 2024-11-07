import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentUtils } from '../../utils/component-utils';
import { EventUtils, KeyboardEventData } from '../../utils/event/event-utils';

@Directive({
  selector: '[mask]',
  standalone: true,
  providers: [
    ComponentUtils.ngValueAcessor(LoteMaskDirective)
  ]
})
export class LoteMaskDirective implements ControlValueAccessor {
  @HostBinding('ngModel')
  private ngModel: any

  private onChange!: (value: any)=> void;
  
  
  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    el.nativeElement.onkeydown = EventUtils.onKeyboardEvent(this,"onInput")
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  setDisabledState?(isDisabled: boolean): void {}
  registerOnTouched(fn: any): void {
    console.log('touch')
  }

  writeValue(obj: any): void {
    console.log('write')
  }

  onInput(evt: KeyboardEventData){    
    let target: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    // target.dispatchEvent(new Event('keydown', {...evt}))
    target.value = 's'
    console.log(this.ngModel)
    // this.onChange('')
  }

}
