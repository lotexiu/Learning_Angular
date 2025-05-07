import { AbstractControl, FormGroup, NgControl, ValidationErrors } from "@angular/forms";
import { isNull } from "@ts-natives/object/object-utils";

class FormUtils {

  static getControlsWithErrors(form: FormGroup): AbstractControl<any, any>[] {
    const controls: string[] = Object.keys(form.controls);
    return (
      controls.filter((control: string): boolean =>{
        return !isNull(form.controls[control].errors)
      }).map((control: string): AbstractControl<any, any> => {return form.controls[control]})
    )
  }

  static getFirstErrorInControl(control: NgControl): string {
    const errors: ValidationErrors = (control.errors||{});
    return errors[(Object.keys(errors)[0])]
  }
}

export {
  FormUtils
}