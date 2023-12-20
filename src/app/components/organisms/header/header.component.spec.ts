import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from '../../atoms/logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.removeItem('user')
    compiled = fixture.nativeElement
  });

  test('ngOnInit: should set JU to nameViewer', () => {
    localStorage.setItem('user', JSON.stringify( {
      username: 'juan',
      visualization: 'player',
      room_id: '1233432',
    }))
    component.roomName = 'Sprint 32'

    component.ngOnInit()

    expect(component.roomName).toBe('Sprint 32')
    expect(component.nameViever).toBe('JU')
  })

  test('openDialog: Should open dialog', () => {
    const dialog = TestBed.inject(MatDialog);
    const openSpy = jest.spyOn(dialog, 'open');

    component.openDialog();

    expect(openSpy).toHaveBeenCalled();
  });
});
