import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let compiled: HTMLElement;
  let link: HTMLAnchorElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent]
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
    link = compiled.querySelector('.logo')!
  });

  // isHome
  it('isHome: should display the input value', () => {
    component.isHome = true
    fixture.detectChanges()
    const className = link.className
    expect(className).toContain('logo--home')
  })


});
