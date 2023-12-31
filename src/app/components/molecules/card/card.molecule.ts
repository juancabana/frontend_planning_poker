import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'card',
  templateUrl: './card.molecule.html',
  styleUrls: ['./card.molecule.sass'],
})
export class CardComponent implements OnInit {
  @Input() public player?: User;
  @Input() public visualizate_result: Boolean = false;
  @Input() public selected_card: number = -3;
  @Input() public isCardIption = false;
  @Input() public selected_by_user = false;
  @Input() public value = '';
  public isSpectator: boolean = false;

  ngOnInit() {
    this.isSpectator = this.player?.visualization == 'spectator';
  }
}
