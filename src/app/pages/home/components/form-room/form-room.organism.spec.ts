import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRoomComponent } from './form-room.organism';
import { ButtonSubmitComponent } from '../../../../components/atoms/button-submit/button-submit.atom';
import { HttpService } from '../../../../services/http-service/http-service.service';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormRoomComponent, ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
  });



  // createRoom
  it(`createRoom: should call createRoom because room name is valid`, () => {
    component.room.setValue('Sprint 32')
    const spy = jest.spyOn(service, 'createNewRoom')
    component.createRoom()
    expect(spy).toHaveBeenCalledWith('Sprint 32')
  });

  it(`createRoom: shouldn't call createRoom because room name isn't valid`, () => {
    component.room.setValue('')
    const spy = jest.spyOn(service, 'createNewRoom')
    component.createRoom()
    expect(spy).not.toHaveBeenCalled()
  });

  it(`createRoom: shouldn't call createRoom because room name isn't valid`, () => {
    component.room.setValue('room')
    const spy = jest.spyOn(service, 'createNewRoom')
    component.createRoom()
    expect(spy).not.toHaveBeenCalled()
  });

  it(`createRoom: shouldn't call createRoom because room name isn't valid`, () => {
    component.room.setValue('roomName-')
    const spy = jest.spyOn(service, 'createNewRoom')
    component.createRoom()
    expect(spy).not.toHaveBeenCalled()
  });



});
