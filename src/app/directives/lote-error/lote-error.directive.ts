import { Directive, ElementRef, Injector, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl, ValidationErrors, Validator } from '@angular/forms';
// import { LoteTooltipComponent } from '../../components/lote-tooltip/lote-tooltip.component';

@Directive({
  selector: '[loteError]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LoteError,
    multi: true
  }],
})
export class LoteError implements Validator, OnInit, OnDestroy, OnChanges {
  @Input() disabled: boolean = false;
  @Input() loteError?: boolean = false;
  @Input() loteErrorMessage?: string;

  // private loteTooltip: ComponentRef<LoteTooltipComponent> | null = null;

  private control!: NgControl

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) {}

  ngOnInit() {
    this.control = this.injector.get(NgControl)
  }

  ngOnDestroy() {
    // if(this.loteTooltip){
    //   this.loteTooltip.destroy()
    //   this.loteTooltip = null
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.control) this.control.control?.updateValueAndValidity()
    this.LoteTooltip()
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return (
      this.disabled ? null : 
      this.loteError ? { 'loteError': this.loteErrorMessage || 'Campo inválido!' } :
      null
    )
  }

  private LoteTooltip(){
    // if(this.loteError && !this.loteTooltip){
    //   this.loteTooltip = this.viewContainerRef.createComponent(LoteTooltipComponent)
    //   this.loteTooltip.instance.text = this.loteErrorMessage
    // }else if(!this.loteError && this.loteTooltip){
    //   this.loteTooltip!.destroy();
    //   this.loteTooltip = null;
    // }
  }
}
