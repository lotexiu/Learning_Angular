import { style } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StateElement } from '../../interfaces/interfaces';

@Directive({
  selector: '[observe]',
  standalone: true
})
export class ObserveDirective implements OnInit, OnDestroy {
  @Output() observe: EventEmitter<StateElement> = new EventEmitter<StateElement>();
  interval: any;
  previosState: any;
  currentState: any;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.currentState = this.getCurrentState()
      this.previosState = this.previosState ? this.previosState : this.currentState
      if (JSON.stringify(this.previosState) != JSON.stringify(this.currentState)) {
        let result = this.getChanges(this.previosState, this.currentState)
        this.previosState = { ...this.currentState }
        this.observe.emit(result)
      }
    }, 50)
  }

  private getChanges(objA: any, objB: any): StateElement {
    let resultObj: any = {}
    for (let key in objA) {
      if (JSON.stringify(objA[key]) != JSON.stringify(objB[key])) {
        resultObj[key] = objB[key]
      }
    }
    return resultObj as StateElement
  }

  private getCurrentState(): any {
    const element = this.el.nativeElement;
    let state: StateElement = {
      attributes: {},
      style: window.getComputedStyle(element),
      html: "",
    }
    let keys = Object.keys(state.style!).filter((key) => {
      if (Number.isNaN(Number(key))) {
        return true
      }
      return false
    })
    let style: any = {}
    keys.forEach((key) => style[key] = state.style![key as any])
    state.style = style
    Array.from(element.attributes).forEach((attr) => state.attributes[attr.name] = attr.value)
    state.html = element.innerHTML
    return state
  }
}
