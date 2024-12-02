import { QuantomRepDBReportFormatColumns } from "./QuantomRepDBReportFormatColumns";
import { QuantomRepDBReportFormats } from "./QuantomRepDBReportFormats";

export interface QuantomRepDBReportFormatContext {
    Format?: QuantomRepDBReportFormats;            // Corresponds to 'Format'
    FormatColumns?: QuantomRepDBReportFormatColumns[]; // List of QuantomRepDBReportFormatColumns
  }
  