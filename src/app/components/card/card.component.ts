import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() player: any = {};
  name_viever: string = '';

  ngOnInit() {
    this.name_viever = this.player.name.substring(0, 2).toUpperCase();
  }
}
