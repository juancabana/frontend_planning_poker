import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './../../../../src/app/components/organisms/header/header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from './../../../../src/app/components/atoms/logo/logo.component';

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

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('organisms - header - Header tittle and viewer name (Juan)', () => {
    localStorage.setItem('user', JSON.stringify( {
      username: 'juan',
      visualization: 'player',
      room_id: '1233432',
    }))
    component.ngOnInit()
    component.roomName = 'Sprint 32'
    fixture.detectChanges()

    const headerTittle = compiled.querySelector('.header__tittle')!.textContent
    const headerNameViewerUser = compiled.querySelector('.header__options-name')!.textContent

    console.log(component.nameViever)
    expect(headerTittle).toBe('Sprint 32')
    expect(headerNameViewerUser).toBe('JU')

  })

  test('organisms - header - Header tittle and viewer name (Luisa)', () => {
    localStorage.setItem('user', JSON.stringify( {
      username: 'Luisa',
      visualization: 'spectator',
      room_id: '1233432',
    }))
    component.ngOnInit()
    component.roomName = 'Sprint 12'
    fixture.detectChanges()

    const headerTittle = compiled.querySelector('.header__tittle')!.textContent
    const headerNameViewerUser = compiled.querySelector('.header__options-name')!.textContent

    console.log(component.nameViever)
    expect(headerTittle).toBe('Sprint 12')
    expect(headerNameViewerUser).toBe('LU')

  })

  test('organisms - header - Should call openDialog when header__button-copy is clicked', () => {
    const openDialogSpy = jest.spyOn(component, 'openDialog');

    const nameElement = fixture.nativeElement.querySelector('.header__button-copy');
    nameElement.click();

    expect(openDialogSpy).toHaveBeenCalled();
  });

  test('organisms - header - Should open modal when openDialog is called', () => {
    const dialog = TestBed.inject(MatDialog);
    const openSpy = jest.spyOn(dialog, 'open');

    component.openDialog();

    expect(openSpy).toHaveBeenCalled();
  });
});
