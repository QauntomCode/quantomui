import { InventoryGroupsModel } from "../../config/InventoryGroups/Model/InventoryGroupsModel";

export interface InventoryGroupValuesModel {
    GroupCode?: string;
    ValueCode?: string;
    ValueName?: string;
    GroupName?: string;
    Groups?: InventoryGroupsModel;
}