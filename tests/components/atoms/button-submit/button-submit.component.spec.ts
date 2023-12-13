import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitComponent } from './../../../../src/app/components/atoms/button-submit/button-submit.component';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;
  let compiled: HTMLElement
  let button: HTMLButtonElement | null;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitComponent]
    });
    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
    button = compiled.querySelector('.button-submit')
  });

  test('atoms - button-submit - should create', () => {
    expect(component).toBeTruthy();
  });

  test('atoms - button-subit - is active', () => {
    component.isActive = true
    fixture.detectChanges()

    const className = button?.className

    expect(className).toContain('button-submit--active')
  })

  test(`atoms - button-subit - isn't active`, () => {
    component.isActive = false
    fixture.detectChanges()

    const className = button?.className

    expect(className).not.toContain('button-submit--active')
  })

  test('atoms - button-submit - isHome', () => {
    component.isHome = true
    fixture.detectChanges();

    const text = button?.textContent

    expect(component.setText()).toBe('Crear partida')
    expect(text).toBe('Crear partida')

  })

  test('atoms - button-submit - isPlayerSubmit', () => {
    component.isPlayerSubmit = true
    fixture.detectChanges();

    const text = button?.textContent

    expect(component.setText()).toBe('Continuar')
    expect(text).toBe('Continuar')

  })

  test('atoms - button-submit - isInvite', () => {
    component.isInvite = true
    fixture.detectChanges();

    const text = button?.textContent

    expect(component.setText()).toBe('Copiar link')
    expect(text).toBe('Copiar link')

  })

  test('atoms - button-submit - isAdminModal', () => {
    component.isAdminModal = true
    fixture.detectChanges();

    const text = button?.textContent

    expect(component.setText()).toBe('Aceptar')
    expect(text).toBe('Aceptar')

  })
});
