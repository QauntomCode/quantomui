import { Sale_ResturantTablesModel } from "../../../../config/Resturant/ResturantTables/model/Sale_SaleResturantTableModel";

export interface Sale_SaleResturantTableModel {
    TransNo?: string;
    MenuCode?: string;
    TableNo?: string;
    Table?: Sale_ResturantTablesModel; // Optional as it's a navigation property
}