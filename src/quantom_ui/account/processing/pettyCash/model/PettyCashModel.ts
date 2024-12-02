// import { SubAccountModel } from "../../subAccount/model/SubAccountModel";

import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";
 enum Paymentype { Paid,Received}
export interface OpeningBalanceModel {
   Code?:string;
   Remarks?:string;
   Date?:Date;
   LocName?:string;
   GLName?:string;
   LocId?:string;
   TotalAmount?:string;
   CashAccount?:string;
   GlAccount?:string;
   PayType?:Paymentype;
   VCode?:string;
   cashRegisterAccount?:RegisterAccountModel;
   glAccountRegisterAccount?:RegisterAccountModel;


}
