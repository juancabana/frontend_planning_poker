import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { HttpService } from '../../../services/http-service/http-service.service';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';

import { CardSelected } from '../../../interfaces/card-selected.interface';
import { Card } from '../../../interfaces/card.interface';

@Component({
  selector: 'options-cards',
  templateUrl: './options-cards.organism.html',
  styleUrls: ['./options-cards.organism.sass'],
})
export class optionsCards implements OnInit {
  @Input() public visualization!: string;
  @Output() public cardSelectedEvent = new EventEmitter<CardSelected>();
  public cardOptions: Card[] = [];
  public cardSelected: number | null = null;
  public selectedCard = -1;

  constructor(
    public readonly webSocketService: WebSocketService,
    private readonly httpService: HttpService
  ) {}

  ngOnInit() {
    this.httpService.getCards().subscribe((cards) => {
      this.cardOptions = cards;
    });
  }

  selectCard(cardId: number) {
    this.selectedCard = cardId;

    const idUser = JSON.parse(localStorage.getItem('user')!)._id;
    this.cardOptions.map((card) => {
      card.id == cardId
        ? (card.selected_by_user = true)
        : (card.selected_by_user = false);
    });

    this.cardSelected = this.cardOptions[cardId].value;
    this.cardSelectedEvent.emit({ idUser, cardSelected: this.cardSelected });
    this.emitCardSelected(cardId, idUser);
    return;
  }

  emitCardSelected(idCard: number, idUser: string) {
    this.webSocketService.emit('cardSelected', {
      index: idCard,
      lastSelected: this.cardSelected,
      ID_user: idUser,
    });
  }
}
