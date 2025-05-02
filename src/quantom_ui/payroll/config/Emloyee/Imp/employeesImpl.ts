import { CommonCodeName } from "../../../../../database/db";
import {
  HTTP_RESPONSE_TYPE,
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";

import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { EmployeeModel, VmEmployee } from "../model/EmployeeModel";

const  EMPLOYEE_FORM_INSERT_URL="Payroll/Employee/Insert";
const  EMPLOYEE_FORM_DELETE_URL="Payroll/Employee/delete";
const  EMPLOYEE_FORM_GET_ONE_URL="Payroll/Employee/getOne";
const  EMPLOYEE_FORM_GET_ALL_URL="Payroll/Employee/getAll";

export const EmployeeInsert =async(model?:VmEmployee):Promise<HttpResponse<VmEmployee>> =>
    {
        let nmodel:VmEmployee={...model,employee:{...model?.employee,department:undefined,designation:undefined}}
 let res =await QuantomPOST<VmEmployee>(EMPLOYEE_FORM_INSERT_URL,true,model);
 return res;
}

export const EmployeeDelete=async(model?:VmEmployee):Promise<HttpResponse<VmEmployee>> =>
    {
let res = await QuantomPOST<VmEmployee>(EMPLOYEE_FORM_DELETE_URL,true,model);
return res;
}

export const EmployeeGetOne=async(EmpCode?:string):Promise<HttpResponse<VmEmployee>> =>{
    let res = await QuantomGET<VmEmployee>(EMPLOYEE_FORM_GET_ONE_URL+`?Code=${EmpCode}`,true,)
    return res;
}

export const EmployeeGetAll=async(searchText:string):
Promise<VmEmployee[]> =>
    {
    let res= await QuantomGET<VmEmployee[]>
    (EMPLOYEE_FORM_GET_ALL_URL+`?SearchText=${searchText}`,true);
    return res?.Response ?? [];
}
