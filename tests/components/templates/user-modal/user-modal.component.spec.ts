import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserModalComponent } from './../../../../src/app/components/templates/user-modal/user-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from './../../../../src/app/components/atoms/button-submit/button-submit.component';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModalComponent, ButtonSubmitComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // si también necesitas MAT_DIALOG_DATA
      ]
    });
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
