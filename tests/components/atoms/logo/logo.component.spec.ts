import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './../../../../src/app/components/atoms/logo/logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent]
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('atoms - logo - should create', () => {
    expect(component).toBeTruthy();
  });
});
