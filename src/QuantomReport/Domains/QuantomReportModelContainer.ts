import { QuantomReportPaging } from "./Configs/QuantomReportPaging";
import { QuantomDBReportVM } from "./DB/QuantomDBReportVM";
import { QuantomReportQuery } from "./Query/QuantomReportQuery";
import { QuantomReportModel } from "./Response/QuantomReportModel";

export interface QuantomReportModelContainer{
    Response?:QuantomReportModel;
    Query?:QuantomReportQuery;
    DbContext?:QuantomDBReportVM;
    SelectedFormatId?:string;
    Paging?:QuantomReportPaging;
    WillShowFilterModal?:boolean;
    IsLoaded?:boolean;
    
}