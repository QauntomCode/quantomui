/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { get_open_menus, set_initial_state, set_form_state, form_state_selector, useQuantomFonts, full_component_state, get_component_settings, get_current_user_locations, get_component_selected_locations, get_selected_menu_index, remove_menu, get_helperData_by_key, getCurrentLocationWithStore } from '../../../../redux/store';
import BasicTabs, { BasicTabProps } from './BasicTabs';
import { Alert, Box, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemText, Paper, Slide, Snackbar, useTheme } from '@mui/material';
import { add_helper_data_single_key, change_first_call, change_form_state, ComponentSettings, open_new_menu, override_setState_after_save, QuantomFormState, set_after_reset_method, set_basic_keys_method, set_component_record_key, set_component_selected_locations, set_component_settings, set_delete_method, set_get_one_method,set_location_init_method, set_save_method, set_selected_menu_index, set_user_locations } from '../../../../redux/reduxSlice';
// import { SaleComponent } from '../../../../quantom_ui/sale/views/processing/SaleComponent';
import { QuantomReportView } from '../../../../QuantomReport/Views/QuantomReportView';
import { MainAccountView } from '../../../../quantom_ui/account/config/mainAccount/view/MainAccountView';
import { SubAccountView } from '../../../../quantom_ui/account/config/subAccount/view/SubAccountView';
import { Quantom_Grid } from '../../../base_comps';
import NewButtonIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteButtonIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveButtonIcon from '@mui/icons-material/SaveOutlined';
import SearchButtonIcon from '@mui/icons-material/FindInPageOutlined';
import CancelButtonIcon from '@mui/icons-material/DoNotDisturbOutlined';
import { QuantomColors } from '../../../QuantomTheme';
import { getToken, HTTP_RESPONSE_TYPE, HttpResponse } from '../../../../HTTP/QuantomHttpMethods';
import { SubSubAccountView } from '../../../../quantom_ui/account/config/subSubAccount/view/SubSubAccountView';
import { RegisterAccountView } from '../../../../quantom_ui/account/config/registerAccount/view/RegisterAccountView';
import { OpeningBalanceView } from '../../../../quantom_ui/account/processing/openingBalance/view/OpeningBalanceView';
import { GetLocationsByUserId } from '../../../../quantom_ui/Settings/Location/impl/LocationImpl';
import { LocationModel } from '../../../../quantom_ui/Settings/Location/Model/LocationModel';
import { PettyCashView } from '../../../../quantom_ui/account/processing/pettyCash/view/PettyCashView';
import { FocusOnControlByControlId} from '../../../../CommonMethods';
import { VoucherView } from '../../../../quantom_ui/account/processing/voucher/view/VoucherView';
import {LedgerView} from  '../../../../quantom_ui/account/report/Ledger/view/LedgerView'
import * as Icons from '@mui/icons-material';
import { LedgerDetailView } from '../../../../quantom_ui/account/report/detailLedger/view/LedgerDetailView';
import DashboardLayoutBasic, { ErpMenuScreenComps } from '../../Navigation/NavigationComponent';
import { UserLogView } from '../../../../Config/QuatomViews/UserViews/UserLogView';
import { InventoryUnitView } from '../../../../quantom_ui/inventory/config/unit/view/InventoryUnitView';
import { InventoryItemsView } from '../../../../quantom_ui/inventory/config/item/views/Inventory_ItemsView';
import { SaleView } from '../../../../quantom_ui/sale/processing/sale/view/SaleView';
import { RestaurantSaleView } from '../../../../quantom_ui/sale/processing/sale/view/ResturantSale/RestaurantSaleView';
import { POSMainScreen } from '../../POSMainScreen';
import { POS_ACCOUNT_REPORT_LEDGER, POS_CATEGORY_FORM_MENU_CODE, POS_CUSTOMER_APPOINTMENTS_MENU_CODE, POS_CUSTOMER_FORM_MENU_CODE, POS_INVENTORY_ITEM_MENU_CODE, POS_INVENTORY_PURCHASE_REPORT, POS_INVENTORY_SALE_REPORT, POS_INVENTORY_STOCK_REPORT_MEN_CODE, POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE, POS_PAYMENT_CUSTOMER_RECEIPT_REPORT_MENU_CODE, POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE, POS_PAYMENT_SUPPLIER_PAYMENT_REPORT_MENU_CODE, POS_PURCHASE_FORM_MENU_CODE, POS_SALE_FORM_DENTAL_JOB_INFO_WITH_DETAIL, POS_SALE_FORM_MENU_CODE, POS_SALE_FORM_WITH_EMPTY_MENU_CODE, POS_SOFTWARE_REPORTS_MENU_CODE, POS_SUPPLIER_FORM_MENU_CODE, POSInventoryItemsView } from '../../../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView';
import { POS_SetupFormView } from '../../../../quantom_ui/inventory/config/Category/POSSetupForm';
import { POSCustomerSetup } from '../../../../quantom_ui/sale/config/customer/view/POSCustomerSetup';
import { POSSaleView } from '../../../../quantom_ui/sale/processing/sale/view/POSSaleView';
import { QuantomErrorDialog, ShowQuantomError } from './QuantomError';
import { POSSupplierView } from '../../../../quantom_ui/Purchase/Config/Supplier/customer/view/POSSupplierView';
import { POSPurchaseView } from '../../../../quantom_ui/Purchase/Processing/Purchase/view/POSPurchaseView';
import { POSCustomerReceiptView } from '../../../../quantom_ui/payments/customerReceipts/view/POSCustomerReceiptView';
import { POSSupplierPaymentView } from '../../../../quantom_ui/payments/supplierPayments/view/POSSupplierPaymentView';
import { POSStockDetailReportView } from '../../../../quantom_ui/inventory/reports/stockReport/view/StockReportView';
import { POSReportScreenView } from '../../POSReportScreen';
import { POSActionButton1 } from '../../POSHelpers/POSActionButton1';
import { POSSaleView1 } from '../../../../quantom_ui/sale/processing/sale/view/POSSale/POSSaleView1';
import { POSCustomerPaymentReceiptReport } from '../../../../quantom_ui/payments/reports/CustomerReceipt/view/POSCustomerReceiptReport';
import { POSLedgerView } from '../../../../quantom_ui/account/report/Ledger/view/POSLedgerView';
import { POSSupplierPaymentReportView } from '../../../../quantom_ui/payments/reports/SupplierPament/view/POSSupplierPaymentReportView';
import { POSSaleReportView } from '../../../../quantom_ui/sale/reports/SaleReports/View/POSSaleReportView';
import { POSPurchaseReportView } from '../../../../quantom_ui/Purchase/reports/Purchase/view/POSPurchaseReportView';
import { POSSaleViewWithEmpty } from '../../../../quantom_ui/sale/processing/sale/view/POSSale/POSSaleViewWithEmpty';
import { POSDentalJob } from '../../../../quantom_ui/sale/processing/sale/view/POSSale/POSDentalJob';
import { AddHPD, CustomerAppointmentReports } from '../../../../quantom_ui/sale/reports/Appointments/CustomerAppointmentReports';
import { PurchaseViewErp } from '../../../../quantom_ui/Purchase/Processing/Purchase/view/PurchaseViewErp';
import { SupplierPaymentsErp } from '../../../../quantom_ui/payments/supplierPayments/view/SupplierPaymentsErp';
import { CustomerReceiptViewErp } from '../../../../quantom_ui/payments/customerReceipts/view/CustomerReceiptViewErp';

