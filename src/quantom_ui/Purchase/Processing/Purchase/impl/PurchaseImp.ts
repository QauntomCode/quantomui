import { isNullOrEmpty } from "../../../../../CommonMethods";
import { HTTP_RESPONSE_TYPE, HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { PurchaseModel, VMPurchaseModel } from "../model/VMPurchaseModel";

const PURCHASE_INSERT_URL = "Purchase/Purchase/Insert";
const PURCHASE_UPDATE_URL = "Purchase/Purchase/update";
const PURCHASE_DELETE_URL = "Purchase/Purchase/delete";
const PURCHASE_GET_ALL_URL = "Purchase/Purchase/getAllv1";
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


interface PurchaseGetAllQuery{
    FromDate?:Date;
    ToDate?:Date,
    Search?:string;
    LocId?:string;
}
export const PurchaseGetAll=async(query?:PurchaseGetAllQuery):Promise<PurchaseModel[]>=>{
   let res= await QuantomPOST<any>(PURCHASE_GET_ALL_URL,true,query);
   if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
       console.warn("Purchase Get All REcords are   ",res?.Response)

       let data= res?.Response?.map((item:any)=>{
          let obj:PurchaseModel={
            BillNo:item?.BillNo,
            BillDate:item?.BillDate,
            Remarks:item?.Remarks,
            SuppCode:item?.SuppCode,
            SuppName:item?.SuppName,
            NetTotal: item?.TAmount,
          }
          return obj;
       })

       return data;
   }

   return []
}
