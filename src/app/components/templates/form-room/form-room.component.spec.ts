import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoomComponent } from './form-room.component';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRoomComponent]
    });
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
