import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewappliedjobsComponent } from './customerviewappliedjobs.component';

describe('CustomerviewappliedjobsComponent', () => {
  let component: CustomerviewappliedjobsComponent;
  let fixture: ComponentFixture<CustomerviewappliedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerviewappliedjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerviewappliedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
