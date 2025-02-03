import { isNullOrEmpty } from "../../../../../CommonMethods";
import { QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { VMPurchaseModel } from "../model/VMPurchaseModel";

const PURCHASE_INSERT_URL = "Purchase/Purchase/Insert";
const PURCHASE_UPDATE_URL = "Purchase/Purchase/update";
const PURCHASE_DELETE_URL = "Purchase/Purchase/delete";
const PURCHASE_GET_ALL_URL = "Purchase/Purchase/getAll";
const PURCHASE_GET_ONE_URL = "Purchase/Purchase/getOne";

export const PurchaseInsertMethod=async(data?:VMPurchaseModel)=>{

    let url=PURCHASE_INSERT_URL;
    if(isNullOrEmpty(data?.purchase?.BillNo)){
        url= PURCHASE_UPDATE_URL;
    }
    QuantomPOST(url,true,data);
}
export const PurchaseDeleteMethod=async(data?:VMPurchaseModel)=>{
    QuantomPOST(PURCHASE_DELETE_URL,true,data?.purchase)
}
export const PurchaseGetOneMethod=async(code?:string)=>{
    QuantomGET(PURCHASE_GET_ONE_URL+"?code="+code,true);
}