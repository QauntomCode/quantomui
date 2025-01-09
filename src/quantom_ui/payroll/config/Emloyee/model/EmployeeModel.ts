import { RegisterAccountModel } from "../../../../account/config/registerAccount/model/registerAccountModel";
import { BusinessPartnerModel } from "../../BusinessPartner/model/BusinessPartnerModel";
import { DepartmentsModel } from "../../department/model/DepartmentsModel";
import { DesignationsModel } from "../../designation/DesignationsModel";

export interface EmployeeModel {
    EmpCode?: string;
    EmpName?: string;
    FName?: string;
    GLCode?: string;
    DsgCode?: string;
    DptCode?: string;
    Email?: string;
    Address?: string;
    CellNo?: string;
    Remarks?: string;
    Salary?: number;
    SalaryType?: string;
    BPCode?: string;
    registerAccount?: RegisterAccountModel; // Foreign key reference in C#.
    department?: DepartmentsModel; // Foreign key reference in C#.
    designation?: DesignationsModel; // Foreign key reference in C#.
    BusinessPartner?: BusinessPartnerModel; // Foreign key reference in C#.
}
