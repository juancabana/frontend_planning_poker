import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { InvitePlayersModalComponent } from './../../../../src/app/components/templates/invite-players-modal/invite-players-modal.component';
import { ButtonSubmitComponent } from './../../../../src/app/components/atoms/button-submit/button-submit.component';

describe('InvitePlayersModalComponent', () => {
  let component: InvitePlayersModalComponent;
  let fixture: ComponentFixture<InvitePlayersModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitePlayersModalComponent, ButtonSubmitComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(InvitePlayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
