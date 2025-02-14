import { isNullOrEmpty } from "../../../../../CommonMethods";
import { CommonCodeName } from "../../../../../database/db";
import {
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { CustomerModel } from "../model/CustomerModel";
import { VmCustomerModel } from "../model/VmCustomerModel";

const CUSTOMER_INSERT_URL = "Sale/Customer/Insert";
const CUSTOMER_UPDATE_URL = "Sale/Customer/update";
const CUSTOMER_DELETE_URL = "Sale/Customer/delete";
const CUSTOMER_GET_ALL_URL = "Sale/Customer/getAll";
const CUSTOMER_GET_ONE_URL = "Sale/Customer/getOne";
const CUSTOMER_GET_CODE_NAME_URL = "Sale/Customer/GetCodeNames";
const CUSTOMER_GET_ALL_CUSTOMERS = "Sale/Customer/getAll";

export const CustomerSaveMethod = async (
  cust?: VmCustomerModel
): Promise<HttpResponse<VmCustomerModel>> => {
  // alert(cust?.customer?.CustCode)
  //  if(isNullOrEmpty( cust?.customer?.CustCode)){
  let res = await QuantomPOST<VmCustomerModel>(
    CUSTOMER_INSERT_URL,
    true,
    cust,
    "NONE"
  );
  return Promise.resolve(res);
  //  }
  //  else{
  //     let res= await QuantomPOST<VmCustomerModel>(CUSTOMER_UPDATE_URL,true,cust);
  //     return res;
  //  }
};

export const CustomerDeleteMethod = async (
  cust?: VmCustomerModel
): Promise<HttpResponse<VmCustomerModel>> => {
  let res = await QuantomPOST<VmCustomerModel>(
    CUSTOMER_DELETE_URL,
    true,
    cust?.customer
  );
  return Promise.resolve(res);
};

export const CustomerGetOneMethod = async (
  code?: string
): Promise<HttpResponse<VmCustomerModel>> => {
  let res = QuantomGET<VmCustomerModel>(
    CUSTOMER_GET_ONE_URL + "?Code=" + code,
    true
  );
  return res;
};

export const CustomersGetCodeNameMethod = async (): Promise<
  CommonCodeName[]
> => {
  let res = await QuantomGET<CommonCodeName[]>(
    CUSTOMER_GET_CODE_NAME_URL,
    true
  );

  //   alert("get customer values method is called   ");
  return res?.Response ?? [];
};

export const GetAllCustomers = async (): Promise<CustomerModel[]> => {
  let res = await QuantomGET<CustomerModel[]>(CUSTOMER_GET_ALL_CUSTOMERS, true);
  return res.Response ?? [];
};
