import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { iconsName, svgList } from '../../icons/svg/svg-icons';

@Directive({
  selector: '[icon]',
  standalone: true
})
export class IconDirective implements OnChanges {
  @Input('icon') iconName?: iconsName;

  constructor(private element: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateIcon();
  }

  private updateIcon(): void {
    const nativeEle = this.element.nativeElement;
    nativeEle.innerHTML = ''; // Remove old icon
    if (this.iconName) {
      nativeEle.insertAdjacentHTML('beforeend', svgList[this.iconName]!);
      nativeEle.classList.add("fas-icon", this.iconName);
    }
  }
}
