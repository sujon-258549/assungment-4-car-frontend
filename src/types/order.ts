import { TUser } from "./user";

interface ITransaction {
  id: string;
  transactionStatus: string;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface IOrder {
  _id: string;
  customerId: TUser;
  shopId: string;
  productId: string;
  color: string;
  totalPrice: number;
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  deliveryStatus: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
  transaction: ITransaction;
}

// Alternatively, you could use 'type' instead of 'interface':
type Transaction = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};

export type Order = {
  _id: string;
  customerId: string;
  shopId: string;
  productId: string;
  color: string;
  totalPrice: number;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  deliveryStatus: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
  transaction: Transaction;
};
