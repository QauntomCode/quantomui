import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemsReportUnitsModel {
    UnitCode?: string;
    ItemCode?: string;
    ReportName?: string;
    Unit?: SetupFormModel;
    Item?: InventoryItemsModel;
}