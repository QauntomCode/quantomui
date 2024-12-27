import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { InventoryItemsModel } from "../InventoryItemsModel";

export enum UNIT_CALULATION_TYPE {
    MULTIPLY_BY = 1,
    DIVIED_BY = 2
}

export interface InventoryItemUnitsModel {
    ItemCode?: string;
    UnitCode?: string;
    UnitName?: string;
    BarCode?: string;
    IsPrimary?: boolean;
    CanSale?: boolean;
    CanPurchase?: boolean;
    PrimaryUnits?: number;
    CalculationType?: UNIT_CALULATION_TYPE; // Divided By, Multiply By
    CalucltionNumber?: number;
    CalculationTypeDesc?: string;
    Item?: InventoryItemsModel;
    Unit?: SetupFormModel;
    PUnitName?:string;
}