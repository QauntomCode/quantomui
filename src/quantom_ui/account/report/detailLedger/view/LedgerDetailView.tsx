/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react"
import {  IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"

import { Quantom_Grid } from "../../../../../quantom_comps/base_comps";
import dayjs from "dayjs";
import { QUANTOM_MasterDetailGrid1, QUANTOM_MasterDetailTable } from "../../../config/mainAccount/view/MainAccountView";
import { LedgerComponentState, LedgerFilterHeaderComp } from "../../Ledger/view/LedgerView";
import { GroupContainer } from "../../../processing/voucher/view/VoucherView";
import { useQuantomFonts } from "../../../../../redux/store";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Paper, useTheme } from "@mui/material";
import { isNullOrEmpty, IsValidDate, safeParseToRequestDate } from "../../../../../CommonMethods";
import { DetailLedgerModel } from "../model/DetailLedgerModel";
import { useIsMobile } from "../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty";
import { RenderSingleItemInventoryIOForMobile } from "../../../../sale/processing/sale/view/POSSale/PosSaleHelpers/SoldItemsHelper";



export const LedgerDetailView = (props?:MenuComponentProps<LedgerComponentState>) => {

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
                filters:{...props?.state?.filters,FromDate:fromDate,ToDate:toDate},ledgerData:[],LedgerType:'DETAIL_LEDGER'})
            },500)
       }
    },[])

    const isMobile= useIsMobile();
   
    return(
        <>
         <LedgerFilterHeaderComp {...props}/>
            {
                
                props?.state?.ledgerDetail?.map((item,index)=>{
                    return(
                       <RenderLedgerSingleEntry item={item}/> 
                    )
                })
            }




        </>
    )
}



interface RenderLedgerSingleEntryProps{
    item?:DetailLedgerModel
}

export const RenderLedgerSingleEntry=({item}:RenderLedgerSingleEntryProps)=>{
    const isMobile= useIsMobile();

    return(
        isMobile?(<>
               <RenderLedgerSingleEntryForMobile item={item}/> 
        </>):(<RenderLedgerSingleEntry item={item}/>)
        
    )
}

