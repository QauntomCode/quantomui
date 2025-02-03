import { UserModel } from "../../../../Config/User/model/user";
import { BankAccountsModel, BankModel } from "../../../account/config/bank/model/BankModel";
import { CustomerModel } from "../../../sale/config/customer/model/CustomerModel";
import { SaleModel } from "../../../sale/processing/sale/model/SaleModel";



export interface VmCustomerPaymentModel extends BaseVMModel {
    master?: CustomerPaymentMasterModel; // Optional
    details?: CustomerPaymentReceiptsModel[]; // Optional
    Bank?: CustomerPaymentBank; // Optional
    //DirectPaidSupplier?: SupplierPayments; // Optional
}


export class CustomerPaymentBank {
    Code?: string;
    BankCode?: string;
    AccountNo?: string;
    ChequeNo?: string;
    Bank?: BankModel;
    Account?: BankAccountsModel;
    CustomerPayment?: CustomerPaymentMasterModel;
}

export interface CustomerPaymentReceiptsModel extends UserAuditModel {
    Code?: string;
    Sno?: number;
    ReceipetDate?: Date;
    BillNo?: string;
    ReceivedAmount?: number;
    DisAmount?: number;
    PreReceived?: number;
    Remaining?: number;
    Freight?: number;
    TotalAmount?: number;
    Remarks?: string;
    IsPostedFromSale?: boolean;
    Sale?: SaleModel;
    DayClosed?: boolean;
    BillDate?: Date;
    DueDate?: Date;
}


export interface CustomerPaymentReceiptDtoModel {
    Code?: string;
    RefNo?: string;
    ReceiptDate?: Date;
    CustCode?: string;
    TotalReceive?: number;
    Discount?: number;
    Remarks?: string;
    PayMode?: string;
    IsPostedFromSale?: boolean;
    CustName?: string;
    TodayCollection?: number;
    OldRecovery?: number;
    IsAdvance?: boolean;
    IsCameFromController?: boolean;
    CustGlCode?: string;
    ItemName?: string;
    ItemCode?: string;
    Column1?: string;
    Column2?: string;
    Column3?: string;
    Column4?: string;
    Column5?: string;
    Column6?: string;
}



export interface CustomerPaymentMasterModel extends UserAuditModel {
    Code?: string;
    ReceiptDate?: Date;
    RefNo?: string;
    CustCode?: string;
    TotalReceive?: number;
    Discount?: number;
    Remarks?: string;
    PayMode?: string;
    Customer?: CustomerModel;
    IsPostedFromSale?: boolean;
    CustName?: string;
    TodayCollection?: number;
    OldRecovery?: number;
    IsAdvance?: boolean;
    IsCameFromController?: boolean;
    CustGlCode?: string;
    PreBalance?: number;
    RemBalance?: number;
}


export interface UserAuditModel {
    Uid?: string;
    TransTime?: Date 
    TransState?: string;
    LocId?: string;
    TurnsOfEdit?: number;
    User?: UserModel;
    Location?: Location;
    UserName?: string;
    LocName?: string;
}








export interface BaseVMModel {
    MenuCode?: string; // Optional
    BankDetail?: BankTransactionInfoModel[]; // Optional
}

export interface BankTransactionInfoModel {
    BankIoCode?: string; // Optional
    PaymentType?: string; // Optional (e.g., Cheque, Online)
    TransType?: string; // Optional (e.g., Pay, Receive)
    Amount?: number; // Optional (double in C#)
    BankCode?: string; // Optional
    BankName?: string; // Optional
    AccountNo?: string; // Optional
    VendorBank?: string; // Optional
    TransNo?: string; // Optional
    MenuCode?: string; // Optional
    FormName?: string; // Optional
    ChequeNo?: string; // Optional
}