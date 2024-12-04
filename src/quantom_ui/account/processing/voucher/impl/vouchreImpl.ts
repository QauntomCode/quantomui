import { safeParseToRequestDate } from "../../../../../CommonMethods";
import { HttpResponse, QuantomGET, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { ACCOUNT_VOUCHER_DELETE_URL, ACCOUNT_VOUCHER_GET_ALL_URL, ACCOUNT_VOUCHER_GET_ONE_URL, ACCOUNT_VOUCHER_INSERT_URL } from "../../../account_urls";
import { VMVoucherModel } from "../model/VmVoucherModel";

// import { SubAccountModel } from "../model/SubAccountModel";

export const VoucherInsert=async(model?:VMVoucherModel):Promise<HttpResponse<VMVoucherModel>>=>{

   let url= ACCOUNT_VOUCHER_INSERT_URL;
   var nModel={...model}
 
   // alert(model?.Date)
   if(nModel.voucher && nModel?.voucher?.VDate===undefined){
      nModel.voucher.VDate=new Date();
   }
   // alert(nModel?.Date)
   let res= await QuantomPOST<VMVoucherModel>(url,true,nModel);
   return res;
}

export const VoucherDelete=async(model?:VMVoucherModel):Promise<HttpResponse<VMVoucherModel>>=>{
   let res= await QuantomPOST<VMVoucherModel>(ACCOUNT_VOUCHER_DELETE_URL,true,model?.voucher);
   return res  ;
}


export const VoucherGetOne=async(subCode?:string):Promise<HttpResponse<VMVoucherModel>>=>{
   let res= await QuantomGET<VMVoucherModel>(ACCOUNT_VOUCHER_GET_ONE_URL+`?code=${subCode}`,true);
   return res;
}


export const VoucherGetAll=async(fromDate?:Date,toDate?:Date,searchTex?:string,locCode?:string):Promise<any[]>=>{
   let fDate=safeParseToRequestDate(fromDate?? new Date());
   let tDate=safeParseToRequestDate(toDate?? new Date());
   let url=ACCOUNT_VOUCHER_GET_ALL_URL+`?fromDate=${fDate}&toDate=${tDate}&SearchText=${searchTex}&locid=${locCode}`
   
   let res= await QuantomGET<any[]>(url,true);
   return res?.Response??[] ;
}