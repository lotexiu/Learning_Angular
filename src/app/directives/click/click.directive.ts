import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { isNull } from 'src/utils/object-utils';

@Directive({
  selector: '[click]',
  standalone: true
})
export class ClickDirective implements OnChanges {
  @HostBinding('style.cursor'    ) get getCursor    (): string         { return  this.disabled ? 'normal' : 'pointer' }
  @HostBinding('class.clickable' ) get getClickable (): boolean        { return !this.disabled                        }
  @HostBinding('class.keydown'   ) classKeydown: boolean = false
  @HostBinding('attr.tabindex'   ) get getTabindex  (): number | null  { return  this.disabled ? null : 0             }
  @HostBinding('attr.aria-hidden') get getAriaHidden(): boolean | null { return  this.disabled ? null : false         }

  @Output() onkeydown: EventEmitter<any> =  new EventEmitter<any>();
  @Output() onkeyup: EventEmitter<any> =  new EventEmitter<any>();

  @Input() disabled: boolean = false;
  @Input() key: string = 'any';
  
  constructor(private element: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    const nativeEle = this.element.nativeElement;
    nativeEle.style.pointerEvents = this.disabled ? 'none' : 'auto'
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if(!this.disabled){
      this.classKeydown = isNull(this.key,'','any') || (this.key as string).split('|').includes(event.code)
      if(this.classKeydown && this.onkeydown){
        this.onkeydown.emit(event)
      }
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if(!this.disabled){
      this.classKeydown = isNull(this.key,'','any') || !(this.key as string).split('|').includes(event.code)
      if (!this.classKeydown && this.onkeyup){
        this.onkeyup.emit(event)
      }
    }
  }
}