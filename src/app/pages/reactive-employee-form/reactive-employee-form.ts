import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { join } from 'path';

@Component({
  selector: 'app-reactive-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-employee-form.html',
  styleUrl: './reactive-employee-form.css',
})
export class ReactiveEmployeeForm {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      employeename: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      designation: ['', Validators.required],
      joiningDate: ['', Validators.required],
      monthlySalary: ['', Validators.required],
      address: this.fb.group({
        addressline1: ['', Validators.required],
        addressline2: [''],
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

  cityMap : {[key: string]: string[]} = {
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
      this.employeeForm.reset();
    } else {
      this.employeeForm.markAllAsTouched();
      this.checkInvalidControls();
    }
  }
  ngOnInit() {
    this.employeeForm.get('state')?.valueChanges.subscribe((state) => {
      this.cities = this.cityMap[state] || [];
      this.employeeForm.get('city')?.reset();
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
