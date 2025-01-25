/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import store, { get_open_menus, set_initial_state, set_form_state, form_state_selector, useQuantomFonts, full_component_state, get_component_settings, get_current_user_locations, get_component_selected_locations, get_selected_menu_index, remove_menu, get_helperData_by_key } from '../../../../redux/store';
import BasicTabs, { BasicTabProps } from './BasicTabs';
import { Alert, Box, CircularProgress, Dialog, DialogContent, Grid, Paper, Slide, Snackbar, useTheme } from '@mui/material';
import { add_helper_data_single_key, change_first_call, change_form_state, ComponentSettings, open_new_menu, QuantomFormState, set_after_reset_method, set_basic_keys_method, set_component_record_key, set_component_selected_locations, set_component_settings, set_delete_method, set_get_one_method,set_location_init_method, set_save_method, set_selected_menu_index, set_user_locations } from '../../../../redux/reduxSlice';
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
import { HTTP_RESPONSE_TYPE, HttpResponse } from '../../../../HTTP/QuantomHttpMethods';
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
import DashboardLayoutBasic from '../../Navigation/NavigationComponent';
import { UserLogView } from '../../../../Config/QuatomViews/UserViews/UserLogView';
import { InventoryUnitView } from '../../../../quantom_ui/inventory/config/unit/view/InventoryUnitView';
import { InventoryItemsView } from '../../../../quantom_ui/inventory/config/item/views/Inventory_ItemsView';
import { SaleView } from '../../../../quantom_ui/sale/processing/sale/view/SaleView';
import { RestaurantSaleView } from '../../../../quantom_ui/sale/processing/sale/view/ResturantSale/RestaurantSaleView';
import { POSMainScreen } from '../../POSMainScreen';
import { POS_CATEGORY_FORM_MENU_CODE, POS_CUSTOMER_FORM_MENU_CODE, POS_INVENTORY_ITEM_MENU_CODE, POS_SALE_FORM_MENU_CODE, POSActionButton, POSInventoryItemsView } from '../../../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView';
import { POS_SetupFormView } from '../../../../quantom_ui/inventory/config/Category/POSSetupForm';
import { POSCustomerSetup } from '../../../../quantom_ui/sale/config/customer/view/POSCustomerSetup';
import { POSSaleView } from '../../../../quantom_ui/sale/processing/sale/view/POSSaleView';



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
    // setSaveMethod?:(method?:(payLoad:T)=>Promise<HttpResponse<T>>)=>void;
    // setDeleteMethod?:(method?:(payLoad:T)=>Promise<HttpResponse<T>>)=>void;
    // setGetOneMethod?:(method?:(keyNo?:string)=>Promise<HttpResponse<T>>)=>void;
    // setBasicKeys?:(method?:()=>BasicKeysProps)=>void;
    // setCompSettings?:(settings?:ComponentSettings)=>void;
    setListComponent?:(comp?:ReactNode)=>void;
    setPrimaryKeyNo?:(keyNo?:string)=>void;
    // setInitOnLocationChange?:(method?:(loc?:LocationModel)=>void)=>void;
    // setAfterResetMethod?:(method?:(loc?:LocationModel)=>void)=>void;
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
      console.log('record key no is ',fullState?.recordKeyNo)
       if(fullState?.GetOneMethod){
        // alert('get one method found')
       }
       fullState?.GetOneMethod?.(fullState?.recordKeyNo)?.then((res)=>{
           if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS)
           {
              let obj:any=res?.Response;
              nProps?.setState?.(obj);
              store?.dispatch(set_component_record_key({stateKey:props?.UniqueId,keyNo:""}));
              store?.dispatch(change_form_state({stateKey:props?.UniqueId,FormState:'FORM'}));
           }

          
       })
    }
    //alert(settings?.wWillHideToolbar)
  },[fullState?.recordKeyNo])
  
  const getDefaultTabs=(uniqueKyeNo?:string,willHideUserLog?:boolean):BasicTabProps[]=>{
      let tabs:BasicTabProps[]=[]
      
      var appType= GetAPPType();
    
      if(appType=== APP_TYPE.SIMPLE_POS){
        
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

  const [defaultTabs,setDefaultTabs]=React.useState<BasicTabProps[]>([]);
  React.useEffect(()=>{
    setDefaultTabs([...getDefaultTabs(props?.UniqueId,fullState?.compSettings?.WillHideUserLog)])
  },[fullState?.compSettings?.WillHideUserLog])

  return(
    <div  >

      
      <QUANTOM_Toast {...alertProps}/>
      <QuantomErrorDialog Type='ERROR' Open={isShowAlert} MessageHeader='Error' MessageBody={alertProps?.message} onClosePress={()=>{
        setIsShowAlert(false);
      }}/>
      <UserLocationsModalComp  basProps={{...nProps}}/>
      {
        fullState?.compSettings?.wWillHideToolbar?(<></>):(
        <QuantomToolBarComp CallSaveMethod={saveMethodCallNumber} showToast={(message)=>{setAlertProps({number:(alertProps?.number??0)+1,message:message,severity:'success'})}} baseProps={{...nProps}}/>
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
    const fState=useSelector((state:any)=>full_component_state(state,props?.basProps?.UniqueId??""));
    React.useEffect(()=>{
         async function method() {
          if(!locs || (locs?.length??0)<1){
            let cLocs=await GetLocationsByUserId();
            console.warn('user locations from http are',cLocs)
            store?.dispatch(set_user_locations(cLocs));
           }
         }
         method();
    },[locs])


    React.useEffect(()=>{
         if(locs && locs.length>0  &&  fState?.LocationInitMethod && locs.length===1){
            if(fState?.compSettings?.willShowLocations && !fState?.Location?.LocId){
              // alert(fState?.Location?.LocId)
              let cLoc=locs[0];
              store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:cLoc}));
              fState?.LocationInitMethod?.(cLoc);

            }
         }
    },[locs, fState?.LocationInitMethod,fState?.compSettings?.willShowLocations])


    return(
      <>
        <Dialog fullWidth open={(fState?.compSettings?.willShowLocations && !fState?.Location?.LocId)??false}>
          <DialogContent>
             {
              locs?.map((x,index)=>
                (
                 <Quantom_Grid container component={Paper}  sx={{fontFamily:font.HeaderFont,fontSiz:font.H3FontSize,marginTop:'5px',hover:{
                   cursor:'pointer'
                 }}}>
                  <Box onClick={()=>{
                     store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:x}));
                     fState?.LocationInitMethod?.(x);
                  }} sx={{width:'100%',height:'100%',fontSize:font.H4FontSize,fontFamily:font.RegularFont,marginLeft:'10px',paddingTop:'5px',paddingBottom:'5px'}}>
                    {x?.LocName}
                  </Box>
                  
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
              lineHeight:'20px',
              marginTop:'3px',
              marginBottom:'3px',
              width:'78px',border:`1px solid black`,
              backgroundColor:theme.palette.secondary.light,
              alignItems:'center',
               display:'flex',
              cursor:'pointer',
              

              }}>
               <div style={{display:'flex',marginLeft:'5px'}}>
                <IconByName iconName={props?.iconName??""} fontSize='16px' color={theme.palette.secondary.contrastText} />
              </div>
            <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
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



export const AllMenuRenderer=(props?:MenuComponentProps<any>)=>{
 
  return(
    <>
       <Quantom_Grid container spacing={1.5} display={'flex'}>
           {/* {AllCompMenus?.map((item,index)=>{
               return(
                  <Quantom_Grid item xs={4} sx={{fontWeight:'bold',fontSize:'12px'}} >
                    <Paper onClick={async()=>{
                       let res= await generateGUID();
                       console.warn('this is my response of ',res)
                       store.dispatch(open_new_menu({
                        MenuCode:item.MenuCode,
                        MenuCaption:item.MenuCaption,
                        UniqueKeyNo:res,
                      }));
                    }} sx={{padding:'10px 0px',flex:1 ,display:"flex", justifyContent:'center'}}>
                      {item?.MenuCaption}
                    </Paper>
                  </Quantom_Grid>
               )
           })} */}
       </Quantom_Grid>
    </>
  )
}



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

  const handleSaveMethod=()=>{
    console.warn('state is',state?.QuantomFormCoreState)
    //  return;
    // alert('this is SAVE  method')

    state?.SaveMethod?.(state?.QuantomFormCoreState)?.then((x)=>{
      if(x?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
        let res:any= x?.Response??{};
          props?.baseProps?.setState?.({...res})
          props?.showToast?.('Saved Successfully')
          
      }
      else{
         props?.baseProps?.errorToast?.(x?.ErrorMessage)
        console.error('some thing invalid happen')
      }
    });
    
  }
  return(
  <Quantom_Grid component={Paper} container sx={{display:'flex',backgroundColor:theme.palette?.secondary?.light,paddingLeft:'10px',paddingTop:'8px',paddingBottom:'8px'}}>
          <Quantom_Grid container={Paper} sx={{marginRight:'4px'}}>
             <input type='text' style={{borderRadius:'5px',border:`.5px solid ${theme.palette.secondary.main}`}}></input>
          </Quantom_Grid>
              <Quantom_Grid container={Paper} sx={{backgroundColor:theme.palette.secondary.main,paddingLeft:'4px',paddingRight:'2px',
                color:theme?.palette?.secondary.contrastText
              }}>
              <ToolBarButton iconName='InsertDriveFileTwoTone' Label='New' onClick={()=>{
                ResetState();
              }}>
                <NewButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}}></NewButtonIcon>
              </ToolBarButton>
              
              <ToolBarButton iconName='SaveTwoTone' Label='Save' onClick={handleSaveMethod}>
              </ToolBarButton>

              
              <ToolBarButton onClick={()=>{
                ResetState();
              }} iconName='CancelPresentationTwoTone' Label='Cancel'>
                <CancelButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}}/>
              </ToolBarButton>
              <ToolBarButton onClick={()=>{
                state?.DeleteMethod?.(state?.QuantomFormCoreState)?.then((x)=>{
                  if(x?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                  
                    props?.showToast?.('Deleted Successfully')
                    
                    //alert('deleted success fully')
                    //let res:any= x?.Response??{};
                      //props?.setState?.({...res})
                      
                  }
                  else{
                    console.error('some thing invalid happen')
                  }
                });
              }} iconName='DeleteTwoTone' Label='Delete'>
                <DeleteButtonIcon fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}} />
              </ToolBarButton>
              <ToolBarButton onClick={()=>{
                  store?.dispatch(change_form_state({stateKey:props?.baseProps?.UniqueId??"",FormState:state?.FormState==='LIST'?'FORM':'LIST'}))
              }} 
              Label={state?.FormState==='LIST'?'Form':'LIST'}
              iconName={state?.FormState==='LIST'?'DesktopWindowsTwoTone':'DvrTwoTone'}
              >
                <SearchButtonIcon  fontSize='medium' sx={{color:QuantomColors.SelectedElementTextColor}} />
              </ToolBarButton>
          </Quantom_Grid>
       </Quantom_Grid>
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



