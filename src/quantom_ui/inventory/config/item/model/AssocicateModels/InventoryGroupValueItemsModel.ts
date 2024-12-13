import { InventoryGroupValuesModel } from "../../../../InventoryGroupValues/Model/InventoryGroupValuesModel";
import { InventoryGroupsModel } from "../../../InventoryGroups/Model/InventoryGroupsModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryGroupValueItemsModel {
    GroupCode?: string;
    ValueCode?: string;
    ItemCode?: string;
    Group?: InventoryGroupsModel;
    Item?: InventoryItemsModel;
    GroupValue?: InventoryGroupValuesModel;
    GroupName?: string;
    ValueName?: string;
}