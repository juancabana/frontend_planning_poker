import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service.service';
// import { HttpService } from 'src/app/services/http-service/http-service.service';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.sass'],
})
export class CardMenuComponent {
  constructor(
    private webSocketService: WebSocketService,
    private httpService: HttpService
  ) {}
  card_options: any[] = [];
  cardSelected: number | null = null;
  async ngOnInit() {
    // Escuchar cuando un usuario selecciona una carta
    const cards = await this.httpService.getCards();
    this.card_options = cards;
    this.webSocketService.listenCardSelected().subscribe((value: any) => {
      // console.log('Se seleccionó la carta:', value);
      // // agregar una propiedad a la carta que tenga este valor
      this.card_options.map((card) => {
        if (card.value === value) {
          card.selected = true;
        }
      });
    });
  }

  selectCard(index: number) {
    if (!this.card_options[index].selected) {
      // a la carta seleccionada se le asigna una nueva propiedad llamada selected, y se le asigna el valor true, y a las demás cartas se les asigna el valor false
      this.card_options.map((card) => {
        if (!card.selected) {
          card.selected_by_user = false;
        }
      });
      this.card_options[index].selected_by_user = true;
      this.cardSelected = this.card_options[index].value;
      // emitir el valor de la carta seleccionada
      this.webSocketService.emit(
        'cardSelected',
        this.card_options[index].value
      );
    }
    return;
  }
}
