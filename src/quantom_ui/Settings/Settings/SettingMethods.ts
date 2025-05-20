import { useEffect, useState } from "react";
import { QuantomGET } from "../../../HTTP/QuantomHttpMethods";
import { DBGetSingleSetting, DbInsertSettings } from "../../../IndexedDb/Initialization/Operation/SettingsData";
import { SettingsModel } from "./SettingsModel";

export const GET_ALL_SETTINGS_URL="settings/get/get_all_settings";

export const GetSettingValue=async(sett?:AccountSettings):Promise<SettingsModel>=>{
   
    let obj= await DBGetSingleSetting(sett);
    if(!obj){
      await ResetSettings();
      obj= await DBGetSingleSetting(sett);
    }

    return obj;


    
}

export const ResetSettings=async():Promise<boolean>=>{
    let res=  await QuantomGET<SettingsModel[]>(GET_ALL_SETTINGS_URL,true);
    for(let obj of res?.Response??[]){
        await DbInsertSettings(obj)
    }
    return true;
}



export const useGetSetting=(sett?:AccountSettings):SettingsModel=>{
    const[val,setVal]=useState<SettingsModel>();


    useEffect(()=>{
        let isMounted=true;
        const method=async()=>{
            let res= await GetSettingValue(sett);
             
            if(isMounted){
                setVal(res)
            }
        }

        method();
         
       return () => {
            isMounted = false; // cleanup to avoid memory leaks
    };

    },[sett])


    return val??{};
}




   export enum AccountSettings
    {
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
        CORE_CAN_PERFORM_INVENTORY_RETURN_ON_SAME_FORM = 3017,
        CORE_IS_HAVE_TO_MANAGE_EMPTY_ITEMS = 3018,
        CORE_IS_JOB_SYSTEM_IMPLEMENTED = 3019,
        CORE_WHATS_APP_BASE_URL = 3020,
        CORE_WHATS_APP_IS_ACTIVATED = 3021,
        CORE_WHATS_APP_SESSION_NAME = 3022,




        
        PaymentCanUseMultilocationOnCustomerReceipts = 12,
        PAYMENT_CUSTOMER_PAYMENT_BILL_WISE_RESTRICTED = 15001,
        PAYMENT_CUSTOMER_RECEIPT_AUTO_ADJUST_BILLS = 15002,
        PAYMENT_SUPPLIER_PAYMENT_AUTO_ADUSJUST_BILLS = 15003,
        // #endregion

        // #region Sale Settings --1200
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
        SALE_ENABLE_WHATS_APP_ON_SALE = 12013,
        SALE_ENABEL_WHATS_APPON_ON_PAYMENT_RECEIPT = 12014,
        SALE_WHATS_APP_RECEIPT_TMEPLATE_NAME = 12015,
        SALE_SALE_FORM_LATOUT_SETTINGS = 12016,
        SALE_CUSTOMER_FORM_LAYOUT_SETTINGS = 12017,


        // #endregion

        // #region purchase Settings --13000
        is_calculate_scheme_on_purchase = 14,
        purchase_supplier_will_auto_generat_gl_code = 13001,
        purchase_supplier_sub_sub_gl_code = 13002,
        PURCHASE_WILL_MANAGE_SUPPLIRE_WISE_PRICE_LIST = 13003,
        PURCHASE_PURCHASE_FORM_LAYOUT_SETTING=13004,
        PURCHASE_SUPPLIER_FORM_LAYOUT_SETTINGS = 13005,

        // #endregion

        // #region Payroll Settings --14000
        auto_salary_coa_head = 23,
        payroll_employee_will_auto_generate_gl_code = 14001,
        payroll_employee_sub_sub_code = 14002,
        // #endregion

        // #region Inventory Settings -16000
        DEFAULT_EACH_UNIT = 24,
        WILL_SHOW_RESERVE_QTY_IN_STOCK = 25,
        WILL_SHOW_ITEM_VARIENT_BUTTON = 16001,
        INVENTORY_CAN_SEARCH_ITEM_WITH_NUMERIC = 16002,
        CAN_AUTO_GENERATE_ITEM_NAME_WITH_BASE_OF_ATTRIBUTE = 16003,
        INVENTTORY_BARCODE_PRINTER_SETTINGS = 16004,


        // #endregion

        // #region APAR_GlCode  --1000
        APAR_DEFAULT_PAYABLE_GLCODE = 1001,
        APAR_DEFAULT_RECEIVABLE_GLCODE = 1002,
        APAR_ENABLED_INVOICE_SYSTEM = 1003,
        // #endregion END_APAR_GLCode

        // #region MANAGEMENT_SETTING -2000
        MGT_WILL_USE_SINGLE_COMPANY = 20001,
        MGT_CAN_CHANGE_RECORD_LOCATIONS = 20002,
        // #endregion

        // #region ACCOUNT_SETTINGS -4000
        CAN_CAHNGE_DEFULT_ACCOUNT = 4000,
        // #endregion

        // #region TAX SETTINGS -17000
        IS_TAX_ENABLED_ON_SALE = 17001,
        FBR_TAX_GL_CODE = 17002,
        IS_TAX_ENABLED_ON_PURCHASE = 17003,

        // #endregion

        // #region INVENTORY SETTINGS -19000
        INVENTORY_ITEM_MANUAL_GENERATE_ITEM_CODE = 190001,
        INVENTORY_ITEM_WHICH_DETAIL_TABS_WILL_HIDE = 190002,
        INVENTORY_MASTER_PRICE_LIST_TYPE_CODE = 190003,
        // #endregion



    }