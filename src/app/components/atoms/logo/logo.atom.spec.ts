import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.atom';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
      imports: [RouterModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '1' }) } }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // isHome
  it('logo: should create component', () => {
    expect(component).toBeTruthy()
  });
});
