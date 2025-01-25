import { LocationModel } from "../../../../Settings/Location/Model/LocationModel";
import { CustomerModel } from "./CustomerModel";

export interface CustomerLocationModel{
    CustCode?:string;
    LocId?:string;
    LocName?:string;
    customer?:CustomerModel;
    location?:LocationModel
}