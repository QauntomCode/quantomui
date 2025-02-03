import { CommonCodeName } from "../../../../../database/db";
import {
  HTTP_RESPONSE_TYPE,
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { InventoryAction } from "../../../CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import {
  INVENTORY_ATTRIBUTES_VALUES_BY_ATTRIBUTE_CODE_URL,
  INVENTORY_ITEMS_FORM_DELETE,
  INVENTORY_ITEMS_FORM_GET_ACTIVE_ITEM_CODE_NAME,
  INVENTORY_ITEMS_FORM_GET_ALL,
  INVENTORY_ITEMS_FORM_GET_ONE,
  INVENTORY_ITEMS_FORM_INSERT,
  INVENTORY_ITEMS_GET_ITEMS_BY_CATCODE_URL,
} from "../../../InventoryRoutes";
import { InventoryAttributeValuesModel } from "../../InventoryItemAtributeValues/Model/InventoryItemAtributeValuesModel";
import { InventoryItemPriceListDetailModel } from "../../PriceList/Model/InventoryItemPriceListModelDetail";
import { InventoryItemsModel } from "../model/InventoryItemsModel";
import { VMInventoryItemsModel } from "../model/VMInventory_itemsModel";

export const InventoryItemsInsert = async (
  model?: VMInventoryItemsModel
): Promise<HttpResponse<VMInventoryItemsModel>> => {
  let res = await QuantomPOST<VMInventoryItemsModel>(
    INVENTORY_ITEMS_FORM_INSERT,
    true,
    model
  );

  // if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
  //    let data= res?.Response;
  //    if(model?.item){
  //     model.item.ItemCode=data?.item?.ItemCode;
  //    }
  //    res.Response= model;
  // }
  return res;
};

export const InventoryItemsDelete = async (
  model?: VMInventoryItemsModel
): Promise<HttpResponse<VMInventoryItemsModel>> => {
  let res = await QuantomPOST<VMInventoryItemsModel>(
    INVENTORY_ITEMS_FORM_DELETE,
    true,
    model
  );
  return res;
};

export const InventoryItemsGetOne = async (
  code?: string
): Promise<HttpResponse<VMInventoryItemsModel>> => {
  let res = await QuantomGET<VMInventoryItemsModel>(
    INVENTORY_ITEMS_FORM_GET_ONE + `?Code=${code}`,
    true
  );
  if (res?.Response && res?.Response?.itemUnits) {
    for (let i = 0; i < (res?.Response?.itemUnits?.length ?? 0); i++) {
      res.Response.itemUnits[i].PUnitName = res?.Response?.item?.UnitName;
    }
  }
  return res;
};

export const InventoryItemsGetAll = async (
  searchText?: string
): Promise<CommonCodeName[]> => {
  let res = await QuantomGET<CommonCodeName[]>(
    INVENTORY_ITEMS_FORM_GET_ALL + `?SearchText=${searchText}`,
    true
  );
  return res?.Response ?? [];
};

export const getAttributevalueByAttributeCode = async (
  attributeCode?: string
): Promise<InventoryAttributeValuesModel[]> => {
  let res = await QuantomGET<InventoryAttributeValuesModel[]>(
    INVENTORY_ATTRIBUTES_VALUES_BY_ATTRIBUTE_CODE_URL +
      `?attrCode=${attributeCode}`,
    true
  );

  console.warn("response of vlues are", res?.Response);
  return res?.Response ?? [];
};

export const GetItemsByCategory = async (
  catCode?: string
): Promise<InventoryItemsModel[]> => {
  let res = await QuantomGET<InventoryItemsModel[]>(
    INVENTORY_ITEMS_GET_ITEMS_BY_CATCODE_URL + `?catcode=${catCode}`,
    true
  );

  console.warn("response of vlues are", res?.Response);
  return res?.Response ?? [];
};

export const GetActiveItemCodeName = async (): Promise<CommonCodeName[]> => {
  // alert("inside getactive items method");
  let res = await QuantomGET<CommonCodeName[]>(
    INVENTORY_ITEMS_FORM_GET_ACTIVE_ITEM_CODE_NAME,
    true
  );

  console.warn("Active Items Are", res?.Response);
  return res?.Response ?? [];
};

interface MethodQuery {
  ItemCode?: string;
  VendorCode?: string;
  Form?: InventoryAction;
}

interface PriceQuery extends MethodQuery {
  EffecteDate?: Date;
  FormName?: string;
}

const INVENTORY_ITEM_ALL_UNIT_PRICE_QUERY_URL =
  "Inventory/ItemPriceList/GetPriceOfAllUnits/SalePurchaseBoth";

export const GetEffectePriceOfAllUnits = async (
  query?: MethodQuery
): Promise<InventoryItemPriceListDetailModel[]> => {
  let formName = "SALE";
  if (
    query?.Form === InventoryAction.Purchase ||
    query?.Form === InventoryAction.PurchaseReturn
  ) {
    formName = "PURCHASE";
  }
  let q: PriceQuery = { ...query, FormName: formName, EffecteDate: new Date() };
  let res = await QuantomPOST<InventoryItemPriceListDetailModel[]>(
    INVENTORY_ITEM_ALL_UNIT_PRICE_QUERY_URL,
    true,
    q
  );

  if (res?.ResStatus === HTTP_RESPONSE_TYPE.SUCCESS) {
    return res?.Response ?? [];
  }
  ShowQuantomError({
    MessageBody: res?.ErrorMessage,
    MessageHeader: "Error !",
  });

  return Promise.resolve([]);
};
