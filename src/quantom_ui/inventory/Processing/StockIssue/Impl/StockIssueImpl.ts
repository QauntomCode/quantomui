import { 
    HTTP_RESPONSE_TYPE, HttpResponse, 
    QuantomGET, QuantomPOST
 } from "../../../../../HTTP/QuantomHttpMethods";
 import { VmStockIssueReceive } from "../Model/Issue";
 import { isNullOrEmpty } from "../../../../../CommonMethods";
 import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";

 const STOCK_ISSUE_INSERT_URL = "Inventory/StockIssueRec/Insert";
 const STOCK_ISSUE__UPDATE_URL = "Inventory/StockIssueRec/update";
 const STOCK_ISSUE__DELETE_URL = "Inventory/StockIssueRec/delete";
 const STOCK_ISSUE__GET_ALL_URL = "/api/Inventory/StockIssueRec/getAll";
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
 
 