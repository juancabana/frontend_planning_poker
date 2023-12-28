import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormRoomComponent } from './form-room.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ButtonSubmitComponent } from '../../atoms/button-submit/button-submit.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http-service/http-service.service';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;
  let formRoom: FormGroup
  let httpMock: HttpTestingController
  let service: HttpService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [FormRoomComponent, ButtonSubmitComponent],
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formRoom = component.formRoom
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);

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
    const mockRoom ={
      room_name: 'test',
      room_id: '1',
      user_id: '1'
    }
    component.isButtonActive = true
    component.createRoom();
    const spy = jest.spyOn(component, 'setInLocalStorage');
    const request = httpMock.expectOne('http://localhost:3000/api/room');
    request.flush(mockRoom);
    expect(request.request.method).toBe('POST');
    expect(spy).toHaveBeenCalled();
  })

  it(`createRoom: shouldn't call createRoom`, () => {
    component.isButtonActive = false
    const spy = jest.spyOn(service, 'createNewRoom');
    component.createRoom();
    expect(spy).not.toHaveBeenCalled();
  })

});
