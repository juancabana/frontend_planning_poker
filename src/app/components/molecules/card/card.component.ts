import { Component, Input, OnInit } from '@angular/core';
import { User } from './../../../interfaces/user.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() public player?: User;
  @Input() public visualizate_result: Boolean = false;
  @Input() public selected_card: number = -3;
  public isSpectator: boolean = false;

  ngOnInit() {
    this.isSpectator = this.player?.visualization == 'spectator';
  }
}
