export interface Address {
    addressline1?: string;           // Optional
    addressline2?: string;
    state: string;                   // Required
    city: string;                    // Required
    pinCode?: string;
}