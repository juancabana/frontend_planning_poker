import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitComponent } from './button-submit.component';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;
  let compiled: HTMLElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  // SetText()

  test('setText: sould return Crear partida', () => {
    component.isHome = true;
    const text = component.setText();
    expect(text).toBe('Crear partida');
  });

  test('setText: Continuar', () => {
    component.isPlayerSubmit = true;
    const text = component.setText();
    expect(text).toBe('Continuar');
  });

  test('setText: Copiar link', () => {
    component.isInvite = true;
    const text = component.setText();
    expect(text).toBe('Copiar link');
  })

  test(`setText: isAdminModal`, () => {
    component.isAdminModal = true;
    const text = component.setText();
    expect(text).toBe('Aceptar');
  });

  // onClick

  test('onClick: should emit submit', () => {
    const spy = jest.spyOn(component.submit, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalled();
  })


});
