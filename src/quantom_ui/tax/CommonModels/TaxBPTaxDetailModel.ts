import { TaxTypesModel } from "../../TaxModule/config/TaxType/Model/TaxTypesModel";

export interface TaxBPTaxDetailModel{
    BPcode?:string;
    BPType?:string;
    TypeCode ?:string;
    Rate?:number; 
    Amount ?:number; 
    Type?:TaxTypesModel
    TaxTypeDescription?:string;
}