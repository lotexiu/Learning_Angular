import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, output, Output } from '@angular/core';
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
  @Input() ngModel: any = null;
  @Output() ngModelChange = new EventEmitter<number>();

  private onChange!: (value: any)=> void;
  
  
  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    el.nativeElement.onbeforeinput = EventUtils.onKeyboardEvent(this,"onInput")
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  setDisabledState?(isDisabled: boolean): void {}
  registerOnTouched(fn: any): void {
    // console.log('touch')
  }

  writeValue(obj: any): void {
    // console.log('write')
  }

  onInput(evt: InputEvent){    
    console.log(evt)
    // const test: any = navigator
    // let target: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    // test.keyboard.getLayoutMap().then((v: any)=>{
    //   console.log(v.get(evt.code))
    // })

    // console.log(target)
    // target.dispatchEvent(new Event('keydown', {...evt}))
    // target.value = 's'
    // console.log(this.ngModel)
    // this.onChange('')
  }

}
