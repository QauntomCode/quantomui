import { HttpResponse, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { QuantomFilterOldModel } from "../../../../../QuantomReportOld/model/QuantomFilterOldModel";
import { ACCOUNT_REPORT_LEDGER_DATA_URL } from "../../../account_urls";
import { LedgerModel } from "../model/LedgerModel";

export const GetLedgerData=async(query?:QuantomFilterOldModel):Promise<HttpResponse<LedgerModel[]>>=>{
    let res= await QuantomPOST<LedgerModel[]>(ACCOUNT_REPORT_LEDGER_DATA_URL,true,query);
    return res;
 }