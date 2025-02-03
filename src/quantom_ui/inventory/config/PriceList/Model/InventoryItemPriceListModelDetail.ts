import { SupplierModel } from "../../../../Purchase/Config/Supplier/customer/model/VmSupplier";
import { InventoryItemsModel } from "../../item/model/InventoryItemsModel";
import { SetupFormModel } from "../../unit/model/setupFormModel";

export interface InventoryItemPriceListDetailModel {
  Sno?: number;
  ItemCode?: string;
  PriceListCode?: string;
  UnitCode?: string;
  Price?: number;
  OldPrice?: number;
  EffectedDate?: Date;
  EffectedTime?: string; // TimeSpan can be represented as a string
  MaxexportDiscountRate?: number;
  ApplyDiscountRate?: number;
  AdjustmentType?: string;
  MaximumAdjustment?: number;
  FlatDiscount?: number;
  MaxDiscount?: number;
  MinimumPrice?: number;
  MRP?: number;
  Restrict?: boolean;
  Items?: InventoryItemsModel;
  Unit?: SetupFormModel;
  ItemPriceList?: InventoryItemPriceListModel;
  UnitName?: string;
  ItemName?: string;
  IsPriceUnit?: boolean;
  PriceCameFrom?: string;
  ReletivePrice?: ReleventPricesDetailModel[];
}

export interface ReleventPricesDetailModel {
  CameFrom?: string;
  Remarks?: string;
  Price?: number;
  ItemCode?: string;
}

export enum PriceListType {
  Sale,
  Purchase,
}

export class InventoryItemPriceListModel {
  Code?: string;
  EffectedDate?: Date;
  EffectedTime?: string; // TimeSpan represented as string
  Remarks?: string;
  ListType?: PriceListType;
  CustGroupPriceListType?: string;
  SuppCode?: string;
  Supplier?: SupplierModel;
  CustomerPriceListType?: SetupFormModel;
}
