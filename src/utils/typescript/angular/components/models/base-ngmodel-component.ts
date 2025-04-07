import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { ControlValueAccessor, ControlContainer, FormControl, FormGroup } from "@angular/forms";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { cLog } from "@ts-natives/console/console-utils";
import { Subscription } from "rxjs";
import { BaseComponent } from "./base-component";

@Component({ template: '' })
export abstract class BaseNgModelComponent<NgModelType = any> 
  extends BaseComponent 
  implements ControlValueAccessor 
{
  /* ControlValueAccessor Interface Methods */
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  /* Inputs & Outputs */
  @Input() formControlName: string = '';
  @Input() ngModel: Nullable<NgModelType> = null;
  @Input() loading: boolean = false;

  @Output() ngModelChange: EventEmitter<Nullable<NgModelType>> = new EventEmitter<Nullable<NgModelType>>();

  /* Dependency Injection */
  private controlContainer: Nullable<ControlContainer> = inject(ControlContainer, {
    optional: true, 
    host: true, 
    skipSelf: true
  });

  /* Internal State */
  private _subscription: Nullable<Subscription> = null;
  private _ngModelForm: FormControl<Nullable<NgModelType>> = new FormControl<Nullable<NgModelType>>(null);

  /* Getter & Setter para o FormControl */
  public get ngModelForm(): FormControl<Nullable<NgModelType>> {
    return this._ngModelForm;
  }

  public set ngModelForm(value: FormControl<Nullable<NgModelType>>) {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._ngModelForm = value;
    this._subscription = value.valueChanges.subscribe((newNgModel: Nullable<NgModelType>) => {
      if (this.ngModel === newNgModel) return;

      const previousValue = this.ngModel;
      this.ngModel = newNgModel;

      if ((this as any).ngOnChanges) {
        (this as any).ngOnChanges({
          ngModel: {
            previousValue, 
            currentValue: newNgModel, 
            firstChange: false, 
            isFirstChange: () => false
          }
        });
      }
    });
  }

  /* Métodos de Utilidade */

  /** Retorna a primeira mensagem de erro do FormControl */
  getFirstError(): string {
    if (this.ngModelForm?.errors) {
      const key = Object.keys(this.ngModelForm.errors)[0];
      return this.ngModelForm.errors[key] || '';
    }
    return '';
  }

  /** Atualiza o FormControl e emite evento de mudança */
  onNgModelChange(event?: Event): void {
    this.ngModelForm.setValue(this.ngModel, { emitEvent: false });
    this.ngModelChange.emit(this.ngModel);
  }

  /** Obtém ou cria um FormControl baseado no formControlName */
  getFormControl(ignoreMessage: boolean = false): FormControl<Nullable<NgModelType>> {
    let formControl = new FormControl<Nullable<NgModelType>>(this.ngModel);

    if (!this.controlContainer) {
      if (!ignoreMessage) {
        cLog({ type: 'warn' }, "Can't find parent FormGroup directive");
      }
      return formControl;
    }

    if (this.formControlName) {
      const existingControl = this.controlContainer.control?.get(this.formControlName);

      if (!existingControl) {
        (this.controlContainer.control as FormGroup).addControl(this.formControlName, formControl);
      } else {
        formControl = existingControl as FormControl<Nullable<NgModelType>>;
      }
    } else if (!ignoreMessage) {
      cLog({ type: 'warn' }, `Missing FormControlName directive from host element of the component. id: ${this.id}`);
    }

    return formControl;
  }
}
