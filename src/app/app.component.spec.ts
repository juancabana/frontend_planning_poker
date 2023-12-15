import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/molecules/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, BrowserAnimationsModule],
    declarations: [AppComponent, WelcomeComponent]
  })
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
});

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'Planning Poker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Planning Poker');
  });

  test('should close welcome message after 1 second', fakeAsync(() => {
    component.ngOnInit();
    expect(component.showWelcomeMessage).toBe(true);

    tick(1000);
    expect(component.showWelcomeMessage).toBe(false);
  }));

});
