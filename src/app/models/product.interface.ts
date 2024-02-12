export interface Product {
    name: string,
    status: 'active' | 'draft' | 'archived',
    inventory: number,
    price: number,
    imageUrl: string,
    timeStamp: Date,
    id?: string
}