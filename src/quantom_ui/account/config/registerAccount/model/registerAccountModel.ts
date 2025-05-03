// import { SubAccountModel } from "../../subAccount/model/SubAccountModel";
import { SubSubAccountModel } from "../../subSubAccount/model/subSubAccountModel";


export interface RegisterAccountModel {
  Code?: string;
  Name?: string;
  SubSubCode?: string;
  SortNumber?: number;
  subSubAccount?: SubSubAccountModel; // Assuming SubAccount is another TypeScript class or interface
  Balance?:number;
}
