import { LocationStoresModel } from "../../../config/LocationStores/model/LocationStoresModel";
import { SetupFormModel as InventoryUnitModel } from "../../../config/unit/model/setupFormModel";

export enum ITEM_SOURCE {
  TRANSACTION_ITEM,
  EMPTY_ITEM,
}

export enum ItemType {
  STOCK_ITEM,
  SERVICE_ITEM,
  KITCHEN_ITEM,
}
export enum InventoryAction {
  Sale,
  SaleReturn,
  SaleOrder,
  Purchase,
  PurchaseReturn,
  PurchaseOrder,
  ViewAble,
  Claim,
  StockAdjustment,
  ITEMS_REFINE,
  STOCK_ISSUE,
  
}

export interface CommonInvDetailModel {
  Qty?: number;
  Price?: number;
  Amount?: number;
  NetAmount?: number;
  ItemCode?: string;
  ItemName?: string;
  ItemName_NotHave_In_Inventory?: string;
  BatchNo?: string;
  UnitCode?: string;
  UnitName?: string;
  TaxRate?: number;
  TaxAmount?: number;
  DisRate?: number;
  DisAmount?: number;
  CompCode?: string;
  IsScheme?: boolean;
  IsSchemeAuto?: boolean;
  SchemeNo?: string;
  Scheme?: number;
  StoreId?: string;
  PriceUnitCode?: string;
  CustomSortNo?: number;
  IsHandled?: boolean;
  ITEM_SOURCE?: ITEM_SOURCE;
  MRP?: number;
  PriceUnitName?: string;
  PriceUnitRate?: number;
  PriceUnitQty?: number;
  PriceUnit?: InventoryUnitModel | null;
  StoreName?: string;
  LocationStore?: LocationStoresModel | null;
  ExtarSchemeAmount?: number;
  InventoryAction?: InventoryAction | null;
  CustCode?: string;
  Locid?: string;
  StockQty?: number;
  ReservedQty?: number;
  CatCode?: string;
  Unit?: InventoryUnitModel | null;
  // Item?: InventoryItems | null;
  TransUnitCode?: string;
  TransUnitName?: string;
  TransQty?: number;
  TransPrice?: number;
  TransUnit?: InventoryUnitModel;
  Item_Type?: ItemType | null;
  TransDate?: Date;
  PackSize?: string;
  PackRate?: number;
  TaxLine?: TaxLineDTOModel | null;
  ServiceStatus?: string;
  ServiceDate?: Date;
  IsDiscountPercentChanged?: boolean;
  ShouldChangeLineTotals?: boolean;
}

export class TaxLineDTOModel {
  TaxQty?: number;
  ItemPrice?: number;
  BeforeTaxAmount?: number;
  InclusiveTaxAmount?: number;
  ExclusiveTaxAmount?: number;
  TotalTaxAmount?: number;
  TaxDiscount?: number;
  AfterTaxAmount?: number;
  NetAmount?: number;
  EachUnitInclusiveTaxAmount?: number;
  EachUnitExclusiveTaxAmount?: number;
}
