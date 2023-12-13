import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './../../../src/app/pages/not-found/not-found.component';
import { LogoComponent } from './../../../src/app/components/atoms/logo/logo.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent, LogoComponent]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