import { EmployeeProfileView } from '../../../../quantom_ui/payroll/config/Emloyee/Views/EmployeeProfileView';

import ActivityLogView from '../../../../quantom_ui/management/reports/activityLog/views/ActivityLogView'
import { DesignationView } from '../../../../quantom_ui/payroll/config/designation/Views/DesignationView';
import { POSActionButton } from '../../POSHelpers/POSActionButton';
import { StockIssueView } from '../../../../quantom_ui/inventory/Processing/StockIssue/Views/StockIssueView';
import { CustomerSetupView } from '../../../../quantom_ui/sale/config/customer/view/CustomerSetupView';



export const AppContainerTabHelper = () => {
  const selectedTab=useSelector((state:any)=>get_selected_menu_index(state))??0;
       const openMenus:BasicTabProps[]= useSelector((state:any)=>get_open_menus(state))?.Menus?.map((item,index)=>{
        console.warn(item?.UniqueKeyNo)
        return{
          Caption:item.MenuCaption,
          Component:(<MenuComponentRenderer MenuCode={item?.MenuCode} UniqueId={item.UniqueKeyNo}/>)
        }
    })??[];   
  return (
    <>
    <BasicTabs selectedTabIndex={selectedTab} onTabClick={(index)=>{
      store.dispatch( set_selected_menu_index(index))
    }} tabs={[...openMenus]} willShowRemoveButton OnRemoveClick={(index)=>{
      remove_menu(index)
    }}></BasicTabs>
    </>
  )
}
 
export interface MenuContainerProps<T>{
    MenuCode?:string;
    UniqueId?:string;
    state?:T;
    fullState?:QuantomFormState<T>;
    setState?:(state?:T)=>void;
    setListComponent?:(comp?:ReactNode)=>void;
    setPrimaryKeyNo?:(keyNo?:string)=>void;
    errorToast?:(message?:string)=>void;
    AddComponentTabs?:(tabs?:ComponentTabProps[])=>void;
}

