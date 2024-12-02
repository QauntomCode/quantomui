import { QuantomRepDBReportFormatContext } from "./QuantomRepDBReportFormatContext";
import { QuantomRepDBReports } from "./QuantomRepDBReports";

export interface QuantomDBReportVM {
    Report?: QuantomRepDBReports;                      // Corresponds to 'Report'
    FormatContext?: QuantomRepDBReportFormatContext[]; // List of QuantomRepDBReportFormatContext
  }
  