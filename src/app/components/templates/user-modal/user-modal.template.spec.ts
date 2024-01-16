import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserModalComponent } from './user-modal.template';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.atom';

import { HttpService } from '../../../services/http-service/http-service.service';
import { User } from 'src/app/interfaces/user.interface';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let dialogRef: MatDialogRef<UserModalComponent>;
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModalComponent, ButtonSubmitComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {close: jest.fn(), _containerInstance: {_config: { data: { room_id: '1234' }}}}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    service = TestBed.inject(HttpService);
  });

  // createUser
  it(`createUser: shouldn't call createUser service because fields aren't valid`, () => {
    component.formCreateUser.setValue({
      typeUser: '',
      username: '',
    });
    const spy = jest.spyOn(service, 'createUser');
    component.createUser();
    expect(spy).not.toHaveBeenCalled();
  });

  it(`createUser: shouldn't call createUser service because username field isn't valid`, () => {
    component.formCreateUser.setValue({
      typeUser: 'player',
      username: 'juan.',
    });
    const spy = jest.spyOn(service, 'createUser');
    component.createUser();
    expect(spy).not.toHaveBeenCalled();
  });

  it(`createUser: should call createUser service because fields are valid`, () => {
    const newUser = {
      room_id: '1234',
      username: 'juanda',
      visualization: 'player',
    };
    component.formCreateUser.setValue({
      typeUser: newUser.visualization,
      username: newUser.username,
    });
    const mockUser: User = {
      room_id: '1234',
      username: 'juanda',
      visualization: 'player',
    };
    const spy1 = jest.spyOn(service, 'createUser').mockReturnValue(of(mockUser));
    const spy2 = jest.spyOn(dialogRef, 'close');
    const spy3 = jest.spyOn(localStorage, 'setItem');
    component.createUser();
    expect(spy1).toHaveBeenCalledWith(newUser);
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledWith('user', JSON.stringify(newUser));
  });
});
