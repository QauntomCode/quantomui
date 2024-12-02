import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_OPENING_BALANCE_DELETE_URL, ACCOUNT_OPENING_BALANCE_GET_ALL_URL, ACCOUNT_OPENING_BALANCE_GET_ONE_URL, ACCOUNT_OPENING_BALANCE_INSERT_URL } from "../../../account_urls";
import { OpeningBalanceModel } from "../model/OpeningBalanceModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const OpeningBalanceInsert=async(model?:OpeningBalanceModel):Promise<HttpResponse<OpeningBalanceModel>>=>{

   let url= ACCOUNT_OPENING_BALANCE_INSERT_URL;
   if(model?.Code){
      url=ACCOUNT_OPENING_BALANCE_DELETE_URL;
   }
   let res= await QuantomPOST<OpeningBalanceModel>(url,true,model);
   return res;
}

export const OpeningBalanceDelete=async(model?:OpeningBalanceModel):Promise<HttpResponse<OpeningBalanceModel>>=>{
   let res= await QuantomPOST<OpeningBalanceModel>(ACCOUNT_OPENING_BALANCE_DELETE_URL,true,model);
   return res  ;
}


export const OpeningBalanceGetOne=async(subCode?:string):Promise<HttpResponse<OpeningBalanceModel>>=>{
   let res= await QuantomGET<OpeningBalanceModel>(ACCOUNT_OPENING_BALANCE_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const OpeningBalanceGetAll=async():Promise<OpeningBalanceModel[]>=>{
   let res= await QuantomGET<OpeningBalanceModel[]>(ACCOUNT_OPENING_BALANCE_GET_ALL_URL,true);
   return res?.Response??[] ;
}