import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OptionsCards } from './options-cards.organism';

import { HttpService } from '../../../../services/http-service/http-service.service';
import { WebSocketService } from '../../../../services/web-socket/web-socket.service';
import { Card } from 'src/app/interfaces/card.interface';
import { of } from 'rxjs';

describe('CardMenuComponent', () => {
  let component: OptionsCards;
  let fixture: ComponentFixture<OptionsCards>;
  let webSocketService: WebSocketService;
  let service: HttpService;
  let mockCards: Card[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsCards],
      providers: [
        HttpService,
        { provide: WebSocketService, useValue: { emit: jest.fn() }}
      ],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.cardOptions = mockCards;
    service = TestBed.inject(HttpService);
    webSocketService = TestBed.inject(WebSocketService);
    mockCards = [
      { id: 0, value: 0, viewValue: '0' },
      { id: 1, value: 1, viewValue: '1' },
      { id: 2, value: 3, viewValue: '3' },
      { id: 3, value: 5, viewValue: '5' },
      { id: 4, value: 8, viewValue: '8' },
      { id: 5, value: 13, viewValue: '13' },
      { id: 6, value: 21, viewValue: '21' },
      { id: 7, value: 34, viewValue: '34' },
      { id: 8, value: 55, viewValue: '55' },
      { id: 9, value: 89, viewValue: '89' },
      { id: 10, value: -1, viewValue: '?' },
      { id: 11, value: -2, viewValue: '☕' },
    ];
  });

  // ngOnInit
  it('ngOnInit: should call getCards', () => {
    const request = jest.spyOn(service, 'getCards').mockReturnValue(of(mockCards));
    component.ngOnInit();
    expect(request).toHaveBeenCalledTimes(1);
    expect(component.cardOptions).toEqual(mockCards);
  });

  // selectCard
  it('selectCard: Should set cardSelected to mockCard', () => {
    const mockCard: Card = { id: 0, value: 0, viewValue: '0' };
    const spy1 = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify({ _id: '1234' }));
    const spy2 = jest.spyOn(component.cardSelectedEvent, 'emit');
    const spy3 = jest.spyOn(component, 'emitCardSelected');
    component.selectCard(mockCard);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.cardSelected).toEqual(mockCard);
    expect(spy2).toHaveBeenCalledWith({
      idUser: '1234',
      cardSelected: mockCard,
    });
    expect(spy3).toHaveBeenCalledWith(0, '1234');
  });

  // emitCardSelected
  it('emitCardSelected: Should emit cardSelected', () => {
    const mockCard: Card = { id: 0, value: 0, viewValue: '0' };
    component.cardSelected = mockCard;
    const spy = jest.spyOn(webSocketService, 'emit');
    component.emitCardSelected(0, '1234');
    expect(spy).toHaveBeenCalledWith('cardSelected', {
      index: 0,
      lastSelected: 0,
      ID_user: '1234',
    });
  });
});
