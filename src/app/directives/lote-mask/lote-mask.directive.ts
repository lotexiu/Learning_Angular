import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[mask]',
  standalone: true
})
export class LoteMaskDirective {
  @Input() ngModelChange?: Function;
  
  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    el.nativeElement.onkeydown = this.onInput
  }

  onInput = (e: KeyboardEvent) =>{
    console.log(e)
    e.preventDefault()
    console.log(this.el)
    let target: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    target.value = 's'

    const newEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
    });

    target.dispatchEvent(newEvent)
  }

}
