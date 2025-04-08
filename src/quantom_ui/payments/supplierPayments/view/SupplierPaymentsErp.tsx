/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";

import { useSelector } from "react-redux";
import store, { full_component_state,  get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";

import { add_helper_data_single_key } from "../../../../redux/reduxSlice";

import { POS_INVENTORY_ITEM_VIEW_TYPE, QuantomSwitch } from "../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { Box, Paper, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { Quantom_LOV1 } from "../../../../quantom_comps/Quantom_Lov";
import { CustomersGetCodeNameMethod } from "../../../sale/config/customer/impl/CustomerImpl";
import { isNullOrEmpty, safeParseToNumber } from "../../../../CommonMethods";
import { POS_SALE_LOCID_KEY, POS_SELECTED_BILL_NO_HELPER_DATA_KEY } from "../../../sale/processing/sale/view/POSSaleView";
import { HTTP_RESPONSE_TYPE } from "../../../../HTTP/QuantomHttpMethods";
import { ShowQuantomError } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { SupplierPaymentsModel, VmSupplierPaymentsModel } from "../model/SupplierPaymentModel";
import { SupplierPaymentDeleteMethod, SupplierPaymentGetAll, SupplierPaymentGetOne, SupplierPaymentInsertMethod } from "../impl/SupplierPaymentImpl";
import { SupplierGetCodeNameMethod, SupplierGetOneMethod } from "../../../Purchase/Config/Supplier/customer/impl/SuppierImpl";
import { POSToolBarComp } from "../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { POSActionButton1 } from "../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

export const SupplierPaymentsErp=(props?:MenuComponentProps<VmSupplierPaymentsModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    
    const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
    
    useEffect(()=>{
        props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,LocId:locId}})
    },[locId])

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmSupplierPaymentsModel>({
            uniqueKey:props?.UniqueId??"",
            GetOneMethod:payload=>SupplierPaymentGetOne(payload),
            SaveMethod:(payload,ctx)=>{
                let np={...payload};
                if(isNullOrEmpty(np?.Payments?.LocId) && ctx?.Location?.LocId){
                    np={...np,Payments:{...np.Payments,LocId:ctx?.Location?.LocId}}
                }
                if(!np?.Payments?.ReceipetDate){
                    np={...np,Payments:{...np.Payments,ReceipetDate:new Date()}}
                }
               return SupplierPaymentInsertMethod(np)},
            DeleteMethod:(payload,ctx)=>SupplierPaymentDeleteMethod(payload),
            baseProps:props??{},
            settings:{WillHideUserLog:true,willShowLocations:true},
            InitOnLocationChange:(loc)=>{
                store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SALE_LOCID_KEY,Data:loc?.LocId}}))
            }
         })
        }
    },[fullState?.IsFirstUseEffectCall])

    useEffect(()=>{
        setTimeout(() => {
          props?.setListComponent?.((<List {...props}/>))
        }, 500);
      },[])

    return(
        <>
        
            <Form {...props}></Form>
        </>
        // <>
        // {
        //     isList?(<List {...props}></List>):(<Form {...props}></Form>)
        // }
        // </>
    )
}


export const List=(props?:MenuComponentProps<VmSupplierPaymentsModel>)=>{

    const[fromDate,setFromDate]=useState(new Date())
    const [toDate,setToDate]=useState(new Date());
    const[search,setSearch]=useState('')
    const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
     const receiptData= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",CUSTOMER_DATA_LIST_RECORDS_KEY)) as SupplierPaymentsModel[]

    const fonts= useQuantomFonts();
    const theme= useTheme();
    
    return(
        <>
           
            <Quantom_Grid container size={{xs:12}} spacing={1}>

                   
                    <Quantom_Grid item  size={{md:2}}>
                        <QUANTOM_Date  label ="From Date" value={dayjs(fromDate)} onChange={(date,ctc)=>{setFromDate(date?.toDate()??new Date())}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item size={{md:2}}>
                        <QUANTOM_Date  label ="To Date" value={dayjs(toDate)} onChange={(date,ctc)=>{setToDate(date?.toDate()??new Date())}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item size={{md:5}}>
                        <Quantom_Input  label ="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item >
                        <POSActionButton1 iconName="ScreenSearchDesktopOutlined" label="Search" onClick={async()=>{
                             let res= await SupplierPaymentGetAll(fromDate,toDate,locId)
                             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:CUSTOMER_DATA_LIST_RECORDS_KEY,Data:res}}))
                        }}/>
                    </Quantom_Grid>
                    
                </Quantom_Grid>

                 <div className="row m-1 " style={{zIndex:999,
                  color:theme.palette.text.primary,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize }}>
                    {
                        receiptData?.map((item,index)=>{
                           return(
                                <div className="col-md-4 col-md-lg-4 col-md-xl-3 p-1 mb-2" style={{padding:'5px',}} >
                                    <div className="col-md-12" style={{backgroundColor:theme?.palette?.background?.paper,borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                                    <div className="col-12"  style={{display:'flex',alignItems:'center',borderBottom:`1px solid ${theme.palette.primary.main}`}}>
                                        <div className="col-md-6" style={{display:'flex',alignItems:'center',fontWeight:600}}>
                                            <IconByName iconName="Grid3x3Outlined" />
                                            <div style={{marginLeft:'10px'}}>{item?.Code}</div>
                                        </div>
                                        <div className="col-md-6" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="CalendarTodayOutlined" />
                                            <div style={{marginLeft:'10px'}}>{dayjs(item?.ReceipetDate)?.format('DD-MMM-YYYY')}</div>
                                        </div>
                                    </div>
                                    <div  className="col-md-12" style={{display:'flex',alignItems:'center'}}>
                                        <IconByName iconName="PermIdentityOutlined" />
                                        <div style={{marginLeft:'10px'}}>{item?.SuppName}</div>
                                    </div>

                                    <div className="col-12"  style={{display:'flex',alignItems:'center'}}>
                                        <div className="col-5" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="AddCard" />
                                            <div style={{marginLeft:'10px'}}>{item?.PaidAmount}</div>
                                        </div>
                                        <div className="col-4" style={{display:'flex',alignItems:'center'}}>
                                            <div style={{fontWeight:'bold'}}> Discount</div>
                                            <div style={{marginLeft:'10px'}}>{item?.DisAmount}</div>
                                        </div>
                                        <div className="col-3" style={{display:'flex',alignItems:'center'}}>
                                           <button onClick={()=>{
                                             // store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.Code}})))
                                              //store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                                              props?.setPrimaryKeyNo?.(item?.Code)
                                           }} style={{
                                                            height:'100%',width:'100%',backgroundColor:theme.palette.secondary.main,
                                                            border:`1px solid ${theme.palette.text.primary}`,borderRadius:'5px',
                                                            fontFamily:fonts.HeaderFont,fontWeight:'bold',
                                                            color:theme?.palette?.secondary?.contrastText,
                                                            marginRight:'10px'
                                                            }}>
                                               View 
                                               <IconByName iconName="EastOutlined"/>
                                           </button>
                                        </div>
                                    </div>

                                    </div>
                                  
                                </div>
                        )
                        })
                    }
                </div>
        </>
    )
}


