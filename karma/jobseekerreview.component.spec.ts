import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobseekerreviewComponent } from './jobseekerreview.component';

describe('JobseekerreviewComponent', () => {
  let component: JobseekerreviewComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [JobseekerreviewComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(JobseekerreviewComponent);
    component = fixture.componentInstance;
  });
  it('FE_jobseekerReview', () => {
    expect(component).toBeTruthy();
  });
});