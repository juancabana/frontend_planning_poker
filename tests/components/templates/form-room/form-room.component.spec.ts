import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormRoomComponent } from './../../../../src/app/components/templates/form-room/form-room.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from './../../../../src/app/components/atoms/button-submit/button-submit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRoomComponent, ButtonSubmitComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // si también necesitas MAT_DIALOG_DATA
      ]
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
