/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys, UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps"
import { SaleModel } from "../model/SaleModel"
import { VmSale } from "../model/VmSaleModel"
import { DeleteSale, InsertSale, SaleGetOne, SaleGetOne1 } from "../impl/SaleImpl"
import { CustomerListComp } from "./POSSale/PosSaleHelpers/POSCustomerCompProps"
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov"
import { CommonCodeName } from "../../../../../database/db"
import { CustomersGetCodeNameMethod } from "../../../config/customer/impl/CustomerImpl"
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView"
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date"
import { RenderItemGrid, RenderItemsGridV1 } from "../../../../Purchase/Processing/Purchase/view/POSPurchaseView"
import { InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import { useSaleAmountTotals } from "./POSSale/POSSaleView1"
import { Paper, useTheme } from "@mui/material"
import { useQuantomFonts } from "../../../../../redux/store"
import { isNullOrEmpty, safeParseToNumber, safePreviewNumber } from "../../../../../CommonMethods"
import dayjs from "dayjs"

export const SaleView=(props?:MenuComponentProps<VmSale>)=>{

    const location= UserGetSelectedLocation(props);

    useEffect(()=>{
        if(!props?.state?.Sale?.BillDate){
            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date()}})
        }
    },[props?.state?.Sale?.BillDate])

    useEffect(()=>{
        if(!props?.state?.Sale?.LocId && !isNullOrEmpty(location?.LocId)){
            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,LocId:location?.LocId}})
        }
    },[props?.state?.Sale?.LocId])

    React.useEffect(()=>{
          setFormBasicKeys<VmSale>({
             SaveMethod:(payload)=>{
            
                return InsertSale(payload)
             },
             DeleteMethod:(payload)=>DeleteSale(payload),
             GetOneMethod:(payload)=>SaleGetOne1(payload),
             SetBasicKeys:()=>({keyNoPropName:"Item.ItemCode",keyDatePropsName:""}),
             uniqueKey:props?.UniqueId??"",
             baseProps:props??{},
             settings:{firstControlId:"inventory_items_item_name",willShowLocations:true},
            
             AfterResetMethod:async(loc)=>{
               props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:location.LocId}})
             },
             InitOnLocationChange:(loc)=>{ 
                //props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:loc?.LocId}})
             }
            
            
          })
        },[props])

       
        const totals= useSaleAmountTotals(props);
        const theme =useTheme();
        const fonts= useQuantomFonts();


    return(
        <>
            <Quantom_Grid container size={12}>
                 <Quantom_Grid size={9}>
                    <GroupContainer Label="Master Information">
                        <Quantom_Grid spacing={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:6,md:6,lg:4}}>
                                <Quantom_Input value={props?.state?.Sale?.BillNo} label="Bill No"/>
                            </Quantom_Grid>
                            <Quantom_Grid  size={{xs:6,md:6,lg:4}}>
                                <QUANTOM_Date value={dayjs(props?.state?.Sale?.BillDate)}  onChange={(date)=>{
                                    props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:date?.toDate()}})
                                }} label="Bill Date"/>
                            </Quantom_Grid>
                        </Quantom_Grid>
                        <Quantom_Grid mt={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:12,md:12,lg:8}}>
                                <CustomerCombo baseProps={props} 
                                            OnChange={(cust)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:cust?.Code,CustName:cust?.Name}})}} 
                                            Customer={{Code:props?.state?.Sale?.CustCode,Name:props?.state?.Sale?.CustName}}/>
                            </Quantom_Grid>
                        </Quantom_Grid>

                        <Quantom_Grid mt={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:12,md:12,lg:8}}>
                                <Quantom_Input onChange={(s)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,Remarks:s?.target?.value}})}} value={props?.state?.Sale?.Remarks} label="Remarks"/>
                            </Quantom_Grid>
                        </Quantom_Grid>
                    </GroupContainer>


                    <GroupContainer>
                        <RenderItemsGridV1 items={props?.state?.SaleDetails} vendorType="SUPPLIER" locId={location?.LocId} fromName={InventoryAction.Sale} formNameString="SALE"
                                                    vendorCode={props?.state?.Sale?.CustCode} onChange={(items)=>{
                                    props?.setState?.({...props?.state,SaleDetails:[...items??[]]})
                                }} baseProps={props}/>
                    </GroupContainer>

                 </Quantom_Grid>
                 <Quantom_Grid size={3}>
                    <Quantom_Grid container display='flex' flexDirection='column' component={Paper} sx={{height:'calc(100vh - 40px)',
                                        fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                        
                        <Quantom_Grid display='flex' container  sx={{padding:'5px',paddingTop:'30px',paddingBottom:'30px',
                                borderTopLeftRadius:'5px',borderTopRightRadius:'5px',
                                backgroundColor:theme.palette.primary.main,borderBottom:`1px solid ${theme?.palette?.text.primary}`}}>
                            <div style={{flex:1,fontSize:'25px',letterSpacing:1,fontWeight:700,display:'flex',justifyContent:'center',color:theme.palette.primary.contrastText,
                            }}>Summary </div>
                                
                        </Quantom_Grid>
                        <Quantom_Grid display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px'}}>
                            <div style={{flex:1,alignItems:'center',display:'flex'}}>
                                    <div style={{marginRight:'5px'}}>
                                        <IconByName color={theme?.palette?.primary?.main} iconName="BusAlertOutlined"/>
                                    </div>
                                    Total Am 
                            </div>
                            <div style={{marginRight:'5px',fontWeight:700,fontSize:fonts.H3FontSize}}>{safePreviewNumber(totals?.grossAmount)}</div>     
                        </Quantom_Grid>
                        <Quantom_Grid display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px'}}>
                            <div style={{flex:1,alignItems:'center',display:'flex'}}>
                                    <div style={{marginRight:'5px'}}>
                                        <IconByName color={theme?.palette?.primary?.main} iconName="HorizontalRule"/>
                                    </div>
                                    Line Discount 
                            </div>
                            <div style={{marginRight:'5px',fontWeight:700,fontSize:fonts.H3FontSize}}>{safePreviewNumber(totals?.lineDiscount)}</div>     
                        </Quantom_Grid>
                        <Quantom_Grid  display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px',}}>
                            
                                    <Quantom_Grid style={{marginRight:'15px',display:'flex',alignItems:'center'}}>
                                        <div style={{marginRight:'5px'}}>
                                            <IconByName color={theme?.palette?.primary?.main} iconName="DoNotDisturbOnTotalSilenceOutlined"/>
                                        </div>
                                        Discount 
                                    </Quantom_Grid>
                                    

                                    <Quantom_Grid style={{flex:1}}>
                                        <input  value={props?.state?.Sale?.ExtraDiscount} 
                                                onChange={(e)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,ExtraDiscount:safeParseToNumber(e?.target?.value)}})}}
                                                type="text" style={{border:`1px solid ${theme?.palette?.primary?.main}`,width:'100%',
                                                paddingRight:'5px',borderRadius:'5px',textAlign:'right',fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,fontWeight:650}}/>
                                    </Quantom_Grid>
                            
                        </Quantom_Grid>
                        <Quantom_Grid display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px',
                                        paddingTop:'10px',paddingBottom:'10px'}}>
                            <div style={{flex:1,alignItems:'center',display:'flex'}}>
                                <div style={{marginRight:'5px'}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="AccountBalanceWalletOutlined"/>
                                </div>
                                Net  Am
                            </div>
                            <div style={{marginRight:'5px',fontWeight:700,fontSize:fonts.H3FontSize}}>{safePreviewNumber(totals?.netAmount)}</div>     
                        </Quantom_Grid>

                        <Quantom_Grid  display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px'}}>
                            
                                    <Quantom_Grid style={{marginRight:'15px',display:'flex',alignItems:'center'}}>
                                        <div style={{marginRight:'5px'}}>
                                            <IconByName color={theme?.palette?.primary?.main} iconName="CreditScoreOutlined"/>
                                        </div>
                                        Paid Am 
                                    </Quantom_Grid>
                                    

                                    <Quantom_Grid style={{flex:1}}>
                                        <input value={props?.state?.Sale?.TotalReceived} onChange={(e)=>{
                                            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,TotalReceived:safeParseToNumber(e?.target?.value)}})
                                        }} type="text" style={{border:`1px solid ${theme?.palette?.primary?.main}`,width:'100%',
                                                paddingRight:'5px',borderRadius:'5px',textAlign:'right',fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,fontWeight:650}}/>
                                    </Quantom_Grid>
                            
                        </Quantom_Grid>

                        <Quantom_Grid display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,
                                padding:'5px',paddingLeft:'0px',paddingTop:'25px',paddingBottom:'25px'}}>
                            <div style={{flex:1,alignItems:'center',display:'flex'}}>
                                <div style={{marginRight:'0px'}}>
                                    <IconByName fontSize="80px" color={theme?.palette?.primary?.main} iconName="CurrencyBitcoinOutlined"/>
                                </div>
                                
                            </div>
                            <div style={{marginRight:'5px',fontWeight:700,fontSize:'60px',color:theme.palette.primary.main}}>{safePreviewNumber(totals?.balance)}</div>     
                        </Quantom_Grid>
                    
                    </Quantom_Grid>
                 </Quantom_Grid> 
            </Quantom_Grid> 
        </>
    )
}




export interface CustomerComboProps{

    baseProps?:MenuComponentProps<any>;
    Customer?:CommonCodeName
    OnChange?:(val?:CommonCodeName)=>void;
}

export const CustomerCombo=(props?:CustomerComboProps)=>{
    return(
            <Quantom_LOV1  label="Customer" uniqueKeyNo={props?.baseProps?.UniqueId??""} keyNo="CUSTOMER_PAYMENT_RECEIPT_UNIQUE_KEY_NO"
                            selected={props?.Customer}
                            onChange={props?.OnChange}
                            FillDtaMethod={CustomersGetCodeNameMethod}/>
    )
}


