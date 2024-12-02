import { HTTP_RESPONSE_TYPE, HttpResponse, QuantomGET, QuantomPOST } from "../../../HTTP/QuantomHttpMethods";
import { TOKEN_KEY_LOCAL_STORAGE } from "../../config_keys";
import { CompanyModel } from "../../User/model/CompanyModel";
import { user } from "../../User/model/user";
import { LoginResponse } from "../model/loginResponseModel";

const LOGIN_URL='Config/Login/Login';
const GET_ALL_COMPANIES_URL="Config/Company/GetUserCompanies";
 const SET_LOGIN_COMPANY_URL = "Config/Company/setLoginCompany";


export const UserLoginMethod=async(user?:user):Promise<HttpResponse<LoginResponse>>=>{

     let res= await QuantomPOST<LoginResponse>(LOGIN_URL,true,user,'LOADING');
     if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
        window.localStorage.setItem(TOKEN_KEY_LOCAL_STORAGE,res?.Response?.Token??"")
     }
     return res;
}

export const GetAllCompaniesByUser=async():Promise<HttpResponse<CompanyModel[]>>=>{

   let res= await QuantomGET<CompanyModel[]>(GET_ALL_COMPANIES_URL,true);
   if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
      //window.localStorage.setItem(TOKEN_KEY_LOCAL_STORAGE,res?.Response?.Token??"")
   }
   return res;
}

export const setLogedInUserCompany=async(company?:CompanyModel):Promise<HttpResponse<CompanyModel>>=>{

   let res= await QuantomPOST<CompanyModel>(SET_LOGIN_COMPANY_URL,true,company,'LOADING');
   
   return res;
}