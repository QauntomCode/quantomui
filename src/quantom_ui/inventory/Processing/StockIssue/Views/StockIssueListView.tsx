import { useState } from "react";
import React from "react";
import { MenuComponentProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { StockIssue, VmStockIssueReceive } from "../Model/Issue";
import { UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { useSelector } from "react-redux";
import { Button,Paper,useTheme } from "@mui/material";
import { useQuantomFonts } from "../../../../../redux/store";
import { get_helperData_by_key } from "../../../../../redux/store";
import { Quantom_Grid ,Quantom_Input} from "../../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import { IconByName } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import dayjs from "dayjs";
import store from "../../../../../redux/store";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { StockIssueGetAll } from "../Impl/StockIssueImpl";

interface StockIssueListProps{
    uniqueId?:string;
    baseProps?:MenuComponentProps<VmStockIssueReceive>
}



export const StockIssueViewList=(props?:StockIssueListProps)=>{
    
    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());
    const [search,setSearch] =useState<string>('');
     const location= UserGetSelectedLocation(props?.baseProps)

    const PURCHASE_DATA_KEY_RECORD="PURCHASE_DATA_KEY_RECORD"
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.uniqueId??"",PURCHASE_DATA_KEY_RECORD)) as StockIssue[];
    const theme= useTheme();
    const font= useQuantomFonts();
    return(
        <>
          <Quantom_Grid container  spacing={.5} size={{xs:12}}>
            
               <Quantom_Grid container size={{xs:12}}>
                  
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
                        let res = await StockIssueGetAll(fromDate,toDate,'',location?.LocId);
                        console.warn('this is my response',res);
                        // let res = await SaleGetAll(fromDate,toDate,search,locId);
                        store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
                     }}/>
                  </Quantom_Grid>
                  
               </Quantom_Grid>

               <Quantom_Grid container size={{xs:12}}  spacing={2} sx={{padding:"20px"}}>
                  {listData?.map?.((item,index)=>{
                    // alert(item?.CustName)
                     return(
                        <Quantom_Grid 
                                component={Paper} 
                                sx={{FontFamily:font.HeaderFont,fontSize:font.HeaderFont,padding:"8px",borderRadius:'8px',
                                    borderBottom:`1px solid ${theme?.palette?.primary?.main}`
                                }} 
                        size={{xs:12,sm:12,md:6,lg:4,xl:3}}> 
                        <div style={{display:'flex',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                            <div style={{fontWeight:600,fontFamily:font.HeaderFont,fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                                <div style={{marginRight:"8px"}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="TagOutlined"/>
                                </div>
                                    {item?.Code}
                            </div>
                            <div style={{fontWeight:'bold',fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                                <div style={{marginRight:"8px"}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="DateRangeOutlined"/>
                                </div>
                                    {dayjs(item?.IssueDate).format('DD-MMM-YYYY') }
                            </div>

                          </div>
                          
                          <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                            <div style={{display:'flex',alignItems:'center',flex:1,marginLeft:'8px'}}>
                                 <Button 
                                    onClick={()=>{
                                        props?.baseProps?.setPrimaryKeyNo?.(item?.Code)
                                       // store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.BillNo}})))
                                        //store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                                    }}
                                    style={{
                                            border:`1px solid ${theme.palette.primary.main}`,width:'100%',
                                            fontFamily:font.HeaderFont,fontWeight:'bold',color:theme.palette.secondary.contrastText ,
                                            backgroundColor:theme?.palette?.secondary?.main,
                                            display:'flex',justifyContent:'center',alignItems:'center'   }}>
                                    View   
                                    <div style={{marginLeft:'10px'}}>
                                     <IconByName color={theme?.palette?.secondary?.contrastText} iconName="EastOutlined"/>
                                    </div>
                                 </Button>
                            </div>
                          </div>

                        </Quantom_Grid>
                     )
                  })}
               </Quantom_Grid>
          </Quantom_Grid>
        </>
    )
}