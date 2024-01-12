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
    const event = { preventDefault: jest.fn() }
    const spy = jest.spyOn(component.submit, 'emit');
    component.type = 'submit'
    component.onClick(event as unknown as Event)
    expect(spy).toHaveBeenCalled()
  });

  it(`onClick: shouldn't emit submit`, () => {
    const event = { preventDefault: jest.fn() }
    const spy = jest.spyOn(component.submit, 'emit');
    component.type = 'button'
    component.onClick(event as unknown as Event)
    expect(spy).not.toHaveBeenCalled()
  });
});
