import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.atom';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // isHome
  it('logo: should create component', () => {
    expect(component).toBeTruthy()
  });
});