export interface BasicKeysProps{
    keyNoPropName?:string;
    keyDatePropsName?:string;
    // WillShowLocationDialog?:boolean;
}
export const MenuComponentRenderer=<T,>(props?:MenuContainerProps<T>)=>{
  
  // const [newProps,setNewProps]=React.useState<any>();

  React.useEffect(()=>{
    if(props?.UniqueId){
    
      set_initial_state(props?.UniqueId)
    }
  },[props?.UniqueId]);

  const fullState= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""));

  



  const nProps={...props}
  const [alertProps,setAlertProps]=React.useState<QUANTOM_ToastProps>();
  const state = useSelector((state:any)=>form_state_selector<T>(state,nProps?.UniqueId||""));
  const [tabs,setTabs]=React.useState<ComponentTabProps[]>([])
  const [selectedTab,setSelectedTab]=React.useState<number>(0)
  const [saveMethodCallNumber,setSaveMethodCallNumber]=React.useState(0)
  const saveMethodCallNumberRef = React.useRef(saveMethodCallNumber);

  const [listComp,setListComp]= React.useState<ReactNode>()
  React.useEffect(()=>{
    if(fullState?.recordKeyNo)
    {
      

      // console.log('record key no is ',fullState?.recordKeyNo)
      //  if(fullState?.GetOneMethod){
      //   // alert('get one method found')
      //  }
      try{
        ShowLoadingDialog();
          fullState?.GetOneMethod?.(fullState?.recordKeyNo)?.then((res)=>{
              if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS)
              {
                HideLoadingDialog();
                let obj:any=res?.Response;
                nProps?.setState?.(obj);
                store?.dispatch(set_component_record_key({stateKey:props?.UniqueId,keyNo:""}));
                store?.dispatch(change_form_state({stateKey:props?.UniqueId,FormState:'FORM'}));
              }
              else{
                HideLoadingDialog();
                ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:"Error"})
              }
       })
      }
      catch{
        HideLoadingDialog();
      }
    }
    //alert(settings?.wWillHideToolbar)
  },[fullState?.recordKeyNo])
  
  const getDefaultTabs=(uniqueKyeNo?:string,willHideUserLog?:boolean):BasicTabProps[]=>{
      let tabs:BasicTabProps[]=[]
      
      var appType= GetAPPType();
    
      if(appType=== APP_TYPE.SIMPLE_POS || appType===APP_TYPE.EGG_ERP || appType=== APP_TYPE.DENTAL_APP){
        
        return tabs;
      }
      // alert(props?.fullState?.compSettings?.WillHideUserLog)
      if(!willHideUserLog ){

        tabs.push( {
          Component:(<UserLogView UniqueId={props?.UniqueId}/>),
          Caption:"User Log",
          
         })
      }
     
      return tabs;
  }
  

  React.useEffect(()=>{
      if(fullState?.compSettings?.firstControlId  ){
        FocusOnControlByControlId(fullState?.compSettings?.firstControlId);
      }
      
  },[fullState?.compSettings?.firstControlId])


  nProps.setState=(obj?:T)=>{
       set_form_state(props?.UniqueId,{...obj})
  }
  



   nProps.setPrimaryKeyNo=(keyNo?:string)=>{
      if(keyNo){
        store?.dispatch(set_component_record_key({stateKey:props?.UniqueId,keyNo:keyNo}));
      }
   }
   nProps.setListComponent=(comp)=>{
      setListComp(comp);
   }
   nProps.errorToast=(message)=>{
    setAlertProps({number:(alertProps?.number??0)+1,message:message,severity:'error'})
   }

   nProps.AddComponentTabs=(compTabs?:ComponentTabProps[])=>{
       setTabs([...compTabs??[]]);
   }


   



  const basicTabData=[...tabs?.sort((a,b)=>(a?.SortNumber??0)-(b?.SortNumber??0))]?.map((item,index)=>{
    let obj:BasicTabProps={
      Caption:item?.TabCaption,
      Component:item?.TabComponent
    }
    return obj  ;
  })

  const obj=AllCompMenus?.find(x=>x.MenuCode===props?.MenuCode);
  const selectedComponent=obj?.GetComponent?.({...nProps,state:state,fullState:fullState})

  // const handleShortKeys=(e:any)=>{
  //   if (e?.ctrlKey && e?.key === 's') {
  //     e.preventDefault(); // Prevent default browser behavior
  //     alert('save method performed')
  //     //setMessage('Ctrl + S was pressed!');
  //   }
  // }

  const refreshValue= React.useRef(0)

  const handleKeyDown=(e:any)=>{
      if (e?.ctrlKey && e?.key === 's') {
        e.preventDefault(); 
        refreshValue.current= refreshValue.current+1;
        setSaveMethodCallNumber(refreshValue.current);
        //  alert('called'+refreshValue.current)
      }
  }

  React.useEffect(() => {
    
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const [isShowAlert,setIsShowAlert]=React.useState(false);
  React.useEffect(()=>{
   if((alertProps?.number??0)>0){
      if(alertProps?.severity==='error'){
        setIsShowAlert(true)
      }
   }
  },[alertProps])

  const appType= GetAPPType();
  const [defaultTabs,setDefaultTabs]=React.useState<BasicTabProps[]>([]);
  React.useEffect(()=>{
    //setDefaultTabs([...getDefaultTabs(props?.UniqueId,fullState?.compSettings?.WillHideUserLog)])
  },[fullState?.compSettings?.WillHideUserLog])


  const WillHideToolbar=()=>{

    console.log('app type is ',appType)
    if(appType===APP_TYPE.ERP && !fullState?.compSettings?.wWillHideToolbar){
      return false;
    }

  //  if(fullState?.compSettings?.wWillHideToolbar || (appType===APP_TYPE.SIMPLE_POS || APP_TYPE.EGG_ERP===appType ||APP_TYPE.DENTAL_APP)){
  //   return false;
  //  }
   return true;
  }

  return(
    <div  >

      
      <QUANTOM_Toast {...alertProps}/>
      <QuantomErrorDialog />
      <UserLocationsModalComp  basProps={{...nProps}}/>
      {
         WillHideToolbar()?(<></>):(
          <>
            <QuantomToolBarComp CallSaveMethod={saveMethodCallNumber} showToast={(message)=>{setAlertProps({number:(alertProps?.number??0)+1,message:message,severity:'success'})}} baseProps={{...nProps}}/>
          </>
        )
      }
        

      <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
      {
        fullState?.FormState==='LIST'?listComp:selectedComponent
      }
      <div style={{marginTop:'8px'}}>
      {
        fullState?.FormState==='LIST'?(<></>): 
        (<BasicTabs tabs={[...basicTabData,...defaultTabs] } selectedTabIndex={selectedTab??0} onTabClick={(index)=>{
          setSelectedTab(index??0)
        }}  willShowRemoveButton={false}/>)
      } 
      </div>
      </div>
      < ProcessingDialog/>
    </div>
  )
}

interface UserLocationsModalProps<T>{
  // open?:boolean;
  // onSelection?:(loc?:LocationModel)=>void;
  basProps?:MenuContainerProps<T>
}
export const UserLocationsModalComp=<T,>(props?:UserLocationsModalProps<T>)=>{
    const locs= useSelector((state:any)=> get_current_user_locations(state));
    const font= useQuantomFonts();
    const [isLocationLoad,setIsLocationLoaded]=useState(false);
    const fState=useSelector((state:any)=>full_component_state(state,props?.basProps?.UniqueId??""));
    React.useEffect(()=>{
         async function method() {
          //let token= await getToken();
          //alert(token);
          //alert(fState?.compSettings?.willShowLocations)
          if(fState?.compSettings?.willShowLocations){
            // alert('called')
            let cLocs=await GetLocationsByUserId();
             console.warn('user locations from http are',cLocs)
              store?.dispatch(set_user_locations(cLocs));
           }
         }
         method();
    },[fState?.compSettings?.willShowLocations])


    React.useEffect(()=>{
         if(locs && locs.length>0  &&  fState?.LocationInitMethod && locs.length===1){
            if(fState?.compSettings?.willShowLocations && !fState?.Location?.LocId){
              // alert(fState?.Location?.LocId)
              let cLoc=locs[0];
              AddHPD(props?.basProps,"FORM_CURRENT_LOCATION_SELECTED",cLoc)
              store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:cLoc}));
              fState?.LocationInitMethod?.(cLoc);

            }
         }
    },[locs, fState?.LocationInitMethod,fState?.compSettings?.willShowLocations])

  const fonts= useQuantomFonts();
  const theme= useTheme();
    return(
      <>
        <Dialog fullWidth open={(fState?.compSettings?.willShowLocations && !fState?.Location?.LocId)??false}>
          <DialogTitle style={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,lineHeight:'30px',paddingTop:'8px',paddingBottom:'8px'}}>
              <div style={{display:'flex',fontWeight:600,fontFamily:fonts?.HeaderFont,fontSize:fonts.H3FontSize}}>
                <div style={{flex:1}}>
                   Select Location
                </div>
                <div onClick={()=>{
                   const x=locs?.[0];
                   store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:x}));
                  
                   AddHPD(props?.basProps,"FORM_CURRENT_LOCATION_SELECTED",x)
                   fState?.LocationInitMethod?.(x);
                }}>
                   <IconByName fontSize='30px' iconName='CancelPresentationOutlined' color={theme?.palette.error?.main}/>
                </div>
                
              </div>
          </DialogTitle>
          <DialogContent sx={{pading:'5px'}}>
             {
              locs?.map((x,index)=>
                (
                 <Quantom_Grid component={Paper} container siz={{xs:12}}   sx={{fontFamily:font.HeaderFont,fontSize:font.H4FontSize,fontWeight:400,borderBottom:`1px solid ${theme?.palette?.primary?.main}`,hover:{
                   cursor:'pointer'
                 }}}>
                  {/* <Box onClick={()=>{
                     store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:x}));
                     fState?.LocationInitMethod?.(x);
                  }} sx={{width:'100%',height:'100%',fontSize:font.H4FontSize,fontFamily:font.RegularFont,marginLeft:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
                    {x?.LocName}
                  </Box> */}
                    <div
                       onClick={()=>{
                        store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:x}));
                        AddHPD(props?.basProps,"FORM_CURRENT_LOCATION_SELECTED",x)
                        fState?.LocationInitMethod?.(x);
                       }} 
                      style={{width:'100%',fontSize:fonts.H4FontSize,fontWeight:500,display:'flex',paddingLeft:'5px',paddingRight:'5px',paddingTop:'4px',paddingBottom:'4px',alignItems:'center'}}>
                       <div style={{marginRight:'10px'}}>
                         <IconByName  iconName='StorefrontOutlined' color={theme?.palette?.primary?.main}/>
                       </div>
                       <div style={{flex:1}}>{x?.LocName}</div>
                    </div>
                  </Quantom_Grid>
               
                )
              )
             }
          </DialogContent>
        </Dialog>
      </>
    )
}


