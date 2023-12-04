import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.sass'],
})
export class CardMenuComponent implements OnInit, OnDestroy {
  @Input() public user: any;
  @Output() public cardSelectedEvent = new EventEmitter<any>();
  public card_options: any[] = [];

  private cardSelected: number | null = null;
  private getCardsSubscription: Subscription = new Subscription();
  private listenCardSelectedSubscription: Subscription = new Subscription();

  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly httpService: HttpService
  ) {}

  async ngOnInit() {
    // Listen when another user select card
    this.getCardsSubscription = this.httpService
      .getCards()
      .subscribe((cards) => {
        this.card_options = cards;
        this.listenCardSelected();
      });
  }

  listenCardSelected() {
    this.listenCardSelectedSubscription = this.webSocketService
      .listenCardSelected()
      .subscribe((data: any) => {
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
        i == index
          ? (card.selected_by_user = true)
          : (card.selected_by_user = false);
      });
      // Emit value to card selected
      this.emitCardSelected(index, idUser);
      this.cardSelected = this.card_options[index].value;
      this.cardSelectedEvent.emit({ idUser, cardSelected: this.cardSelected });
    }
    return;
  }

  emitCardSelected(index: any, idUser: any) {
    this.webSocketService.emit('cardSelected', {
      index: index,
      lastSelected: this.cardSelected,
      ID_user: idUser,
    });
  }

  ngOnDestroy() {
    this.getCardsSubscription.unsubscribe();
    this.listenCardSelectedSubscription.unsubscribe();
  }
}
