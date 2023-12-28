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


  // Inputs
  it('@Inputs: should be the same as what is sent by props (true)', () => {
    component.selected_by_user = true;
    expect(component.selected_by_user).toBe(true);
  });

  it('@Inputs: should be the same as what is sent by props (false)', () => {
    component.selected_by_user = false;
    expect(component.selected_by_user).toBe(false);
  });

  it('@Inputs: should be the same as what is sent by props (13)', () => {
    const testValue = '13';
    component.value = testValue;
    expect(component.value).toBe(testValue);
  });

});
