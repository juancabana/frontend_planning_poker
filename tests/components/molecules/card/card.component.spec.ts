import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './../../../../src/app/components/molecules/card/card.component';
import { User } from 'src/app/interfaces/user.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let compiled: HTMLElement;
  let card: HTMLDivElement;
  let cardContent: HTMLDivElement;
  let contentCardRevealed: HTMLSpanElement
  let players: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    players = [
      {
        username: 'juan',
        visualization: 'player',
        room_id: '1233432',
      },
      {
        username: 'daniel',
        visualization: 'spectator',
        room_id: '1233432',
      },
      {
        username: 'Luisa',
        visualization: 'spectator',
        room_id: '1233432',
      },
      {
        username: 'bRandx',
        visualization: 'player',
        room_id: '1233432',
      },
    ];
  });

  test('molecules - card - should create', () => {
    expect(component).toBeTruthy();
  });

  // players who NOT selected a card, but there are still some missing
  test('molecules - card - card atributes (juan, player, not selected, hide)', () => {
    component.player = {...players[0], selected_card: -3};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(cardName.textContent).toBe('juan')
  });

  // players who selected a card, but there are still some missing
  test('molecules - card - card atributes (juan, player, 21, hide)', () => {
    component.player = {...players[0], selected_card: 21};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (juan, player, ☕, hide)', () => {
    component.player = {...players[0], selected_card: -2};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (juan, player, ?, hide)', () => {
    component.player = {...players[0], selected_card: -1};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (bRandx, player, 21, hide)', () => {
    component.player = {...players[3], selected_card: 21};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('bRandx')
  });

  test('molecules - card - card atributes (bRandx, player, 89, hide)', () => {
    component.player = {...players[3], selected_card: 89};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('bRandx')
  });

  test('molecules - card - card atributes (bRandx, player, ?, hide)', () => {
    component.player = {...players[3], selected_card: 0};
    component.visualizate_result = false
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).toContain('card__player-selected')
    expect(cardName.textContent).toBe('bRandx')
  });

  // Reveal cards

  test('molecules - card - card atributes (juan, player, ☕, show)', () => {
    component.player = {...players[0], selected_card: -2};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('☕')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (juan, player, ?, show)', () => {
    component.player = {...players[0], selected_card: -1};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('?')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (juan, player, 5, show)', () => {
    component.player = {...players[0], selected_card: 5};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('5')
    expect(cardName.textContent).toBe('juan')
  });

  test('molecules - card - card atributes (bRandx, player, 0, show)', () => {
    component.player = {...players[3], selected_card: 0};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('0')
    expect(cardName.textContent).toBe('bRandx')
  });

  test('molecules - card - card atributes (bRandx, player, 8, show)', () => {
    component.player = {...players[3], selected_card: 8};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('8')
    expect(cardName.textContent).toBe('bRandx')
  });

  test('molecules - card - card atributes (bRandx, player, 89, show)', () => {
    component.player = {...players[3], selected_card: 89};
    component.visualizate_result = true
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    cardContent = compiled.querySelector('.card__content')!
    contentCardRevealed = compiled.querySelector('.card__selected')!
    const cardName = compiled.querySelector('.card__name')!
    const classNameCard = card.className;
    const classNameCardContent = cardContent.className

    expect(nameViewer).toBe('BR');
    expect(visualization).toBe('player');
    expect(classNameCard).toContain('card--player');
    expect(classNameCard).not.toContain('card--spectator');
    expect(classNameCardContent).not.toContain('card__player-selected')
    expect(contentCardRevealed.textContent).toBe('89')
    expect(cardName.textContent).toBe('bRandx')
  });

  // Viewer type users
  test('molecules - card - card atributes (daniel, spectator)', () => {
    component.player = players[1];
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    const className = card.className;
    const viewerText = compiled.querySelector('.card__is-viever-text')
    const cardName = compiled.querySelector('.card__name')!


    expect(nameViewer).toBe('DA');
    expect(visualization).toBe('spectator');
    expect(className).toContain('card--spectator');
    expect(className).not.toContain('card--player');
    expect(viewerText!.textContent).toBe('DA')
    expect(cardName.textContent).toBe('daniel')
  });

  test('molecules - card - card atributes (Luisa, spectator)', () => {
    component.player = players[2];
    component.ngOnInit();
    fixture.detectChanges();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;
    card = compiled.querySelector('.card')!;
    const className = card.className;
    const viewerText = compiled.querySelector('.card__is-viever-text')
    const cardName = compiled.querySelector('.card__name')!

    expect(nameViewer).toBe('LU');
    expect(visualization).toBe('spectator');
    expect(className).toContain('card--spectator');
    expect(className).not.toContain('card--player');
    expect(viewerText!.textContent).toBe('LU')
    expect(cardName.textContent).toBe('Luisa')
  });


});
