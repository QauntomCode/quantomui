/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";

import { useSelector } from "react-redux";
import store, { full_component_state,  get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";

import { add_helper_data_single_key } from "../../../../redux/reduxSlice";

import { CustomerPaymentReceiptDtoModel, VmCustomerPaymentModel } from "../model/CustomerPaymentReceiptModel";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton, QuantomSwitch } from "../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { Box, Paper, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { Quantom_LOV1 } from "../../../../quantom_comps/Quantom_Lov";
import { CustomersGetCodeNameMethod } from "../../../sale/config/customer/impl/CustomerImpl";
import { safeParseToNumber } from "../../../../CommonMethods";
import { CustomerPaymentReceiptDeleteMethod, CustomerPaymentReceiptGetAll, CustomerPaymentReceiptGetOneMethod, CustomerPaymentReceiptInsertMethod } from "../impl/CustomerPaymentImp";
import { POS_SALE_LOCID_KEY, POS_SELECTED_BILL_NO_HELPER_DATA_KEY } from "../../../sale/processing/sale/view/POSSaleView";
import { HTTP_RESPONSE_TYPE } from "../../../../HTTP/QuantomHttpMethods";
import { ShowQuantomError } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";

export const POSCustomerReceiptView=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    
    const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'
    
    useEffect(()=>{
        props?.setState?.({...props?.state,master:{...props?.state?.master,LocId:locId}})
    },[locId])

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmCustomerPaymentModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true,willShowLocations:true},
            InitOnLocationChange:(loc)=>{
                store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SALE_LOCID_KEY,Data:loc?.LocId}}))
            }
         })
        }
    },[fullState?.IsFirstUseEffectCall])

    return(
        <>
        {
            isList?(<List {...props}></List>):(<Form {...props}></Form>)
        }
        </>
    )
}


