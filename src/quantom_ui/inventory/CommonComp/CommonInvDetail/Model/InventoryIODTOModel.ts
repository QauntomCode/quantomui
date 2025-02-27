import { SaleJobServices } from "../../../../sale/processing/sale/model/helperModel/SaleJobServices";
import { InventoryIOTaxDTOModel } from "../../../../tax/CommonModels/InventoryIOTaxDTOModel";
import { InvoiceMasterValuesModel } from "../../../../tax/CommonModels/InvoiceMasterValuesModel";
import { CommonInvDetailModel } from "./CommonInvDetailModel";

export interface InventoryIODTOModel {
  InventoryList?: CommonInvDetailModel[];
  InventoryIOTaxList?: InventoryIOTaxDTOModel[];
  InvoiceMasterValues?: InvoiceMasterValuesModel;
  JobServices?:SaleJobServices[]
}
