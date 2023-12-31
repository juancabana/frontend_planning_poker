import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdminModalComponent } from './admin-modal.template';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.atom';

describe('AdminModalComponent', () => {
  let component: AdminModalComponent;
  let fixture: ComponentFixture<AdminModalComponent>;
  let dialogRef: MatDialogRef<AdminModalComponent>;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ _id: 'testId' }));
    TestBed.configureTestingModule({
      declarations: [AdminModalComponent, ButtonSubmitComponent],
      providers: [
        { provide: MatDialogRef, useValue: {close: jest.fn()} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    });
    fixture = TestBed.createComponent(AdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
  });

  // submitAdminData
  it('submitAdminData: should call close with idUserSelected when submitAdminData is called and idUserSelected is not empty', () => {
    component.idUserSelected = 'testId';
    const spy = jest.spyOn(dialogRef, 'close');
    component.submitAdminData();
    expect(spy).toHaveBeenCalledWith('testId');
  });

  it('submitAdminData: should not call close when submitAdminData is called and idUserSelected is empty', () => {
    component.idUserSelected = '';
    const spy = jest.spyOn(dialogRef, 'close');
    component.submitAdminData();
    expect(spy).not.toHaveBeenCalled();
  });


  // setUserAdmin
  it('setUserAdmin: should set idUserSelected', () => {
    component.setUserAdmin('testId');
    expect(component.idUserSelected).toBe('testId');
  })

  // ChecButton
  it('checkButton: should set isButtonEnabled to true', () => {
    component.idUserSelected = 'testId';
    component.checkButton();
    expect(component.isButtonEnabled).toBeTruthy();
  })

  it('checkButton: should set isButtonEnabled to false', () => {
    component.idUserSelected = '';
    component.checkButton();
    expect(component.isButtonEnabled).toBeFalsy();
  })

});
