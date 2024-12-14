import { InventoryAttributeValuesModel } from "../../InventoryItemAtributeValues/Model/InventoryItemAtributeValuesModel";
import { SetupFormBulkResponseModel } from "../../unit/model/SetupFormBulkResponse";
import { InventoryItemsReportUnitsModel } from "./AssocicateModels/Inventory_ItemsReportUnitsModel";
import { InventoryItemTaxesModel } from "./AssocicateModels/Inventory_ItemTaxesModel";
import { InventoryItemUnitsModel } from "./AssocicateModels/Inventory_ItemUnitsModel";
import { InventoryItemUnitsPriorityModel } from "./AssocicateModels/Inventory_ItemUnitsPriorityModel";
import { InventoryGroupValueItemsModel } from "./AssocicateModels/InventoryGroupValueItemsModel";
import { InventoryItemLocationsModel } from "./AssocicateModels/InventoryItemLocationsModel";
import { InventoryItemsBarcodesModel } from "./AssocicateModels/InventoryItemsBarcodesModel";
import { InventoryItemStockReplenishmentModel } from "./AssocicateModels/InventoryItemStockReplenishmentModel";
import { InventoryItemsModel } from "./InventoryItemsModel";

export class VMInventoryItemsModel {
    Item?: InventoryItemsModel;
    ItemLocation?: InventoryItemLocationsModel[];
    ItemUnits?: InventoryItemUnitsModel[];
    ReportUnits?: InventoryItemsReportUnitsModel[];
    Barcodes?: InventoryItemsBarcodesModel[];
    GroupValueItem?: InventoryGroupValueItemsModel[];
    InventoryItemUnitsPriority?: InventoryItemUnitsPriorityModel[];
    InventoryItemStockReplenishments?: InventoryItemStockReplenishmentModel[];
    InventoryItemAttributes?: InventoryAttributeValuesModel[];
    InventoryItemTaxes?: InventoryItemTaxesModel[];
    LocId?: string;
    OpeningQty?: number;
    SetupFormsData?:SetupFormBulkResponseModel[]
}