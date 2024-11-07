import { Class, λ } from "../component-utils";
import { onKeyboardEvent } from "./event-interface";

class KeyboardEventData{
  private event!: KeyboardEvent;
  constructor(evt: KeyboardEvent) {
    this.event = evt;
  }
  public get altKey(): boolean {return this.event.altKey}
  public get ctrlKey(): boolean {return this.event.ctrlKey}
  public get bubbles(): boolean {return this.event.bubbles}
  public get cancelable(): boolean {return this.event.cancelable}
  public get composed(): boolean {return this.event.composed}
  public get currentTarget(): EventTarget|null {return this.event.currentTarget}
  public get defaultPrevented(): boolean {return this.event.defaultPrevented}
  public get detail(): number {return this.event.detail}
  public get eventPhase(): number {return this.event.eventPhase}
  public get isComposing(): boolean {return this.event.isComposing}
  public get key(): string {return this.event.key}
  public get location(): number {return this.event.location}
  public get metaKey(): boolean {return this.event.metaKey}
  public get repeat(): boolean {return this.event.repeat}
  public get shiftKey(): boolean {return this.event.shiftKey}
  public get target(): EventTarget|null {return this.event.target}
  public get timeStamp(): number {return this.event.timeStamp}
  public get type(): string {return this.event.type}
  public get view(): Window|null {return this.event.view}

  public get code(): string {
    if (this.event.code.length == 1){
      return this.event.code
    }
    return ""
  }
  public preventDefault(): void {this.event.preventDefault()}
  public stopPropagation(): void {this.event.stopPropagation()}
  public stopImmediatePropagation(): void {this.event.stopImmediatePropagation()}
}

namespace EventUtils {
  export function onKeyboardEvent<T>(_this: Class<T>, call: string): onKeyboardEvent {
    return (evt: KeyboardEvent): void => {
      evt.preventDefault()
      _this[call](new KeyboardEventData(evt))
    }
  }
}

export {
  KeyboardEventData,
  EventUtils
}