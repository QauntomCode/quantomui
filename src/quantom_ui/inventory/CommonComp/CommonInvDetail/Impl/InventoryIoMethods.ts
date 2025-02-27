import {
  HTTP_RESPONSE_TYPE,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { SaleJobServices } from "../../../../sale/processing/sale/model/helperModel/SaleJobServices";
import { InventoryIOTaxDTOModel } from "../../../../tax/CommonModels/InventoryIOTaxDTOModel";
import { InvoiceMasterValuesModel } from "../../../../tax/CommonModels/InvoiceMasterValuesModel";
import {
  CommonInvDetailActionQueryBillInfo,
  CommonInvDetailActionQueryModel,
  CommonInvDetailActionQueryResponse,
  INVENTORY_PERFORMED_ACTION,
} from "../Model/CommonInvDetailActionQueryModel";
import {
  CommonInvDetailModel,
  InventoryAction,
} from "../Model/CommonInvDetailModel";
import { InventoryIODTOModel } from "../Model/InventoryIODTOModel";

const ADD_OR_REMOVE_ITEM_URL =
  "Inventory/Items/AddOrRemoveDetailWithTaxHandlingv1";
export const AddOrRemoveInventoryItem = async (
  query?: CommonInvDetailActionQueryModel
): Promise<CommonInvDetailActionQueryResponse | undefined> => {
  let res = await QuantomPOST<CommonInvDetailActionQueryResponse>(
    ADD_OR_REMOVE_ITEM_URL,
    true,
    query
  );
  if (res.ResStatus === HTTP_RESPONSE_TYPE.SUCCESS) {
    return res.Response;
  }
  else{
    return Promise.resolve({InventoryDTO:query?.OldItems,Message:res?.ErrorMessage??"Some Thing Invalid Happen"})
  }
};

export const AddOrRemoveExtendedMethod = async (
  oldItems?: CommonInvDetailModel[],
  workingItem?: CommonInvDetailModel,
  form?: InventoryAction,
  action?: INVENTORY_PERFORMED_ACTION,
  billInfo?: CommonInvDetailActionQueryBillInfo,
  taxDetail?: InventoryIOTaxDTOModel[],
  masterValues?: InvoiceMasterValuesModel,
  jobs?:SaleJobServices[]
): Promise<CommonInvDetailActionQueryResponse | undefined> => {
  let q: CommonInvDetailActionQueryModel = {
    OldItems: {
      InventoryList: oldItems,
      InventoryIOTaxList: taxDetail,
      InvoiceMasterValues: masterValues,
      JobServices:jobs
    },
    WorkingItem: workingItem,
    PERFORMED_ACTION: action,
    InventoryForm: form,
    BillInfo: billInfo,
  };

  let res = await AddOrRemoveInventoryItem(q);
  
  return res;
};
