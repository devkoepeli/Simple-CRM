import { Injectable } from '@angular/core';
import { Order } from '../../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Order[] = [
    {
      id: 25,
      date: new Date("2024-02-16T01:00:00"),
      customer: 'Nicole Zimmermann',
      products: [
        { name: 'Nova Smartwatch', price: 295.95, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 295.95,
      status: 'approved'
    },
    {
      id: 24,
      date: new Date("2024-02-08T01:00:00"),
      customer: 'Michael Lüscher',
      products: [
        { name: 'TecAir Earbuds', price: 85.5, amount: 2 },
        { name: 'Quantum Pad', price: 295.9, amount: 1 },
      ],
      productsAmount: 3,
      revenue: 466.9,
      status: 'approved'
    },
    {
      id: 23,
      date: new Date("2024-02-06T01:00:00"),
      customer: 'Sophie Weber',
      products: [
        { name: 'Charging Station', price: 120, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 120,
      status: 'approved'
    },
    {
      id: 22,
      date: new Date("2024-02-04T01:00:00"),
      customer: 'Lisa Brunner',
      products: [
        { name: 'Vortex E-Reader', price: 130, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 130,
      status: 'approved'
    },
    {
      id: 21,
      date: new Date("2024-02-02T01:00:00"),
      customer: 'Maria Huber',
      products: [
        { name: 'Nebula Webcam', price: 99.90, amount: 1 },
        { name: 'Galactic 27C90 Monitor', price: 324.90, amount: 1 },
      ],
      productsAmount: 2,
      revenue: 424.8,
      status: 'approved'
    },
    {
      id: 20,
      date: new Date("2024-02-01T01:00:00"),
      customer: 'Peter Schneider',
      products: [
        { name: 'Electron Mouse', price: 49.90, amount: 1 },
        { name: 'Photon Keyboard', price: 115, amount: 1 },
      ],
      productsAmount: 2,
      revenue: 164.9,
      status: 'approved'
    },
    {
      id: 19,
      date: new Date("2024-01-29T01:00:00"),
      customer: 'Nicole Zimmermann',
      products: [
        { name: 'Nova Smartwatch', price: 295.95, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 295.95,
      status: 'approved'
    },
    {
      id: 18,
      date: new Date("2024-01-27T01:00:00"),
      customer: 'Lisa Lüscher',
      products: [
        { name: 'Solar Power Bank', price: 49.95, amount: 3 },
      ],
      productsAmount: 3,
      revenue: 149.85,
      status: 'approved'
    },
    {
      id: 17,
      date: new Date("2024-01-24T01:00:00"),
      customer: 'David Rüegg',
      products: [
        { name: 'Vortex E-Reader', price: 130.00, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 130.00,
      status: 'approved'
    },
    {
      id: 16,
      date: new Date("2024-01-24T01:00:00"),
      customer: 'Michael Meier',
      products: [
        { name: 'TecAir Earbuds', price: 85.5, amount: 1 },
        { name: 'Fusion Beats Headphones', price: 170.50, amount: 1 },
        { name: 'Bangsen Speaker', price: 199.90, amount: 1 },
      ],
      productsAmount: 3,
      revenue: 455.9,
      status: 'approved'
    },
    {
      id: 15,
      date: new Date("2024-01-22T01:00:00"),
      customer: 'Simon Müller',
      products: [
        { name: 'Photon Keyboard', price: 115, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 115,
      status: 'approved'
    },
    {
      id: 14,
      date: new Date("2024-01-20T01:00:00"),
      customer: 'Maria Huber',
      products: [
        { name: 'Galactic 27C90 Monitor', price: 324.90, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 324.90,
      status: 'approved'
    },
    {
      id: 13,
      date: new Date("2024-01-17T01:00:00"),
      customer: 'Laura Graf',
      products: [
        { name: 'Solar Power Bank', price: 49.95, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 49.95,
      status: 'approved'
    },
    {
      id: 12,
      date: new Date("2024-01-16T01:00:00"),
      customer: 'Anna Gerber',
      products: [
        { name: 'Nova Smartwatch', price: 295.95, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 295.90,
      status: 'approved'
    },
    {
      id: 11,
      date: new Date("2024-01-14T01:00:00"),
      customer: 'Alexander Brunner',
      products: [
        { name: 'Quantum Pad', price: 295.90, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 295.90,
      status: 'approved'
    },
    {
      id: 10,
      date: new Date("2024-01-11T01:00:00"),
      customer: 'Michael Brunner',
      products: [
        { name: 'Electron Mouse', price: 49.90, amount: 1 },
        { name: 'TecAir Earbuds', price: 85.50, amount: 1 },
      ],
      productsAmount: 2,
      revenue: 135.4,
      status: 'approved'
    },
    {
      id: 9,
      date: new Date("2024-01-10T01:00:00"),
      customer: 'Michael Brunner',
      products: [
        { name: 'Nebula Webcam', price: 99.90, amount: 1 },
        { name: 'Galactic 27C90 Monitor', price: 324.90, amount: 2 },
      ],
      productsAmount: 3,
      revenue: 749.70,
      status: 'approved'
    },
    {
      id: 8,
      date: new Date("2024-01-08T01:00:00"),
      customer: 'Markus Imhof',
      products: [
        { name: 'TecAir EarBuds', price: 85.50, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 85.50,
      status: 'approved'
    },
    {
      id: 7,
      date: new Date("2024-01-05T01:00:00"),
      customer: 'Michael Brunner',
      products: [
        { name: 'Fusion Beats Headphones', price: 170.50, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 170.50,
      status: 'approved'
    },
    {
      id: 6,
      date: new Date("2024-01-04T01:00:00"),
      customer: 'Anna Schneider',
      products: [
        { name: 'Bangsen Speaker', price: 199.90, amount: 2 },
      ],
      productsAmount: 2,
      revenue: 399.80,
      status: 'approved'
    },
    {
      id: 5,
      date: new Date("2024-01-03T01:00:00"),
      customer: 'Laura Graf',
      products: [
        { name: 'Nova Smartwatch', price: 295.95, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 295.95,
      status: 'approved'
    },
    {
      id: 4,
      date: new Date("2024-01-02T01:00:00"),
      customer: 'Lisa Brunner',
      products: [
        { name: 'Photon Keyboard', price: 120.00, amount: 1 },
        { name: 'Vortex E-Reader', price: 130.00, amount: 1 },
      ],
      productsAmount: 2,
      revenue: 250,
      status: 'approved'
    },
    {
      id: 3,
      date: new Date("2023-12-31T01:00:00"),
      customer: 'Sarah Meier',
      products: [
        { name: 'Charging Station', price: 120.00, amount: 1 },
      ],
      productsAmount: 1,
      revenue: 120,
      status: 'approved'
    },
    {
      id: 2,
      date: new Date("2023-12-09T01:00:00"),
      customer: 'Simon Müller',
      products: [
        { name: 'Nova Smartwatch', price: 295.95, amount: 2 },
        { name: 'Bangsen Speaker', price: 199.90, amount: 1 }
      ],
      productsAmount: 3,
      revenue: 791.80,
      status: 'approved'
    },
    {
      id: 1,
      date: new Date("2023-12-03T01:00:00"),
      customer: 'David Hofmann',
      products: [
        { name: 'Solar Power Bank', price: 45.95, amount: 2 }
      ],
      productsAmount: 2,
      revenue: 91.90,
      status: 'approved'
    },
  ];

  constructor() { }
}
