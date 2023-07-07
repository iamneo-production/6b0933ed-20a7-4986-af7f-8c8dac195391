import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomeraddjobComponent } from './customeraddjob.component';

describe('CustomeraddjobComponent', () => {
  let component: CustomeraddjobComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [CustomeraddjobComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(CustomeraddjobComponent);
    component = fixture.componentInstance;
  });
  it('FE_customerAddJob', () => {
    expect(component).toBeTruthy();
  });
});