import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomereditjobComponent } from './customereditjob.component';

describe('CustomereditjobComponent', () => {
  let component: CustomereditjobComponent;
  let fixture: ComponentFixture<CustomereditjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomereditjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomereditjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
