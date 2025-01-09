import { SaleAreaModel } from "../../SaleArea/model/SaleAreaModel";

export interface SaleRouteModel {
    Code?: string;
    Name?: string;
    AreaCode?: string;
    AreaName?: string; // [NotMapped] in C#.
    Sales_Area?: SaleAreaModel; // Foreign key reference in C#.
}
