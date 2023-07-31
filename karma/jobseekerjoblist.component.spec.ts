import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobseekerjoblistComponent } from './jobseekerjoblist.component';

describe('JobseekerjoblistComponent', () => {
  let component: JobseekerjoblistComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [JobseekerjoblistComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(JobseekerjoblistComponent);
    component = fixture.componentInstance;
  });
  it('FE_jobseekerJobList', () => {
    expect(component).toBeTruthy();
  });
});