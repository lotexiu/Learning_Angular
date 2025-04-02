import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, inject } from "@angular/core";
import { Base } from "./base";
import { λ } from "src/utils/easy-use";
import { ComponentUtils } from "../component-utils";

@Component({
  template: '',
})
export abstract class BaseComponent extends Base {

  public cdref: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    super();
    document.addEventListener('focusout', λ(this,'blurDetected'));
    document.addEventListener('focusin', λ(this,'focusDetected'));
    this.element.addEventListener('mouseenter', λ(this,'mouseEnterDetected'));
    this.element.addEventListener('mouseleave', λ(this,'mouseLeaveDetected'));
  }

  ngOnDestroy(): void {
    document.removeEventListener('focusout', λ(this,"blurDetected"))
    document.removeEventListener('focusin', λ(this,"focusDetected"))
    this.element.removeEventListener('mouseenter', λ(this,"mouseEnterDetected"));
    this.element.removeEventListener('mouseleave', λ(this,"mouseLeaveDetected"));
  }

  private _id: string = `id${ComponentUtils.newId()}`;
  @Output() elementIdChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  get elementId(): string {
    return this._id;
  }
  set elementId(value: string) {
    this.elementIdChange.emit(this._id);
  }

  get id(): string {
    return this.elementId;
  }

  @Input() disabled: boolean = false;

  @Output() onHotKey  : EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() onFocus   : EventEmitter<FocusEvent   > = new EventEmitter<FocusEvent   >();
  @Output() onBlur    : EventEmitter<FocusEvent   > = new EventEmitter<FocusEvent   >();
  @Output() onKeyDown : EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp   : EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() onKeyPress: EventEmitter<Event>         = new EventEmitter<Event>();
  @Output() onClick   : EventEmitter<MouseEvent   > = new EventEmitter<MouseEvent   >();
  @Output() onMouseEnter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseLeave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  ngAfterContentChecked(): void {
    this.elementIdChange.emit(this.elementId);
    this.cdref.detectChanges();
  }
 
  private blurDetected(evt: FocusEvent) {
    const {hasRelatedTarget, hasTarget} = this.isFocusInsideComponent(evt);
    if (hasTarget && !hasRelatedTarget) {
      this.Blur(evt);
    }
  }

  private focusDetected(evt: FocusEvent) {
    const {hasRelatedTarget, hasTarget} = this.isFocusInsideComponent(evt);
    
    if (!hasRelatedTarget && hasTarget) {
      this.Focus(evt);
    }
  }

  private isFocusInsideComponent(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const target = event.target as HTMLElement;
    
    const hasRelatedTarget: boolean = relatedTarget && this.elementRef.nativeElement.contains(relatedTarget);
    const hasTarget: boolean = target && this.elementRef.nativeElement.contains(target);
    return {hasRelatedTarget, hasTarget};
  }

  private mouseEnterDetected(evt: MouseEvent) {
    this.MouseEnter(evt);
  }

  private mouseLeaveDetected(evt: MouseEvent) {
    this.MouseLeave(evt);
  }

  Focus(evt: FocusEvent): void {
    if(this.onFocus) this.onFocus.emit(evt);
  }
  Blur(evt: FocusEvent): void {
    if(this.onBlur) this.onBlur.emit(evt);
  }

  KeyDown(evt: KeyboardEvent): void {
    if(this.onKeyDown) this.onKeyDown.emit(evt);
  }
  KeyUp(evt: KeyboardEvent): void {
    if(this.onKeyUp) this.onKeyUp.emit(evt);
  }
  KeyPress(evt: Event): void {
    if(this.onKeyPress) this.onKeyPress.emit(evt);
  }

  Click(evt: MouseEvent): void {
    if(this.onClick) this.onClick.emit(evt);
  }

  MouseEnter(evt: MouseEvent): void {
    if(this.onMouseEnter) this.onMouseEnter.emit(evt);
  }

  MouseLeave(evt: MouseEvent): void {
    if(this.onMouseLeave) this.onMouseLeave.emit(evt);
  }
}