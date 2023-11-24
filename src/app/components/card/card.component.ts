import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() player: any = {};
  name_viever: string = '';
  visualization: string = 'false';

  ngOnInit() {
    // console.log(this.player);
    this.name_viever = this.player.username.substring(0, 2).toUpperCase();
    this.visualization = this.player.visualization;
  }
}
