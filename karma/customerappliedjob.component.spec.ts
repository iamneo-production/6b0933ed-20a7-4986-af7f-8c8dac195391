import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerappliedjobComponent } from './customerappliedjob.component';

describe('CustomerappliedjobComponent', () => {
  let component: CustomerappliedjobComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [CustomerappliedjobComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(CustomerappliedjobComponent);
    component = fixture.componentInstance;
  });
  it('FE_customerAppliedJob', () => {
    expect(component).toBeTruthy();
  });
});