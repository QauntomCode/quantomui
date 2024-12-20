import { CommonCodeName } from "../../../../../database/db";
import {
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import {
  INVENTORY_ATTRIBUTES_VALUES_BY_ATTRIBUTE_CODE_URL,
  INVENTORY_ITEMS_FORM_DELETE,
  INVENTORY_ITEMS_FORM_GET_ALL,
  INVENTORY_ITEMS_FORM_GET_ONE,
  INVENTORY_ITEMS_FORM_INSERT,
} from "../../../InventoryRoutes";
import { InventoryAttributeValuesModel } from "../../InventoryItemAtributeValues/Model/InventoryItemAtributeValuesModel";
import { VMInventoryItemsModel } from "../model/VMInventory_itemsModel";

export const InventoryItemsInsert = async (
  model?: VMInventoryItemsModel
): Promise<HttpResponse<VMInventoryItemsModel>> => {
  let res = await QuantomPOST<VMInventoryItemsModel>(
    INVENTORY_ITEMS_FORM_INSERT,
    true,
    model
  );
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
