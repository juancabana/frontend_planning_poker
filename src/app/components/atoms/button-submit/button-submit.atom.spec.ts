import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitComponent } from './button-submit.atom';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // onClick
  it('onClick: should emit submit', () => {
    const spy = jest.spyOn(component.submit, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });

  // SetText()
  it('setText: sould return Crear partida', () => {
    component.isHome = true;
    const text = component.setText();
    expect(text).toBe('Crear partida');
  });

  it('setText: Continuar', () => {
    component.isPlayerSubmit = true;
    const text = component.setText();
    expect(text).toBe('Continuar');
  });

  it('setText: Copiar link', () => {
    component.isInvite = true;
    const text = component.setText();
    expect(text).toBe('Copiar link');
  });

  it(`setText: isAdminModal`, () => {
    component.isAdminModal = true;
    const text = component.setText();
    expect(text).toBe('Aceptar');
  });
});
