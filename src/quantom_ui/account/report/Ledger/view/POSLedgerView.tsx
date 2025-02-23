/* eslint-disable react/jsx-pascal-case */
import React from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys, ToolBarButton, ToolBarButtonProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { LedgerModel } from "../model/LedgerModel"
import { GroupContainer } from "../../../processing/voucher/view/VoucherView"
import { RegisterAccountModel } from "../../../config/registerAccount/model/registerAccountModel";
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { RegisterAccountLOV } from "../../../processing/openingBalance/view/OpeningBalanceView";
import { CommonCodeName } from "../../../../../database/db";
import { Quantom_LOV } from "../../../../../quantom_comps/Quantom_Lov";
import { get_current_user_locations, useQuantomFonts } from "../../../../../redux/store";
import { useSelector } from "react-redux";
import { Paper, useTheme } from  '@mui/material';
import { Box } from "@mui/material";
import { FilterEntities, QuantomFilterOldModel } from "../../../../../QuantomReportOld/model/QuantomFilterOldModel";
import { GetLedgerData } from "../impl/LedgerImpl";
import { QUANTOM_Table } from "../../../config/mainAccount/view/MainAccountView";
import { DetailLedgerModel } from "../../detailLedger/model/DetailLedgerModel";
import { getLedgerDetail } from "../../detailLedger/impl/DetailLedgerimpl";
import { LedgerComponentState, LedgerFilterHeaderComp } from "./LedgerView";
import { useIsMobile } from "../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty";



export const POSLedgerView = (props?:MenuComponentProps<LedgerComponentState>) => {

    const isMobile= useIsMobile();
    const theme= useTheme();
    const fonts= useQuantomFonts();
    React.useEffect(()=>{
        setFormBasicKeys<LedgerComponentState>({
            uniqueKey:props?.UniqueId??"",
            settings:{wWillHideToolbar:true},
            baseProps:props??{}
        })
    },[props])

    React.useEffect(()=>{
        if(!props?.state?.filters?.FromDate || !props?.state?.filters?.ToDate)
        {
            // props?.setCompSettings?.({wWillHideToolbar:true});
            setTimeout(() => {
                let fromDate=dayjs().subtract(1, 'month').toDate();
                let toDate= new Date();
                props?.setState?.({...props?.state, 
                filters:{...props?.state?.filters,FromDate:fromDate,ToDate:toDate},ledgerData:[]})
            },500)
       }
    },[])
    const height=`calc(100vh - 170px)`
    const getValue=(item?:LedgerModel)=>{
        if((item?.Debit??0)>0){
            return '+ '+item?.Debit
        }
        if((item?.Credit??0)>0){
            return '- '+item?.Credit;
        }
        return "0";


    }
    return(
        <>
         <div style={{marginTop:'8px'}}>
            <LedgerFilterHeaderComp {...props}/>
         </div>
          
          <Quantom_Grid container spacing={1} sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize,}}>
            {
                [...props?.state?.ledgerData??[]].map((item,index)=>{
                     return(
                        <Quantom_Grid   alignItems='center' container component={Paper} size={{xs:12}} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'4px',paddingTop:'6px',paddingBottom:'6px'}}>
                            <Quantom_Grid item size={{xs:4,md:3,lg:2,xl:1}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <IconByName iconName="CalendarTodayTwoTone" color={theme?.palette?.primary?.main}/>
                                    <div style={{marginLeft:'8px',fontSize:fonts.H4FontSize,fontWeight:450}}>{dayjs(item?.VDate).format('DD MMM YY')}</div>
                                </div>
                            </Quantom_Grid>
                            <Quantom_Grid item size={{xs:8,md:6,lg:6,xl:8}}>
                                <div style={{display:'flex',alignItems:'center',}}>
                                    <IconByName iconName="ClassOutlined" color={theme?.palette?.primary?.main} fontSize="30px"/>
                                    <div>
                                        <div style={{marginLeft:'8px',fontSize:'14px',fontWeight:600,marginBottom:'3px',}}>{item?.FormName}</div>
                                        {isMobile?(<></>):(<>
                                            <div style={{marginLeft:'8px',fontSize:fonts.H4FontSize,color:theme.palette.text.disabled,fontWeight:350}}>{item?.Remarks}</div>
                                        </>)}
                                        
                                    </div>
                                </div>
                            </Quantom_Grid>

                            <Quantom_Grid item size={{xs:12,md:1.5,lg:1.5,xl:1.5}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <div style={{marginLeft:'8px',fontSize:fonts.H4FontSize,}}>{getValue(item)}</div>
                                </div>
                            </Quantom_Grid>

                            <Quantom_Grid item size={{xs:12,md:1.5,lg:1.5,xl:1.5}}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <IconByName iconName="MedicalInformationOutlined" color={theme?.palette?.text?.disabled}/>
                                    <div style={{marginLeft:'8px',fontSize:'14px',fontWeight:600}}>{item?.Balance}</div>
                                </div>
                            </Quantom_Grid>
                             
                        </Quantom_Grid>
                     )
                })
            }
          </Quantom_Grid>
          
         {/* <Quantom_Grid sx={{marginTop:'5px'}}>
            <QUANTOM_Table  height={height}  columns={
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
                ]} data={props?.state?.ledgerData}/>
         </Quantom_Grid> */}
        </>
    )
}



