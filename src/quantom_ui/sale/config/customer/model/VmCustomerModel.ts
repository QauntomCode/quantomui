import { TaxBPTaxDetailModel } from "../../../../tax/CommonModels/TaxBPTaxDetailModel";
import { CustomerLocationModel } from "./CustomerLocationModel";
import { CustomerModel } from "./CustomerModel";

export interface VmCustomerModel{
    customer?:CustomerModel;
    locatins?:CustomerLocationModel[];
    CustomerTaxDtail?:TaxBPTaxDetailModel[];

} 
