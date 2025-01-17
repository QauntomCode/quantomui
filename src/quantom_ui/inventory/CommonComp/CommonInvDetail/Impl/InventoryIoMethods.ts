import {
  HTTP_RESPONSE_TYPE,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
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
};

export const AddOrRemoveExtendedMethod = async (
  oldItems?: CommonInvDetailModel[],
  workingItem?: CommonInvDetailModel,
  form?: InventoryAction,
  action?: INVENTORY_PERFORMED_ACTION,
  billInfo?: CommonInvDetailActionQueryBillInfo
): Promise<CommonInvDetailActionQueryResponse | undefined> => {
  let q: CommonInvDetailActionQueryModel = {
    OldItems: { InventoryList: oldItems },
    WorkingItem: workingItem,
    PERFORMED_ACTION: action,
    InventoryForm: form,
    BillInfo: billInfo,
  };

  let res = await AddOrRemoveInventoryItem(q);
  return res;
};
