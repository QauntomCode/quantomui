import { CommonInvDetailModel, InventoryAction } from "./CommonInvDetailModel";
import { InventoryIODTOModel } from "./InventoryIODTOModel";
export enum INVENTORY_PERFORMED_ACTION {
  NONE,
  NEW,
  EDIT,
  DELETE,
}
export interface CommonInvDetailActionQueryModel {
  OldItems?: InventoryIODTOModel;
  WorkingItem?: CommonInvDetailModel;
  InventoryForm?: InventoryAction;
  PERFORMED_ACTION?: INVENTORY_PERFORMED_ACTION;
  BillInfo?: CommonInvDetailActionQueryBillInfo;
}

export interface CommonInvDetailActionQueryResponse {
  InventoryDTO?: InventoryIODTOModel;
  Message?: string;
}

export interface CommonInvDetailActionQueryBillInfo {
  VendorCode?: string;
  BillDate?: Date;
  LocId?: string;
}
