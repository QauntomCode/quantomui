import { CommonCodeName } from "../../quantom_comps/Quantom_Lov";

export interface QuantomFilterOldModel {
    FromDate?: Date; // Use string for DateTimeOffset; consider parsing it into a Date object when needed
    ToDate?: Date;
    FilterDetail?: QuantoFilterDetail[];
    ItemAttribute?: ItemAttributeQtuantomFilterModel[];
    SelectedReportTemplate?: string;
  }

  interface QuantoFilterDetail {
    FitlerType?: FilterEntities; // Assuming FilterEntities is an enum or another model
    Keys?: CommonCodeName[];
  }

  export enum FilterEntities {
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
  
  interface ItemAttributeQtuantomFilterModel {
    AttrCode?: string;
    AttrName?: string;
    AttributeValues?: CommonCodeName[];
  }