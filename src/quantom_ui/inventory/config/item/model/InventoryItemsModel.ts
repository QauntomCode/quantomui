import { SetupFormModel } from "../../unit/model/setupFormModel";

export interface InventoryItemsModel {
    ItemCode?: string;
    UrduName?: string;
    ManualCode?: string;
    ItemName?: string;
    ProductName?: string;
    EachUnitName?: string;
    CatCode?: string;
    UnitCode?: string;
    UnitName?: string;
    CompCode?: string;
    BarCode?: string;
    PackQty?: number;
    InActive?: boolean;
    SearchKey?: string;
    Remarks?: string;
    FamilyCode?: string;
    PricGroupCode?: string;
    DefUnitCodeForPrice?: string;
    ItemType?: number;
    InventoryItemType?: SetupFormModel;
    InvGlCode?: string;
    // InventoryAccount?: RegisterAccount;
    CogsGlCode?: string;
    // CogsGlAccount?: RegisterAccount;
    SaleGlCode?: string;
    // SaleGlAccount?: RegisterAccount;
    PurchaseDisGlCode?: string;
    // PurchaseDisGlAccount?: RegisterAccount;
    SaleDisGlCode?: string;
    // SaleDisGlAccount?: RegisterAccount;
    Category?: SetupFormModel;
    Company?: SetupFormModel;
    Family?: SetupFormModel;
    PriceGroup?: SetupFormModel;
}