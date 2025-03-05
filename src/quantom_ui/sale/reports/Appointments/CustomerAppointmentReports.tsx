/* eslint-disable react/jsx-pascal-case */
import { Paper, useTheme } from "@mui/material"
import { IconByName, MenuComponentProps } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { POSActionButton1 } from "../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1"
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps"
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date"
import { Quantom_LOV, Quantom_LOV1 } from "../../../../quantom_comps/Quantom_Lov"
import { CustomerAppointments } from "../../processing/sale/model/helperModel/CustomerAppointments"
import store, { get_helperData_by_key, useQuantomFonts } from "../../../../redux/store"
import { useSelector } from "react-redux"
import { QuantomReportQuery } from "../../../../QuantomReport/Domains/Query/QuantomReportQuery"
import { useEffect } from "react"
import { add_helper_data, add_helper_data_single_key } from "../../../../redux/reduxSlice"
import { AppointmentReportQuery } from "../../processing/sale/model/Queries/AppointmentReportQuery"
import dayjs from "dayjs"
import { FilterHandler } from "../../processing/sale/view/POSSale/POSSaleViewWithEmpty"
import { GetCustomerAppointments } from "../../processing/sale/impl/SaleImpl"
import { FontDownload } from "@mui/icons-material"



export const CustomerAppointmentReports=(props?:MenuComponentProps<CustomerAppointments[]>)=>{

    const QUERY_KEY_NO="APPOINT_REPORT_QUERY";
    const APPOINTMENT_LIST_DATA_KEY="APPOINTMENT_DATA_LIST_KEY";
    const data= useGetHelperData<AppointmentReportQuery>(props,QUERY_KEY_NO); //useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",QUERY_KEY_NO)) as AppointmentReportQuery;
    
    const appointmentData= useGetHelperData<CustomerAppointments[]>(props,APPOINTMENT_LIST_DATA_KEY);
    const theme= useTheme();


    useEffect(()=>{
        AddHPD<AppointmentReportQuery>(props,QUERY_KEY_NO,{...data,FromDate:data?.FromDate??new Date(),ToDate:data?.ToDate??new Date()})
    },[])
    const setReportData=(data?:AppointmentReportQuery)=>{
         store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:QUERY_KEY_NO,Data:data}}))
    }
    const changeStatus=(status?:string,appointment?:CustomerAppointments)=>{
        let allData=[...appointmentData];
        
        let index=allData.findIndex(x=>x.MenuCode===appointment?.MenuCode && x.TransNo===appointment?.TransNo);
        if(index!==-1)
        {
           allData[index]={...allData[index],Status:status}
        }
        AddHPD(props,APPOINTMENT_LIST_DATA_KEY,[...allData])
    }

    const fonts= useQuantomFonts()
     const border={border:`1px solid ${theme?.palette?.primary?.main}`};
     const selectedStyle={backgroundColor:theme.palette.primary.main,color:theme.palette.primary.contrastText}
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

            <Quantom_Grid mt={1} container size={{xs:12}}>
                {
                   appointmentData?.map((item,index)=>{
                     const isPending=item?.Status?.toUpperCase()==="PENDING";
                     console.log('is selected '+item.Status,isPending)
                     const pendingStyle=isPending?{...selectedStyle}:{}
                     const completedStyle=isPending?{}:{...selectedStyle}

                    return(
                        <Quantom_Grid p={1} sx={{fontFamily:fonts.HeaderFont,fontSize:'14px',fontWeight:500}} component={Paper} container size={{xs:12,sm:12,md:6,lg:4}}>
                              <Quantom_Grid borderBottom={`1px solid ${theme?.palette?.text?.primary}`} display='flex' alignItems='center' size={{xs:12}}>
                                  <IconByName color={theme?.palette?.primary?.main} iconName="AccountBoxOutlined"/>
                                  <div style={{paddingLeft:'8px'}}>{item?.CustName}</div>
                              </Quantom_Grid>
                              <Quantom_Grid sx={{fontSize:'12px'}} pt={.5} display='flex' alignItems='center' size={{xs:12}}>
                                    <div style={{flex:1,display:'flex',alignItems:'center'}}>
                                        <IconByName fontSize="16px" color={theme?.palette?.primary?.main} iconName="AccessTimeOutlined"/>
                                        <div style={{paddingLeft:'8px'}}>{dayjs(item?.AppointmentDate).format('DD MMM YYYY')}</div>
                                    </div>
                                    <div style={{flex:1,display:'flex',alignItems:'center',width:'100%'}}>
                                        <div style={{display:'flex',flex:1}}>
                                            <button onClick={()=>{changeStatus('Pending',item)}} style={{...border,borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',flex:1,...pendingStyle}}>Pending</button>
                                            <button onClick={()=>{changeStatus('Completed',item)}} style={{...border,borderBottomRightRadius:'5px',borderTopRightRadius:'5px',flex:1,...completedStyle}}>Completed</button>
                                        </div>
                                    </div>
                              </Quantom_Grid>
                        </Quantom_Grid>
                    )
                   })
                }
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