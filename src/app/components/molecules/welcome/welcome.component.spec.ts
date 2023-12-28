import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('@Input: should be equal to prop', () => {
    component.showWelcomeMessage = true;
    expect(component.showWelcomeMessage).toBe(true);

    component.showWelcomeMessage = false;
    expect(component.showWelcomeMessage).toBe(false);
  });
});
