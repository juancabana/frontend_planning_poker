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

  // ngOnInit
  it('ngOnInit: should call setText method', () => {
    const spy = jest.spyOn(component, 'setText');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
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
    component.setText();
    expect(component.content).toBe('Crear partida');
  });

  it('setText: sould return Continuar', () => {
    component.isPlayerSubmit = true;
    component.setText();
    expect(component.content).toBe('Continuar');
  });

  it('setText: sould return Copiar link', () => {
    component.isInvite = true;
    component.setText();
    expect(component.content).toBe('Copiar link');
  });

  it(`setText: sould return Aceptar`, () => {
    component.isAdminModal = true;
    component.setText();
    expect(component.content).toBe('Aceptar');
  });
});
