import { Sale_ResturantFloorsModel } from "../../ResturantFloors/model/Sale_ResturantFloorsModel";

export interface Sale_ResturantTablesModel {
    Code: string;
    Name: string;
    Description: string;
    FloorId: string;
    Floor?: Sale_ResturantFloorsModel; // Optional as it's a navigation property
}
