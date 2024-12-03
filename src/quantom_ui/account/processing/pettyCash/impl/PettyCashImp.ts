import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_PETTY_CASH_DELETE_URL, ACCOUNT_PETTY_CASH_GET_ALL_URL, ACCOUNT_PETTY_CASH_GET_ONE_URL, ACCOUNT_PETTY_CASH_INSERT_URL } from "../../../account_urls";
import { PettyCashModel } from "../model/PettyCashModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const OpeningBalanceInsert=async(model?:PettyCashModel):Promise<HttpResponse<PettyCashModel>>=>{

   let url= ACCOUNT_PETTY_CASH_INSERT_URL;
   let res= await QuantomPOST<PettyCashModel>(url,true,model);
   return res;
}

export const OpeningBalanceDelete=async(model?:PettyCashModel):Promise<HttpResponse<PettyCashModel>>=>{
   let res= await QuantomPOST<PettyCashModel>(ACCOUNT_PETTY_CASH_DELETE_URL,true,model);
   return res  ;
}


export const OpeningBalanceGetOne=async(subCode?:string):Promise<HttpResponse<PettyCashModel>>=>{
   let res= await QuantomGET<PettyCashModel>(ACCOUNT_PETTY_CASH_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const OpeningBalanceGetAll=async():Promise<PettyCashModel[]>=>{
   let res= await QuantomGET<PettyCashModel[]>(ACCOUNT_PETTY_CASH_GET_ALL_URL,true);
   return res?.Response??[] ;
}