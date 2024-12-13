import { TaxTypesModel } from "../../../../../TaxModule/config/TaxType/Model/TaxTypesModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export interface InventoryItemTaxesModel {
    ItemCode?: string;
    TypeCode?: string;
    FormName?: string;
    TaxRate?: number;
    TaxAmount?: number;
    TaxTypes?: TaxTypesModel;
    Item?: InventoryItemsModel;
    TaxTypeDescription?: string;
}