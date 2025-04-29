import { HttpResponse,HTTP_RESPONSE_TYPE,QuantomGET,QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { DesignationsModel } from "../model/DesignationsModel";


const DESIGNATION_FROM_GET_ALL_URL="Inventory/SetupForm/GetAll?Type=Designation";

export const DesignationGetAll= async():Promise<DesignationsModel[]>=>{
    let res =await QuantomGET<DesignationsModel[]>(DESIGNATION_FROM_GET_ALL_URL,true);
    if(res?.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
        return [];
    }
    return res?.Response??[];
}

