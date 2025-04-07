/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react"
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog, ToolBarButton, ToolBarButtonProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
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
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { FilterHandler } from "../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty";



export const LedgerView = (props?:MenuComponentProps<LedgerComponentState>) => {

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
    return(
        <>
         <LedgerFilterHeaderComp {...props}/>
         <Quantom_Grid sx={{marginTop:'5px'}}>
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
         </Quantom_Grid>
        </>
    )
}





export const LedgerFilterHeaderComp=(props?:MenuComponentProps<LedgerComponentState>)=>{
    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        
        let bl= props?.state?.ledgerData?.at(-1)?.Balance??0;
        setBalance(bl)
    },[props?.state])
    const handleLedger=async()=> {

        try{
            ShowLoadingDialog();
            props?.setState?.({...props?.state,ledgerData:[],ledgerDetail:[]})
            if(props?.state?.LedgerType==='DETAIL_LEDGER'){
                let res= await getLedgerDetail(props?.state?.filters)
                
                props?.setState?.({...props?.state,ledgerDetail:res?.Response})
            }
            else{
                    
                    let res= await GetLedgerData(props?.state?.filters)
                    props?.setState?.({...props?.state,ledgerData:res?.Response})
            }
            HideLoadingDialog();
        }
        catch{
            HideLoadingDialog();
        }
        finally{
            HideLoadingDialog();
        }
       
    }

    const theme = useTheme();
    const fonts= useQuantomFonts();

    return(
        <>
               
                    <Quantom_Grid display='flex' size={{xs:12}}  container spacing={1}>
                        <Quantom_Grid container flex={1}>
                        <FilterHandler OkAndAplyFilter={()=>handleLedger()}>
                                <Quantom_Grid size={{md:2.5}}>
                                    <QUANTOM_Date label="From Date" value={dayjs(props?.state?.filters?.FromDate)} 
                                                onChange={(date)=>{props?.setState?.({...props?.state,filters:{...props?.state?.filters,FromDate:dayjs(date).toDate()}})}}/>
                                </Quantom_Grid>
                                <Quantom_Grid item size={{md:2.5}}>
                                    <QUANTOM_Date label="To Date" value={dayjs(props?.state?.filters?.ToDate)} 
                                                    onChange={(date)=>{props?.setState?.({...props?.state,filters:{...props?.state?.filters,ToDate:dayjs(date).toDate()}})}}/>
                                </Quantom_Grid>
                                <Quantom_Grid item size={{md:3.5}}>
                                    <RegisterAccountLOV selected={props?.state?.glAccount??{}} 
                                                    onChange={(selected)=>{
                                                        props?.setState?.({...props?.state,glAccount:(selected),filters:{
                                                            ...props?.state?.filters,
                                                            FilterDetail:[
                                                                {
                                                                    FitlerType: FilterEntities.GL_CODES,
                                                                    Keys:[{
                                                                        Code:selected?.Code,
                                                                        Name:selected?.Name,
                                                                    }]
                                                                }
                                                            ]
                                                        }});
                                                    }}/>
                                </Quantom_Grid>
                                <Quantom_Grid item size={{md:3.5}}>
                                    <MultiLocationSelectionlOVComp  />
                                </Quantom_Grid>
                                
                            </FilterHandler>
                        </Quantom_Grid>
                        <Quantom_Grid>
                            <POSActionButton1 isIconOnly onClick={handleLedger} iconName="PageviewTwoTone" label="Load"/>   
                        </Quantom_Grid>
                        <Quantom_Grid>
                            <POSActionButton1 isIconOnly iconName="LocalPrintshopTwoTone" label="Print"/>
                        </Quantom_Grid>
                    </Quantom_Grid>

                    <Quantom_Grid mt={1} mb={1} display='flex' sx={{backgroundColor:theme?.palette?.primary?.main}} component={Paper} container size={{xs:12}}>
                           <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>    
                                <div>
                                    <IconByName color={theme.palette.primary.contrastText} fontSize="50px" iconName="MenuBookOutlined"/>
                                </div>
                                <div style={{fontFamily:fonts?.HeaderFont,fontSize:'25px',fontWeight:500,color:theme.palette.primary.contrastText}}>
                                    {
                                        props?.state?.glAccount?.Name
                                    }
                                </div>
                          </div>
                          <div style={{marginRight:'10px',display:'flex',alignItems:'center',fontFamily:fonts?.HeaderFont,fontSize:'25px',fontWeight:900,color:theme.palette.primary.contrastText}}>
                               {balance}                              
                          </div>
                    </Quantom_Grid>
                    </>
                
        )
}


