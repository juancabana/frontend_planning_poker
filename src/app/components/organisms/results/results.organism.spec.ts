import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.organism';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
    });
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ngOnInit
  it('ngOnInit: should call setAverage', () => {
    const spy = jest.spyOn(component, 'setAverage');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  // setAverage
  it('setAverage: should return average and count only positive values', () => {
    component.cardsRevealed = [
      { value: 5, amount: 1 },
      { value: 13, amount: 2 },
      { value: -2, amount: 1 },
      { value: 21, amount: 1 },
      { value: -1, amount: 1 },
    ];
    component.setAverage();
    expect(component.average).toBe(13);
  });

  // isNumber
  it('isNumber: should return TRUE because average is greater than 0', () => {
    component.average = 1;
    expect(component.isNumber()).toBeTruthy();
  });

  it(`isNumber: should return FALSE because average isn't greater than 0`, () => {
    component.average = -1;
    expect(component.isNumber()).toBeFalsy();
  });
});
