import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { optionsCards } from './options-cards.component';

import { HttpService } from '../../../services/http-service/http-service.service';
import { WebSocketService } from '../../../services/web-socket/web-socket.service';
import { Card } from 'src/app/interfaces/card.interface';

describe('CardMenuComponent', () => {
  let component: optionsCards;
  let fixture: ComponentFixture<optionsCards>;
  let httpMock: HttpTestingController;
  let webSocketService: WebSocketService;

  const mockCards: Card[] = [
    {
      id: 0,
      value: 0,
      viewValue: '0',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 1,
      value: 1,
      viewValue: '1',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 2,
      value: 3,
      viewValue: '3',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 3,
      value: 5,
      viewValue: '5',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 4,
      value: 8,
      viewValue: '8',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 5,
      value: 13,
      viewValue: '13',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 6,
      value: 21,
      viewValue: '21',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 7,
      value: 34,
      viewValue: '34',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 8,
      value: 55,
      viewValue: '55',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 9,
      value: 89,
      viewValue: '89',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 10,
      value: -1,
      viewValue: '?',
      selected: false,
      selected_by_user: false,
    },
    {
      id: 11,
      value: -2,
      viewValue: '☕',
      selected: false,
      selected_by_user: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [optionsCards],
      providers: [
        { provide: WebSocketService, useValue: { emit: jest.fn() } },
        HttpService
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(optionsCards);
    component = fixture.componentInstance;
    webSocketService = TestBed.inject(WebSocketService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    component.cardOptions = mockCards;
  });

  // ngOnInit
  it('ngOnInit: should call getCards', () => {
    localStorage.setItem('user', JSON.stringify({ _id: 1 }));

    const request = httpMock.expectOne(
      'http://localhost:3000/api/card_options'
    );
    request.flush(mockCards);
    expect(request.request.method).toBe('GET');
  });

  // selectCard
  it('selectCard: Should be selected (5)', () => {
    const cardId = 3;
    jest.spyOn(component, 'emitCardSelected').mockImplementation(() => {});
    component.cardSelected = 5;

    component.selectCard(cardId);

    expect(component.selectedCard).toBe(cardId);
    component.cardOptions.map((card) => {
      card.id == 3
        ? expect(card.selected_by_user).toBeTruthy
        : expect(card.selected_by_user).not.toBeTruthy;
    });
    expect(component.cardSelected).toBe(5);
  });

  // emitCardSelected
  it('emitCardSelected: Should emit cardSelected', () => {
    const cardId = 3;
    const idUser = '1';
    const emitSpy = jest.spyOn(webSocketService, 'emit');

    component.emitCardSelected(cardId, idUser);

    expect(emitSpy).toHaveBeenCalled();
  });
});
