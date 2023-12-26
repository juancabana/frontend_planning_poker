import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserModalComponent } from './user-modal.component';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.component';

import { HttpService } from '../../../services/http-service/http-service.service';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let dialogRef: MatDialogRef<UserModalComponent>;
  let service: HttpService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModalComponent, ButtonSubmitComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
            _containerInstance: {
              _config: {
                data: {
                  room_id: '1234',
                },
              },
            }
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // si también necesitas MAT_DIALOG_DATA
      ],
    });
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // closeModal
  test('closeModal: should close the modal', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  // setUserName
  test('setUserName: should set juan as userName', () => {
    const event = { target: { value: 'juan' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserName(event);
    expect(component.username).toBe('juan');
    expect(spy).toHaveBeenCalled();
  });

  // setUserType
  test('setUserType: should set isPlayer to true', () => {
    const event = { target: { id: 'player' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserType(event);
    expect(component.isPlayer).toBe(true);
    expect(component.isSpectator).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  test('setUserType: should set isSpectator to true', () => {
    const event = { target: { id: 'spectator' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserType(event);
    expect(component.isSpectator).toBe(true);
    expect(component.isPlayer).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  // setButtonActive
  test('setButtonActive: should set isButtonActive to false because username.length is less than 5', () => {
    component.username = 'juan';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  test('setButtonActive: should set isButtonActive to false because username.length is greater than 20', () => {
    component.username = 'juan67891011121314151';
    component.isSpectator = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  test(`setButtonActive: should set isButtonActive to false because username doesn't match with regex`, () => {
    component.username = 'juan678910*111';
    component.isSpectator = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  test(`setButtonActive: should set isButtonActive to false because neither isPlayer nor isSpectator was selected`, () => {
    component.username = 'juan678';
    component.isSpectator = false;
    component.isPlayer = false;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  test(`setButtonActive: should set isButtonActive to false because there is more tha 3 numbers into the username`, () => {
    component.username = 'juan678910111';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  test(`setButtonActive: should set isButtonActive to true because username is valid and is player or is spectator`, () => {
    component.username = 'juan678';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(true);
  });

  // visualization
  test('visualization: should return player', () => {
    component.isPlayer = true;
    expect(component.visualization()).toBe('player');
  });

  test('visualization: should return spectator', () => {
    component.isSpectator = true;
    expect(component.visualization()).toBe('spectator');
  });

  // createUser
  test('createUser: should not make any changes to the component', () => {
    component.isButtonActive = false;
    const spy = jest.spyOn(service, 'createUser');
    component.createUser();
    expect(spy).not.toHaveBeenCalled();
  });

  test('createUser: should create user', () => {
    component.isButtonActive = true;
    const localStorageSpy = jest.spyOn(component, 'setLocalStorage');
    const spy = jest.spyOn(service, 'createUser')
    component.createUser()
    const request = httpMock.expectOne('http://localhost:3000/api/user');
    request.flush({ _id: '1234', username: 'juan678', room_id: '1234', isPlayer: true });
    expect(request.request.method).toBe('POST');
    expect(spy).toHaveBeenCalled();
    expect(localStorageSpy).toHaveBeenCalled();

  });
});
