import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemUnitsPriorityModel {
    FormName?: string;
    ItemCode?: string;
    UnitCode?: string;
    Priority?: number;
    Item?: InventoryItemsModel;
    Unit?: SetupFormModel;
}