import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRoomComponent } from './form-room.organism';
import { ButtonSubmitComponent } from '../../../../components/atoms/button-submit/button-submit.atom';
import { HttpService } from '../../../../services/http-service/http-service.service';
import { Room } from 'src/app/interfaces/room.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;
  let service: HttpService;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormRoomComponent, ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
    router = TestBed.inject(Router)
  });

  // createRoom
  it(`createRoom: should call createRoom because room name is valid`, () => {
    const mockRoom: Room = {_id: '123', tittle: 'Sprint 32', averageScore: -1, owner: '1234', players: []}
    component.room.setValue('Sprint 32')
    const spy1 = jest.spyOn(service, 'createNewRoom').mockReturnValue(of(mockRoom))
    const spy2 = jest.spyOn(localStorage, 'setItem')
    const spy3 = jest.spyOn(router, 'navigateByUrl')
    component.createRoom()
    expect(spy1).toHaveBeenCalledWith('Sprint 32')
    expect(spy2).toHaveBeenCalledWith('room', JSON.stringify(mockRoom))
    expect(spy3).toHaveBeenCalledWith(`room/${mockRoom._id}`)
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
