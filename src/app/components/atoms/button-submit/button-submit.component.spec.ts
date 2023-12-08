import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitComponent } from './button-submit.component';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSubmitComponent]
    });
    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
