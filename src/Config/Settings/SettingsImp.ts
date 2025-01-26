import { QuantomGET } from "../../HTTP/QuantomHttpMethods";

const SINGLE_SETTING_URL = "settings/get/single_setting";
export const GetSingleSetting = async (
  setting?: AccountSettings
): Promise<Settings | undefined> => {
  let res = await QuantomGET<Settings>(
    SINGLE_SETTING_URL + "?settings=" + setting,
    true
  );
  return Promise.resolve(res.Response);
};

export interface Settings {
  Code: string;
  Name: string;
  DefaultValue: string;
  IsHaveDefault: boolean; // Adjusted for proper camel casing.
  LocCode: string;
  AccSetting: AccountSettings;
}

export enum AccountSettings {
  CashInHandAccount = 0,
  CommonInventoryGlCode = 1,
  CommonSaleGlCode = 2,
  CommonCogsGlCode = 3,
  CommonPurchaseDisGlCode = 4,
  DefaultContraSaleAccount = 5,
  DefaultSchemeGlCode = 6,
  DefaultFreightGlCode = 7,
  SaleFreightAccount = 8,
  SaleReturnDepriciation = 9,
  DiscountOnReceiveAbles = 10,
  AllCustomersGroup = 11,

  // CORE_SETTING -3000
  Is_Property_System_Implementd = 3001,
  Property_System_Land_Expense_head = 3002,
  ENABLE_GLOBAL_LOCK_TRANSACTION_SYSTEM = 3005,
  CAN_STOCK_MOVE_INTO_MINUS = 3006,
  CORE_WILL_SHOW_DIALOGUE_BEFORE_SAVE = 3007,
  CORE_WILL_USE_DEFAULT_TIME_ZONE = 3008,
  CORE_ITEM_CODE_FOR_NOT_ITEM_HAVE_IN_INVENTORY = 3009,
  CORE_ITEM_LOV_ENABLE_ADVANCE_SEARCH = 3010,
  CORE_WILL_DISABLE_URDU_PRINT_ON_SLIPS = 3011,
  CORE_ENABLE_ADVACNE_CACHE_MANAGEMENT = 3012,
  CORE_VIEW_INVOICE_ORDER_BY_ASC_ON_CUSTOM_SORT_NUMBER = 3013,
  CORE_WILL_SHOW_LAST_SALE_PRICE_ON_FIRST_PRIORITY = 3014,
  CORE_WILL_SHOW_LAST_PURCHASE_PRICE_ON_FIRST_PRIORITY = 3015,
  CORE_IS_SIMPE_POS_IMPLEMENTED = 3016,

  // Payment Settings -15000
  PaymentCanUseMultilocationOnCustomerReceipts = 12,
  PAYMENT_CUSTOMER_PAYMENT_BILL_WISE_RESTRICTED = 15001,
  PAYMENT_CUSTOMER_RECEIPT_AUTO_ADJUST_BILLS = 15002,
  PAYMENT_SUPPLIER_PAYMENT_AUTO_ADUSJUST_BILLS = 15003,

  // Sale Settings --1200
  is_calculate_scheme_on_sale = 13,
  sale_is_use_auto_payment_schedule = 15,
  sale_is_default_days_for_due_date = 16,
  sale_cash_customer = 17,
  sale_invoice_printer = 18,
  sale_price_list_with_every_unit = 19,
  sale_price_list_aut_according_to_maximum_illgible_unit = 20,
  sale_print_will_be_in_urdu = 21,
  sale_can_recv_more_than_tot_recvable = 22,
  sale_customer_will_generate_auto_gl_code = 12001,
  sale_customer_sub_sub_gl_code = 12002,
  SALE_SALE_RECEIPT_NOTE = 12003,
  SALE_SLIP_RECEIPT_TEMPLATE = 12004,
  SALE_INVOICE_SEARCH_DEFAULAT_PREVIOUS_DAYS = 12005,
  SALE_WILL_MANAGE_CUSTOMER_WISE_PRICE_LIST = 12006,
  SALE_WILL_DISABLE_FILTER_OF_EFFECTED_DATE_ON_PRICE_LIST = 12007,
  SALE_WILL_CALCULATE_PROFIT_WITH_RECENT_PURCHASE_PRICE = 12008,
  SALE_CUSTOMER_ADVANCE_GL_ACCOUNT = 12009,
  SALE_CAN_RECEIVE_PRE_BALANCE_FROM_CURRENT_INVOCIE = 12010,
  SALE_CAN_CREATE_SALE_ORDER_IF_STOCK_NOT_HAVE = 12011,
  SALE_ORDER_REFUND_INCOME_HEAD = 12012,

  // Purchase Settings --13000
  is_calculate_scheme_on_purchase = 14,
  purchase_supplier_will_auto_generat_gl_code = 13001,
  purchase_supplier_sub_sub_gl_code = 13002,
  PURCHASE_WILL_MANAGE_SUPPLIRE_WISE_PRICE_LIST = 13003,

  // Payroll Settings --14000
  auto_salary_coa_head = 23,
  payroll_employee_will_auto_generate_gl_code = 14001,
  payroll_employee_sub_sub_code = 14002,

  // Inventory Settings -16000
  DEFAULT_EACH_UNIT = 24,
  WILL_SHOW_RESERVE_QTY_IN_STOCK = 25,
  WILL_SHOW_ITEM_VARIENT_BUTTON = 16001,
  INVENTORY_CAN_SEARCH_ITEM_WITH_NUMERIC = 16002,
  CAN_AUTO_GENERATE_ITEM_NAME_WITH_BASE_OF_ATTRIBUTE = 16003,

  // APAR_GlCode --1000
  APAR_DEFAULT_PAYABLE_GLCODE = 1001,
  APAR_DEFAULT_RECEIVABLE_GLCODE = 1002,
  APAR_ENABLED_INVOICE_SYSTEM = 1003,

  // MANAGEMENT_SETTING -2000
  MGT_WILL_USE_SINGLE_COMPANY = 20001,
  MGT_CAN_CHANGE_RECORD_LOCATIONS = 20002,

  // ACCOUNT_SETTINGS -4000
  CAN_CAHNGE_DEFULT_ACCOUNT = 4000,

  // TAX SETTINGS -17000
  IS_TAX_ENABLED_ON_SALE = 17001,
  FBR_TAX_GL_CODE = 17002,

  // INVENTORY SETTINGS -19000
  INVENTORY_ITEM_MANUAL_GENERATE_ITEM_CODE = 190001,
}
