import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() public player: any = {};
  @Input() public visualizate_result: Boolean = false;

  public visualization: string = 'false';
  public name_viever: string = '';

  ngOnInit() {
    this.name_viever = this.player.username.substring(0, 2).toUpperCase();
    this.visualization = this.player.visualization;
    console.log('d');
  }
}
