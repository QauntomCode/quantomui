import { MainAccountModel } from "../../mainAccount/model/MainAccountModel";

export interface SubAccountModel {
    Code?: string;        // Represents the unique code of the SubAccount
    Name?: string;        // Represents the name of the SubAccount
    MainCode?: string;    // Foreign key linking to the MainAccount
    SortNumber?: number;  // Sorting order for the SubAccount
    mainAccount?:MainAccountModel; // Reference to the related MainAccount
  }