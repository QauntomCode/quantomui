import { RegisterAccountModel } from "../../../../account/config/registerAccount/model/registerAccountModel";
import { CustomerGradeModel } from "../../customerGrade/model/CustomerGradeModel";
import { SaleRouteModel } from "../../SaleRoute/model/SaleRouteModel";

export interface CustomerModel {
    CustCode?: string;
    UrduName?: string;
    CustName?: string;
    CompanyName?: string;
    FatherName?: string;
    GLCode?: string;
    Email?: string;
    BusinessAdress?: string;
    Address?: string;
    CellNo?: string;
    BusinessCell?: string;
    Remarks?: string;
    ContactPerson?: string;
    NIC?: string;
    InActive?: boolean;
    RouteCode?: string;
    RouteName?: string; // [NotMapped] in C#.
    BPCode?: string;
    Sales_Route?: SaleRouteModel; // Foreign key reference in C#.
    GradeCode?: string;
    CustomerGrade?: CustomerGradeModel; // Foreign key reference in C#.
    registerAccount?: RegisterAccountModel; // Foreign key reference in C#.
    Balance?: number; // [NotMapped] in C#.
    //BusinessPartner?: BusinessPartner; // Foreign key reference in C#.
    TaxId?: string;
    AreaCode?: string; // [NotMapped] in C#.
    AreaName?: string; // [NotMapped] in C#.
    LastDueDate?: string | null; // Nullable DateTime in C#.
    LastPaymentDays?: number; // [NotMapped] in C#.
}
