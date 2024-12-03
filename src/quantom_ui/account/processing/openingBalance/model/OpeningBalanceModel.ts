// import { SubAccountModel } from "../../subAccount/model/SubAccountModel";

import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";

export interface OpeningBalanceModel {
  OpCode?: string;
  Code?: string;
  Date?: Date; // Dates are usually represented as strings in TypeScript.
  Remarks?: string;
  Debit?: number;
  Credit?: number;
  UId?: string;
  LocCode?: string;
  BPCode?: string;
  Amount?:number;

  registerAccount?: RegisterAccountModel;
  location?: Location;
  // user?: User;
  // BP?: BusinessPartner;
}