const CUSTOMER_DATA_LIST_RECORDS_KEY="CUSTOMER_RECEIPT_LIST_RECORDS_KEY"
const Form=(props?:MenuComponentProps<VmSupplierPaymentsModel>)=>{
    // const [resetAfterSave,setResetAfterSave]=useState(true);
   
    // const billNo= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY))
    // const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))


    // useEffect(()=>{
    //     GetSelectedGetOne();
    // },[billNo])

    // const GetSelectedGetOne=async()=>{
    //     if(billNo){
    //         ShowLoadingDialog();
    //         let res= await SupplierPaymentGetOne(billNo);
    //         HideLoadingDialog();
    //         if(res?.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
    //             props?.setState?.({...res?.Response})
    //         }
    //         else{
    //            ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:'Error !'})
    //         }
    //     }
    // }

    useEffect(()=>{
        
        if(!props?.state?.Payments?.ReceipetDate){
            // alert('state is changed')
            props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,ReceipetDate:props?.state?.Payments?.ReceipetDate??new Date()}})
        }
    },[props?.state])

   

    return(
        <>
         <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           
           {/* <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE"  iconName="SaveOutlined" 
                responseAfterMethod={(data?:VmSupplierPaymentsModel)=>{
                     props?.setState?.({...data,Payments:{...props?.state?.Payments}});
                     if(resetAfterSave){
                        props?.setState?.({});
                     }
                }}  
                responseClick={()=>SupplierPaymentInsertMethod({...props?.state,Payments:{...props?.state?.Payments,LocId:locId}})}/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.setState?.({})}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" 
                                 buttonType='DELETE' 
                                 responseClick={()=>SupplierPaymentDeleteMethod(props?.state)}  
                                 iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{
                    store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                }} iconName="FeaturedPlayListOutlined"/>
           </div> */}
        </div>
        
         <div className="row g-1" style={{marginTop:'10px'}}>
            <div className="col-md-2  offset-md-2">
        
                <Quantom_Input label="Code"  disabled value={props?.state?.Payments?.Code}/>
            </div>
            <div className="col-md-2 ">
                <QUANTOM_Date label="Date"  value={dayjs( props?.state?.Payments?.ReceipetDate)} onChange={(e)=>{
                    props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,ReceipetDate:e?.toDate()}})
                }} />
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-4  offset-md-2">
                <Quantom_LOV1  label="Supplier" uniqueKeyNo={props?.UniqueId??""} keyNo="POS_SUPPLIER_PAYMENT_KEY_NO"
                  selected={{Code:props?.state?.Payments?.SuppCode,Name:props?.state?.Payments?.SuppName}}
                  onChange={(sel)=>{props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,SuppCode:sel?.Code,SuppName:sel?.Name}})}}
                  FillDtaMethod={()=>SupplierGetCodeNameMethod()}/>
            </div>
         </div>

         <div className="row g-1" style={{marginTop:'83+  px'}}>
            <div className="col-md-2  offset-md-2">
                <Quantom_Input label="Receive Amount"  value={props?.state?.Payments?.PaidAmount} onChange={(e)=>{
                      props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,PaidAmount:safeParseToNumber(e?.target?.value)}})
                }}/>
            </div>
            <div className="col-md-2">
                <Quantom_Input label="Discount"  value={props?.state?.Payments?.DisAmount} onChange={(e)=>{
                      props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,DisAmount:safeParseToNumber(e?.target?.value)}})
                }}/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-4  offset-md-2">
                <Quantom_Input label="Remarks" value={props?.state?.Payments?.Remarks} onChange={(e)=>{
                    props?.setState?.({...props?.state,Payments:{...props?.state?.Payments,Remarks:e.target.value}})
                }} />
            </div>
         </div>

         {/* <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <QuantomSwitch label="Reset After Save" value={resetAfterSave} onChange={(e)=>{setResetAfterSave(e??false)}}/>
            </div>
         </div> */}

        </>
    )
}