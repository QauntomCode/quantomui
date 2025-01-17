import { InventoryIOTaxDTOModel } from "../../../../tax/CommonModels/InventoryIOTaxDTOModel";
import { InvoiceMasterValuesModel } from "../../../../tax/CommonModels/InvoiceMasterValuesModel";
import { CommonInvDetailModel } from "./CommonInvDetailModel";

export interface InventoryIODTOModel {
  InventoryList?: CommonInvDetailModel[];
  InventoryIOTaxList?: InventoryIOTaxDTOModel[];
  InvoiceMasterValues?: InvoiceMasterValuesModel;
}
