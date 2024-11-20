import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[click]',
  standalone: true
})
export class ClickDirective implements OnChanges {
  @HostBinding('style.cursor') get getCursor(): string { return this.disabled ? 'normal' : 'pointer' }
  @HostBinding('class.clickable') get getClass(): boolean { return this.disabled }
  @Input() disabled: boolean = false;
  
  constructor(private element: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    const nativeEle = this.element.nativeElement;
    nativeEle.style.pointerEvents = this.disabled ? 'none' : 'auto'
  }
}
