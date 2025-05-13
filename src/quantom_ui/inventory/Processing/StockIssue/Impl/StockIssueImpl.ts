import { 
    HTTP_RESPONSE_TYPE, HttpResponse, 
    QuantomGET, QuantomPOST
 } from "../../../../../HTTP/QuantomHttpMethods";
 import { StockIssue, VmStockIssueReceive } from "../Model/Issue";
 import { isNullOrEmpty } from "../../../../../CommonMethods";
 import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import dayjs from "dayjs";

 const STOCK_ISSUE_INSERT_URL = "Inventory/StockIssueRec/Insert";
 const STOCK_ISSUE__UPDATE_URL = "Inventory/StockIssueRec/update";
 const STOCK_ISSUE__DELETE_URL = "Inventory/StockIssueRec/delete";
 const STOCK_ISSUE__GET_ALL_URL = "Inventory/StockIssueRec/getAll";
 const STOCK_ISSUE__GET_ONE_URL = "Inventory/StockIssueRec/getOne";
 



 export const InsertStockIssue = async (
   issue?: VmStockIssueReceive): Promise<HttpResponse<VmStockIssueReceive>> => {
   let url = STOCK_ISSUE_INSERT_URL;
   if (!isNullOrEmpty(issue?.stockIssue?.Code)) {
     url = STOCK_ISSUE__UPDATE_URL;
   }
   var res = QuantomPOST<VmStockIssueReceive>(url, true, issue, "LOADING");
   return res;
 };
 
 export const DeleteStockIssue = async (
   issue?: VmStockIssueReceive
 ): Promise<HttpResponse<VmStockIssueReceive>> => {
   var res = QuantomPOST<VmStockIssueReceive>(STOCK_ISSUE__DELETE_URL, true, issue?.stockIssue, "LOADING");
   return res;
 };
 
 
 export const GetOneStockIssue = async (code?: string): Promise<HttpResponse<VmStockIssueReceive>> => {
   let res = await QuantomGET<VmStockIssueReceive>(
    STOCK_ISSUE__GET_ONE_URL + `?Code=${code}`,
     true
   );
   
   return res;
 };
 


 export const StockIssueGetAll = async (fromDate?: Date,toDate?: Date,search?: string,  locId?: string):
   Promise<StockIssue[]> => {

   let md: StockIssueGetAllQuery = {
     fromDate: fromDate,
     toDate: toDate,
     text: search,
     locid: locId, };

   let res = await QuantomGET<StockIssue[]>(STOCK_ISSUE__GET_ALL_URL+`?fromDate=${dayjs(md?.fromDate).format("YYYY-MM-DD")}&toDate=${dayjs(md?.toDate).format("YYYY-MM-DD")}&locid=${md?.locid}&text=${md?.text}`, true);
   if (res?.ResStatus === HTTP_RESPONSE_TYPE.SUCCESS) {
     return res?.Response ?? [];
   } else {
     ShowQuantomError({
       MessageHeader: "Error",
       MessageBody: res?.ErrorMessage,
     });
   }
 
   return res?.Response ?? [];
 };
 
 export interface StockIssueGetAllQuery {
   fromDate?: Date;
   toDate?: Date;
   text?: string;
   locid?: string;
 }
 