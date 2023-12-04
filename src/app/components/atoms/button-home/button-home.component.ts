import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-home',
  templateUrl: './button-home.component.html',
  styleUrls: ['./button-home.component.sass'],
})
export class ButtonHomeComponent {
  @Input() public isActive: boolean = false;
}
