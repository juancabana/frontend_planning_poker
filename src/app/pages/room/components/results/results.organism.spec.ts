import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.organism';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ngOnInit
  it('ngOnInit: should call setAverage', () => {
    const spy = jest.spyOn(component, 'setAverage').mockImplementation();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // setAverage
  it('setAverage: should return average (13) and count only positive values', () => {
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

});
