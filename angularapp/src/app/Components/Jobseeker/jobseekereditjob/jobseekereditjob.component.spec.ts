import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekereditjobComponent } from './jobseekereditjob.component';

describe('JobseekereditjobComponent', () => {
  let component: JobseekereditjobComponent;
  let fixture: ComponentFixture<JobseekereditjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekereditjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekereditjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
