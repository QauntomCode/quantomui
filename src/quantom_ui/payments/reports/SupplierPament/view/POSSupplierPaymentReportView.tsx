/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react";
import { IconByName, MenuComponentProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { SupplierPaymentsModel, VmSupplierPaymentsModel } from "../../../supplierPayments/model/SupplierPaymentModel";
import { useSelector } from "react-redux";
import store, { get_current_user_locations, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { SupplierPaymentGetAll } from "../../../supplierPayments/impl/SupplierPaymentImpl";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";



export const POSSupplierPaymentReportView=(props?:MenuComponentProps<VmSupplierPaymentsModel>)=>{

    const[fromDate,setFromDate]=useState(new Date())
    const [toDate,setToDate]=useState(new Date());
    const[search,setSearch]=useState('')
    const locId= (useSelector((state?:any)=>get_current_user_locations(state))??[])?.[0]?.LocId;
     const receiptData= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",CUSTOMER_DATA_LIST_RECORDS_KEY)) as SupplierPaymentsModel[]

    const fonts= useQuantomFonts();
    const theme= useTheme();
    
    return(
        <>
           
            <Quantom_Grid container size={{xs:12}} spacing={1}>

                    <Quantom_Grid item >
                        <POSActionButton1 iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
                            // props?.setState?.({});
                            // store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:""}})))
                            // store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
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
                                            //   store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.Code}})))
                                            //   store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
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
