import { SaleOrderModel } from "./SaleOrderModel";

export interface SaleOrderPaymentTermsModel {
    OrderNo?: string;
    SNo?: number;
    DueAmount?: number;
    DueDate?: string; // ISO string format for date
    Order?: SaleOrderModel; // Optional as it's a navigation property
}
