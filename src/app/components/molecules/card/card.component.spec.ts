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
  test('ngOnInit: should return in nameViewer JU', () => {
    component.player = {...players[0], selected_card: -3};
    component.visualizate_result = false
    component.ngOnInit();

    const nameViewer = component.nameViewer;
    const visualization = component.visualization;

    expect(nameViewer).toBe('JU');
    expect(visualization).toBe('player');

  });

  test('ngOnInit: should return in nameViewer DA', () => {
    component.player = {...players[1], selected_card: -3};
    component.visualizate_result = false

    component.ngOnInit();

    expect(component.nameViewer).toBe('DA');
    expect(component.visualization).toBe('spectator');

  });
});
