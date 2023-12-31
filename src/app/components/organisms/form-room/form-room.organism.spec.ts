import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormRoomComponent } from './form-room.organism';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.atom';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http-service/http-service.service';
import { of } from 'rxjs';
import { Room } from 'src/app/interfaces/room.interface';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;
  let formRoom: FormGroup
  let service: HttpService
  let router: Router;
  let ngZone: NgZone;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormRoomComponent, ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formRoom = component.formRoom
    service = TestBed.inject(HttpService);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);

  });

  // ngOnInit
  it('ngOnInit: should subscribe to value changes', () => {
    const spySubscribe = jest.spyOn(component, 'subscribeValueChanges');
    component.ngOnInit();
    expect(spySubscribe).toHaveBeenCalled();
  })

  it('ngOnInit: should call get to subscribe', () => {
   const spyGet = jest.spyOn(formRoom, 'get');
   component.subscribeValueChanges();
   expect(spyGet).toHaveBeenCalledWith('room_name');
  })

  // createForm
  it('createForm: should create form', () => {
    component.createForm();
    expect(formRoom).toBeTruthy();
  })

  // setButtonActive
  it('setButtonActive: should set isButtonActive to false', () => {
    formRoom.get('room_name')?.setValue('test');
    component.setButtonActive();
    expect(component.isButtonActive).toBe(false);
  })

  it('setButtonActive: should set isButtonActive to true', () => {
    formRoom.get('room_name')?.setValue('testing');
    component.setButtonActive();
    expect(component.isButtonActive).toBe(true);
  })

  // createRoom
  it(`createRoom: should call createRoom`, () => {
    const mockRoom: Room ={
      tittle: 'test',
      _id: '123',
      owner: '123',
      averageScore: -1,
      players: []
    }
    component.isButtonActive = true
    const spy1 = jest.spyOn(component, 'setInLocalStorage');
    const spy2 = jest.spyOn(service, 'createNewRoom').mockReturnValue(of(mockRoom))
    const spy3 = jest.spyOn(component, 'navigate').mockImplementation()
    component.createRoom();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalled()
  })

  it(`createRoom: shouldn't call createRoom`, () => {
    component.isButtonActive = false
    const spy = jest.spyOn(service, 'createNewRoom');
    component.createRoom();
    expect(spy).not.toHaveBeenCalled();
  })

  // navigate
  it('navigate: should navigate to the provided url', () => {
    const url = 'room/123';
    const spy1 = jest.spyOn(ngZone, 'run')
    const spy2 = jest.spyOn(router, 'navigateByUrl')
    component.navigate(url);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

});
