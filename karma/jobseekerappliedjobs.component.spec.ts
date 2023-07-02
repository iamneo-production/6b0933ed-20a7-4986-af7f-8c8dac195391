import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobseekerappliedjobsComponent } from './jobseekerappliedjob.component';

describe('JobseekerappliedjobsComponent', () => {
  let component: JobseekerappliedjobsComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [JobseekerappliedjobsComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(JobseekerappliedjobsComponent);
    component = fixture.componentInstance;
  });
  it('FE_jobseekerAppliedJob', () => {
    expect(component).toBeTruthy();
  });
});