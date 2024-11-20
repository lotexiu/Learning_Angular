import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, output, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentUtils } from '../../../utils/component-utils';
import { isNull } from '../../../utils/object-utils';

@Directive({
  selector: '[mask]',
  standalone: true,
  providers: [
    ComponentUtils.ngValueAcessor(LoteMaskDirective)
  ]
})
export class LoteMaskDirective implements ControlValueAccessor {
  // @Input() ngModel: any = null;
  // @Output() ngModelChange = new EventEmitter<string>();
  private onChange!: (value: any)=> void;
  
  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    // el.nativeElement.onbeforeinput = EventUtils.onKeyboardEvent(this,"onInput")
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  setDisabledState?(isDisabled: boolean): void {}
  registerOnTouched(fn: any): void {
    // console.log('touch')
  }

  writeValue(obj: any): void {
    this.applyMask(obj)
  }

  onInput(evt: InputEvent){    
    if (evt.isTrusted){
      const input = evt.target as HTMLInputElement
      const newValue = `${input.value}${(evt.data || '')}`
      this.applyMask(newValue, true)
    }
  }

  applyMask(value?: string, triggerOnChange: boolean = false): void{
    const input = this.el.nativeElement as HTMLInputElement
    if (!isNull(value)){
      input.value = value
    }
    if (this.onChange && triggerOnChange){
      this.onChange(value)
    }
  }

}