export interface IconByNameProps{
  iconName?:string;
  color?:string;
  fontSize?:string;
}

export const IconByName = (props?:IconByNameProps) => {
  // const theme= useTheme();
  const IconComponent = Icons[props?.iconName as keyof typeof Icons];
  return IconComponent ? <IconComponent  sx={{color:props?.color,fontSize:props?.fontSize}} /> : <></>;
};

export interface ToolBarButtonProps{
  ignoreFocus?:boolean;
  Label?:string;
  children?:ReactNode;
  onClick?:()=>void;
  iconName?:string;
  marginTop?:string;
}
export const ToolBarButton=(props?:ToolBarButtonProps)=>{
  const theme= useTheme();
  const font= useQuantomFonts();
  return(
    <Box display='flex' justifyContent='center' 
       onClick={props?.onClick} sx={{hover:{backgroundColor:theme.palette.secondary.main}}}
      style={{
              fontFamily:font.HeaderFont,fontWeight:600,
              fontSize:'12px',marginRight:'2px',borderRadius:'4px',
              lineHeight:'25px',
              marginTop:'3px',
              marginBottom:'3px',
              width:'85px',border:`1px solid black`,
              backgroundColor:theme.palette.background.default,
              alignItems:'center',
               display:'flex',
              cursor:'pointer',
              

              }}>
               <div style={{display:'flex',marginLeft:'5px'}}>
                <IconByName iconName={props?.iconName??""} fontSize='16px' color={theme.palette.text.primary} />
              </div>
            <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',color:theme.palette.text.primary,letterSpacing:1.5}}>
              {props?.Label} 
            </div>
    </Box>
  )
}


export interface MenuInfoModel<T>{
   MenuCode?:string;
   GetComponent?:(props?:MenuComponentProps<T>)=>ReactNode;
   MenuCaption?:string;
   UniqueKey?:string;
   IsLoaded?:boolean;
}
export interface MenuComponentProps<T> extends MenuContainerProps<T>{
}



// export const AllMenuRenderer=(props?:MenuComponentProps<any>)=>{
 
//   return(
//     <>
//        <Quantom_Grid container spacing={1.5} display={'flex'}>
//         <div>Hello</div>
//            {/* {AllCompMenus?.map((item,index)=>{
//                return(
//                   <Quantom_Grid item xs={4} sx={{fontWeight:'bold',fontSize:'12px'}} >
//                     <Paper onClick={async()=>{
//                        let res= await generateGUID();
//                        console.warn('this is my response of ',res)
//                        store.dispatch(open_new_menu({
//                         MenuCode:item.MenuCode,
//                         MenuCaption:item.MenuCaption,
//                         UniqueKeyNo:res,
//                       }));
//                     }} sx={{padding:'10px 0px',flex:1 ,display:"flex", justifyContent:'center'}}>
//                       {item?.MenuCaption}
//                     </Paper>
//                   </Quantom_Grid>
//                )
//            })} */}
//        </Quantom_Grid>
//     </>
//   )
// }



export async function generateGUID(): Promise<string> {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
  });
}


export interface toolBarProps{
  stateKey?:string
}

interface QuantomToolBarCompProps<T>{
  baseProps?:MenuContainerProps<T>
  showToast?:(message?:string)=>void;
  CallSaveMethod?:number;
}

