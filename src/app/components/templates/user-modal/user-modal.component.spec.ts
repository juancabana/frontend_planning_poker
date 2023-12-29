import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserModalComponent } from './user-modal.component';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.component';

import { HttpService } from '../../../services/http-service/http-service.service';
import { User } from 'src/app/interfaces/user.interface';
import { of } from 'rxjs';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let dialogRef: MatDialogRef<UserModalComponent>;
  let service: HttpService;


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
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    service = TestBed.inject(HttpService);
  });

  // closeModal
  it('closeModal: should close the modal', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  // setUserName
  it('setUserName: should set juan as userName', () => {
    const event = { target: { value: 'juan' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserName(event);
    expect(component.username).toBe('juan');
    expect(spy).toHaveBeenCalled();
  });

  // setUserType
  it('setUserType: should set isPlayer to true', () => {
    const event = { target: { id: 'player' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserType(event);
    expect(component.isPlayer).toBe(true);
    expect(component.isSpectator).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('setUserType: should set isSpectator to true', () => {
    const event = { target: { id: 'spectator' } } as unknown as Event;
    const spy = jest.spyOn(component, 'setButtonActive');
    component.setUserType(event);
    expect(component.isSpectator).toBe(true);
    expect(component.isPlayer).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  // setButtonActive
  it('setButtonActive: should set isButtonActive to false because username.length is less than 5', () => {
    component.username = 'juan';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  it('setButtonActive: should set isButtonActive to false because username.length is greater than 20', () => {
    component.username = 'juan67891011121314151';
    component.isSpectator = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  it(`setButtonActive: should set isButtonActive to false because username doesn't match with regex`, () => {
    component.username = 'juan678910*111';
    component.isSpectator = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  it(`setButtonActive: should set isButtonActive to false because neither isPlayer nor isSpectator was selected`, () => {
    component.username = 'juan678';
    component.isSpectator = false;
    component.isPlayer = false;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  it(`setButtonActive: should set isButtonActive to false because there is more tha 3 numbers into the username`, () => {
    component.username = 'juan678910111';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  });

  it(`setButtonActive: should set isButtonActive to true because username is valid and is player or is spectator`, () => {
    component.username = 'juan678';
    component.isPlayer = true;
    component.setButtonActive();
    expect(component.isButtonActive).toBe(true);
  });

  // visualization
  it('visualization: should return player', () => {
    component.isPlayer = true;
    expect(component.visualization()).toBe('player');
  });

  it('visualization: should return spectator', () => {
    component.isSpectator = true;
    expect(component.visualization()).toBe('spectator');
  });

  // createUser
  it('createUser: should not make any changes to the component', () => {
    component.isButtonActive = false;
    const spy = jest.spyOn(service, 'createUser');
    component.createUser();
    expect(spy).not.toHaveBeenCalled();
  });

  it('createUser: should create user', () => {
    const mockUser: User = { _id: '1234', username: 'juan678', room_id: '1234', visualization: 'player' }
    component.isButtonActive = true;
    const localStorageSpy = jest.spyOn(component, 'setLocalStorage');
    const spy1 = jest.spyOn(service, 'createUser')
    const spy2 = jest.spyOn(service, 'createUser').mockReturnValue(of(mockUser))
    component.createUser()
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(localStorageSpy).toHaveBeenCalled();

  });
});
