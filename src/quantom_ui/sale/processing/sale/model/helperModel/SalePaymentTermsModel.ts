import { SaleModel } from "../SaleModel";

export interface SalePaymentTermsModel {
    BillNo?: string;
    SNo?: number;
    DueAmount?: number;
    DueDate?: string; // `DateTime` in C# is represented as `string` in TypeScript.
    Sale?: SaleModel; // Foreign key reference in C#.
}


