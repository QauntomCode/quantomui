import { isNullOrEmpty } from "../../../../CommonMethods";
import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../HTTP/QuantomHttpMethods";
import { VmSupplierModel } from "../../../Purchase/Config/Supplier/customer/model/VmSupplier";
import { SupplierPaymentsModel } from "../model/SupplierPaymentModel";

const SUPPLIER_PAYMENT_INSERT = "Payments/SupplierPayments/Insert";
const SUPPLIER_PAYMENT_UPDATE = "Payments/SupplierPayments/Update";
const SUPPLIER_PAYMENT_GET_ALL = "Payments/SupplierPayments/GetAllV1";
const SUPPLIER_PAYMENT_DELETE = "Payments/SupplierPayments/Delete";
const SUPPLIER_PAYMENT_GET_ONE = "Payments/SupplierPayments/GetOne";



export const SupplierPaymentGetOne=(code?:string):Promise<HttpResponse<VmSupplierModel>>=>{
    let res=   QuantomGET<VmSupplierModel>(SUPPLIER_PAYMENT_GET_ONE+"?Code="+code,true);
    return res;
}
export const SupplierPaymentDeleteMethod=(model?:VmSupplierModel):Promise<HttpResponse<VmSupplierModel>>=>{
    let res=   QuantomPOST<VmSupplierModel>(SUPPLIER_PAYMENT_DELETE,true,model);
    return res;
}

export const SupplierPaymentInsertMethod=(model?:VmSupplierModel):Promise<HttpResponse<VmSupplierModel>>=>{
    let url= SUPPLIER_PAYMENT_INSERT;
    if(!isNullOrEmpty(SUPPLIER_PAYMENT_UPDATE)){
        url= SUPPLIER_PAYMENT_UPDATE;
    }
    let res=   QuantomPOST<VmSupplierModel>(url,true,model);
    return res;
}


export const CustomerPaymentReceiptGetAll=async(fromDate?:Date,toDate?:Date,locId?:string,suppCode?:string):Promise<SupplierPaymentsModel[]>=>
{
    let data={FromDate:fromDate,ToDate:toDate,LocId:locId,SuppCode:suppCode};
    let res=await QuantomPOST<SupplierPaymentsModel[]>(SUPPLIER_PAYMENT_GET_ALL,true,data);
    return res?.Response??[];

}