import { QuantomRepDBReports } from "./QuantomRepDBReports";

export interface QuantomRepDBReportFormats {
    ID?: string;           // Corresponds to the 'ID' property
    ReportID?: string;     // Corresponds to the 'ReportID' property
    FormatName?: string;   // Corresponds to the 'FromatName' property
    Reports?: QuantomRepDBReports; // Represents the foreign key relationship
  }
  