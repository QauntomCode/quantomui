import { SaleModel } from "../SaleModel";

export interface SalePOSPropertiesModel {
    BillNo?: string;
    TotalReceivedFromCustomer?: number;
    PreBalanceBeforeTrans?: number;
    Sale?: SaleModel; // Foreign key reference to SaleModel
}
