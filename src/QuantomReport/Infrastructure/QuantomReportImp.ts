
import { HTTP_RESPONSE_TYPE, HttpResponse, QuantomPOST } from "../../HTTP/QuantomHttpMethods"
import { QuantomDBReportVM } from "../Domains/DB/QuantomDBReportVM"
import { QuantomDBReportQuery } from "../Domains/Query/QuantomDBReportQuery"
import { QuantomReportFilterQuery } from "../Domains/Query/QuantomReportFilterQuery"
import { QuantomReportQuery } from "../Domains/Query/QuantomReportQuery"
import { QuantomReportSingleFilter } from "../Domains/Query/QuantomReportSingleFilter"
import { QuantomReportModel } from "../Domains/Response/QuantomReportModel"
import { GET_ALL_QUANTOM_REPORT_SCHEMA_CONTEXT_URL, GET_QUANTOM_REPORT_URL,FILL_REPORT_FILTER_BY_REPORT_NAME } from "../Route/QuantomRoutes"


export const GetQuantomReport= async(query?:QuantomReportQuery):Promise<QuantomReportModel>=>{

    let res= await QuantomPOST<QuantomReportModel>(GET_QUANTOM_REPORT_URL,true,query)
    let emptyObj:any= {}
    if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
        return res?.Response??emptyObj;
    }
    return Promise.resolve(emptyObj)

}


export const GetQuantomReportDBContext= async(query?:QuantomDBReportQuery):Promise<HttpResponse<QuantomDBReportVM>>=>{

    let res= await QuantomPOST<QuantomDBReportVM>(GET_ALL_QUANTOM_REPORT_SCHEMA_CONTEXT_URL,true,query)
    return res;
}


export const FillReportFilterByReportName= async(query?:QuantomReportFilterQuery):Promise<HttpResponse<QuantomReportSingleFilter>>=>{

    let res= await QuantomPOST<QuantomReportSingleFilter>(FILL_REPORT_FILTER_BY_REPORT_NAME,true,query)
    return res;
}
