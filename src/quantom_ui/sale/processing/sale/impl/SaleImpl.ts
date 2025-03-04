import { BlindOutlined } from "@mui/icons-material";
import { isNullOrEmpty } from "../../../../../CommonMethods";
import {
  HTTP_RESPONSE_TYPE,
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { SaleModel } from "../model/SaleModel";
import { VmSale } from "../model/VmSaleModel";
import {
  HideLoadingDialog,
  ShowLoadingDialog,
} from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { CustomerAppointments } from "../model/helperModel/CustomerAppointments";
import { AppointmentReportQuery } from "../model/Queries/AppointmentReportQuery";

const SALE_INSERT_URL = "Sale/Sale/Insert";
const SALE_UPDATE_URL = "Sale/Sale/update";
const SALE_DELETE_URL = "Sale/Sale/delete";
const SALE_GET_ALL_URL = "Sale/Sale/getAllV1";
const SALE_GET_ONE_URL = "Sale/Sale/getOne";
const PRINT_SALE_SLIP_URL = "Sale/Sale/PrintSaleReport";
const GET_SALE_CUSTOMER_APPOINTMENTS_URL =
  "Sale/Customer/SaleGetCustomerAppointments";

export const InsertSale = async (
  sale?: VmSale
): Promise<HttpResponse<VmSale>> => {
  let url = SALE_INSERT_URL;
  if (!isNullOrEmpty(sale?.Sale?.BillNo)) {
    url = SALE_UPDATE_URL;
  }
  var res = QuantomPOST<VmSale>(url, true, sale, "LOADING");
  return res;
};

export const DeleteSale = async (
  sale?: VmSale
): Promise<HttpResponse<VmSale>> => {
  var res = QuantomPOST<VmSale>(SALE_DELETE_URL, true, sale?.Sale, "LOADING");
  return res;
};

export const SaleGetOne = async (billNo?: string): Promise<VmSale> => {
  let res = await QuantomGET<VmSale>(
    SALE_GET_ONE_URL + `?Code=${billNo}`,
    true
  );
  if (res?.ResStatus === HTTP_RESPONSE_TYPE.ERROR) {
    ShowQuantomError({
      MessageBody: res?.ErrorMessage,
      MessageHeader: "Error",
    });
    return Promise?.resolve({});
  } else {
    return Promise.resolve(res?.Response ?? {});
  }
};

export const SaleGetAll = async (
  fromDate?: Date,
  toDate?: Date,
  search?: string,
  locId?: string
): Promise<SaleModel[]> => {
  let md: SaleGetAllQuery = {
    FromDate: fromDate,
    ToDate: toDate,
    Search: search,
    LocId: locId,
  };
  let res = await QuantomPOST<SaleModel[]>(SALE_GET_ALL_URL, true, md);
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

export interface SaleGetAllQuery {
  FromDate?: Date;
  ToDate?: Date;
  Search?: string;
  LocId?: string;
}

export const SalePrintData = async (billNo?: string): Promise<VmSale> => {
  try {
    ShowLoadingDialog();
    let res = await QuantomGET<VmSale>(
      PRINT_SALE_SLIP_URL + `?BillNo=${billNo}`,
      true
    );
    HideLoadingDialog();
    return res.Response ?? {};
  } catch {
    HideLoadingDialog();
    return {};
  }
};

export const GetCustomerAppointments = async (
  query?: AppointmentReportQuery
): Promise<CustomerAppointments[]> => {
  try {
   
    ShowLoadingDialog();
    let res = await QuantomPOST<CustomerAppointments[]>(
      GET_SALE_CUSTOMER_APPOINTMENTS_URL,
      true,
      query
    );
    HideLoadingDialog();
    console.log('response of appointments is',res)
    if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
      return res.Response ?? [];   
    }
    else{
      ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:"Error!"})

      return[]
    }
    
  } catch {
    HideLoadingDialog();
    return [];
  }
};
