import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { hidden } from '@angular/forms/signals';

@Component({
  selector: 'app-reactive-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-employee-form.html',
  styleUrl: './reactive-employee-form.css',
})
export class ReactiveEmployeeForm implements OnInit, OnChanges {
  employeeForm!: FormGroup;
  @Input() employeeData: any = null;   // 👈 incoming employee data for edit
  @Output() saveEmployee = new EventEmitter<any>();
  states: string[] = [];
  cities: string[] = [];

  constructor(private fb: FormBuilder, private locationService: LocationService) {
    this.employeeForm = this.fb.group({
      id:[''],
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

    this.employeeForm.get('address.state')?.valueChanges.subscribe((state) => {
      this.cities = this.locationService.getCities(state);
      this.employeeForm.get('address.city')?.reset();
    });
  }

  get f() {
    return this.employeeForm.controls;
  }
  get addressControls() {
    return (this.employeeForm.get('address') as FormGroup).controls;
  }

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
    if (changes['employeeData'] && this.employeeData) {
      const formattedData = {
        ...this.employeeData,
        dateOfBirth: this.formatDate(this.employeeData.dateOfBirth), // Format for input[type="date"]
        joiningDate: this.formatDate(this.employeeData.joiningDate)
      };

      this.employeeForm.patchValue(formattedData);
      this.setSkills(this.employeeData.skills); // Set skills in FormArray

    }
  }

  formatDate(date: any) {
    if (!date) return '';
    return new Date(date).toISOString().substring(0, 10);
  }

  ngOnInit() {
    this.states = this.locationService.getStates();
    this.employeeForm.get('address.state')?.valueChanges.subscribe((state) => {
      this.cities = this.locationService.getCities(state);
      this.employeeForm.get('address.city')?.reset();
    });
  }
  private clearSkills() {
    while (this.skills.length) {
      this.skills.removeAt(0);
    }
  }

  private setSkills(skills: string[] = []) {
    this.clearSkills();
    skills.forEach(skill =>
      this.skills.push(this.fb.control(skill, Validators.required)));

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
