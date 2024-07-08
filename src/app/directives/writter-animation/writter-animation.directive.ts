import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { ComponentUtils } from '../../utils/utils'

@Directive({
  selector: '[write]',
  standalone: true
})
export class WritterAnimationDirective implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @HostBinding('attr.id') get elementId(): string { return this.id }
  @Input() writeComplete?: Function;
  @Input() write?: string
  @Input() writeSpeed?: number = 25
  @Input() speedBySize?: boolean = false
  
  observer?: MutationObserver;
  previousText?: string
  id: string = ComponentUtils.generateUniqueId()

  constructor(private el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.observer = new MutationObserver(mutations =>{
      // console.log(mutations)
    })
    const config = { childList: true, subtree: true, characterData: true, attributes: true, };
    this.observer.observe(this.el.nativeElement, config);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.write && this.write.trim() != '') {
    // }
  }

  private doWriteAnimationV1() {
    let nativeEle = this.el.nativeElement
    nativeEle.textContent = nativeEle.textContent || ''
    let pos = nativeEle.textContent.length
    let interval: any

    this.previousText = nativeEle.textContent
    interval = setInterval(() => {
      if (pos > 0) {
        nativeEle.textContent = nativeEle.textContent!.substring(0, pos - 1)
        pos--
      } else {
        clearInterval(interval)
        if(this.previousText != this.write){
          this.previousText = this.write
          interval = setInterval(() => {
            if (this.write != this.previousText || pos == this.write!.length) {
              clearInterval(interval)
              if (this.writeComplete) this.writeComplete()
            } else {
              nativeEle.textContent += this.write![pos]
              pos += 1
            }
          }, this.speedBySize ? (380 / this.previousText!.length) : this.writeSpeed)
        }
      }
    }, this.speedBySize ? (380 / this.previousText.length) : this.writeSpeed)
  }
}
