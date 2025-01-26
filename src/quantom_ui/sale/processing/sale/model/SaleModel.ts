import { UserModel } from "../../../../../Config/User/model/user";
import { EmployeeModel } from "../../../../payroll/config/Emloyee/model/EmployeeModel";
import { TaxAggregationModel } from "../../../../tax/CommonModels/TaxAggregationModel";
import { CustomerModel } from "../../../config/customer/model/CustomerModel";

export interface SaleModel {
  BillNo?: string;
  BillDate?: Date; // DateTime in C# is typically represented as string in TypeScript.
  DueDate?: string | null; // Nullable DateTime in C# is represented as string | null.
  BillType?: string;
  CustCode?: string;
  OrderNo?: string;
  Remarks?: string;
  ExtraDiscount?: number;
  ExtraScheme?: number;
  Freight?: number;
  UId?: string;
  TotalReceiveable?: number;
  TransTime?: string; // Initialized to DateTime.Now in C#.

  TotalReceived?: number; // [NotMapped] indicates this is not part of the database schema.
  customer?: CustomerModel; // Foreign key reference in C#.
  LocId?: string;
  location?: Location; // Foreign key reference in C#.
  user?: UserModel; // Foreign key reference in C#.
  SManEmpCode?: string;
  DriverEmpCode?: string;
  SaleMan?: EmployeeModel; // Foreign key reference in C#.
  Driver?: EmployeeModel; // Foreign key reference in C#.

  DayClosed?: boolean; // [NotMapped] in C#.
  CustName?: string; // [NotMapped] in C#.
  LocName?: string; // [NotMapped] in C#.
  PreBalance?: number; // [NotMapped] in C#.
  Username?: string; // [NotMapped] in C#.
  IsCounterSale?: boolean; // Defaults to false in C#.
  TaxInfo?: TaxAggregationModel; // [NotMapped] in C#.
}
