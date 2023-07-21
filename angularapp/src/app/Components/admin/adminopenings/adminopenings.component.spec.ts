import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminopeningsComponent } from './adminopenings.component';

describe('AdminopeningsComponent', () => {
  let component: AdminopeningsComponent;
  let fixture: ComponentFixture<AdminopeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminopeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminopeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
