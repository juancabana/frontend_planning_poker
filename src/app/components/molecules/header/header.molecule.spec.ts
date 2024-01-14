import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header.molecule';
import { LogoComponent } from '../../atoms/logo/logo.atom';
import { ShortNamePipe } from '../../../pipes/short-name.pipe';
import { InvitePlayersModalComponent } from '../../organisms/invite-players-modal/invite-players-modal.organism';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialog: MatDialog

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent, ShortNamePipe],
      imports: [MatDialogModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.removeItem('user');
    dialog = TestBed.inject(MatDialog);
  });

  // openDialog
  it('openDialog: Should open dialog with options', () => {
    const options = {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'custom-invitation-modal',
      backdropClass: 'blur-backdrop',
    }
    const openSpy = jest.spyOn(dialog, 'open');
    component.openDialog();
    expect(openSpy).toHaveBeenCalledWith(InvitePlayersModalComponent, options)
  });
});
