import { isNullOrEmpty } from "../../../../CommonMethods";
import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../HTTP/QuantomHttpMethods";
import {  CustomerPaymentReceiptDtoModel, VmCustomerPaymentModel } from "../model/CustomerPaymentReceiptModel";

const CUSTOMER_RECEIPT_INSERT_URL = "Payments/CustomeReceiept/Insert";
const CUSTOMER_RECEIPT_UPDATE_URL = "Payments/CustomeReceiept/Update";
const CUSTOMER_RECEIPT_GET_ALL_URL = "Payments/CustomeReceiept/GetAllV1";
const CUSTOMER_RECEIPT_GET_ONE_URL = "Payments/CustomeReceiept/GetOne";
const CUSTOMER_RECEIPT_DELETE_URL = "Payments/CustomeReceiept/Delete";


export const CustomerPaymentReceiptInsertMethod=async(data?:VmCustomerPaymentModel):Promise<HttpResponse<VmCustomerPaymentModel>>=>{
    let url=CUSTOMER_RECEIPT_UPDATE_URL;
    if(!isNullOrEmpty(data?.master?.Code))
    {
        url= CUSTOMER_RECEIPT_INSERT_URL;
    }
       let res= await QuantomPOST<VmCustomerPaymentModel>(url,true,data);
       return res;
}

export const CustomerPaymentReceiptDeleteMethod=async(data?:VmCustomerPaymentModel):Promise<HttpResponse<VmCustomerPaymentModel>>=>{
    let res= await QuantomPOST<VmCustomerPaymentModel>(CUSTOMER_RECEIPT_DELETE_URL,true,data);
    return res;
}


export const CustomerPaymentReceiptGetOneMethod=async(code?:string)=>{
  let res= await QuantomGET<VmCustomerPaymentModel>(CUSTOMER_RECEIPT_GET_ONE_URL+"?code="+code,true);
  return res;
}

export const CustomerPaymentReceiptGetAll=async(fromDate?:Date,toDate?:Date,locId?:string,search?:string):Promise<CustomerPaymentReceiptDtoModel[]>=>
{
    let data={FromDate:fromDate,ToDate:toDate,LocId:locId,Search:search};
    let res=await QuantomPOST<CustomerPaymentReceiptDtoModel[]>(CUSTOMER_RECEIPT_GET_ALL_URL,true,data);
    return res?.Response??[];

}