export const QuantomToolBarComp=<T,>(props?:QuantomToolBarCompProps<T>)=>{
  const state = useSelector((state:any)=>full_component_state<T>(state,props?.baseProps?.UniqueId||""));
  const fullState= useSelector((state?:any)=>full_component_state<T>(state,props?.baseProps?.UniqueId||""))
  const formLocation= UserGetSelectedLocation(props?.baseProps)
  React.useEffect(()=>{
      // alert('call save method'+props?.CallSaveMethod)
      if(props?.CallSaveMethod){
        handleSaveMethod()
      }
  },[props?.CallSaveMethod])
  const theme= useTheme()
  const ResetState=()=>{
    let resetState:any= {};
    if(!state?.AfterReset){
      props?.baseProps?.setState?.(resetState);
    }
    else{
      state?.AfterReset?.(state?.Location);
    }

    if(fullState?.compSettings?.firstControlId){
      FocusOnControlByControlId(fullState?.compSettings?.firstControlId)
    }
  }

  const handleSaveMethod=async()=>{
    console.warn('state is',state?.QuantomFormCoreState)
    
    try {

      ShowLoadingDialog();

      

      var loc= await getCurrentLocationWithStore(props?.baseProps?.UniqueId);
      let ctx:FormContextModel={
        Location:loc
      }
      state?.SaveMethod?.(state?.QuantomFormCoreState,ctx)?.then((x)=>{
        if(x?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
          let res:any= x?.Response??{};
            if(state?.overRideSaveSetState){
              state?.overRideSaveSetState?.(res,ctx)
            }
            else{            
              props?.baseProps?.setState?.({...res})
            }
            HideLoadingDialog();
            props?.showToast?.('Saved Successfully')
            
        }
        else{
          //props?.baseProps?.errorToast?.(x?.ErrorMessage)
          ShowQuantomError({MessageBody:x?.ErrorMessage,MessageHeader:"Error"})
          HideLoadingDialog();
          console.error('some thing invalid happen')
        }
      });
    }
    catch{
      HideLoadingDialog();
    }
  }

  const[showDeleteDialog,setShowDeleteDialog]=useState(false);
  return(
    <>
  <Quantom_Grid ml={1} mr={1} pb={.5} mb={1} container sx={{display:'flex',paddingLeft:'10px',paddingTop:'8px',paddingBottom:'8px',borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}}>
          {/* <Quantom_Grid container={Paper} sx={{marginRight:'4px'}}>
             <input type='text' style={{borderRadius:'5px',border:`.5px solid ${theme.palette.secondary.main}`}}></input>
          </Quantom_Grid> */}
              <Quantom_Grid container={Paper} sx={{/*backgroundColor:theme.palette.secondary.main,*/paddingLeft:'4px',paddingRight:'2px',
                color:theme?.palette?.secondary.contrastText
              }}>
              <POSActionButton iconName='FeedOutlined' onClick={()=>{ResetState()}} label='New'></POSActionButton>
              {/* <ToolBarButton iconName='InsertDriveFileTwoTone' Label='New' onClick={()=>{
                ResetState();
              }}>
                
                <NewButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}}></NewButtonIcon>
              </ToolBarButton>
              
              <ToolBarButton iconName='SaveTwoTone' Label='Save' onClick={handleSaveMethod}>
              </ToolBarButton> */}
              <POSActionButton iconName='SaveOutlined' onClick={handleSaveMethod} label='Save'></POSActionButton>

              
              {/* <ToolBarButton onClick={()=>{
                ResetState();
              }} iconName='CancelPresentationTwoTone' Label='Cancel'>
                <CancelButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}}/>
              </ToolBarButton> */}
              <POSActionButton iconName='CancelPresentationOutlined' onClick={ResetState} label='Cancel'></POSActionButton>
              <POSActionButton iconName='DeleteOutlineOutlined' onClick={()=>{setShowDeleteDialog(true)}} label='Delete'></POSActionButton>
              {/* <ToolBarButton onClick={()=>{
                setShowDeleteDialog(true)
              }} iconName='DeleteTwoTone' Label='Delete'>
                <DeleteButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}} />
              </ToolBarButton> */}
              {/* <ToolBarButton onClick={()=>{
                  store?.dispatch(change_form_state({stateKey:props?.baseProps?.UniqueId??"",FormState:state?.FormState==='LIST'?'FORM':'LIST'}))
              }} 
              Label={state?.FormState==='LIST'?'Form':'LIST'}
              iconName={state?.FormState==='LIST'?'DesktopWindowsTwoTone':'DvrTwoTone'}
              >
                <SearchButtonIcon  fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}} />
              </ToolBarButton> */}

              <POSActionButton iconName={state?.FormState==='LIST'?'BallotOutlined':'DesktopWindowsOutlined'} onClick={()=>{
                store?.dispatch(change_form_state({stateKey:props?.baseProps?.UniqueId??"",FormState:state?.FormState==='LIST'?'FORM':'LIST'}))
              }} label={state?.FormState==='LIST'?'FROM':'LIST'}></POSActionButton>
          </Quantom_Grid>
       </Quantom_Grid>
         <QuantomConfirmationDialog open={showDeleteDialog} 
            OnYesPress={async()=>{
              setShowDeleteDialog(false);
              try{
                ShowLoadingDialog();
                state?.DeleteMethod?.(state?.QuantomFormCoreState)?.then((x)=>{
                  if(x?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                    HideLoadingDialog();
                    props?.showToast?.('Deleted Successfully')  
                  }
                  else{
                    HideLoadingDialog();
                    ShowQuantomError({MessageBody:x.ErrorMessage,MessageHeader:"Erro"})
                    console.error('some thing invalid happen')
                  }
                });
              }
              catch{
                 HideLoadingDialog()
              }
            }}
            OnNoPress={()=>{
              setShowDeleteDialog(false);
            }} MessageBody='Are You Sure You Want To Delete !' MessageHeader='Sure !'/>
       </>
  )
}



interface QUANTOM_ToastProps{
  number?:number;
  message?:string;
  severity?: 'success'|'error';
}
const QUANTOM_Toast=(props?:QUANTOM_ToastProps)=>{
  const[open,setOpen]=React.useState(false);
  const theme= useTheme();
  React.useEffect(()=>{
        if(props?.number && props?.number>0) {
          setOpen(true)
        }
  },[props?.number])
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return(
    <Snackbar
        open={open}
        autoHideDuration={3000} // Auto hide after 3 seconds
         onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust position
      >
        <Alert 
         
         sx={{ backgroundColor: (props?.severity??'success')==='success'?(theme?.palette?.primary?.light):(theme?.palette?.error?.main)}}
        onClose={handleClose} severity={props?.severity??'success'} variant="filled" >
          {props?.message}
        </Alert>
      </Snackbar>
  )
}


