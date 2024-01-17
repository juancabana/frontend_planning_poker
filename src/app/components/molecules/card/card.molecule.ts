import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'card',
  templateUrl: './card.molecule.html',
  styleUrls: ['./card.molecule.sass'],
})
export class CardComponent {
  @Input() public card?: Card;
  @Input() public player?: User;
  @Input() public visualizate_result: boolean = false;
  @Input() public isCardOption = false;
  @Input() public selected_by_user = false;
  @Input() public value = '';
}
