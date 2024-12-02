import { SubAccountModel } from "../../subAccount/model/SubAccountModel";


export interface SubSubAccountModel {
  Code?: string;
  Name?: string;
  SubCode?: string;
  SortNumber?: number;
  subAccount?: SubAccountModel; // Assuming SubAccount is another TypeScript class or interface
}
