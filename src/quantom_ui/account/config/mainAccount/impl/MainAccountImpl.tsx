import { HTTP_RESPONSE_TYPE, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { GET_ALL_MAIN_ACCOUNT_URL } from "../../../account_urls";
import { MainAccountModel } from "../model/MainAccountModel"


export const GetAllMainAccounts=async():Promise<MainAccountModel[]>=>{
    let res= await QuantomGET<MainAccountModel[]>(GET_ALL_MAIN_ACCOUNT_URL,true)
    if(res?.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
        return [];
    }
    return res?.Response??[];
    
}