export interface FormMethodsProps<T>{
    SaveMethod?:(payLoad:T)=>Promise<HttpResponse<T>>;
    DeleteMethod?:(payLoad:T)=>Promise<HttpResponse<T>>;
    GetOneMethod?:(keyNo?:string)=>Promise<HttpResponse<T>>;
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
            // alert(methods?.settings?.WillHideUserLog)
            store.dispatch(set_component_settings({stateKey:methods?.uniqueKey,settings:{...methods?.settings}}))
          }
          if(methods?.AfterResetMethod){
            store?.dispatch(set_after_reset_method({stateKey:methods.uniqueKey,method:methods.AfterResetMethod}))
          }
      
          if(methods?.InitOnLocationChange){
            store?.dispatch(set_location_init_method({stateKey:methods.uniqueKey,method:methods.InitOnLocationChange}))
          }
          store?.dispatch((change_first_call({stateKey:methods?.uniqueKey,calledSuccessfully:true})))
    }
  }, 400);


  

}
//  }, (500));
  


export interface QuantomErrorDialogProps{
  MessageHeader?:string;
  MessageBody?:string;
  Open?:boolean;
  onClosePress?:()=>void;
  Type?:'ERROR'|'INFO'
}




export const QuantomErrorDialog=(props?:QuantomErrorDialogProps)=>{
  const theme=useTheme();
  const fonts= useQuantomFonts();
  const [isFocused,setIsFocused]=React.useState(false)
  const [isIconFocused,setIsIconFocused]=React.useState(false)

   
  React.useEffect(()=>{
    if(props?.Open){
      setTimeout(() => {
        FocusOnControlByControlId('quantom_alert_button_id')  
      }, (400));
    }
  },[props?.Open])
  return(
    <Dialog fullWidth open={props?.Open??true}>
      <Quantom_Grid container>
        <div style={{width:'100%',backgroundColor:theme.palette.error.main,display:'flex',
          fontFamily:fonts?.HeaderFont, letterSpacing:1.5,fontWeight:600,fontSize:fonts.H3FontSize,flexDirection:"row",
          paddingLeft:'10px',justifyContent:'center',alignItems:'center'
        }}>
          <div style={{flex:1,height:'42px'}} >
            <div style={{marginRight:'10px', display:"flex" , alignItems:'center'}} >
              {props?.Type==='INFO'?
                (<IconByName iconName='LightbulbCircleTwoTone' color={theme?.palette?.text.secondary} fontSize='35'/>):
                (<IconByName iconName='ErrorTwoTone' color={theme.palette.text.primary} fontSize='35px'/>)
              }
               {props?.MessageHeader}
            </div>
           
            
            </div>
          {/* <div onMouseEnter={()=>{setIsIconFocused(true)}} onMouseLeave={()=>{setIsIconFocused(false)}} style={{marginRight:'10px'}}   onClick={props?.onClosePress}>
            <IconByName iconName='HighlightOffTwoTone' color={isIconFocused?(theme?.palette?.secondary?.dark):(theme?.palette?.secondary?.light)} fontSize='22px'/>
          </div> */}
        </div>
        <div style={{paddingTop:'5px',paddingBottom:'5px',paddingLeft:'5px',fontFamily:fonts.RegularFont,letterSpacing:1.5,fontSize:fonts.RegularFontSize}}>
           {props?.MessageBody}
        </div>

        <div style={{display:'flex',marginBottom:'5px',width:'100%',justifyContent:'center',alignItems:'center',}}>
            <button type='button' id='quantom_alert_button_id' 
              onFocus={()=>(setIsFocused(true))} 
              onBlur={()=>{setIsFocused(false)}} 
              // tabIndex={0} 
              onClick={props?.onClosePress} 
              onMouseEnter={()=>{setIsFocused(true)}}
              onMouseLeave={()=>{setIsFocused(false)}}
              style={{borderRadius:'5px',backgroundColor:isFocused?(theme?.palette?.secondary?.dark):(theme?.palette?.secondary?.light)}} >
              <div style={{display:'flex',justifyContent:'center'}}>
               <IconByName fontSize='22px' iconName='HighlightOffTwoTone' />
               <div style={{marginLeft:'20px', marginRight:'15px',fontWeight:'bold',fontFamily:fonts.HeaderFont,fontSize:fonts?.RegularFont}}>
                  Ok
               </div>
               </div>
            </button>
        </div>
        
        
       
      </Quantom_Grid>
    </Dialog>
  )
}



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
      }, (400));
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
            <div style={{marginRight:'10px', display:"flex" , alignItems:'center'}} >
                <IconByName iconName='HelpCenterOutlined' color={theme.palette.text.primary} fontSize='40px'/>
               {props?.MessageHeader}
            </div>
          </div>
          
        </div> 
      </Quantom_Grid>
          <div style={{marginLeft:'10px', marginRight:'10px'}}>
          <div className='row g-1' style={{paddingTop:'15px',paddingBottom:'15px',}}>
            {/* <POSActionButton label='OK' /> */}
            <div className='col-6'>
                 <POSActionButton iconName='CheckBoxOutlined' label='YES' onClick={()=>{props?.OnYesPress?.()}}/>
            </div>
            <div className='col-6'>
                <POSActionButton iconName='CancelPresentationOutlined' label='CANCEL'onClick={()=>{props?.OnNoPress?.()}}/>
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


export enum APP_TYPE{SIMPLE_POS,ERP}

export const GetAPPType=():APP_TYPE=>{
  let appType=window.globalConfig.appType;
  if(appType?.toLocaleLowerCase()==="pos"){
    return APP_TYPE.SIMPLE_POS;
  }
  return APP_TYPE.ERP;
}




















export const InventoryMenus:MenuInfoModel<any>[]=[
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
]

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
    GetComponent:(props?:MenuComponentProps<any>)=>(<POSSaleView{...props}/>)
  },

]
export const  AllCompMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"001",
    MenuCaption:"Menus",
    GetComponent:(props?:MenuComponentProps<unknown>)=>(<AllMenuRenderer {...props}/>)
  },
  // {
  //   MenuCode:"002",
  //   MenuCaption:"Sale Component",
  //   GetComponent:(props?:MenuComponentProps<any>)=>(<SaleComponent {...props}/>)
  // },
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
  ...AccountMenus,
  ...InventoryMenus,
  ...SaleMenus,
  ...POS_MENUS
]
