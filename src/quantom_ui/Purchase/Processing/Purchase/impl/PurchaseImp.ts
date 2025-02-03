import { isNullOrEmpty } from "../../../../../CommonMethods";
import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { VMPurchaseModel } from "../model/VMPurchaseModel";

const PURCHASE_INSERT_URL = "Purchase/Purchase/Insert";
const PURCHASE_UPDATE_URL = "Purchase/Purchase/update";
const PURCHASE_DELETE_URL = "Purchase/Purchase/delete";
const PURCHASE_GET_ALL_URL = "Purchase/Purchase/getAll";
const PURCHASE_GET_ONE_URL = "Purchase/Purchase/getOne";

export const PurchaseInsertMethod=async(data?:VMPurchaseModel):Promise<HttpResponse<VMPurchaseModel>>=>{

    let url=PURCHASE_INSERT_URL;
    if(!isNullOrEmpty(data?.purchase?.BillNo)){
        url= PURCHASE_UPDATE_URL;
    }
    let res=  QuantomPOST<VMPurchaseModel>(url,true,data);
    return res??{}
}
export const PurchaseDeleteMethod=async(data?:VMPurchaseModel):Promise<HttpResponse<VMPurchaseModel>>=>{
    let res = QuantomPOST<VMPurchaseModel>(PURCHASE_DELETE_URL,true,data?.purchase)
    return res??{}
}
export const PurchaseGetOneMethod=async(code?:string):Promise<HttpResponse<VMPurchaseModel>>=>{
    let res= QuantomGET<VMPurchaseModel>(PURCHASE_GET_ONE_URL+"?code="+code,true);
    return res??{};
}