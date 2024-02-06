export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    address: string;
    zip?: number;
    city: string;
    timestamp: Date;
}