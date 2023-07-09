import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddjobComponent } from './customeraddjob.component';

describe('CustomeraddjobComponent', () => {
  let component: CustomeraddjobComponent;
  let fixture: ComponentFixture<CustomeraddjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeraddjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
