import { DetailLedgerModel } from "../../../../account/report/detailLedger/model/DetailLedgerModel";
import { UserAuditModel } from "../../../../payments/customerReceipts/model/CustomerPaymentReceiptModel";

export interface Config_TransLogDTO extends Config_TransLog {
  BpName?: string;
  Remarks?: string;
  MasterAmount?: string;
  ItemName?: string;
  UnitName?: string;
  Qty?: number;
  Price?: number;
  DisAmount?: number;
  Amount?: number;
  PackSize?: string;
  PriceUnitRate?: number;
  PackRate?: number;
  InventoryDetail?: DetailLedgerModel[];
}

export interface Config_TransLog extends UserAuditModel {
  Id?: number;
  TransNo?: string;
  MenuCode?: string;
  Pkey?: string;
  Log?: string;
  NameSpace?: string;
  // UserMenu?: Menu;
  FormName?: string;
  Amount?: number;
  AmountType?: string;
  BpCode?: string;
  BpType?: string;
  BpLabel?: string;
  PreStateJson?: string;
  LogReviewStatus?: string;
}
