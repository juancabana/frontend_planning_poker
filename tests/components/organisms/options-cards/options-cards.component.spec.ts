import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { optionsCards } from './../../../../src/app/components/organisms/options-cards/options-cards.component';
import { HttpService } from './../../../../src/app/services/http-service/http-service.service';
import { environment as env } from './../../../../src/environments/environment';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

describe('CardMenuComponent', () => {
  let component: optionsCards;
  let fixture: ComponentFixture<optionsCards>;
  let compiled: HTMLElement
  let service: HttpService;
  let socketService: WebSocketService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [optionsCards]
    });
    fixture = TestBed.createComponent(optionsCards);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController)

    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  // User is not player
  test(`organisms - isn't player`, () => {
    component.visualization = 'spectator'
    fixture.detectChanges()

    const optionsCards = compiled.querySelector('.menu-cards')

    expect(optionsCards).not.toBeTruthy();
  })

  // User is player
  test('organisms - is player', () => {
    component.visualization = 'player'
    fixture.detectChanges()

    const optionsCards = compiled.querySelector('.menu-cards')

    expect(optionsCards).toBeTruthy();
  })

  // Should call the service
  test('organisms - call the service', () => {
    const request = httpMock.expectOne(env.url + '/card_options')
    expect(request.request.method).toBe('GET')

    component.ngOnInit()
  })
});
