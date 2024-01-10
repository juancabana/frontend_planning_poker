import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.molecule';
import { User } from 'src/app/interfaces/user.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let players: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    ];
  });

  // ngOnInit
  it('ngOnInit: should return in username juan', () => {
    component.player = { ...players[0] };
    component.visualizate_result = false;
    component.ngOnInit();
    expect(component.card).toBe(-3);
    expect(component.isCardOption).toBe(false);
    expect(component.selected_by_user).toBe(false);
    expect(component.value).toBe('');
    expect(component.player.username).toBe('juan');
    expect(component.isSpectator).toBe(false);
  });

  it('ngOnInit: should return in username daniel', () => {
    component.player = { ...players[1], selected_card: -3 };
    component.visualizate_result = false;
    component.ngOnInit();
    expect(component.card).toBe(-3);
    expect(component.isCardOption).toBe(false);
    expect(component.selected_by_user).toBe(false);
    expect(component.value).toBe('');
    expect(component.player.username).toBe('daniel');
    expect(component.isSpectator).toBe(true);
  });
});
