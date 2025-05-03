import { HttpResponse,HTTP_RESPONSE_TYPE,QuantomGET,QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { DesignationsModel } from "../model/DesignationsModel";

const DESIGNATION_FROM_GET_ALL_URL="Inventory/SetupForm/GetAll?Type=Designation";
const DESIGNATION_FROM_INSERT_URL="Inventory/SetupForm/Insert";
const DESIGNATION_FROM_DELETE_URL="Inventory/SetupForm/delete?Type=Designation";
const DESIGNATION_FROM_GET_ONE_URL="Inventory/SetupForm/GetOne?Type=Designation";


export const DesignationInsert=async(model?:DesignationsModel):
Promise<HttpResponse<DesignationsModel>> =>{
let res= await QuantomPOST<DesignationsModel>(DESIGNATION_FROM_INSERT_URL,true,model);
return res;
}

export const DesignationDelete=async(model?:DesignationsModel)
:Promise<HttpResponse<DesignationsModel>> =>{
    let res =await QuantomPOST<DesignationsModel>(DESIGNATION_FROM_DELETE_URL,true,model);
    return res;
}

export const DesignationGetOne=async(Code?:string)=>{
    let res=await QuantomGET<DesignationsModel>(DESIGNATION_FROM_GET_ONE_URL+`&Code=${Code}`,true)
    return res;
}

export const DesignationGetAll= async():Promise<DesignationsModel[]>=>{
    let res =await QuantomGET<DesignationsModel[]>(DESIGNATION_FROM_GET_ALL_URL,true);
    if(res?.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
        return [];
    }
    return res?.Response??[];
}