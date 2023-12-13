import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './../../../../src/app/components/organisms/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from './../../../../src/app/components/atoms/logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
