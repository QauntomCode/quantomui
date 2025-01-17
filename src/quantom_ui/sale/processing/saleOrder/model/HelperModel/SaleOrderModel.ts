import { UserModel } from "../../../../../../Config/User/model/user";
import { CustomerModel } from "../../../../config/customer/model/CustomerModel";

export interface SaleOrderModel {
    OrderNo?: string;
    OrderDate?: string; // ISO string is used for dates in TypeScript
    CustCode?: string;
    Remarks?: string;
    ExtraDiscount?: number;
    ExtraScheme?: number;
    RecvAm?: number;
    IsReserveStock?: boolean;
    BookingStatus?: string;

    UId?: string;
    customer?: CustomerModel; // Optional if it can be null
    LocId?: string;
    location?: Location; // Optional if it can be null
    user?: UserModel; // Optional if it can be null

    // NotMapped properties
    DayClosed?: boolean; // Optional as it's not mapped in the database
    CustName?: string;   // Optional
    TotalAmount?: number; // Optional
    LocName?: string;    // Optional
    PreBalance?: number; // Optional
    TotalReceiveable?: number; // Optional
    Remaining?: number;  // Optional
}
