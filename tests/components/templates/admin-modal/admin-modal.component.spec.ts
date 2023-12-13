import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { AdminModalComponent } from './../../../../src/app/components/templates/admin-modal/admin-modal.component';
import { ButtonSubmitComponent } from './../../../../src/app/components/atoms/button-submit/button-submit.component';

describe('AdminModalComponent', () => {
  let component: AdminModalComponent;
  let fixture: ComponentFixture<AdminModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminModalComponent, ButtonSubmitComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    });
    fixture = TestBed.createComponent(AdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  localStorage.setItem('user', JSON.stringify({ _id: 'testId' }));

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
