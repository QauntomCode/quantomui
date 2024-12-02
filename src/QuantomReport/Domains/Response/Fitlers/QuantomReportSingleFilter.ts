import { CommonCodeName } from "../../../../quantom_comps/Quantom_Lov";

export interface QuantomReportSingleFilter{
    FilterName?:string;
    FilterCaption?:string;
    SortNumber?:string;
    Filters?:CommonCodeName[];
    FilterValueType?:string;
}
