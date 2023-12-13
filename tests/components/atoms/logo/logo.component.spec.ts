import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './../../../../src/app/components/atoms/logo/logo.component';

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

  test('atoms - logo - should create', () => {
    expect(component).toBeTruthy();
  });

  test('atoms - logo - is home', () => {
    component.isHome = true
    fixture.detectChanges()

    const className = link.className

    expect(className).toContain('logo--home')
  })

  test(`atoms - logo - isn't home`, () => {
    component.isHome = false
    fixture.detectChanges()

    const clasName = link.className

    expect(clasName).not.toContain('logo--home')
  })
});
