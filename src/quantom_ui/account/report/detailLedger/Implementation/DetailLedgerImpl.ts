import { HttpResponse, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods";
import { QuantomFilterOldModel } from "../../../../../QuantomReportOld/model/QuantomFilterOldModel";
import { ACCOUNT_REPORT_LEDGER_DETAIL_DATA_URL } from "../../../account_urls";
import { DetailLedgerModel } from "../model/DetailLedgerModel";


export const getLedgerDetail=async(query?:QuantomFilterOldModel):Promise<HttpResponse<DetailLedgerModel[]>>=>{
    let res= await QuantomPOST<DetailLedgerModel[]>(ACCOUNT_REPORT_LEDGER_DETAIL_DATA_URL,true,query);
    return res;
 }