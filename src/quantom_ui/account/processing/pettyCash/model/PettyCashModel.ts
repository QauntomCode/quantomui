import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";

export enum PaymentType {
   Paid,
   Received
}

export interface PettyCashModel {
   Code?: string;
   Remarks?: string;
   Date?: Date;
   Uid?: string;
   LocName?: string;
   GLName?: string;
   LocId?: string;
   TotalAmount?: number;
   CashAccount?: string;
   GlAccount?: string;
   PayType?: PaymentType;
   FId?: string;
   VCode?: string;
   Location?: Location;
   // CashRegisterAccount?: RegisterAccountModel;
   glAccountRegisterAccount?: RegisterAccountModel;
   // FinancialYear?: FinancialYear;
   DayClosed?: boolean;
}
