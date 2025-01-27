import { isNullOrEmpty } from "../../../../../CommonMethods";
import {
  HttpResponse,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { VmSale } from "../model/VmSaleModel";

const SALE_INSERT_URL = "Sale/Sale/Insert";
const SALE_UPDATE_URL = "Sale/Sale/update";
const SALE_DELETE_URL = "Sale/Sale/delete";
const SALE_GET_ALL_URL = "Sale/Sale/getAll";
const SALE_GET_ONE_URL = "Sale/Sale/getOne";
export const InsertSale = async (
  sale?: VmSale
): Promise<HttpResponse<VmSale>> => {
  let url = SALE_INSERT_URL;
  if (!isNullOrEmpty(sale?.Sale?.BillNo)) {
    url = SALE_UPDATE_URL;
  }
  var res = QuantomPOST<VmSale>(url, true, sale, "LOADING");
  return res;
};


export const SaleGetAll=(fromDate?:Date,toDate?:Date,)=>{}