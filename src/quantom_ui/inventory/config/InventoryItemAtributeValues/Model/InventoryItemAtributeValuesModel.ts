import { InventoryAttributesModel } from "../../InventoryAttributes/Model/InventoryAttributes";

export interface InventoryAttributeValuesModel {
    AttrValueCode?: string;
    AttrValueName?: string;
    AttrValueAbberName?: string;
    AttrCode?: string;
    InActive?: boolean;
    Attributes?: InventoryAttributesModel;
}