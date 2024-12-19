import { LocationModel } from "../../../../../Settings/Location/Model/LocationModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemLocationsModel {
    ItemCode?: string;
    LocCode?: string;
    Items?: InventoryItemsModel;
    Location?: LocationModel;
}