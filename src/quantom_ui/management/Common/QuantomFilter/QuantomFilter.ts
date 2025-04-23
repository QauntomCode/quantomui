import { CommonCodeName } from "../../../../database/db";

export interface QuantomFilter {
    FromDate?: string; // ISO string for DateTimeOffset
    ToDate?: string;
    FilterDetail?: QuantoFilterDetail[];
    ItemAttribute?: ItemAttributeQtuantomFilterModel[];
    SelectedReportTemplate?: string;
}


export interface ItemAttributeQtuantomFilterModel {
    AttrCode?: string;
    AttrName?: string;
    AttributeValues?: CommonCodeName[];
}


export interface QuantoFilterDetail {
    FitlerType?: FilterEntities;
    Keys?: CommonCodeName[];
}



export enum FilterEntities
{
    LOCS,
    ITEMS,
    OPERATION,
    CUSTOMERS,
    EMPLOYEES,
    COMPANIES,
    CATEGORIES,
    AREA,
    ROUTE,
    SUPPLIERS,
    GL_CODES,
    BUSINESS_PARTNER,
    INVENTORY_IN_OUT_TYPE,
    ITEM_ATTRIBUTES,
    INVOICES,
    ITEM_TYPES,
    ITEM_PRICE_GROUP,
    USERS,
    ACTIONS,
    FORMS,

}

export enum ReportTemplates { MASTER_REPORT, DETAIL_REPORT, A4Report, _80MM }

export interface FilterType {
    WillEnableFormDate?: boolean;
    WillEnableToDate?: boolean;
    EnabledFiltes?: FilterEntities[];
    ReportTemplates?: ReportTemplates[];
    ReportTemplatList?: string[];
}

export interface FilterEntityQuery
{

    filterEntities?:FilterEntities;
    QFilter?:QuantomFilter;
    ActionNames?:string;

}