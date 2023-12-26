import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from '../../atoms/logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.removeItem('user')
  });

  test('ngOnInit: should set juan to username', () => {
    localStorage.setItem('user', JSON.stringify( {
      username: 'juan',
      visualization: 'player',
      room_id: '1233432',
    }))
    component.roomName = 'Sprint 32'

    component.ngOnInit()

    expect(component.roomName).toBe('Sprint 32')
    expect(component.username).toBe('juan')
  })

  test('openDialog: Should open dialog', () => {
    const dialog = TestBed.inject(MatDialog);
    const openSpy = jest.spyOn(dialog, 'open');

    component.openDialog();

    expect(openSpy).toHaveBeenCalled();
  });
});
