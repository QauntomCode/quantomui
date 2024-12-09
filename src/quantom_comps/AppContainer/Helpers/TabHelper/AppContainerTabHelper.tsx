/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import store, { get_open_menus, set_initial_state, set_form_state, form_state_selector, useQuantomFonts, full_component_state, get_component_settings, get_current_user_locations, get_component_selected_locations } from '../../../../redux/store';
import BasicTabs, { BasicTabProps } from './BasicTabs';
import { Alert, Box, Dialog, DialogContent, Grid, Paper, Snackbar, useTheme } from '@mui/material';
import { change_form_state, ComponentSettings, open_new_menu, QuantomFormState, set_after_reset_method, set_basic_keys_method, set_component_record_key, set_component_selected_locations, set_component_settings, set_delete_method, set_get_one_method,set_location_init_method, set_save_method, set_user_locations } from '../../../../redux/reduxSlice';
import { SaleComponent } from '../../../../quantom_ui/sale/views/processing/SaleComponent';
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
import { isNullOrEmpty } from '../../../../CommonMethods';
import { VoucherView } from '../../../../quantom_ui/account/processing/voucher/view/VoucherView';
import {LedgerView} from  '../../../../quantom_ui/account/report/Ledger/view/LedgerView'
import * as Icons from '@mui/icons-material';
import { hover } from '@testing-library/user-event/dist/hover';
import { LedgerDetailView } from '../../../../quantom_ui/account/report/detailLedger/view/LedgerDetailView';

export const AppContainerTabHelper = () => {
       const openMenus:BasicTabProps[]= useSelector((state:any)=>get_open_menus(state))?.Menus?.map((item,index)=>{
        console.warn(item?.UniqueKeyNo)
        return{
          Caption:item.MenuCaption,
          Component:(<MenuComponentRenderer MenuCode={item?.MenuCode} UniqueId={item.UniqueKeyNo}/>)
        }
    })??[];   
  return (
    <>
    <BasicTabs tabs={[...openMenus]}></BasicTabs>
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
}

export interface BasicKeysProps{
    keyNoPropName?:string;
    keyDatePropsName?:string;
    // WillShowLocationDialog?:boolean;
}
export const MenuComponentRenderer=<T,>(props?:MenuContainerProps<T>)=>{
  
  // const [newProps,setNewProps]=React.useState<any>();

  React.useEffect(()=>{
    set_initial_state(props?.UniqueId)
  },[]);
  

  const nProps={...props}
  const [alertProps,setAlertProps]=React.useState<QUANTOM_ToastProps>();
  const state = useSelector((state:any)=>form_state_selector<T>(state,nProps?.UniqueId||""));
  const fullState= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""));
  //const settings = useSelector((state:any)=>get_component_settings<T>(state,nProps?.UniqueId||""));
  // const selLocation= useSelector((state?:any)=>get_component_selected_locations(state,nProps?.UniqueId||""));

  React.useEffect(()=>{
    if(fullState?.Location?.LocId){
  
      fullState?.LocationInitMethod?.(fullState?.Location);
    }
  },[fullState?.Location?.LocId ,fullState?.LocationInitMethod])

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

  

  const obj=AllCompMenus?.find(x=>x.MenuCode===props?.MenuCode);
  const selectedComponent=obj?.GetComponent?.({...nProps,state:state})

   const willShowLocation=():boolean=>{
      if(fullState?.compSettings?.willShowLocations)
        { 
           if(!fullState?.Location?.LocId){
               return true;
           }
          }
           return false;
        }

  // alert(selLocaion?.LocId)
  return(
    <div>
      <QUANTOM_Toast {...alertProps}/>
      <UserLocationsModalComp open={willShowLocation()} basProps={{...nProps}}/>
    {
      fullState?.compSettings?.wWillHideToolbar?(<></>):(
       <QuantomToolBarComp showToast={(message)=>{setAlertProps({number:(alertProps?.number??0)+1,message:message,severity:'success'})}} baseProps={{...nProps}}/>
      )
    }
      <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
      {
        fullState?.FormState==='LIST'?listComp:selectedComponent
      }
      </div>
      
    </div>
  )
}

interface UserLocationsModalProps<T>{
  open?:boolean;
  onSelection?:(loc?:LocationModel)=>void;
  basProps?:MenuContainerProps<T>
}
export const UserLocationsModalComp=<T,>(props?:UserLocationsModalProps<T>)=>{
    const locs= useSelector((state:any)=> get_current_user_locations(state));
    const font= useQuantomFonts();
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
      if(props?.open){
        store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:locs[0]}));
      }
    },[props?.open])

    return(
      <>
        <Dialog fullWidth open={props?.open??false}>
          <DialogContent>
             {
              locs?.map((x,index)=>
                (
                 <Quantom_Grid container component={Paper}  sx={{fontFamily:font.HeaderFont,fontSiz:font.H3FontSize,marginTop:'5px',hover:{
                   cursor:'pointer'
                 }}}>
                  <Box onClick={()=>{
                     store.dispatch(set_component_selected_locations({stateKey:props?.basProps?.UniqueId,Location:x}));
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
  Label?:string;
  children?:ReactNode;
  onClick?:()=>void;
  iconName?:string;
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

export const  AllCompMenus:MenuInfoModel<any>[]=[
  {
    MenuCode:"001",
    MenuCaption:"Menus",
    GetComponent:(props?:MenuComponentProps<unknown>)=>(<AllMenuRenderer {...props}/>)
  },
  {
    MenuCode:"002",
    MenuCaption:"Sale Component",
    GetComponent:(props?:MenuComponentProps<any>)=>(<SaleComponent {...props}/>)
  },
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
  ...AccountMenus
]



export const AllMenuRenderer=(props?:MenuComponentProps<any>)=>{
 
  return(
    <>
       <Quantom_Grid container spacing={1.5} display={'flex'}>
           {AllCompMenus?.map((item,index)=>{
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
           })}
       </Quantom_Grid>
    </>
  )
}



async function generateGUID(): Promise<string> {
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
}

export const QuantomToolBarComp=<T,>(props?:QuantomToolBarCompProps<T>)=>{
  const state = useSelector((state:any)=>full_component_state<T>(state,props?.baseProps?.UniqueId||""));
  const theme= useTheme()
  const ResetState=()=>{
    let resetState:any= {};
    if(!state?.AfterReset){
      props?.baseProps?.setState?.(resetState);
    }
    else{
      state?.AfterReset?.(state?.Location);
    }
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
              
              <ToolBarButton iconName='SaveTwoTone' Label='Save' onClick={()=>{
                  console.warn('state is',state?.QuantomFormCoreState)
                //  return;
                state?.SaveMethod?.(state?.QuantomFormCoreState)?.then((x)=>{
                  if(x?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                    let res:any= x?.Response??{};
                      props?.baseProps?.setState?.({...res})
                      props?.showToast?.('Saved Successfully')
                      
                  }
                  else{
                    console.error('some thing invalid happen')
                  }
                });
                
              }}>
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
    uniqueKey:string
}



export const setFormBasicKeys=<T,>(methods?:FormMethodsProps<T>)=>{

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
    store.dispatch(set_component_settings({stateKey:methods?.uniqueKey,settings:methods?.settings}))
  }
  if(methods?.InitOnLocationChange){
    store?.dispatch(set_location_init_method({stateKey:methods.uniqueKey,method:methods.InitOnLocationChange}))
  }
  if(methods?.AfterResetMethod){
    store?.dispatch(set_after_reset_method({stateKey:methods.uniqueKey,method:methods.AfterResetMethod}))
  }
}






