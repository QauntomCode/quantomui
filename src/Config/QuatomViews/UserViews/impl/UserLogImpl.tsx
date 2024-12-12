import { isNullOrEmpty } from "../../../../CommonMethods"
import { HTTP_RESPONSE_TYPE, HttpResponse, QuantomGET } from "../../../../HTTP/QuantomHttpMethods"
import { ConfigTransLog } from "../model/ConfigTransLog"

const USER_LOG_VIEW_URL='Config/TransLog/Transaction/GetTransUser'
export const GetUserLog=async(menuCode?:string,transNo?:string):Promise<HttpResponse<ConfigTransLog[]>>=>{

     console.warn('user menu is',menuCode)
     console.warn('trans No Is',transNo)

     if(isNullOrEmpty(menuCode) || isNullOrEmpty(transNo)){
        
        
        let obj :HttpResponse<ConfigTransLog[]>={
            ResStatus:HTTP_RESPONSE_TYPE.ERROR,
            Response:[]
        }
        Promise.resolve(obj);
     }
    //  alert('testing')
     console.warn('called')
    let res= await QuantomGET<ConfigTransLog[]>(USER_LOG_VIEW_URL+`?menuCode=${menuCode}&transNo=${transNo}`,true)
    console.warn('user log is',res)
    return res;
}