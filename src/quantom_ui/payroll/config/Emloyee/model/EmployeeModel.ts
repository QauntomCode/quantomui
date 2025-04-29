import { RegisterAccountModel } from "../../../../account/config/registerAccount/model/registerAccountModel";
import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";
import { BusinessPartnerModel } from "../../BusinessPartner/model/BusinessPartnerModel";
import { DepartmentsModel } from "../../department/model/DepartmentsModel";
import { DesignationsModel } from "../../designation/model/DesignationsModel";

export interface VmEmployee {
  employee?: EmployeeModel;
  locations?: EmployeeLocation[] | null;
  SalaryTemplate?: SalaryTemplate;
}

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
    registerAccount?:RegisterAccountModel; // Foreign key reference in C#.
    department?: DepartmentsModel; // Foreign key reference in C#.
    designation?: DesignationsModel; // Foreign key reference in C#.
    BusinessPartner?: BusinessPartnerModel; // Foreign key reference in C#.
}
  
  export interface EmployeeLocation {
    EmpCode?: string | null;
    LocId?: string | null;
    LocName?: string | null;
    // employee: EmployeeModel;
    // location: LocationModel;
  }

  export interface SalaryTemplate {
    Template: Template;
    Detail?: SalaryTemplateDetail[] | null;
    EmpCode?: string | null;
    SalaryContract: SalaryContract;
  }
  
 export interface Template {
    Code?: string | null;
    TemplateName?: string | null;
    InActive: boolean;
  }
  
 export interface SalaryTemplateDetail {
    TemplateCode?: string | null;
    SNo: number;
    ParameterCode: number;
    ParameterValue?: string | null;
    Template: Template;
  }
  
 export interface SalaryContract {
    Code?: string | null;
    Name?: string | null;
  }


  
  