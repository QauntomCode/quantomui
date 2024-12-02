import { QuantomReportFilter } from "../Query/QuantomReportFilter";
import { QuantomReportLine } from "./HelperDomains/QuantomReportLine";
import { QuantomReportMeta } from "./HelperDomains/QuantomReportMeta";

export interface QuantomReportModel {
    Index?: number;
    Lines?: QuantomReportLine[];
    Meta?: QuantomReportMeta[];
    ReportFilters?:QuantomReportFilter;
    AppliedFilters?:QuantomReportFilter;

}