export interface LedgerComponentState{
    ledgerData?: LedgerModel[];
    filters?: QuantomFilterOldModel;
    glAccount?:CommonCodeName;
    ledgerDetail?:DetailLedgerModel[],
    LedgerType?:'DETAIL_LEDGER'|'MASTER_LEDGER'
}

// interface LedgerFilters{
//     regsisterAccount?:CommonCodeName;
//     FromDate?:Date;
//     ToDate?:Date;
// }










export interface MultiLocationSelectionProps{
    selectedLocations:CommonCodeName[];
    onChange:(selectedLocations:CommonCodeName[])=>void;
}

export const MultiLocationSelectionlOVComp=()=>{
    let locs= useSelector((state:any)=>get_current_user_locations(state))
             ?.map((item,index)=>{
                 let obj:CommonCodeName={Code:item.LocId,Name:item.LocName}
                 return obj;
                });
    return(
        <Quantom_LOV label="Locations" FillDtaMethod={()=>Promise.resolve(locs)}  selected={{Code:'',Name:'All'}} onChange={(loc)=>{
            
        }}/>
    )
}


export const ListCompButton=(props?:ToolBarButtonProps)=>{

    
        const handleKeyDown = (e?:any) => {
          if (e?.key === "Enter" || e?.key === " ") {
            // alert('enter pressed')
            e.preventDefault(); // Prevent scrolling on Space key press
            props?.onClick?.();
          }
        };


    const theme= useTheme();
    const font= useQuantomFonts();
    return(
      <Box 
        role={props?.ignoreFocus?undefined: "button"}
        onKeyDown={handleKeyDown}
        tabIndex={props?.ignoreFocus?undefined: 0}
    //    justifyContent='center'
    //    alignItems='center'
       component={Paper}  fullWidth 
         sx={{
            display:'flex',
            flexDirection:'column',
            lineHeight:'20px',
            transition: 'all 0.3s ease',
                '&:hover': {
                backgroundColor: theme?.palette?.primary.main, // Change color on hover
                },

         }}
         onClick={props?.onClick} 
        style={{
                fontFamily:font.HeaderFont,fontWeight:600,
                fontSize:'12px',borderRadius:'4px',
                marginTop:props?.marginTop?props.marginTop:'9px',
                color:theme?.palette?.text.primary,
                // lineHeight:'20px',
                
                border:`1px solid black`,
                backgroundColor:theme.palette.background.default,
                alignItems:'center',
                justifyContent:"center",
                cursor:'pointer',
                }}>
                 <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                  <IconByName iconName={props?.iconName??""} fontSize='20px' color={theme.palette.text.primary} />
                </div>
              
                 {
                props?.Label?(
                    <div style={{alignItems:'center',marginTop:'-9px'}}>
                        {props?.Label} 
                  </div>
                ):(<></>)
              } 
             
      </Box>)

//     <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       gap: 2, // Optional: adds spacing between items
//     }}
//   >
//     <Box sx={{ width: 100, height: 100, bgcolor: 'primary.main' }} />
//     <Box sx={{ width: 100, height: 100, bgcolor: 'secondary.main' }} />
//     <Box sx={{ width: 100, height: 100, bgcolor: 'error.main' }} />
//   </Box>
// )
    
  }
