export interface soldProducts {
    name: string,
    price: number,
    amount: number
}

export interface Order {
    id: number,
    date: Date,
    customer: string,
    productsAmount: number,
    products: soldProducts[],
    revenue: number,
    status: 'approved'
}