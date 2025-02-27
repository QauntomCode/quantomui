import { VMDocumentModel } from "../../../../config/DocumentHandling/model/VMDocumentMode";
import { CommonInvDetailModel } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { InventoryIOTaxDTOModel } from "../../../../tax/CommonModels/InventoryIOTaxDTOModel";
import { SaleJobServices } from "./helperModel/SaleJobServices";
import { SalesNomineeModel } from "./helperModel/SaleNomineeModel";
import { SaleOperationsModel } from "./helperModel/SaleOperationsModel";
import { SalePaymentTermsModel } from "./helperModel/SalePaymentTermsModel";
import { SalePOSPropertiesModel } from "./helperModel/SalePOSPropertiesModel";
import { SalesGuarantorModel } from "./helperModel/SalesGuarantorModel";
import { VMDirectExpensesModel } from "./helperModel/VMDirectExpensesModel";
import { SaleModel } from "./SaleModel";

export interface VmSale {
    Sale?: SaleModel;
    SaleDetails?: CommonInvDetailModel[];
    PaymentTerms?: SalePaymentTermsModel[];
    Guarantors?: SalesGuarantorModel[];
    Nominees?: SalesNomineeModel[];
    SaleOperations?: SaleOperationsModel[];
    TaxDetail?: InventoryIOTaxDTOModel[];
    Document?: VMDocumentModel;
    DirectExpenses?: VMDirectExpensesModel;
    PosProperties?: SalePOSPropertiesModel;
    SaleServices?:SaleJobServices[];

}
