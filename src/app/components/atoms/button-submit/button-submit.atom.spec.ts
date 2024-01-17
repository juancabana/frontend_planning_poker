import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSubmitComponent } from './button-submit.atom';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // onClick
  it('onClick: should emit submit', () => {
    const event = { preventDefault: jest.fn() }
    const spy = jest.spyOn(component.submitEvent, 'emit').mockImplementation();
    component.type = 'submit'
    component.onClick(event as unknown as Event)
    expect(spy).toHaveBeenCalledTimes(1)
  });

  it(`onClick: shouldn't emit submit`, () => {
    const event = { preventDefault: jest.fn() }
    const spy = jest.spyOn(component.submitEvent, 'emit').mockImplementation();
    component.type = 'button'
    component.onClick(event as unknown as Event)
    expect(spy).not.toHaveBeenCalled()
  });

});
