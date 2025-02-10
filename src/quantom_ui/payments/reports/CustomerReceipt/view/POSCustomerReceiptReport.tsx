/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { CustomerPaymentReceiptDtoModel, VmCustomerPaymentModel } from "../../../customerReceipts/model/CustomerPaymentReceiptModel";
import { useSelector } from "react-redux";
import { IconByName, MenuComponentProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { get_current_user_locations_with_out_selector, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { CustomerPaymentReceiptGetAll } from "../../../customerReceipts/impl/CustomerPaymentImp";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { useTheme } from "@mui/material";

export const POSCustomerPaymentReceiptReport=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    const[fromDate,setFromDate]=useState(new Date())
    const [toDate,setToDate]=useState(new Date());
    const[search,setSearch]=useState('')
    
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const CUSTOMER_DATA_LIST_RECORDS_KEY="CUSTOMER_REPORT_DATA";

    const receiptData= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",CUSTOMER_DATA_LIST_RECORDS_KEY)) as  CustomerPaymentReceiptDtoModel[]
    
    return(
        <>
           
            <Quantom_Grid display='flex' container size={{xs:12}} spacing={1} >
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
                        <POSActionButton1 iconName="AddCardOutlined" label="Search" onClick={async()=>{
                            let locId= (await get_current_user_locations_with_out_selector()??[])?.[0]?.LocId??"";
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
                                <div className="col-md-4 col-md-lg-4 col-md-xl-3 p-1 mb-2" style={{padding:'5px',}} >
                                    <div className="col-md-12" style={{backgroundColor:theme?.palette?.background?.paper,borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                                    <div className="col-12"  style={{display:'flex',alignItems:'center',borderBottom:`1px solid ${theme.palette.primary.main}`}}>
                                        <div className="col-md-6" style={{display:'flex',alignItems:'center'}}>
                                            <IconByName iconName="Grid3x3Outlined" />
                                            <div style={{marginLeft:'10px',fontWeight:650}}>{item?.Code}</div>
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
                                            <IconByName iconName="AddCard" />
                                            <div style={{marginLeft:'10px'}}>{item?.TotalReceive}</div>
                                        </div>
                                        <div className="col-4" style={{display:'flex',alignItems:'center'}}>
                                            <div style={{fontWeight:'bold'}}> Discount</div>
                                            <div style={{marginLeft:'10px'}}>{item?.Discount}</div>
                                        </div>
                                        <div className="col-3" style={{display:'flex',alignItems:'center'}}>
                                           <button onClick={()=>{
                                            //   store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.Code}})))
                                            //   store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                                           }} style={{
                                                            height:'100%',width:'100%',
                                                            backgroundColor:theme?.palette?.secondary?.main,
                                                            border:'none',
                                                            fontFamily:fonts.HeaderFont,fontWeight:'bold',
                                                            color:theme?.palette?.secondary?.contrastText,
                                                            marginRight:'10px'
                                                            }}>
                                               View 
                                               <IconByName color={theme?.palette?.secondary?.contrastText} iconName="EastOutlined"/>
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