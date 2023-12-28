import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, BrowserAnimationsModule],
    declarations: [AppComponent]
  })
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Planning Poker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Planning Poker');
  });

  it('should close welcome message after 1 second', fakeAsync(() => {
    component.ngOnInit();
    expect(component.showWelcomeMessage).toBe(true);

    tick(1000);
    expect(component.showWelcomeMessage).toBe(false);
  }));

  // Welcome
  it('@Input: should be equal to prop', () => {
    component.showWelcomeMessage = true;
    expect(component.showWelcomeMessage).toBe(true);

    component.showWelcomeMessage = false;
    expect(component.showWelcomeMessage).toBe(false);
  });

});
