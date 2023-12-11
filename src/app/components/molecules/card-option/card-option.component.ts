import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-option',
  templateUrl: './card-option.component.html',
  styleUrls: ['./card-option.component.sass'],
})
export class CardOptionComponent {
  @Input() selected_by_user = false;
  @Input() value = '';
}
