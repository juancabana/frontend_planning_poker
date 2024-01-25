import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {


  @Input() className: string = ''
  @Input() type: `checkbox` | `text` | `radio` | `email` | `password` = 'text'
  @Input() disable: boolean = false;
  @Input() name: string = ''
  @Input() id: string = ''
  @Input() value: string | number = ''
  @Input() formControl?: FormControl

  writeValue(value: string | number): void {
    this.value = value;
  }

  registerOnChange(): void {
    // this.onChange = fn;
    return
  }

  registerOnTouched(): void {
    // this.onTouch = fn;
    return
  }
  setDisabledState(): void {
    return
  }

}
