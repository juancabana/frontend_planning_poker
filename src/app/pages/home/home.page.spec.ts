import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.page';
import { LogoComponent } from '../../components/atoms/logo/logo.atom';
import { FormRoomComponent } from './components/form-room/form-room.organism';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LogoComponent, FormRoomComponent],
      imports: [BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ngOnInit
  it('ngOnInit: should call closeWellcomeMessage function', fakeAsync(() => {
    const spy = jest
      .spyOn(component, 'closeWelcomeMessage')
      .mockImplementation();
    component.ngOnInit();
    tick(1000);
    expect(spy).toHaveBeenCalled();
  }));

  // closeWelcomeMessage
  it('closeWelcomeMessage: should set showWelcomeMessage property to false', () => {
    component.closeWelcomeMessage();
    expect(component.showWelcomeMessage).toBe(false);
  });
});
