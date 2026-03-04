export interface Employee {
    employeeId: number | null;       // Unique ID (required)
    employeeName: string;            // Required
    dateOfBirth: Date;             // Required (ISO Date string)
    contactNumber: string;
    email: string;                   // Required
    designation?: string;            // Optional
    joiningDate?: Date;            // Optional
    monthlySalary?: number | null;
    address: {
        addressLine1?: string;           // Optional
        addressLine2?: string;
        state: string;                   // Required
        city: string;                    // Required
        pinCode?: string;
    },
    employeeImage?: string;   // Optional
    // Optional
}