import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { optionsCards } from './../../../../src/app/components/organisms/options-cards/options-cards.component';

describe('CardMenuComponent', () => {
  let component: optionsCards;
  let fixture: ComponentFixture<optionsCards>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
