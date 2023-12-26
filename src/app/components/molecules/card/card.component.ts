import { Component, Input, OnInit } from '@angular/core';
import { User } from './../../../interfaces/user.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() public player!: User;
  @Input() public visualizate_result: Boolean = false;

  public visualization: string = '';

  ngOnInit() {
    this.visualization = this.player?.visualization;
  }
}
