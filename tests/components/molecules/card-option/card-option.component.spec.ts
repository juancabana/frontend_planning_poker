import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionComponent } from './../../../../src/app/components/molecules/card-option/card-option.component';

describe('CardOptionComponent', () => {
  let component: CardOptionComponent;
  let fixture: ComponentFixture<CardOptionComponent>;
  let compiled: HTMLElement
  let card: HTMLDivElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardOptionComponent]
    });
    fixture = TestBed.createComponent(CardOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  // Card selected
  test('molecules - card-option - Is selected (21)', () => {
    component.selected_by_user = true
    component.value = '21'
    fixture.detectChanges()

    card = compiled.querySelector('.menu-cards__card-to-select')!
    const classNameSelected = card.className
    const cardValue = compiled.querySelector('.menu-cards__value')?.textContent
    const classNameCardValue = compiled.querySelector('.menu-cards__value')?.className


    expect(classNameSelected).toContain('menu-cards__card-selected-by-user')
    expect(cardValue).toBe('21')
    expect(classNameCardValue).toContain('menu-cards__value-selected')
  })

  test('molecules - card-option - Is selected (0)', () => {
    component.selected_by_user = true
    component.value = '0'
    fixture.detectChanges()

    card = compiled.querySelector('.menu-cards__card-to-select')!
    const classNameSelected = card.className
    const cardValue = compiled.querySelector('.menu-cards__value')?.textContent
    const classNameCardValue = compiled.querySelector('.menu-cards__value')?.className


    expect(classNameSelected).toContain('menu-cards__card-selected-by-user')
    expect(cardValue).toBe('0')
    expect(classNameCardValue).toContain('menu-cards__value-selected')
  })

  test('molecules - card-option - Is selected (☕)', () => {
    component.selected_by_user = true
    component.value = '☕'
    fixture.detectChanges()

    card = compiled.querySelector('.menu-cards__card-to-select')!
    const classNameSelected = card.className
    const cardValue = compiled.querySelector('.menu-cards__value')?.textContent
    const classNameCardValue = compiled.querySelector('.menu-cards__value')?.className


    expect(classNameSelected).toContain('menu-cards__card-selected-by-user')
    expect(cardValue).toBe('☕')
    expect(classNameCardValue).toContain('menu-cards__value-selected')
  })

  test('molecules - card-option - Is selected (?)', () => {
    component.selected_by_user = true
    component.value = '?'
    fixture.detectChanges()

    card = compiled.querySelector('.menu-cards__card-to-select')!
    const classNameSelected = card.className
    const cardValue = compiled.querySelector('.menu-cards__value')?.textContent
    const classNameCardValue = compiled.querySelector('.menu-cards__value')?.className


    expect(classNameSelected).toContain('menu-cards__card-selected-by-user')
    expect(cardValue).toBe('?')
    expect(classNameCardValue).toContain('menu-cards__value-selected')
  })

  // Card not selected
  test(`molecules - card-option - Isn't selected (3)`, () => {
    component.selected_by_user = false
    component.value = '3'
    fixture.detectChanges()

    card = compiled.querySelector('.menu-cards__card-to-select')!
    const classNameSelected = card.className
    const cardValue = compiled.querySelector('.menu-cards__value')?.textContent
    const classNameCardValue = compiled.querySelector('.menu-cards__value')?.className


    expect(classNameSelected).toContain('menu-cards__card-to-select')
    expect(classNameSelected).not.toContain('menu-cards__card-selected-by-user')
    expect(cardValue).toBe('3')
    expect(classNameCardValue).toContain('menu-cards__value')
    expect(classNameCardValue).not.toContain('menu-cards__value-selected')
  })

});