export interface FormContextModel{
   Location?:LocationModel
}

export interface FormMethodsProps<T>{
    SaveMethod?:(payLoad:T,helpingContext?:FormContextModel)=>Promise<HttpResponse<T>>;
    overRideSetStateAfterSave?:(payLoad:T,helpingContext?:FormContextModel)=>void;
    DeleteMethod?:(payLoad:T,context?:FormContextModel)=>Promise<HttpResponse<T>>;
    GetOneMethod?:(keyNo?:string,mode?:FormContextModel)=>Promise<HttpResponse<T>>;
    SetBasicKeys?:()=>BasicKeysProps;
    InitOnLocationChange?:(loc?:LocationModel)=>void;
    AfterResetMethod?:(loc?:LocationModel)=>void;
    settings?:ComponentSettings;
    uniqueKey:string,
    baseProps:MenuComponentProps<T>
}



export const setFormBasicKeys=<T,>(methods?:FormMethodsProps<T>)=>{
  
  setTimeout(() => {
    if(methods?.baseProps?.fullState?.IsFirstUseEffectCall)
      {  
          // alert('called method')
          
          if(methods?.SaveMethod)
          {
            store.dispatch(set_save_method({stateKey:methods?.uniqueKey,method:methods?.SaveMethod}))
          }
          if(methods?.overRideSetStateAfterSave)
          {
            store.dispatch(override_setState_after_save({stateKey:methods?.uniqueKey,method:methods?.overRideSetStateAfterSave}))
          }
          if(methods?.DeleteMethod){
            store.dispatch(set_delete_method({stateKey:methods?.uniqueKey,method:methods?.DeleteMethod}))
          }
          if(methods?.GetOneMethod){
            store.dispatch(set_get_one_method({stateKey:methods?.uniqueKey,method:methods?.GetOneMethod}))
          }
          if(methods?.SetBasicKeys)
          {
            store.dispatch(set_basic_keys_method({stateKey:methods?.uniqueKey,method:methods?.SetBasicKeys}))
          }
          if(methods?.settings)
          {
            store.dispatch(set_component_settings({stateKey:methods?.uniqueKey,settings:{...methods?.settings}}))
          }
          if(methods?.AfterResetMethod){
            store?.dispatch(set_after_reset_method({stateKey:methods.uniqueKey,method:methods.AfterResetMethod}))
          }
      
          if(methods?.InitOnLocationChange){
            store?.dispatch(set_location_init_method({stateKey:methods.uniqueKey,method:methods.InitOnLocationChange}))
          }

          // let routeType= GetRoutType();
          // if(routeType==='WITH_TAB'){
            store?.dispatch((change_first_call({stateKey:methods?.uniqueKey,calledSuccessfully:true})))
          // }
    }
  }, 400);


  

}
//  }, (500));
  




export const ProcessingDialog=()=>{
   const open:boolean= useSelector((state?:any)=>get_helperData_by_key(state,GLOBAL_UNIQUE_KEY,LOADING_MODAL_KEY))??false;
      
  return(
  <Dialog sx={{padding:'20'}} open={open }  aria-labelledby="form-dialog-title">
      <DialogContent>
        <CircularProgress  color="secondary" />
      </DialogContent>
  </Dialog>
  )
}

export interface QuantomConfirmationProps{
  MessageHeader?:string;
  MessageBody?:string;
  open?:boolean;
  OnYesPress?:()=>void;
  OnNoPress?:()=>void ;
}
export const QuantomConfirmationDialog=(props?:QuantomConfirmationProps)=>{
  const theme=useTheme();
  const fonts= useQuantomFonts();
   
  React.useEffect(()=>{
    if(props?.open){
      setTimeout(() => {
        FocusOnControlByControlId('quantom_alert_button_id')  
      }, (200));
    }
  },[props?.open])
  return(

    <Dialog fullWidth open={props?.open??false}>
      <Quantom_Grid container>
        <div style={{width:'100%',backgroundColor:theme?.palette?.primary?.main,display:'flex',
          fontFamily:fonts?.HeaderFont,fontWeight:500,fontSize:fonts.H3FontSize,flexDirection:"row",
          paddingLeft:'10px',justifyContent:'center',alignItems:'center'
        }}>
          <div style={{flex:1,height:'42px'}} >
            <div style={{marginRight:'10px',color:theme?.palette?.primary?.contrastText, display:"flex" , alignItems:'center'}} >
                <IconByName iconName='HelpCenterOutlined' color={theme.palette.primary.contrastText} fontSize='40px'/>
               {props?.MessageHeader}
            </div>
          </div>
          
        </div> 
      </Quantom_Grid>
          <div style={{marginLeft:'10px', marginRight:'10px'}}>
          <div className='row g-1' style={{paddingTop:'15px',paddingBottom:'15px',}}>
            {/* <POSActionButton label='OK' /> */}
            <div className='col-6'>
                 <POSActionButton1 iconName='CheckBoxOutlined' label='YES' onClick={()=>{props?.OnYesPress?.()}}/>
            </div>
            <div className='col-6'>
                <POSActionButton1 iconName='CancelPresentationOutlined' label='CANCEL'onClick={()=>{props?.OnNoPress?.()}}/>
            </div>
        </div>
        </div>
    </Dialog>
  )
}






export interface ComponentTabProps{
  TabCaption?:string;
  TabComponent?:ReactNode;
  SortNumber?:number;
}



