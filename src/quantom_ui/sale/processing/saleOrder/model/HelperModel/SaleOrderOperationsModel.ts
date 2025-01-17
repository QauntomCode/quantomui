import { OperationMasterModel } from "../../../../config/saleOperation/model/OperationMasterModel";
import { SaleOrderModel } from "./SaleOrderModel";

export interface SaleOrderOperationsModel {
    Code?: string; // BillNo+OprCode+BpCode
    OrderNo?: string;
    OprCode?: string;
    BpCode?: string;
    Sale?: SaleOrderModel; // Optional as it represents a navigation property
    Operation?: OperationMasterModel; // Optional as it represents a navigation property
}
