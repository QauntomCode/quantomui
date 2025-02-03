import { UserModel } from "../../../../../Config/User/model/user";
import { CommonInvDetailModel } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { InventoryItemsModel } from "../../../../inventory/config/item/model/InventoryItemsModel";
import { BusinessPartnerModel } from "../../../../payroll/config/BusinessPartner/model/BusinessPartnerModel";
import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";
import { SupplierModel } from "../../../Config/Supplier/customer/model/VmSupplier";

export interface VMPurchaseModel {
  purchase?: PurchaseModel; // Optional
  purchaseDetails?: CommonInvDetailModel[]; // Optional
  FreightCompany?: PurchaseFreightModel[]; // Optional
  ItemExpiryDetails?: ItemExpiryDetailModel[]; // Optional
  DirectExpenses?: VMDirectExpensesModel; // Optional
}

export interface PurchaseModel {
  BillNo?: string; // Key
  BillDate?: Date; // Column(TypeName = "Date")
  TransTime?: string; // TimeSpan is represented as a string in TypeScript
  SuppBillNo?: string; // Optional
  SuppBillDate?: Date; // Column(TypeName = "Date")
  DueDate?: Date; // Optional (nullable in C#)
  SuppCode?: string; // Optional
  PONo?: string; // Optional
  Remarks?: string; // Optional
  Freight?: number; // double in C#
  ExtraDiscount?: number; // double in C#
  ExtraScheme?: number; // double in C#
  NetTotal?: number; // double in C#
  UId?: string; // Optional
  supplier?: SupplierModel; // Optional (ForeignKey relationship)
  LocId?: string; // Optional
  location?: Location; // Optional (ForeignKey relationship)
  user?: UserModel; // Optional (ForeignKey relationship)
  PaidAmount?: number; // Optional (NotMapped in C#)
  DayClosed?: boolean; // Optional (NotMapped in C#)
}

interface PurchaseFreightModel {
  BillNo: string;
  SuppCode: string;
  FreightAmount: number; // double in C#
  PaidAmount: number; // double in C#
  Supplier?: SupplierModel; // Optional (ForeignKey relationship)
  purchase?: PurchaseModel; // Optional (ForeignKey relationship)
}

interface ItemExpiryDetailModel {
  LocId: string;
  ItemCode: string;
  SNo: number;
  SystemBatchNo: string;
  TransNo: string;
  MenuCode: string;
  UserBatchNo: string;
  Qty: number; // double in C#
  ExpiryDate?: Date; // Optional (nullable in C#)
  ItemName?: string; // Optional (NotMapped in C#)
  Item?: InventoryItemsModel; // Optional (ForeignKey relationship)
  Location?: LocationModel; // Optional (ForeignKey relationship)
}

export interface VMDirectExpensesModel {
  Expense?: FormDirectExpenses[];
}

export interface FormDirectExpenses {
  Code?: string;
  LocId?: string;
  Date?: Date;
  BPCode?: string;
  BPName?: string;
  InvoiceTypeCode?: string;
  InvoiceTypeName?: string;
  InvoiceAmount?: number;
  MenuCode?: string;
  TransNo?: string;
  TransRemarks?: string;
  TransVendorCode?: string;
  TransVendorName?: string;
  TransVendorType?: string;
  TransAmount?: number;
  Location?: Location;
  BusinessPartner?: BusinessPartnerModel;
  FormName?: string;
  PaidAmount?: number;
  RemainingAmount?: number;
  NowPaid?: number;
  Status?: string;
  InvoiceNo?: string;
}