export const RenderLedgerSingleEntryForPc=({item}:RenderLedgerSingleEntryProps)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const [open,setOpen]= useState(false);
    const isMobile= useIsMobile();
    return(
        <Quantom_Grid  pl={2} pr={2} mt={.5} size={{xs:12}} 
                            sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize}} container component={Paper}>
            <Quantom_Grid container size={{xs:12}}>
                <Quantom_Grid onClick={()=>{
                    setOpen(!open)
                }} sx={{fontSize:'11px'}} >
                    {
                        isNullOrEmpty(item?.TransNo)?(<></>):(
                                <div style={{marginRight:'2px'}}><IconByName color={theme?.palette?.primary?.main} fontSize="16px" 
                                    iconName={open?"IndeterminateCheckBoxOutlined":"LocalHospitalOutlined"}/></div>
                        )
                    }
                </Quantom_Grid>
                <Quantom_Grid sx={{fontSize:'11px'}} size={{xs:12,sm:6,md:3,lg:1,xl:1.2}}>
                    {
                        isNullOrEmpty(item?.locName)?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div style={{marginRight:'2px'}}><IconByName fontSize="15px" iconName={"LocationOnOutlined"}/></div>
                                <div style={{flex:1}}>{item?.locName}</div>
                            </div>
                        )
                    }
                </Quantom_Grid>
                <Quantom_Grid sx={{fontSize:'11px'}} size={{xs:12,sm:6,md:3,lg:1,xl:1.5}}>
                    {
                        isNullOrEmpty(item?.FormName)?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div style={{marginRight:'2px'}}><IconByName fontSize="15px" iconName="DesktopWindowsOutlined"/></div>
                                <div style={{flex:1}}>{item?.FormName}</div>
                            </div>
                        )
                    }
                </Quantom_Grid>
                <Quantom_Grid sx={{fontSize:'11px'}} size={{xs:12,sm:6,md:3,lg:1.5,xl:1.5}}>
                    {
                        isNullOrEmpty(item?.TransNo)?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div><IconByName fontSize="18px" iconName="TagOutlined"/></div>
                                <div style={{flex:1}}>{item?.TransNo}</div>
                            </div>
                        )
                    }
                    
                </Quantom_Grid>
                <Quantom_Grid sx={{fontSize:'12px'}} size={{xs:12,sm:6,md:2,lg:1.5,xl:1}}>
                    {
                        IsValidDate(item?.VDate)?(      
                                <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                    <div><IconByName fontSize="16px" iconName="CalendarMonthOutlined"/></div>
                                    <div style={{flex:1}}>{dayjs(item?.VDate).format('DD/MMM/YYYY')}</div>
                                </div>
                        ):(<></>)
                    }
                </Quantom_Grid>

                <Quantom_Grid sx={{fontSize:'11px'}} size={{xs:12,sm:6,md:4,lg:4,xl:4}}>
                    {
                        isNullOrEmpty(item?.Remarks)?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div><IconByName fontSize="18px" iconName="LabelOutlined"/></div>
                                <div style={{flex:1}}>{item?.Remarks}</div>
                            </div>
                        )
                    }
                </Quantom_Grid>
                <Quantom_Grid pl={2} fontWeight={600} sx={{fontSize:'12px',letterSpacing:1.3}} size={{xs:12,sm:6,md:4,lg:1,xl:1}}>
                    {
                        (!item?.VCode || (!item?.Debit && !item?.Credit))?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div><IconByName fontSize="18px" iconName= {item.Debit?"AddOutlined":"RemoveOutlined"}/></div>
                                <div style={{flex:1,color:item?.Debit?theme?.palette?.success?.dark:theme?.palette?.error?.main}}>{(item?.Debit??0>0)?item.Debit:item.Credit}</div>
                            </div>
                        )
                    }
                </Quantom_Grid>
                <Quantom_Grid display='flex' justifyContent='right' pr={1} fontWeight={600} sx={{fontSize:'12px',letterSpacing:1.3}} size={{xs:12,sm:6,md:4,lg:1,xl:1.5}}>
                        {
                        item?.Balance?(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div ><IconByName fontSize="18px" color={theme?.palette?.text?.disabled} iconName="AccountBalanceWalletOutlined"/></div>
                                <div style={{flex:1,marginLeft:'4px'}}>{item?.Balance}</div>
                            </div>
                        ):(<></>)
                        }
                    
                </Quantom_Grid>
            </Quantom_Grid>
            {open && item?.InvoiceDetail?(
           

           
                    <>
                        {
                            !isMobile?(<>

                                    <Quantom_Grid mt={4} mb={4} size={{xs:12}} container pl={6} pr={6}>
                                         <Quantom_Grid mb={.3} sx={{fontFamily:fonts.HeaderFont,fontSize:'11px',letterSpacing:1.5,fontWeight:600,
                                            borderBottom:`3px solid ${theme?.palette?.text?.disabled}`
                                         }} container size={{xs:12}}>
                                             <Quantom_Grid  size={{xs:3}}>Item Name</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1.5}}>Unit Name</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Qty</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Price</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Dis</Quantom_Grid>
                                             <Quantom_Grid size={{xs:2}}>Amount</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>PackSize</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>PriceUnit</Quantom_Grid>
                                         </Quantom_Grid>
                                         {
                                            item?.InvoiceDetail?.map((item,index)=>{
                                                return(
                                                <Quantom_Grid sx={{fontFamily:fonts.HeaderFont,fontSize:'11px',letterSpacing:1.5,
                                                    borderBottom:`.5px solid ${theme?.palette?.text?.disabled}`
                                                }} container size={{xs:12}}>
                                                    <Quantom_Grid  size={{xs:3}}>{item?.ItemName}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1.5}}>{item?.UnitName}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.Qty}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.Price}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.DisAmount}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:2}}>{item?.Amount}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>={item?.PackSize}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.PriceUnitRate}</Quantom_Grid>
                                                </Quantom_Grid>
                                                )
                                            })
                                         }
                                    </Quantom_Grid>
                            </>):(<>

                                    {item?.InvoiceDetail?.map((item,index)=>{
                                        return(
                                        <RenderSingleItemInventoryIOForMobile isReport item={item} />
                                        )
                                    })}
                            </>)
                        }
                    </>

                     
                
            ):(<></>)}
            
        </Quantom_Grid>
    )
}




