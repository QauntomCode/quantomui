import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_SUB_ACCOUNT_DELETE_URL, ACCOUNT_SUB_ACCOUNT_GET_ALL_URL, ACCOUNT_SUB_ACCOUNT_GET_ONE_URL, ACCOUNT_SUB_ACCOUNT_INSERT_URL } from "../../../account_urls";
import { SubAccountModel } from "../model/SubAccountModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const SubAccountInsert=async(model?:SubAccountModel):Promise<HttpResponse<SubAccountModel>>=>{
   //alert('method is called')
//    let url= ACCOUNT_SUB_ACCOUNT_INSERT_URL;
    //console.warn('payload is ',model);
    let res= await QuantomPOST<SubAccountModel>(ACCOUNT_SUB_ACCOUNT_INSERT_URL,true,model);
   return res;
}

export const SubAccountDelete=async(model?:SubAccountModel):Promise<HttpResponse<SubAccountModel>>=>{
   let res= await QuantomPOST<SubAccountModel>(ACCOUNT_SUB_ACCOUNT_DELETE_URL,true,model);
   return res  ;
}


export const SubAccountGetOne=async(subCode?:string):Promise<HttpResponse<SubAccountModel>>=>{
   let res= await QuantomGET<SubAccountModel>(ACCOUNT_SUB_ACCOUNT_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const SubAccountGetAll=async():Promise<SubAccountModel[]>=>{
   let res= await QuantomGET<SubAccountModel[]>(ACCOUNT_SUB_ACCOUNT_GET_ALL_URL,true);
   return res?.Response??[] ;
}