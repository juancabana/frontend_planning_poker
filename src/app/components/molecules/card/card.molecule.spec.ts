import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.molecule';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('card: should create component', () => {
    expect(component).toBeTruthy()
  });



});
