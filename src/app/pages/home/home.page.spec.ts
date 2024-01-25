import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ngOnInit
  it('ngOnInit: should set showWelcomeMessage to false after 1 second', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    expect(component.showWelcomeMessage).toBe(false);
  }));
});
