import { RegisterAccountModel } from "../../registerAccount/model/registerAccountModel";

export interface BankModel {
    Code?: string;
    Name?: string;
    Address?: string;
    Remarks?: string;
    PhNo?: string;
    Location?: string;
    ManagerName?: string;
    ManagerCellNo?: string;
}

export interface BankAccountsModel {
    AccountNo?: string;
    BankCode?: string;
    AccountDate?: Date;
    AccountType?: string;
    GlCode?: string;
    Remarks?: string;
    Bank?: BankModel;
    RegisterAccount?: RegisterAccountModel;
}