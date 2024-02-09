export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string | Date;
    address: string;
    zip?: number;
    city: string;
    timestamp: Date;
    id?: string;
    imageUrl: string;
}