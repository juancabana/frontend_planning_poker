import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.page';
import { LogoComponent } from '../../components/atoms/logo/logo.atom';
import { FormRoomComponent } from '../../components/organisms/form-room/form-room.organism';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from '../../components/atoms/button-submit/button-submit.atom';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  })
});
