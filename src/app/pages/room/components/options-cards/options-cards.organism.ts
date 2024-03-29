import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { HttpService } from '../../../../services/http-service/http-service.service';
import { WebSocketService } from '../../../../services/web-socket/web-socket.service';

import { CardSelected } from '../../../../interfaces/card-selected.interface';
import { Card } from '../../../../interfaces/card.interface';

@Component({
  selector: 'options-cards',
  templateUrl: './options-cards.organism.html',
  styleUrls: ['./options-cards.organism.sass'],
})
export class OptionsCards implements OnInit {
  public cardOptions: Card[] = [];
  public cardSelected?: Card;
  public selectedCard = -1;

  @Input() public visualization!: string;

  @Output() public cardSelectedEvent = new EventEmitter<CardSelected>();

  constructor(
    public readonly webSocketService: WebSocketService,
    private readonly httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.httpService.getCards().subscribe((cards) => {
      this.cardOptions = cards;
    });
  }

  selectCard(card: Card): void {
    const idUser = JSON.parse(localStorage.getItem('user')!)._id;
    this.cardSelected = this.cardOptions[card.id];
    this.cardSelectedEvent.emit({ idUser, cardSelected: this.cardSelected });
    this.emitCardSelected(card.id, idUser);
  }

  emitCardSelected(idCard: number, idUser: string): void {
    this.webSocketService.emit('cardSelected', { index: idCard, idUser: idUser });
  }
}
