import { CommonCodeName } from "../../../database/db";

export interface QuantomReportSingleFilter {
    FilterName?: string;
    FilterCaption?:string;
    SortNumber?: number;
    Filters?: CommonCodeName[];
}
