import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

import { InvitePlayersModalComponent } from './invite-players-modal.organism';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.atom';

describe('InvitePlayersModalComponent', () => {
  let component: InvitePlayersModalComponent;
  let fixture: ComponentFixture<InvitePlayersModalComponent>;
  let dialogRef: MatDialogRef<InvitePlayersModalComponent>;
  let clipboard: Clipboard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitePlayersModalComponent, ButtonSubmitComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Clipboard, useValue: { copy: jest.fn() } },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePlayersModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    clipboard = TestBed.inject(Clipboard) as jest.Mocked<Clipboard>;
  });

  // copyLink
  it('copyLink: should copy link and close modal', () => {
    component.actualUrl = 'http://localhost:4200';
    const copySpy = jest.spyOn(clipboard, 'copy');
    const closeModalSpy = jest.spyOn(component, 'closeModal');
    component.copyLink();
    expect(copySpy).toHaveBeenCalledWith('http://localhost:4200');
    expect(closeModalSpy).toHaveBeenCalled();
  });

  // closeModal
  it('closeModal: should close modal', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });
});