export const GLOBAL_UNIQUE_KEY="LOADING_DIALOG_UNIQUE_KEY_GLOBAL_UNIQUE_KEY"
export const LOADING_MODAL_KEY="LOADING_DIALOG_MODAL_KEY";
export const ShowLoadingDialog=()=>{
   store.dispatch(add_helper_data_single_key({UniqueId:GLOBAL_UNIQUE_KEY,data:{keyNo:LOADING_MODAL_KEY,Data:true}}))
}

export const HideLoadingDialog=()=>{
  store.dispatch(add_helper_data_single_key({UniqueId:GLOBAL_UNIQUE_KEY,data:{keyNo:LOADING_MODAL_KEY,Data:false}}))
}


export enum APP_TYPE{SIMPLE_POS,ERP,EGG_ERP,DENTAL_APP}

export const GetAPPType=():APP_TYPE=>{
  let appType=window.globalConfig.appType;
  if(appType?.toLowerCase()==="pos"){
    return APP_TYPE.SIMPLE_POS;
  }
  if(appType?.toLowerCase()==="EGG_APP".toLowerCase()){
    return APP_TYPE.EGG_ERP;
  }
  if(appType?.toLowerCase()==="DENTAL_APP".toLowerCase()){
    return APP_TYPE.DENTAL_APP;
  }
  

  console.log('app type is erp')

  return APP_TYPE.ERP;
}

export const GetRoutType=():'WITH_ROUTE'|'WITH_TAB'=>{
  return window?.globalConfig?.RouteType?.toUpperCase()==="WITH_ROUTE" ?'WITH_ROUTE':'WITH_TAB';

}



















export const   menu_screen_menu_code="000_000_000_0000"
//Inventory Menuc
export const InventoryMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:menu_screen_menu_code,
    MenuCaption:"All Menus",
    GetComponent:(props?:MenuComponentProps<any>)=>(<ErpMenuScreenComps {...props}/>)
  },
  {
    MenuCode:"003-001",
    MenuCaption:"Inventory Unit",
    GetComponent:(props?:MenuComponentProps<any>)=>(<InventoryUnitView {...props}/>)
  },
  {
    MenuCode:"003-002",
    MenuCaption:"Inventory Category",
    GetComponent:(props?:MenuComponentProps<any>)=>(<InventoryUnitView {...props}/>)
  },
  {
    MenuCode:"003-003",
    MenuCaption:"Inventory Company",
    GetComponent:(props?:MenuComponentProps<any>)=>(<InventoryUnitView {...props}/>)
  },
  {
    MenuCode:"003-030",
    MenuCaption:"Price Group",
    GetComponent:(props?:MenuComponentProps<any>)=>(<InventoryUnitView {...props}/>)
  },
  {
    MenuCode:"003-004",
    MenuCaption:"Inventory Items",
    GetComponent:(props?:MenuComponentProps<any>)=>(<InventoryItemsView {...props}/>)
  },
  {
    MenuCode:"003-005",
    MenuCaption:"Stock Issue",
    GetComponent:(props?:MenuComponentProps<any>)=>(<StockIssueView {...props}/>)
  },
  
]
//Inventory Menu End

export const AccountMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"001-001",
    MenuCaption:"Main Account",
    GetComponent:(props?:MenuComponentProps<any>)=>(<MainAccountView {...props}/>)
  },
  {
    MenuCode:"001-002",
    MenuCaption:"Sub Account",
    GetComponent:(props?:MenuComponentProps<any>)=>(<SubAccountView {...props}/>)
  },
  {
    MenuCode:"001-003",
    MenuCaption:"Sub Sub Account",
    GetComponent:(props?:MenuComponentProps<any>)=>(<SubSubAccountView {...props}/>)
  },
  {
    MenuCode:"001-004",
    MenuCaption:"Register Account",
    GetComponent:(props?:MenuComponentProps<any>)=>(<RegisterAccountView {...props}/>)
  },
  {
    MenuCode:"001-006",
    MenuCaption:"Opening Balance",
    GetComponent:(props?:MenuComponentProps<any>)=>(<OpeningBalanceView {...props}/>)
  },
  {
    MenuCode:"001-009",
    MenuCaption:"Petty Cash",
    GetComponent:(props?:MenuComponentProps<any>)=>(<PettyCashView {...props}/>)
  },
  {
    MenuCode:"001-008",
    MenuCaption:"Voucher",
    GetComponent:(props?:MenuComponentProps<any>)=>(<VoucherView {...props}/>)
  },
  {
    MenuCode:"002-001",
    MenuCaption:"General Ledger",
    GetComponent:(props?:MenuContainerProps<any>)=>(<LedgerView {...props}/>)
  },
  {
    MenuCode:"001-010",
    MenuCaption:"Detail Ledger",
    GetComponent:(props?:MenuContainerProps<any>)=>(<LedgerDetailView {...props}/>)
  },
]

export const SaleMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"005-001",
    MenuCaption:"Sale",
    GetComponent:(props?:MenuComponentProps<any>)=>(<CustomerSetupView {...props}/>)
  },
  {
    MenuCode:"005-007",
    MenuCaption:"Sale",
    GetComponent:(props?:MenuComponentProps<any>)=>(<SaleView {...props}/>)
  },
  {
    MenuCode:"005-007_01",
    MenuCaption:"Restaurant Sale",
    GetComponent:(props?:MenuComponentProps<any>)=>(<RestaurantSaleView {...props}/>)
  },
]

export const PurchaseMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"007-003",
    MenuCaption:"Purchase",
    GetComponent:(props?:MenuComponentProps<any>)=>(<PurchaseViewErp {...props}/>)
  },
]
export const PaymentMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"013-003",
    MenuCaption:"Supplier Payments",
    GetComponent:(props?:MenuComponentProps<any>)=>(<SupplierPaymentsErp {...props}/>)
  },
  {
    MenuCode:"013-004",
    MenuCaption:"Customer Receipts",
    GetComponent:(props?:MenuComponentProps<any>)=>(<CustomerReceiptViewErp {...props}/>)
  },
]

