import { CommonCodeName } from "../../../../../../database/db";
import {
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../../HTTP/QuantomHttpMethods";
import { SupplierModel, VmSupplierModel } from "../model/VmSupplier";

export const SUPPLIER_INSERT_URL = "Purchase/Supplier/Insert";
export const SUPPLIER_UPDATE_URL = "Purchase/Supplier/update";
export const SUPPLIER_DELETE_URL = "Purchase/Supplier/delete";
export const SUPPLIER_GET_ALL_URL = "Purchase/Supplier/getAll";
export const SUPPLIER_GET_ONE_URL = "Purchase/Supplier/getOne";
export const SUPPLIER_GET_CODE_NAME_URL = "Purchase/Supplier/GetCodeNames";
export const SUPPLIER_GET_CODE_NAME_BY_LOC_ID_URL =
  "Purchase/Supplier/getAllbyLocId";

export const SupplierSaveMethod = async (
  cust?: VmSupplierModel
): Promise<HttpResponse<VmSupplierModel>> => {
  let res = await QuantomPOST<VmSupplierModel>(
    SUPPLIER_INSERT_URL,
    true,
    cust,
    "NONE"
  );
  return Promise.resolve(res);
};

export const SupplierDeleteMethod = async (
  supp?: VmSupplierModel
): Promise<HttpResponse<SupplierModel>> => {
  let res = await QuantomPOST<SupplierModel>(
    SUPPLIER_DELETE_URL,
    true,
    supp?.supplier
  );
  return Promise.resolve(res);
};

export const SupplierGetOneMethod = async (
  code?: string
): Promise<HttpResponse<VmSupplierModel>> => {
  let res = QuantomGET<VmSupplierModel>(
    SUPPLIER_GET_ONE_URL + "?Code=" + code,
    true
  );
  return res;
};

export const SupplierGetCodeNameMethod = async (
  search?: string
): Promise<CommonCodeName[]> => {
  let res = await QuantomGET<CommonCodeName[]>(
    SUPPLIER_GET_CODE_NAME_URL,
    true
  );
  return res?.Response ?? [];
};