export const List=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    const[fromDate,setFromDate]=useState(new Date())
    const [toDate,setToDate]=useState(new Date());
    const[search,setSearch]=useState('')
    const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
     const receiptData= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",CUSTOMER_DATA_LIST_RECORDS_KEY)) as  CustomerPaymentReceiptDtoModel[]

    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
           
            <Quantom_Grid container size={{xs:12}} spacing={1} >
                    <Quantom_Grid item size={{md:2}}>
                        <POSActionButton iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
                            props?.setState?.({});
                            store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:""}})))
                            store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                        }}/>
                    </Quantom_Grid>
                    <Quantom_Grid item  size={{md:2}}>
                        <QUANTOM_Date  label ="From Date" value={dayjs(fromDate)} onChange={(date,ctc)=>{setFromDate(date?.toDate()??new Date())}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item size={{md:2}}>
                        <QUANTOM_Date  label ="To Date" value={dayjs(toDate)} onChange={(date,ctc)=>{setToDate(date?.toDate()??new Date())}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item size={{md:5}}>
                        <Quantom_Input  label ="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    </Quantom_Grid>
                    <Quantom_Grid item size={{md:1}}>
                        <POSActionButton iconName="ScreenSearchDesktopOutlined" label="Search" onClick={async()=>{
                            let res= await CustomerPaymentReceiptGetAll(fromDate,toDate,locId)
                             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:CUSTOMER_DATA_LIST_RECORDS_KEY,Data:res}}))
                        }}/>
                    </Quantom_Grid>
                    
                </Quantom_Grid>

                 <div className="row m-1 " style={{zIndex:999,
                  color:theme.palette.text.primary,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize }}>
                    {
                        receiptData?.map((item,index)=>{
                           return(
                                <div className="col-md-4 col-md-lg-4 col-md-xl-3 p-1 mb-2" style={{padding:'5px'}} >
                                    <div className="col-md-12" style={{backgroundColor:theme?.palette?.background?.paper,}}>
                                    <div className="col-12"  style={{display:'flex',alignItems:'center',borderBottom:`1px solid ${theme.palette.primary.main}`}}>
                                        <div className="col-md-6" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="Grid3x3Outlined" />
                                            <div style={{marginLeft:'10px'}}>{item?.Code}</div>
                                        </div>
                                        <div className="col-md-6" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="CalendarTodayOutlined" />
                                            <div style={{marginLeft:'10px'}}>{dayjs(item?.ReceiptDate)?.format('DD-MMM-YYYY')}</div>
                                        </div>
                                    </div>
                                    <div  className="col-md-12" style={{display:'flex',alignItems:'center'}}>
                                        <IconByName iconName="PermIdentityOutlined" />
                                        <div style={{marginLeft:'10px'}}>{item?.CustName}</div>
                                    </div>

                                    <div className="col-12"  style={{display:'flex',alignItems:'center'}}>
                                        <div className="col-5" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="MoneyOutlined" />
                                            <div style={{marginLeft:'10px'}}>{item?.TotalReceive}</div>
                                        </div>
                                        <div className="col-4" style={{display:'flex',alignItems:'center'}}>
                                            <div style={{fontWeight:'bold'}}> Discount</div>
                                            <div style={{marginLeft:'10px'}}>{item?.Discount}</div>
                                        </div>
                                        <div className="col-3" style={{display:'flex',alignItems:'center'}}>
                                           <button onClick={()=>{
                                              store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.Code}})))
                                              store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                                           }} style={{
                                                            height:'100%',width:'100%',backgroundColor:theme.palette.primary.main,
                                                            border:`1px solid ${theme.palette.text.primary}`,borderRadius:'5px',
                                                            fontFamily:fonts.HeaderFont,fontWeight:'bold',
                                                            color:theme?.palette?.text?.primary,
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
const Form=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
   
    const billNo= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY))
    const locId= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))


    useEffect(()=>{
        GetSelectedGetOne();
    },[billNo])

    const GetSelectedGetOne=async()=>{
        if(billNo){
            ShowLoadingDialog();
            let res= await CustomerPaymentReceiptGetOneMethod(billNo);
            HideLoadingDialog();
            if(res?.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                props?.setState?.({...res?.Response})
            }
            else{
               ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:'Error !'})
            }
        }
    }

    useEffect(()=>{
        
        if(!props?.state?.master?.ReceiptDate){
            // alert('state is changed')
            props?.setState?.({...props?.state,master:{...props?.state?.master,ReceiptDate:props?.state?.master?.ReceiptDate??new Date()}})
        }
    },[props?.state])

   

    return(
        <>
         <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE"  iconName="SaveOutlined" 
                responseAfterMethod={(data?:VmCustomerPaymentModel)=>{
                     props?.setState?.({...data,master:{...props?.state?.master,LocId:locId}});
                     if(resetAfterSave){
                        props?.setState?.({});
                     }
                }}  
                responseClick={()=>CustomerPaymentReceiptInsertMethod(props?.state)}/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.setState?.({})}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" 
                                 buttonType='DELETE' 
                                 responseClick={()=>CustomerPaymentReceiptDeleteMethod(props?.state)}  
                                 iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{
                    store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                }} iconName="FeaturedPlayListOutlined"/>
           </div>
        </div>
        
         <div className="row g-1" style={{marginTop:'16px'}}>
            <div className="col-md-2  offset-md-2">
                <Quantom_Input label="Code"  disabled value={props?.state?.master?.Code}/>
            </div>
            <div className="col-md-2 ">
                <QUANTOM_Date label="Date"  value={dayjs( props?.state?.master?.ReceiptDate)} onChange={(e)=>{
                    props?.setState?.({...props?.state,master:{...props?.state?.master,ReceiptDate:e?.toDate()}})
                }} />
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-4  offset-md-2">
                <Quantom_LOV1  label="Customer" uniqueKeyNo={props?.UniqueId??""} keyNo="CUSTOMER_PAYMENT_RECEIPT_UNIQUE_KEY_NO"
                  selected={{Code:props?.state?.master?.CustCode,Name:props?.state?.master?.CustName}}
                  onChange={(sel)=>{props?.setState?.({...props?.state,master:{...props?.state?.master,CustCode:sel?.Code,CustName:sel?.Name}})}}
                  FillDtaMethod={CustomersGetCodeNameMethod}/>
            </div>
         </div>

         <div className="row g-1" style={{marginTop:'83+  px'}}>
            <div className="col-md-2  offset-md-2">
                <Quantom_Input label="Receive Amount"  value={props?.state?.master?.TotalReceive} onChange={(e)=>{
                      props?.setState?.({...props?.state,master:{...props?.state?.master,TotalReceive:safeParseToNumber(e?.target?.value)}})
                }}/>
            </div>
            <div className="col-md-2">
                <Quantom_Input label="Discount"  value={props?.state?.master?.Discount} onChange={(e)=>{
                      props?.setState?.({...props?.state,master:{...props?.state?.master,Discount:safeParseToNumber(e?.target?.value)}})
                }}/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-4  offset-md-2">
                <Quantom_Input label="Remarks" value={props?.state?.master?.Remarks} onChange={(e)=>{
                    props?.setState?.({...props?.state,master:{...props?.state?.master,Remarks:e.target.value}})
                }} />
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <QuantomSwitch label="Reset After Save" value={resetAfterSave} onChange={(e)=>{setResetAfterSave(e??false)}}/>
            </div>
         </div>

        </>
    )
}