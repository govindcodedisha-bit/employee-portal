import { Address } from "../models/Address.model";
export interface Employee {
    id?: string;                    // Optional for new entries, required for updates
    employeeId: number | null;       // Unique ID (required)
    employeename: string;            // Required
    dateOfBirth: Date;             // Required (ISO Date string)
    contactNumber: string;
    email: string;                   
    designation?: string;            // Optional
    joiningDate?: Date;            
    monthlySalary?: number | null;
    skills?: string[];
    address: Address;
    employeeImage?: string;  
}