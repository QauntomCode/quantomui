import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemsBarcodesModel {
    ItemCode?: string;
    UnitCode?: string;
    BarCode?: string;
    InActive?: boolean;
    Item?: InventoryItemsModel;
    Unit?: SetupFormModel;
}
