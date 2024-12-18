import { LocationModel } from "../../../../../Settings/Location/Model/LocationModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemStockReplenishmentModel {
    ItemCode?: string;
    LocCode?: string;
    MinQty?: number;
    MaxQty?: number;
    GraceQty?: number;
    GraceDays?: number;
    Item?: InventoryItemsModel;
    Location?: LocationModel;
}