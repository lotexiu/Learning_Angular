import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { λ } from 'src/utils/easy-use';

@Directive({
  selector: '[mask]',
  standalone: true,
})
export class MaskDirective {
  private ngOnChange!: Function;
  private ngWriteValue!: Function;

  constructor(
    private ngControl: NgControl
  ) {}

  ngOnInit () {
    this.ngOnChange = (this.ngControl.valueAccessor as any).onChange;
    this.ngWriteValue = λ(this.ngControl.valueAccessor!, 'writeValue');

    (this.ngControl.valueAccessor as any).onChange = λ(this, 'onChange');
  }

  onChange(value: any) {
    this.ngWriteValue(`${value}`.toUpperCase());
    this.ngOnChange(`${value}`.toUpperCase());
  }
}