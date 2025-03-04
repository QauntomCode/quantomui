/* eslint-disable react/jsx-pascal-case */
import { useTheme } from "@mui/material"
import { MenuComponentProps } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { POSActionButton1 } from "../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1"
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps"
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date"
import { Quantom_LOV, Quantom_LOV1 } from "../../../../quantom_comps/Quantom_Lov"
import { CustomerAppointments } from "../../processing/sale/model/helperModel/CustomerAppointments"
import store, { get_helperData_by_key } from "../../../../redux/store"
import { useSelector } from "react-redux"
import { QuantomReportQuery } from "../../../../QuantomReport/Domains/Query/QuantomReportQuery"
import { useEffect } from "react"
import { add_helper_data, add_helper_data_single_key } from "../../../../redux/reduxSlice"
import { AppointmentReportQuery } from "../../processing/sale/model/Queries/AppointmentReportQuery"
import dayjs from "dayjs"
import { FilterHandler } from "../../processing/sale/view/POSSale/POSSaleViewWithEmpty"
import { GetCustomerAppointments } from "../../processing/sale/impl/SaleImpl"


export const CustomerAppointmentReports=(props?:MenuComponentProps<CustomerAppointments[]>)=>{

    const QUERY_KEY_NO="APPOINT_REPORT_QUERY";
    const APPOINTMENT_LIST_DATA_KEY="APPOINTMENT_DATA_LIST_KEY";
    const data= useGetHelperData<AppointmentReportQuery>(props,QUERY_KEY_NO); //useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",QUERY_KEY_NO)) as AppointmentReportQuery;
    
    const appointmentData= useGetHelperData(props,APPOINTMENT_LIST_DATA_KEY);
    const theme= useTheme();

    useEffect(()=>{
        AddHPD<AppointmentReportQuery>(props,QUERY_KEY_NO,{...data,FromDate:data?.FromDate??new Date(),ToDate:data?.ToDate??new Date()})
    },[])
    const setReportData=(data?:AppointmentReportQuery)=>{
         store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:QUERY_KEY_NO,Data:data}}))
    }

    return(
        <>
            <Quantom_Grid container spacing={.5} size={{xs:12}}>
                <FilterHandler>
                    <Quantom_Grid size={{xs:2.5}}>
                        <QUANTOM_Date  label="From Date" onChange={(e)=>{setReportData({...data,FromDate:e?.toDate()})}} value={dayjs(data?.FromDate??new Date())}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:2.5}}>
                        <QUANTOM_Date label="To Date" onChange={(e)=>{setReportData({...data,ToDate:e?.toDate()})}} value={dayjs(data?.ToDate??new Date())}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:2}}>
                        <Quantom_LOV1 uniqueKeyNo={props?.UniqueId??""} label="Search By" />
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:3}}>
                        <Quantom_Input label="Search" onChange={(e)=>{setReportData({...data,SearchText:e.target.value})}} value={data?.SearchText}/>
                    </Quantom_Grid>
                </FilterHandler>
                <POSActionButton1  onClick={async()=>{
                    let res= await GetCustomerAppointments(data);
                    AddHPD(props,APPOINTMENT_LIST_DATA_KEY,res)
                }} label="Search" iconColor={theme.palette.primary.main} iconName="ScreenSearchDesktopOutlined" />
                
            </Quantom_Grid>

            <Quantom_Grid container>
                
            </Quantom_Grid>
        </>
    )
}

export const useGetHelperData=<T,>(props?:MenuComponentProps<any>,key?:string)=>{
    let data= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",key??"")) as T
    return data;
}
export const AddHPD=<T,>(props?:MenuComponentProps<any>,key?:string,value?:T)=>{
    store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:key,Data:value}}))
}