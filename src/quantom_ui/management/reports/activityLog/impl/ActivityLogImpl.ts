import {
  HttpResponse,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { QuantomFilterOldModel } from "../../../../../QuantomReportOld/model/QuantomFilterOldModel";
import { Config_TransLogDTO } from "../model/TransLog";

const GET_ACTIVITY_LOG_REPORT_URL = "Config/Report/UserActivityLog";

export const GetUserActivityLog = async (
  model?: QuantomFilterOldModel
): Promise<HttpResponse<Config_TransLogDTO[]>> => {
  let res = await QuantomPOST<Config_TransLogDTO[]>(
    GET_ACTIVITY_LOG_REPORT_URL,
    true,
    model
  );
  return res;
};
