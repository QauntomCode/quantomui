import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_SUB_SUB_ACCOUNT_DELETE_URL, ACCOUNT_SUB_SUB_ACCOUNT_GET_ALL_URL, ACCOUNT_SUB_SUB_ACCOUNT_GET_ONE_URL, ACCOUNT_SUB_SUB_ACCOUNT_INSERT_URL } from "../../../account_urls";
import { SubSubAccountModel } from "../model/subSubAccountModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const SubSubAccountInsert=async(model?:SubSubAccountModel):Promise<HttpResponse<SubSubAccountModel>>=>{
   //alert('method is called')
//    let url= ACCOUNT_SUB_ACCOUNT_INSERT_URL;
    //console.warn('payload is ',model);
    let res= await QuantomPOST<SubSubAccountModel>(ACCOUNT_SUB_SUB_ACCOUNT_INSERT_URL,true,model);
   return res;
}

export const SubSubAccountDelete=async(model?:SubSubAccountModel):Promise<HttpResponse<SubSubAccountModel>>=>{
   let res= await QuantomPOST<SubSubAccountModel>(ACCOUNT_SUB_SUB_ACCOUNT_DELETE_URL,true,model);
   return res  ;
}


export const SubSubAccountGetOne=async(subCode?:string):Promise<HttpResponse<SubSubAccountModel>>=>{
   let res= await QuantomGET<SubSubAccountModel>(ACCOUNT_SUB_SUB_ACCOUNT_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const SubSubAccountGetAll=async():Promise<SubSubAccountModel[]>=>{
   let res= await QuantomGET<SubSubAccountModel[]>(ACCOUNT_SUB_SUB_ACCOUNT_GET_ALL_URL,true);
   return res?.Response??[] ;
}