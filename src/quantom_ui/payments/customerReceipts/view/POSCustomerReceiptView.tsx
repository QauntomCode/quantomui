/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";

import { useSelector } from "react-redux";
import store, { full_component_state,  get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";

import { add_helper_data_single_key } from "../../../../redux/reduxSlice";

import { CustomerPaymentReceiptDtoModel, VmCustomerPaymentModel } from "../model/CustomerPaymentReceiptModel";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton, QuantomSwitch } from "../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { Paper, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { Quantom_LOV1 } from "../../../../quantom_comps/Quantom_Lov";
import { CustomersGetCodeNameMethod } from "../../../sale/config/customer/impl/CustomerImpl";
import { safeParseToNumber } from "../../../../CommonMethods";
import { CustomerPaymentReceiptDeleteMethod, CustomerPaymentReceiptGetAll, CustomerPaymentReceiptInsertMethod } from "../impl/CustomerPaymentImp";
import { POS_SALE_LOCID_KEY, POS_SELECTED_BILL_NO_HELPER_DATA_KEY } from "../../../sale/processing/sale/view/POSSaleView";

export const POSCustomerReceiptView=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    
    const locid= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'

    useEffect(()=>{
        props?.setState?.({...props?.state,master:{...props?.state?.master,LocId:locid}})
    },[locid])

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
     const locid= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))
     const receiptData= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",CUSTOMER_DATA_LIST_RECORDS_KEY)) as  CustomerPaymentReceiptDtoModel[]

    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
           
            <Quantom_Grid container size={{xs:12}} spacing={1} >
                    <Quantom_Grid item size={{md:2}}>
                        <POSActionButton iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
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
                            let res= await CustomerPaymentReceiptGetAll(fromDate,toDate,locid)
                             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:CUSTOMER_DATA_LIST_RECORDS_KEY,Data:res}}))
                        }}/>
                    </Quantom_Grid>
                    
                </Quantom_Grid>

                <Quantom_Grid container spacing={1}>
                    {
                        receiptData?.map((item,index)=>{
                           return(
                               <Quantom_Grid  sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,marginTop:'8px'}} 
                                             size={{xs:12,sm:12,md:6,lg:4}} container component={Paper}>
                                                
                                    
                                    <Quantom_Grid container sx={{display:'flex',justifycontent:'center'}}>
                                        <IconByName iconName="PermIdentityOutlined"/>   
                                        {item?.CustName}
                                    </Quantom_Grid>
                                    
                                    
                                </Quantom_Grid>
                           )
                        })
                    }
                </Quantom_Grid>

        </>
    )
}


const CUSTOMER_DATA_LIST_RECORDS_KEY="CUSTOMER_RECEIPT_LIST_RECORDS_KEY"
const Form=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
   
    var catCode= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",'SELECTED_CAT_CODE'));
    useEffect(()=>{
        handleGetOne();
    },[catCode])


    useEffect(()=>{
        
        if(!props?.state?.master?.ReceiptDate){
            // alert('state is changed')
            props?.setState?.({...props?.state,master:{...props?.state?.master,ReceiptDate:props?.state?.master?.ReceiptDate??new Date()}})
        }
    },[props?.state])

    const handleGetOne=async()=>{
        // if(isNullOrEmpty(catCode)){
        //     return;
        // }

        // try{
        //     ShowLoadingDialog();
        //       let res= await SetupFormGetOne(catCode,menuCode);
        //       HideLoadingDialog();
        //       if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
        //         props?.setState?.(res?.Response)
        //       }
        // }
        // catch{
        //    HideLoadingDialog();
        // }
    }

    return(
        <>
         <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE"  iconName="SaveOutlined" 
                responseAfterMethod={(data?:VmCustomerPaymentModel)=>{
                     props?.setState?.({...data});
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