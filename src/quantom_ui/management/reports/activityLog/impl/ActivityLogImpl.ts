import {
  HttpResponse,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { QuantomFilterOldModel } from "../../../../../QuantomReportOld/model/QuantomFilterOldModel";
import { QuantomFilter } from "../../../Common/QuantomFilter/QuantomFilter";
import { Config_TransLogDTO } from "../model/TransLog";

const GET_ACTIVITY_LOG_REPORT_URL = "Config/Report/UserActivityLog";

export const GetUserActivityLog = async (
  model?: QuantomFilter
): Promise<HttpResponse<Config_TransLogDTO[]>> => {
  let res = await QuantomPOST<Config_TransLogDTO[]>(
    GET_ACTIVITY_LOG_REPORT_URL,
    true,
    model
  );
  return res;
};
