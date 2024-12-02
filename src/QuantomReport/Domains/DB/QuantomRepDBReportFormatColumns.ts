import { QuantomRepDBReportFormats } from "./QuantomRepDBReportFormats";

export interface QuantomRepDBReportFormatColumns {
    ColumnName?: string;        // Corresponds to 'ColumnName'
    FormatId?: string;          // Corresponds to 'FormatId'
    ColumnCaption?: string;     // Corresponds to 'ColumnCaption'
    DataType?: string;          // Corresponds to 'DataType'
    SortNumber?: number;        // Corresponds to 'SortNumber'
    IsReference?: boolean;       // Corresponds to 'IsRefernce'
    RefMenuCode?: string;       // Corresponds to 'RefMenuCode'
    RefField?: string;          // Corresponds to 'RefField'
    Visible?: boolean;          // Corresponds to 'Visible'
    Printable?: boolean;        // Corresponds to 'Printable'
    Width?: string;             // Corresponds to 'Width'
    PrintWidth?: string;        // Corresponds to 'PrintWidth'
    ReportFormat?: QuantomRepDBReportFormats; // Represents the foreign key relationship
  }
  
  
  