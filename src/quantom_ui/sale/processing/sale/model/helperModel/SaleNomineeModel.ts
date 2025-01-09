import { SaleModel } from "../SaleModel";

export interface SalesNomineeModel {
    Billno?: string;
    SNo?: number;
    Name?: string;
    FatherName?: string;
    CNIC?: string;
    CellNo?: string;
    Address?: string;
    Sale?: SaleModel; // Foreign key reference in C#.
}
