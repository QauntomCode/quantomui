import {
  HttpResponse,
  QuantomGET,
  QuantomPOST,
} from "../../../../../HTTP/QuantomHttpMethods";
import {
  INVENTORY_SETUP_FORM_DELETE,
  INVENTORY_SETUP_FORM_GET_ALL,
  INVENTORY_SETUP_FORM_GET_ALL_BULK,
  INVENTORY_SETUP_FORM_GET_ONE,
  INVENTORY_SETUP_FORM_INSERT,
} from "../../../InventoryRoutes";
import { SetupFormBulkResponseModel } from "../model/SetupFormBulkResponse";
import {
  SetupFormModel as SetupForm,
  VMSetupForm,
} from "../model/setupFormModel";

export const SetupFormInsert = async (
  model?: SetupForm,
  menuCode?: string
): Promise<HttpResponse<SetupForm>> => {
  let info = await get_type_by_menu_code(menuCode);
  let vm: VMSetupForm = { setup: { ...model }, Type: info?.Type };
  let res = await QuantomPOST<SetupForm>(INVENTORY_SETUP_FORM_INSERT, true, vm);
  return res;
};

export const SetupFormDelete = async (
  model?: SetupForm,
  menuCode?: string
): Promise<HttpResponse<SetupForm>> => {
  let info = await get_type_by_menu_code(menuCode);
  let vm: VMSetupForm = { setup: { ...model }, Type: info?.Type };
  let res = await QuantomPOST<SetupForm>(INVENTORY_SETUP_FORM_DELETE, true, vm);
  return res;
};

export const SetupFormGetOne = async (
  code?: string,
  menuCode?: string
): Promise<HttpResponse<SetupForm>> => {
  let info = await get_type_by_menu_code(menuCode);
  let res = await QuantomGET<SetupForm>(
    INVENTORY_SETUP_FORM_GET_ONE + `?Type=${info?.Type}&Code=${code}`,
    true
  );
  return res;
};

export const SetupFromGetAll = async (
  menuCode?: string,
  searchText?: string
): Promise<SetupForm[]> => {
  let type = await get_type_by_menu_code(menuCode);
  // alert(type)
  let res = await QuantomGET<SetupForm[]>(
    INVENTORY_SETUP_FORM_GET_ALL +
      `?Type=${type?.Type}&SearchText=${searchText}`,
    true
  );
  return res?.Response ?? [];
};

export const SetupFormGetAllBulk = async (
  types?: string[]
): Promise<SetupFormBulkResponseModel[]> => {
  let res = await QuantomPOST<SetupFormBulkResponseModel[]>(
    INVENTORY_SETUP_FORM_GET_ALL_BULK,
    true,
    types
  );
  return res?.Response ?? [];
};

const get_type_by_menu_code = (
  menuCode?: string
): Promise<{ Type?: string; Capation?: string }> => {
  // alert(menuCode)
  let obj: any = {};
  if (menuCode === "003-001") {
    obj = {
      Type: "Unit",
      Capation: "Inventory Unit",
    };
  } else if (menuCode === "003-003") {
    obj = {
      Type: "Company",
      Capation: "Inventory Brand",
    };
  } else if (menuCode === "003-002") {
    obj = {
      Type: "Category",
      Capation: "Inventory Category",
    };
  } else if (menuCode === "003-030") {
    obj = {
      Type: "Category",
      Capation: "Price Group",
    };
  }

  return Promise.resolve(obj);
};

export const GetSetupFormTypByMenuCode = get_type_by_menu_code;

export const INVENTORY_CATEGORY_MENU_CODE = "003-002";
