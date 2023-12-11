import { ComponentFixture, TestBed } from '@angular/core/testing';

import { optionsCards } from './options-cards.component';

describe('CardMenuComponent', () => {
  let component: optionsCards;
  let fixture: ComponentFixture<optionsCards>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [optionsCards]
    });
    fixture = TestBed.createComponent(optionsCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
