import { CommonInvDetailModel } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { InventoryIOTaxDTOModel } from "../../../../tax/CommonModels/InventoryIOTaxDTOModel";
import { Sale_ResturantDeliveryManDetailModel } from "./HelperModel/Sale_ResturantDeliveryManDetailModel";
import { Sale_SalePOSCustInfoModelModel } from "./HelperModel/Sale_SalePOSCustInfoModel";
import { Sale_SaleResturantSaleType } from "./HelperModel/Sale_SaleResturantSaleTypeModel";
import { Sale_SaleResturantTableModel } from "./HelperModel/Sale_SaleResturantTableModel";
import { SaleOrder_ResturantStatusModel } from "./HelperModel/SaleOrder_ResturantStatusModel";
import { SaleOrderModel } from "./HelperModel/SaleOrderModel";
import { SaleOrderOperationsModel } from "./HelperModel/SaleOrderOperationsModel";
import { SaleOrderPaymentTermsModel } from "./HelperModel/SaleOrderPaymentTermsModel";

export interface VmSaleOrderModel {
    SaleOrder?: SaleOrderModel;
    SaleOrderDetails?: CommonInvDetailModel[];
    SaleOrderOperations?: SaleOrderOperationsModel[];
    TaxDetail?: InventoryIOTaxDTOModel[];
    SaleOrderPaymentTerms?: SaleOrderPaymentTermsModel[];
    ResturantSaleType?: Sale_SaleResturantSaleType;
    ResturantTable?: Sale_SaleResturantTableModel[];
    CustInfo?: Sale_SalePOSCustInfoModelModel;
    Status?: SaleOrder_ResturantStatusModel;
    DeliveryManInfo?: Sale_ResturantDeliveryManDetailModel;
}
