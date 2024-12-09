/* eslint-disable react/jsx-pascal-case */
import React from "react"
import {  IconByName, MenuComponentProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"

import { Quantom_Grid } from "../../../../../quantom_comps/base_comps";
import dayjs from "dayjs";
import { QUANTOM_Table } from "../../../config/mainAccount/view/MainAccountView";
import { LedgerComponentState, LedgerFilterHeaderComp } from "../../Ledger/view/LedgerView";
import { GroupContainer } from "../../../processing/voucher/view/VoucherView";
import { useQuantomFonts } from "../../../../../redux/store";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Paper, useTheme } from "@mui/material";



export const LedgerDetailView = (props?:MenuComponentProps<LedgerComponentState>) => {

    const theme= useTheme();
    const fonts= useQuantomFonts();
    React.useEffect(()=>{
        if(!props?.state?.filters?.FromDate || !props?.state?.filters?.ToDate)
        {
            props?.setCompSettings?.({wWillHideToolbar:true});
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
         <GroupContainer Label="Ledger Data" height={height}>

        
         {/* <Quantom_Grid sx={{marginTop:'5px'}}> */}
            {/* <QUANTOM_Table  height={height}  columns={
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
                ]} data={props?.state?.ledgerData}/> */}
                {
                    props?.state?.ledgerDetail?.map((item,index)=>{
                        return(
                            <>
                            <Quantom_Grid key={index} sx={12} display='flex' container spacing={.5}
                                    style={{
                                        fontFamily:fonts?.RegularFont,fontSize:fonts?.RegularFontSize,padding:'0px 5px',marginBottom:'3px',
                                        borderBottom:'1px solid black'
                                    }}>
                                <Quantom_Grid item>
                                    <Box onClick={()=>{
                                          let items= props?.state?.ledgerDetail?.map?.((item,idIndex)=>index!==idIndex?item:{...item,willShowDetail:!item?.willShowDetail})
                                          props?.setState?.({...props?.state,ledgerDetail:[...items??[]]})
                                    }}>
                                        <IconByName iconName="ControlPoint" fontSize="16px" color={theme.palette.primary.main}/>
                                    </Box>
                                </Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Location}>{item?.locName}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Date}>{item.VDate?dayjs(item?.VDate)?.format('DD-MMM-YYYY'):""}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.FormName}>{item?.FormName}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.TransNo}>{item?.TransNo}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.VCode}>{item?.VCode}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Narration}>{item?.Remarks}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Debit}>{item?.Debit}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Credit}>{item?.Credit}</Quantom_Grid>
                                <Quantom_Grid item flex={LineSize.Balance}>{item?.Balance}</Quantom_Grid>

                                </Quantom_Grid>
                                 {
                                    item?.willShowDetail?(
                                        <Quantom_Grid container 
                                         padding='10px 10px' spacing={.5}  xs={12} sx={{fontFamily:fonts.RegularFont,fontSize:fonts.RegularFontSize
                                            ,backgroundColor:theme.palette.secondary.main,
                                            marginLeft:'10px', marginRight:'10px', marginTop:'20px',
                                            marginBottom:'20px'
                                        }}>
                                            {/* testing */}
                                             {
                                                item?.InvoiceDetail?.map((detInv,index)=>{
                                                    return(
                                                        <>
                                                        <Quantom_Grid md={3} item>{detInv?.ItemName}</Quantom_Grid>
                                                        <Quantom_Grid md={1} item>{detInv?.UnitName}</Quantom_Grid>
                                                        <Quantom_Grid md={.5} item>{detInv?.Qty}</Quantom_Grid>
                                                        <Quantom_Grid md={1.5} item>{detInv?.Price}</Quantom_Grid>
                                                        <Quantom_Grid md={1} item>{detInv?.DisAmount}</Quantom_Grid>
                                                        <Quantom_Grid md={1.5} item>{detInv?.Amount}</Quantom_Grid>
                                                        <Quantom_Grid md={1.5} item>{detInv?.PackSize}</Quantom_Grid>
                                                        <Quantom_Grid md={1} item>{detInv?.PriceUnitRate}</Quantom_Grid>
                                                        <Quantom_Grid md={1} item>{detInv?.PackRate}</Quantom_Grid>





                                                        

                                                        </>

                                                    )
                                                })

                                             }
                                        </Quantom_Grid>
                                    ):(
                                        <></>
                                    )
                                 }
                            </>
                        )
                    })
                    
                }
                 </GroupContainer>
         {/* </Quantom_Grid> */}
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
