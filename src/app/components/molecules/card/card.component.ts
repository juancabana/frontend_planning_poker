import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() public player!: User;
  @Input() public visualizate_result: Boolean = false;

  public visualization: string = 'false';
  public nameViever: string = '';

  ngOnInit() {
    this.nameViever = this.player.username.substring(0, 2).toUpperCase();
    this.visualization = this.player.visualization;
  }
}
