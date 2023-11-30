import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.sass'],
})
export class CardMenuComponent {
  card_options: any[] = [];
  cardSelected: number | null = null;
  @Input() user: any;
  @Output() cardSelectedEvent = new EventEmitter<any>();
  constructor(
    private webSocketService: WebSocketService,
    private httpService: HttpService
  ) {}

  async ngOnInit() {
    // Escuchar cuando un usuario selecciona una carta
    const cards = await this.httpService.getCards();
    this.card_options = cards;

    this.webSocketService.listenCardSelected().subscribe((data: any) => {
      this.card_options.map((card, index) => {
        if (card.value === this.cardSelected) {
          card.selected_by_user = true;
        } else card.selected_by_user = false;

        if (!card.selected_by_user) {
          card.selected = data[index].selected;
        }
      });
    });
  }

  selectCard(index: number) {
    if (!this.card_options[index].selected) {
      const idUser = JSON.parse(localStorage.getItem('user')!)._id;
      this.card_options.map((card, i) => {
        if (i == index) {
          card.selected_by_user = true;
        } else {
          card.selected_by_user = false;
        }
      });

      // emitir el valor de la carta seleccionada
      this.webSocketService.emit('cardSelected', {
        index: index,
        lastSelected: this.cardSelected,
        ID_user: idUser,
      });
      this.cardSelected = this.card_options[index].value;
      this.cardSelectedEvent.emit(idUser);
    }
    return;
  }
}
