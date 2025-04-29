import { HttpResponse,HTTP_RESPONSE_TYPE,QuantomGET,QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";

import { DepartmentsModel } from "../model/DepartmentsModel";
const DEPARTMENT_FORM_GET_ALL_URL="Inventory/SetupForm/GetAll?Type=Department";
const DEPARTMENT_FORM_INSERT_URL="";


export const DepartmentInsert=async(model?:DepartmentsModel):Promise<HttpResponse<DepartmentsModel>>=>{
    let res=await QuantomPOST<DepartmentsModel>(DEPARTMENT_FORM_INSERT_URL,true,model);
    return res;
}

export const DepartmentsGetAll=async():Promise<DepartmentsModel[]>=>{
    let res= await QuantomGET<DepartmentsModel[]>(DEPARTMENT_FORM_GET_ALL_URL,true)
    if(res?.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
        return [];
    }
    return res?.Response??[];
    
}