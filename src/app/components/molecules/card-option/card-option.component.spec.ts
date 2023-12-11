import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionComponent } from './card-option.component';

describe('CardOptionComponent', () => {
  let component: CardOptionComponent;
  let fixture: ComponentFixture<CardOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardOptionComponent]
    });
    fixture = TestBed.createComponent(CardOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
