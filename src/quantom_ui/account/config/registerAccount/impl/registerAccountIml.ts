import { CommonCodeName } from "../../../../../database/db";
import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_REGISTER_ACCOUNT_CODE_NAME_URL, ACCOUNT_REGISTER_ACCOUNT_DELETE_URL, ACCOUNT_REGISTER_ACCOUNT_GET_ALL_URL, ACCOUNT_REGISTER_ACCOUNT_GET_ONE_URL, ACCOUNT_REGISTER_ACCOUNT_INSERT_URL, ACCOUNT_REGISTER_ACCOUNT_SEARCH_URL } from "../../../account_urls";
import { RegisterAccountModel } from "../model/registerAccountModel";
// import { SubAccountModel } from "../model/SubAccountModel";

export const RegisterAccountInsert=async(model?:RegisterAccountModel):Promise<HttpResponse<RegisterAccountModel>>=>{

   let res= await QuantomPOST<RegisterAccountModel>(ACCOUNT_REGISTER_ACCOUNT_INSERT_URL,true,model);
   return res;
}

export const RegisterAccountDelete=async(model?:RegisterAccountModel):Promise<HttpResponse<RegisterAccountModel>>=>{
   let res= await QuantomPOST<RegisterAccountModel>(ACCOUNT_REGISTER_ACCOUNT_DELETE_URL,true,model);
   return res  ;
}


export const RegisterAccountGetOne=async(subCode?:string):Promise<HttpResponse<RegisterAccountModel>>=>{
   let res= await QuantomGET<RegisterAccountModel>(ACCOUNT_REGISTER_ACCOUNT_GET_ONE_URL+`?Code=${subCode}`,true);
   return res;
}


export const RegisterAccountGetAll=async(search:string,willShoowBalance:boolean):Promise<RegisterAccountModel[]>=>{
   let res= await QuantomGET<RegisterAccountModel[]>(ACCOUNT_REGISTER_ACCOUNT_SEARCH_URL+`?text=${search}&willShowBalance=${willShoowBalance}`,true);
   return res?.Response??[] ;
}

export const RegisterAccountGetCodeName=async():Promise<CommonCodeName[]>=>{
   let res= await QuantomGET<CommonCodeName[]>(ACCOUNT_REGISTER_ACCOUNT_CODE_NAME_URL,true);
   return res?.Response??[] ;
}