import { VoucherDetailModel } from "./VoucherDetailModel";
import { VoucherModel } from "./VoucherModel";

export interface VMVoucherModel {
    voucher?: VoucherModel;
    details?: VoucherDetailModel[];
}
