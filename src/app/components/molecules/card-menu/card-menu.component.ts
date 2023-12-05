import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CardSelected } from 'src/app/interfaces/card-selected.interface';
import { Card } from 'src/app/interfaces/card.interface';
import { User } from 'src/app/interfaces/user.interface';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

@Component({
  selector: 'card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.sass'],
})
export class CardMenuComponent implements OnInit, OnDestroy {
  @Input() public user!: User;
  @Output() public cardSelectedEvent = new EventEmitter<CardSelected>();
  public cardOptions: Card[] = [];

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
        this.cardOptions = cards;
        this.listenCardSelected();
      });
  }

  listenCardSelected() {
    this.listenCardSelectedSubscription = this.webSocketService
      .listenCardSelected()
      .subscribe((data: Card[]) => {
        this.cardOptions.map((card, index) => {
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
    // if (!this.cardOptions[index].selected) {
      const idUser = JSON.parse(localStorage.getItem('user')!)._id;
      this.cardOptions.map((card, i) => {
        i == index
          ? (card.selected_by_user = true)
          : (card.selected_by_user = false);
      });
      // Emit value to card selected
      this.emitCardSelected(index, idUser);
      this.cardSelected = this.cardOptions[index].value;
      this.cardSelectedEvent.emit({ idUser, cardSelected: this.cardSelected });
    // }
    return;
  }

  emitCardSelected(index: number, idUser: string) {
    this.webSocketService.emit('cardSelected', {
      index: index,
      lastSelected: this.cardSelected,
      ID_user: idUser,
    });
  }
  // Changes

  ngOnDestroy() {
    this.getCardsSubscription.unsubscribe();
    this.listenCardSelectedSubscription.unsubscribe();
  }
}
