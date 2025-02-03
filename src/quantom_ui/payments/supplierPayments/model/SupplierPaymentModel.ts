import { BankModel } from "../../../account/config/bank/model/BankModel";
import { SupplierModel } from "../../../Purchase/Config/Supplier/customer/model/VmSupplier";
import { PurchaseModel } from "../../../Purchase/Processing/Purchase/model/VMPurchaseModel";
import { CustomerPaymentMasterModel, UserAuditModel } from "../../customerReceipts/model/CustomerPaymentReceiptModel";

export interface VmSupplierPaymentsModel {
    Payments?: SupplierPaymentsModel;
    PaymentDetail?: SupplierPaymentsDetailModel[];
    DirectReceiveFrom?: CustomerPaymentMasterModel;
}

export interface SupplierPaymentsDetailModel {
    Code?: string;
    BillNo?: string;
    PrePaid?: number;
    Remaining?: number;
    TotalPayable?: number;
    PaidAmount?: number;
    Discount?: number;
    Purchase?: PurchaseModel;
    Payments?: SupplierPaymentsModel;
}
export interface SupplierPaymentsModel extends UserAuditModel {
    Code?: string;
    Sno?: number;
    ReceipetDate?: Date;
    SuppCode?: string;
    SuppName?: string;
    BillNo?: string;
    PaidAmount?: number;
    DisAmount?: number;
    PrePaid?: number;
    Remaining?: number;
    Freight?: number;
    TotalAmount?: number;
    TodayPaid?: number;
    NotAllocated?: number;
    OldPaid?: number;
    Remarks?: string;
    IsPostedFromPurchase?: boolean;
    PaymentMode?: string;
    PaymentType?: string;
    TransFormName?: string;
    TransNo?: string;
    BankCode?: string;
    BankAccountNo?: string;
    DirectReceiptTransNo?: string;
    Supplier?: SupplierModel;
    Purchase?: PurchaseModel;
    DayClosed?: boolean;
    NotAllocatedAmount?: number;
    OldPurcahsePayments?: number;
    Bank?: BankModel;
    PreBalance?: number;
    RemBalance?: number;
    // CustomerPayment?: CustomerPaymentMaster;
}