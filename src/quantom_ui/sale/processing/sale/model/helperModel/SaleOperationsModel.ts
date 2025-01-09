import { BusinessPartnerModel } from "../../../../../payroll/config/BusinessPartner/model/BusinessPartnerModel";
import { EmployeeModel } from "../../../../../payroll/config/Emloyee/model/EmployeeModel";
import { OperationMasterModel } from "../../../../config/saleOperation/model/OperationMasterModel";
import { SaleModel } from "../SaleModel";

export interface SaleOperationsModel {
    Code?: string;
    BillNo?: string;
    OprCode?: string;
    EmpCode?: string;
    BpCode?: string;
    Sale?: SaleModel; // Foreign key reference in C#.
    Operation?: OperationMasterModel; // Foreign key reference in C#.
    Partner?: BusinessPartnerModel; // Foreign key reference in C#.
    Employees?: EmployeeModel; // Foreign key reference in C#.
    BPName?: string; // [NotMapped] in C#.
    OprName?: string; // [NotMapped] in C#.
}
