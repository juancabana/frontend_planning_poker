import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalComponent } from './admin-modal.component';

describe('AdminModalComponent', () => {
  let component: AdminModalComponent;
  let fixture: ComponentFixture<AdminModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminModalComponent]
    });
    fixture = TestBed.createComponent(AdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
