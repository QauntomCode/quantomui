import { BusinessPartnerModel } from "../../../../../payroll/config/BusinessPartner/model/BusinessPartnerModel";

export interface FormDirectExpensesModel {
    Code?: string;
    LocId?: string;
    Date?: Date; // Date in TypeScript
    BPCode?: string;
    BPName?: string; // [NotMapped]
    InvoiceTypeCode?: string;
    InvoiceTypeName?: string; // [NotMapped]
    InvoiceAmount?: number;
    MenuCode?: string;
    TransNo?: string;
    TransRemarks?: string;
    TransVendorCode?: string;
    TransVendorName?: string; // [NotMapped]
    TransVendorType?: string;
    TransAmount?: number;
    Location?: Location; // Foreign key reference in C#
    BusinessPartner?: BusinessPartnerModel; // Foreign key reference in C#
    FormName?: string; // [NotMapped]
    PaidAmount?: number; // [NotMapped]
    RemainingAmount?: number; // [NotMapped]
    NowPaid?: number; // [NotMapped]
    Status?: string; // [NotMapped]
    InvoiceNo?: string; // [NotMapped]
}
