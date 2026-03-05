export interface Employee {
    employeeId: number | null;       // Unique ID (required)
    employeename: string;            // Required
    dateOfBirth: Date;             // Required (ISO Date string)
    contactNumber: string;
    email: string;                   // Required
    designation?: string;            // Optional
    joiningDate?: Date;            // Optional
    monthlySalary?: number | null;
    skills?: string[];              
    address: {
        addressline1?: string;           // Optional
        addressline2?: string;
        state: string;                   // Required
        city: string;                    // Required
        pinCode?: string;
    },
    employeeImage?: string;   // Optional
    // Optional
}