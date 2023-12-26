import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
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
    }]

  });



  // ngOnInit
  test('ngOnInit: should return in username juan', () => {
    component.player = {...players[0], selected_card: -3};
    component.visualizate_result = false
    component.ngOnInit();

    const visualization = component.visualization;

    expect(component.player.username).toBe('juan');
    expect(visualization).toBe('player');

  });

  test('ngOnInit: should return in username daniel', () => {
    component.player = {...players[1], selected_card: -3};
    component.visualizate_result = false

    component.ngOnInit();

    expect(component.player.username).toBe('daniel');
    expect(component.visualization).toBe('spectator');

  });
});
