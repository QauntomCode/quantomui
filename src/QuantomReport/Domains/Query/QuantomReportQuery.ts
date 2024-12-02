import { QuantomReportFilter } from "./QuantomReportFilter";

export interface QuantomReportQuery {
    ReportCode?: string;
    FormateCode?: string;
    AppliedFilters?: QuantomReportFilter;
}
