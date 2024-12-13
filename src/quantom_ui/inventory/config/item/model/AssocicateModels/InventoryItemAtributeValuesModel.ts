import { InventoryAttributesModel } from "../../../InventoryAttributes/Model/InventoryAttributes";
import { InventoryAttributeValuesModel } from "../../../InventoryItemAtributeValues/Model/InventoryItemAtributeValuesModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemAtributeValuesModel {
    AttrCode?: string;
    ItemCode?: string;
    ValueCode?: string;
    Attributes?: InventoryAttributesModel;
    AttributeValues?: InventoryAttributeValuesModel;
    Item?: InventoryItemsModel;
}