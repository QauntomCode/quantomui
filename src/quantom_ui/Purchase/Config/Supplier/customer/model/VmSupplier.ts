import { RegisterAccountModel } from "../../../../../account/config/registerAccount/model/registerAccountModel";

export interface VmSupplierModel {
    supplier?: SupplierModel;
    supplierLocations?: SupplierLocationsModel[];
}

export interface SupplierModel {
    SuppCode?: string;
    SuppName?: string;
    FatherName?: string; // Optional
    CompanyName?: string; // Optional
    GLCode?: string; // Optional
    Email?: string; // Optional
    BusinessAdress?: string; // Optional
    Address?: string; // Optional
    CellNo?: string; // Optional
    BusinessCell?: string; // Optional
    Remarks?: string; // Optional
    SuppDisGlCode?: string; // Optional
    SuppSchemeGlCode?: string; // Optional
    SuppFreightGlCode?: string; // Optional
    registerAccount?: RegisterAccountModel; // Optional (ForeignKey relationship)
    DisGlAccount?: RegisterAccountModel; // Optional (ForeignKey relationship)
    FreightGlAccount?: RegisterAccountModel; // Optional (ForeignKey relationship)
    SchemeGlAccount?: RegisterAccountModel; // Optional (ForeignKey relationship)
    IsFreightCompany?: boolean; // Optional
    Balance?: number; // Optional (NotMapped in C#)
}

interface SupplierLocationsModel {
    SuppCode: string;
    LocCode: string;
    supplier?: SupplierModel; // Optional (ForeignKey relationship)
    location?: Location; // Optional (ForeignKey relationship)
}