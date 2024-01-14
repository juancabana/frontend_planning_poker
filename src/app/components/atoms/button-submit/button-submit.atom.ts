import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-submit',
  templateUrl: './button-submit.atom.html',
  styleUrls: ['./button-submit.atom.sass'],
})
export class ButtonSubmitComponent  {
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public label: string = ''
  @Input() public isActive: boolean = false;

  @Output() submit = new EventEmitter<void>();

  onClick(event: Event): void {
    event.preventDefault()
    if (this.type != 'submit') return
    this.submit.emit();
  }
}