export const PayrollMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"014-001",
    MenuCaption:"Designation",
    GetComponent:(props?:MenuComponentProps<any>)=>(<DesignationView {...props}/>)
  },
  {
    MenuCode:"014-002",
    MenuCaption:"Department",
    GetComponent:(props?:MenuComponentProps<any>)=>(<DesignationView {...props}/>)
  },
  {
    MenuCode:"014-003",
    MenuCaption:"Employee Profile",
    GetComponent:(props?:MenuComponentProps<any>)=>(<EmployeeProfileView {...props}/>)
  },
]

export const POS_MENUS:MenuInfoModel<any>[]=[
  {
    MenuCode:'POS_MAIN_SCREEN',
    MenuCaption:'MAIN_MENUS',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSMainScreen{...props}/>)
  },
  {
    MenuCode:POS_INVENTORY_ITEM_MENU_CODE,
    MenuCaption:'Item setup',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSInventoryItemsView{...props}/>)
  },
  {
    MenuCode:POS_CATEGORY_FORM_MENU_CODE,
    MenuCaption:'Item Category',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POS_SetupFormView{...props}/>)
  },
  {
    MenuCode:POS_CUSTOMER_FORM_MENU_CODE,
    MenuCaption:'Customer Setup',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSCustomerSetup{...props}/>)
  },
  {
    MenuCode:POS_SALE_FORM_MENU_CODE,
    MenuCaption:'Sale',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSaleView1{...props}/>)
    // GetComponent:(props?:MenuComponentProps<any>)=>(<SaleView{...props}/>)

  },
  {
    MenuCode:POS_SALE_FORM_WITH_EMPTY_MENU_CODE,
    MenuCaption:'Sale',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSaleViewWithEmpty{...props}/>)
  },
  {
    MenuCode:POS_SALE_FORM_DENTAL_JOB_INFO_WITH_DETAIL,
    MenuCaption:'Sale',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSDentalJob{...props}/>)
  },
  {
    MenuCode:POS_SUPPLIER_FORM_MENU_CODE,
    MenuCaption:'Supplier',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSupplierView{...props}/>)
  },
  {
    MenuCode:POS_PURCHASE_FORM_MENU_CODE,
    MenuCaption:'Purchase',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSPurchaseView{...props}/>)
  },
  {
    MenuCode:POS_PAYMENT_CUSTOMER_RECEIPT_REPORT_MENU_CODE,
    MenuCaption:'Customer Receipt Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSCustomerPaymentReceiptReport{...props}/>)
  },


  {
    MenuCode:POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE,
    MenuCaption:'Supplier Payment',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSupplierPaymentView{...props}/>)
  },
  {
    MenuCode:POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE,
    MenuCaption:'Customer Receipt',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSCustomerReceiptView{...props}/>)
  },

  



  {
    MenuCode:POS_SOFTWARE_REPORTS_MENU_CODE,
    MenuCaption:'Reports',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSReportScreenView{...props}/>)
  },
  {
    MenuCode:POS_INVENTORY_STOCK_REPORT_MEN_CODE,
    MenuCaption:'Stock Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSStockDetailReportView{...props}/>)
  },
  {
    MenuCode:POS_ACCOUNT_REPORT_LEDGER,
    MenuCaption:'Account Ledger',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSLedgerView{...props}/>)
  },
  {
    MenuCode:POS_PAYMENT_CUSTOMER_RECEIPT_REPORT_MENU_CODE,
    MenuCaption:'Customer Receipts Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSCustomerReceiptView{...props}/>)
  },
  {
    MenuCode:POS_PAYMENT_SUPPLIER_PAYMENT_REPORT_MENU_CODE,
    MenuCaption:'Supplier Payment Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSupplierPaymentReportView{...props}/>)
  },
  {
    MenuCode:POS_INVENTORY_SALE_REPORT,
    MenuCaption:'Sale Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSaleReportView{...props}/>)
  },
  {
    MenuCode:POS_INVENTORY_PURCHASE_REPORT,
    MenuCaption:'Purchase Report',
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSPurchaseReportView{...props}/>)
  },
  {
    MenuCode:POS_CUSTOMER_APPOINTMENTS_MENU_CODE,
    MenuCaption:'Appointments',
    GetComponent:(props?:MenuComponentProps<any>)=>(<CustomerAppointmentReports{...props}/>)
  },

]
export const  AllCompMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"TEST_REPORT",
    MenuCaption:"All Reports",
    GetComponent:(props?:MenuComponentProps<any>)=>(<QuantomReportView {...props}/>)
  },
  {
    MenuCode:"TEST_REPORT",
    MenuCaption:"Report Component",
    GetComponent:(props?:MenuComponentProps<any>)=>(<QuantomReportView {...props}/>)
  },
  {
    MenuCode:"001-0036",
    MenuCaption:"Layout",
    GetComponent:(props?:MenuComponentProps<any>)=>(<DashboardLayoutBasic/>)
  },
  {
    MenuCode:"012-011",
    MenuCaption:"Activity Log",
    GetComponent:(props?:MenuComponentProps<any>)=>(<ActivityLogView {...props}/>)
  },
  ...AccountMenus,
  ...InventoryMenus,
  ...SaleMenus,
  ...POS_MENUS,
  ...PurchaseMenus,
  ...PaymentMenus,
  ...PayrollMenus
]


const listStyle = {
  p: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};


export const SHORT_CUT_KEYS = [
  { ctrl: true, key: "s" }, // Save
  { ctrl: true, key: "d" }, // Delete
  { ctrl: true, key: "c" }, // Copy
  { ctrl: true, key: "f" }, // Copy
  { ctrl: true, key: "x" }, // Copy
  { ctrl: true, key: "n" }, // Copy



];



// export const userGetSelectedLocation=(props?: MenuComponentProps<any>){
//   const data= useSelector((state:any)=> get_helperData_by_key(state,props?.UniqueId??"","FORM_CURRENT_LOCATION_SELECTED")) as LocationModel
  
//   return data;
// }



export const UserGetSelectedLocation=(props?:MenuComponentProps<any>):LocationModel=>{
  const data= useSelector((state:any)=> get_helperData_by_key(state,props?.UniqueId??"","FORM_CURRENT_LOCATION_SELECTED")) as LocationModel
  return data;
}