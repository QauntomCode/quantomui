import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";

export enum Paymentype {
   Paid = "Paid",
   Received = "Received"
}

export class PettyCashModel {
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
   PayType?: Paymentype;
   FId?: string;
   VCode?: string;
   Location?: Location;
   // CashRegisterAccount?: RegisterAccountModel;
   GlAccountRegisterAccount?: RegisterAccountModel;
   // FinancialYear?: FinancialYear;
   DayClosed?: boolean;
}
