import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";
import { VoucherModel } from "./VoucherModel";

export interface VoucherDetailModel {
    VCode?: string;
    SNo?: number;
    Code?: string;
    Remarks?: string;
    Debit?: number;
    Credit?: number;
    LocId?: string;
    location?: Location;
    registerAccount?: RegisterAccountModel;
    vocuher?: VoucherModel;
    BPCode?: string;
    DVChild?: string;
}
