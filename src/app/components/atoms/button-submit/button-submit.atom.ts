import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.atom.html',
  styleUrls: ['./button-submit.atom.sass'],
})
export class ButtonSubmitComponent  {
  @Output() submit = new EventEmitter<void>();
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public label: string = ''
  @Input() public isActive: boolean = false;

  onClick() {
    if (this.type === 'submit') {
      this.submit.emit();
    }
    return;
  }
}
