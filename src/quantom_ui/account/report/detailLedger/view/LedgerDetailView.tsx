/* eslint-disable react/jsx-pascal-case */
import React from "react"
import {  IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"

import { Quantom_Grid } from "../../../../../quantom_comps/base_comps";
import dayjs from "dayjs";
import { QUANTOM_MasterDetailGrid1, QUANTOM_MasterDetailTable } from "../../../config/mainAccount/view/MainAccountView";
import { LedgerComponentState, LedgerFilterHeaderComp } from "../../Ledger/view/LedgerView";
import { GroupContainer } from "../../../processing/voucher/view/VoucherView";
import { useQuantomFonts } from "../../../../../redux/store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Paper, useTheme } from "@mui/material";



export const LedgerDetailView = (props?:MenuComponentProps<LedgerComponentState>) => {

    React.useEffect(()=>{
        setFormBasicKeys({
            uniqueKey:props?.UniqueId??"",
            settings:{wWillHideToolbar:true}
        })
    },[])
    React.useEffect(()=>{
        if(!props?.state?.filters?.FromDate || !props?.state?.filters?.ToDate)
        {
            // props?.setCompSettings?.({wWillHideToolbar:true});
            setTimeout(() => {
                let fromDate=dayjs().subtract(1, 'month').toDate();
                let toDate= new Date();
                props?.setState?.({...props?.state, 
                filters:{...props?.state?.filters,FromDate:fromDate,ToDate:toDate},ledgerData:[],LedgerType:'DETAIL_LEDGER'})
            },500)
       }
    },[])
    const height=`calc(100vh - 170px)`
    return(
        <>
         <LedgerFilterHeaderComp {...props}/>
             <QUANTOM_MasterDetailGrid1/>
        
            {/* <QUANTOM_MasterDetailTable  height={height}  columns={
                [
                  {field:"locName",width:120,header:'Location'},
                  {field:"VDate",width:100,header:'VDate', dataType:'date'},
                  {field:"FormName",width:100,header:'Form', },
                  {field:"TransNo",width:130,header:'TransNo', },
                  {field:"VCode",width:150,header:'VNo', },
                  {field:"Remarks",width:400,header:'Narration', },
                  {field:"Debit",width:100,header:'Debit', },
                  {field:"Credit",width:100,header:'Credit', },
                  {field:"Balance",width:150,header:'Balance', },
                ]}

                isRowMaster={(data)=>data?.InvoiceDetail && data.InvoiceDetail.length > 0}
                getDetailRowData={(params)=>{
                   return params.data.InvoiceDetail
                }}
                detailColumns={[
                    {field:"ItemName",width:120,header:'Item Name'},
                ]}
                 data={props?.state?.ledgerDetail}/> */}
                
         
        </>
    )
}




const LineSize={
    Location:1.5,
    Date:1,
    FormName:1,
    TransNo:1,
    VCode:1,
    Narration:3,
    Debit:.8,
    Credit:.8,
    Balance:1.5
}
