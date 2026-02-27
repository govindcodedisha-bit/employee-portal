import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveEmployeeForm } from './reactive-employee-form';

describe('ReactiveEmployeeForm', () => {
  let component: ReactiveEmployeeForm;
  let fixture: ComponentFixture<ReactiveEmployeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveEmployeeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveEmployeeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
