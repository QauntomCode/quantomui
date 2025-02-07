import { workerData } from "worker_threads";
import {
  HTTP_RESPONSE_TYPE,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";

const INVENORY_REPORTS_STOCK_REPORT_URL = "Reports/StockReports/GetStockReport";

export const GetStockReport = async (
  locs?: string,
  cats?: string,
  comps?: string,
  items?: string,
  willShowZeroQty?: boolean
): Promise<StockDetailReportModel[]> => {
  const url =
    INVENORY_REPORTS_STOCK_REPORT_URL +
    "?locid=" +
    locs +
    "&catCode=" +
    cats +
    "&compcode=" +
    comps +
    "&ItemCode=" +
    items +
    "&isShowZeroQty=" +
    willShowZeroQty;

  let res = await QuantomGET<StockDetailReportModel[]>(url, true);
  if (res.ResStatus === HTTP_RESPONSE_TYPE.ERROR) {
    ShowQuantomError({
      MessageHeader: "Error !",
      MessageBody: res?.ErrorMessage,
    });
  }

  console.log("response of report is", res?.Response);
  return res?.Response ?? [];
};

export interface StockDetailReportModel {
  ItemCode?: string;
  ItemName?: string;
  CompCode?: string;
  CompName?: string;
  CatCode?: string;
  CatName?: string;
  StockQty?: number;
}
