import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './../../../src/app/pages/home/home.component';
import { LogoComponent } from './../../../src/app/components/atoms/logo/logo.component';
import { FormRoomComponent } from './../../../src/app/components/templates/form-room/form-room.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from './../../../src/app/components/atoms/button-submit/button-submit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LogoComponent, FormRoomComponent, ButtonSubmitComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  })
});
