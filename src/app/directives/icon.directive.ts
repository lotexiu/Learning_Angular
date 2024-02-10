import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { iconsName, svgList } from '../icons/svg/svg-icons';

@Directive({
  selector: '[icon]',
  standalone: true
})
export class IconDirective implements OnInit {
  @Input('icon') iconName?: iconsName;

  constructor(
    private element: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    let nativeEle = this.element.nativeElement
    if (this.iconName) {
     nativeEle.insertAdjacentHTML('beforeend', svgList[this.iconName])
     nativeEle.classList.add("fas-icon", this.iconName);
    }
  }

}