export const RenderLedgerSingleEntryForMobile=({item}:RenderLedgerSingleEntryProps)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const [open,setOpen]= useState(false);
    const isMobile= useIsMobile();
    return(
        <Quantom_Grid sx={{fontFamily:fonts?.HeaderFont,fontSize:'12px',color:theme?.palette?.text?.disabled,borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}  p={1} mt={.5} size={{xs:12}} 
                             container component={Paper}>
            

            <Quantom_Grid container display='flex' alignItems='center' size={{xs:12,}}>
                  <div style={{marginRight:'2px'}}><IconByName fontSize="20px" iconName={"LocationOnOutlined"}/></div>
                  <div style={{fontSize:'17px',fontWeight:600}}>{item?.locName}</div>
            </Quantom_Grid>

            <Quantom_Grid mt={.5} display='flex' size={{xs:12}} sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}}>
                <div style={{flex:1,display:'flex',alignItems:'center'}}>
                    <IconByName iconName="LaptopWindows" fontSize="16px" color={theme?.palette?.text?.disabled}/>
                    {item?.FormName}
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <IconByName iconName="DateRange" fontSize="16px" color={theme?.palette?.text?.disabled}/>
                {dayjs(item?.VDate)?.format('DD/MMM/YYYY')}
                </div>
              </Quantom_Grid>


              <Quantom_Grid mt={.5} display='flex' size={{xs:12}} sx={{borderBottom:`.5px dashed ${theme?.palette?.text?.disabled}`}}>
                <div style={{display:'flex',flex:1,alignItems:'center'}}>
                    <IconByName iconName="Tag" fontSize="16px" color={theme?.palette?.text?.disabled}/>
                    {item?.TransNo}
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    {
                        (!item?.VCode || (!item?.Debit && !item?.Credit))?(<></>):(
                            <div style={{width:'100',display:'flex',alignItems:"center"}}>
                                <div><IconByName fontSize="18px" iconName= {item.Debit?"AddOutlined":"RemoveOutlined"}/></div>
                                <div style={{flex:1,color:item?.Debit?theme?.palette?.success?.dark:theme?.palette?.error?.main}}>{(item?.Debit??0>0)?item.Debit:item.Credit}</div>
                            </div>
                        )
                    }
                </div>
              </Quantom_Grid>

              <Quantom_Grid mt={.5} display='flex' size={{xs:12}} sx={{borderBottom:`.5px dashed ${theme?.palette?.text?.disabled}`}}>
                <div style={{display:'flex',flex:1,alignItems:'center'}}>
                    {/* <IconByName iconName="AbcOutlined" fontSize="16px" color={theme?.palette?.text?.disabled}/> */}
                    {item?.Remarks}
                </div>
              </Quantom_Grid>

                
                <Quantom_Grid mt={.5} display='flex' justifyContent='right' pr={1} fontWeight={600} sx={{fontSize:'12px',letterSpacing:1.3}} size={{xs:12}}>

                   {item?.InvoiceDetail?(<>
                    <div onClick={()=>{setOpen(!open)}} style={{display:'flex',alignItems:'center'}}>
                         <IconByName iconName= {open?"IndeterminateCheckBoxOutlined":"LocalHospitalOutlined"} fontSize="20px" color={theme?.palette?.text?.primary}/>
                    </div>
                   </>):(<></>)}
                   

                    <div style={{display:'flex',flex:1,justifyContent:'end'}}>
                            {
                            item?.Balance?(
                                <div style={{width:'100',display:'flex',alignItems:"cebter"}}>
                                    <div ><IconByName fontSize="18px" color={theme?.palette?.text?.disabled} iconName="AccountBalanceWalletOutlined"/></div>
                                    <div style={{flex:1,marginLeft:'4px',color:theme?.palette?.text?.primary}}>{item?.Balance}</div>
                                </div>
                            ):(<></>)
                            }
                    </div>
            </Quantom_Grid>
            {open && item?.InvoiceDetail?(
           

           
                    <>
                        {
                            !isMobile?(<>

                                    <Quantom_Grid mt={4} mb={4} size={{xs:12}} container pl={6} pr={6}>
                                         <Quantom_Grid mb={.3} sx={{fontFamily:fonts.HeaderFont,fontSize:'11px',letterSpacing:1.5,fontWeight:600,
                                            borderBottom:`3px solid ${theme?.palette?.text?.disabled}`
                                         }} container size={{xs:12}}>
                                             <Quantom_Grid  size={{xs:3}}>Item Name</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1.5}}>Unit Name</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Qty</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Price</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>Dis</Quantom_Grid>
                                             <Quantom_Grid size={{xs:2}}>Amount</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>PackSize</Quantom_Grid>
                                             <Quantom_Grid size={{xs:1}}>PriceUnit</Quantom_Grid>
                                         </Quantom_Grid>
                                         {
                                            item?.InvoiceDetail?.map((item,index)=>{
                                                return(
                                                <Quantom_Grid sx={{fontFamily:fonts.HeaderFont,fontSize:'11px',letterSpacing:1.5,
                                                    borderBottom:`.5px solid ${theme?.palette?.text?.disabled}`
                                                }} container size={{xs:12}}>
                                                    <Quantom_Grid  size={{xs:3}}>{item?.ItemName}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1.5}}>{item?.UnitName}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.Qty}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.Price}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.DisAmount}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:2}}>{item?.Amount}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>={item?.PackSize}</Quantom_Grid>
                                                    <Quantom_Grid size={{xs:1}}>{item?.PriceUnitRate}</Quantom_Grid>
                                                </Quantom_Grid>
                                                )
                                            })
                                         }
                                    </Quantom_Grid>
                            </>):(<>

                                <Quantom_Grid p={2}>

                                    {item?.InvoiceDetail?.map((item,index)=>{
                                        return(
                                           
                                                <RenderSingleItemInventoryIOForMobile isReport item={item} />
                                           
                                        )
                                    })}
                                     </Quantom_Grid>
                            </>)
                        }
                    </>

                     
                
            ):(<></>)}
            
        </Quantom_Grid>
    )
}


