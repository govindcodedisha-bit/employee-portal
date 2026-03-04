import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { join } from 'path';

@Component({
  selector: 'app-reactive-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-employee-form.html',
  styleUrl: './reactive-employee-form.css',
})
export class ReactiveEmployeeForm {
  employeeForm!: FormGroup;
  @Input() employeeData: any = null;   // 👈 incoming employee data for edit
  @Output() saveEmployee = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeename: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      joiningDate: [''],
      monthlySalary: [''],
      address: this.fb.group({
        addressline1: ['', Validators.required],
        addressline2: [''],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      }),

      skills: this.fb.array([]), // Initialize an empty FormArray for skills
    });
  }

  get f() {
    return this.employeeForm.controls;
  }
  get addressControls() {
    return (this.employeeForm.get('address') as FormGroup).controls;
  }

  states = ['Maharashtra', 'Gujarat', 'Karnataka'];
  cities: string[] = [];

  cityMap: { [key: string]: string[] } = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
  };
  // 🔥 Getter for FormArray
  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form Submitted:', this.employeeForm.value);
      this.saveEmployee.emit(this.employeeForm.value);
      this.employeeForm.reset();
    } else {
      this.employeeForm.markAllAsTouched();
      this.checkInvalidControls();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['employeeData'] && this.employeeData) {
      this.employeeForm.patchValue(this.employeeData);
    }
  }
  ngOnInit() {
    this.employeeForm.get('address.state')?.valueChanges.subscribe((state) => {
      this.cities = this.cityMap[state] || [];
      this.employeeForm.get('address.city')?.reset();
    });
  }

  checkInvalidControls() {
    const invalid = [];
    const controls = this.employeeForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        // Log the specific error for that field
        console.log(`Field: ${name}, Errors:`, controls[name].errors);
      }
    }
    return invalid;
  }
}
