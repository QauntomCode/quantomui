import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_PETTY_CASH_DELETE_URL, ACCOUNT_PETTY_CASH_GET_ALL_URL, ACCOUNT_PETTY_CASH_GET_ONE_URL, ACCOUNT_PETTY_CASH_INSERT_URL } from "../../../account_urls";
import { PettyCashModel } from "../model/PettyCashModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const PettyCashInsert=async(model?:PettyCashModel):Promise<HttpResponse<PettyCashModel>>=>{

   let url= ACCOUNT_PETTY_CASH_INSERT_URL;
   var nModel={...model}

   alert(model?.Date)
   if(nModel?.Date===undefined){
      nModel.Date=new Date();
   }
   alert(nModel?.Date)
   let res= await QuantomPOST<PettyCashModel>(url,true,nModel);
   return res;
}

export const PettyCashDelete=async(model?:PettyCashModel):Promise<HttpResponse<PettyCashModel>>=>{
   let res= await QuantomPOST<PettyCashModel>(ACCOUNT_PETTY_CASH_DELETE_URL,true,model);
   return res  ;
}


export const PettyCashGetOne=async(subCode?:string):Promise<HttpResponse<PettyCashModel>>=>{
   let res= await QuantomGET<PettyCashModel>(ACCOUNT_PETTY_CASH_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const PettyCashGetAll=async():Promise<PettyCashModel[]>=>{
   let res= await QuantomGET<PettyCashModel[]>(ACCOUNT_PETTY_CASH_GET_ALL_URL,true);
   return res?.Response??[] ;
}