/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys, UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps"
import { SaleModel } from "../model/SaleModel"
import { VmSale } from "../model/VmSaleModel"
import { DeleteSale, InsertSale, SaleGetAll, SaleGetOne, SaleGetOne1 } from "../impl/SaleImpl"
import { CustomerListComp } from "./POSSale/PosSaleHelpers/POSCustomerCompProps"
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov"
import { CommonCodeName } from "../../../../../database/db"
import { CustomersGetCodeNameMethod } from "../../../config/customer/impl/CustomerImpl"
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView"
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date"
import { RenderItemGrid, RenderItemsGridV1 } from "../../../../Purchase/Processing/Purchase/view/POSPurchaseView"
import { InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import { useSaleAmountTotals } from "./POSSale/POSSaleView1"
import { Button, Paper, useTheme } from "@mui/material"
import store, { get_form_state_without_selector, get_helperData_by_key, getCurrentLocationWithStore, useQuantomFonts } from "../../../../../redux/store"
import { isNullOrEmpty, safeParseToNumber, safePreviewNumber } from "../../../../../CommonMethods"
import dayjs from "dayjs"
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1"
import { useSelector } from "react-redux"
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice"
import { FilterHandler, useIsMobile } from "./POSSale/POSSaleViewWithEmpty"

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
          setTimeout(() => {
            props?.setListComponent?.((<SaleViewList baseProps={props} uniqueId={props?.UniqueId}/>))
          }, 500);
        },[])

    React.useEffect(()=>{
          setFormBasicKeys<VmSale>({
             SaveMethod:async(payload,ctx)=>{
                let nP={...payload}
                // var loc= await getCurrentLocationWithStore(props?.UniqueId);
                // alert(ctx?.Location?.LocId)
                
                 if(ctx?.Location &&  isNullOrEmpty(payload?.Sale?.LocId)){
                   nP={...nP,Sale:{...nP.Sale,LocId:ctx?.Location?.LocId}}
                 }
                 if(!nP?.Sale?.BillDate){
                    alert('bill date is'+nP.Sale?.BillDate)
                    nP={...nP,Sale:{...nP.Sale,BillDate:new Date()}}
                 }
                return InsertSale(nP)
             },
             overRideSetStateAfterSave:async(payload,ctx)=>{
                // let s= get_form_state_without_selector(props?.UniqueId) as VmSale 
                let s= await get_form_state_without_selector(props?.UniqueId) as VmSale
                console.log('after save data is',payload)
                props?.setState?.({...s,Sale:{...s?.Sale,BillNo:payload?.Sale?.BillNo}})
             },
             DeleteMethod:(payload)=>DeleteSale(payload),
             GetOneMethod:(payload)=>SaleGetOne1(payload),
             SetBasicKeys:()=>({keyNoPropName:"Item.ItemCode",keyDatePropsName:""}),
             uniqueKey:props?.UniqueId??"",
             baseProps:props??{},
             settings:{firstControlId:"inventory_items_item_name",willShowLocations:true},
            
            //  AfterResetMethod:async(loc)=>{
            //    //props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:location?.LocId}})
            //  },
             InitOnLocationChange:(loc)=>{ 
                //props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:loc?.LocId}})
             }
            
            
          })
        },[props])

       
        const totals= useSaleAmountTotals(props);
        const theme =useTheme();
        const fonts= useQuantomFonts();
        const isMobile= useIsMobile();

    return(
        <>
            <Quantom_Grid container size={12} spacing={1.5}>
                 <Quantom_Grid size={{xs:12,sm:12,md:9}}>
                    <GroupContainer Label="Master Information">
                        <Quantom_Grid size={{xs:12}} container spacing={1.5}>

                            <Quantom_Grid size={{xs:12,md:12,lg:8}}>
                                <Quantom_Grid spacing={.5} size={{xs:12}} container>
                                    <Quantom_Grid  size={{xs:6,sm:6,md:5,}}>
                                        <Quantom_Input value={props?.state?.Sale?.BillNo} label="Bill No"/>
                                    </Quantom_Grid>
                                    <Quantom_Grid  size={{xs:6,sm:6,md:5}}>
                                        <QUANTOM_Date value={dayjs(props?.state?.Sale?.BillDate)}  onChange={(date)=>{
                                            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:date?.toDate()}})
                                        }} label="Bill Date"/>
                                    </Quantom_Grid>
                                </Quantom_Grid>
                                <Quantom_Grid mt={.5} size={{xs:12}} container>
                                    <Quantom_Grid  size={{xs:12,md:10,}}>
                                        <CustomerCombo baseProps={props} 
                                                    OnChange={(cust)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:cust?.Code,CustName:cust?.Name}})}} 
                                                    Customer={{Code:props?.state?.Sale?.CustCode,Name:props?.state?.Sale?.CustName}}/>
                                    </Quantom_Grid>
                                </Quantom_Grid>
                            </Quantom_Grid>

                            <Quantom_Grid size={{xs:12,md:12,lg:4}}>
                                <Quantom_Grid mt={.5} size={{xs:12}} container>
                                    <Quantom_Grid  size={{xs:12,md:12,lg:12}}>
                                        <Quantom_Input rows={isMobile?1:3} multiline={!isMobile}  onChange={(s)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,Remarks:s?.target?.value}})}} value={props?.state?.Sale?.Remarks} label="Remarks"/>
                                    </Quantom_Grid>
                                </Quantom_Grid>
                            </Quantom_Grid>
                        </Quantom_Grid>
                        
                    </GroupContainer>


                    <Quantom_Grid mt={1.5} container size={{xs:12}}>
                        <RenderItemsGridV1 items={props?.state?.SaleDetails} vendorType="SUPPLIER" locId={location?.LocId} fromName={InventoryAction.Sale} formNameString="SALE"
                                                    vendorCode={props?.state?.Sale?.CustCode} onChange={(items)=>{
                                    props?.setState?.({...props?.state,SaleDetails:[...items??[]]})
                                }} baseProps={props}/>
                    </Quantom_Grid>

                 </Quantom_Grid>
                 <Quantom_Grid size={{xs:12,ms:12,md:3}}>
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



interface POSBillListProps{
    uniqueId?:string;
    baseProps?:MenuComponentProps<VmSale>
}


const SaleViewList=(props?:POSBillListProps)=>{

    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());
    const [search,setSearch] =useState<string>('');
     const location= UserGetSelectedLocation(props?.baseProps)

    const PURCHASE_DATA_KEY_RECORD="PURCHASE_DATA_KEY_RECORD"
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.uniqueId??"",PURCHASE_DATA_KEY_RECORD)) as SaleModel[];
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const isMobile=useIsMobile();
    return(
        <>
          <Quantom_Grid container  spacing={.5} size={{xs:12}}>
            
            <FilterHandler OkAndAplyFilter={async()=>{
                // alert('testing')
                let res = await SaleGetAll(fromDate,toDate,'',location?.LocId);
                store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
            }}>
               <Quantom_Grid spacing={1} container size={{xs:12}}>
                  <Quantom_Grid item  size={{xs:12,sm:12,md:2}}>
                    <QUANTOM_Date  label ="From Date" value={dayjs(fromDate)} onChange={(date,ctc)=>{setFromDate(date?.toDate()??new Date())}}/>
                  </Quantom_Grid>
                  <Quantom_Grid item size={{xs:12,sm:12,md:2}}>
                    <QUANTOM_Date  label ="To Date" value={dayjs(toDate)} onChange={(date,ctc)=>{setToDate(date?.toDate()??new Date())}}/>
                  </Quantom_Grid>
                  <Quantom_Grid item size={{xs:12,sm:12,md:2}}>
                    <Quantom_Input  label ="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  </Quantom_Grid>
                  {
                    isMobile?(<></>):(<>
                        <Quantom_Grid item >
                            <POSActionButton1 iconName="ScreenSearchDesktopOutlined" label="Search" onClick={async()=>{
                                let res = await SaleGetAll(fromDate,toDate,'',location?.LocId);
                                store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
                            }}/>
                        </Quantom_Grid>
                    </>)
                  }
                  
                  
               </Quantom_Grid>
            </FilterHandler>

               <Quantom_Grid container size={{xs:12}}   >
                  {listData?.map?.((item,index)=>{
                    // alert(item?.CustName)
                     return(

                        <Quantom_Grid p={1} component={Paper} container size={{xs:12,sm:12,md:6,lg:4,xl:4}} sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize}}>
                            <Quantom_Grid color={theme?.palette?.text?.disabled} borderBottom={`3px solid ${theme?.palette?.text?.disabled}`} display='flex' size={{xs:12}}>
                                <Quantom_Grid alignItems='center' display='flex' flex={1}>
                                    <IconByName fontSize="16px" iconName="Tag"/>
                                    {item?.BillNo}
                                </Quantom_Grid>
                                <Quantom_Grid pr={1}>{dayjs(item?.BillDate).format('MM/DD/YYYY')}</Quantom_Grid>
                            </Quantom_Grid>

                            <Quantom_Grid borderBottom={`1px dotted ${theme?.palette?.text?.disabled}`} display='flex' alignItems='center' size={{xs:12}}sx={{fontSize:fonts?.H4FontSize,fontWeight:500}}>
                                <IconByName iconName="AccountBoxOutlined"/>
                                {item?.CustName}
                            </Quantom_Grid>
                            

                            <Quantom_Grid display='flex' size={{xs:12}}>
                                <Quantom_Grid alignItems='center' display='flex' fontSize='22px' fontWeight='bold' flex={1}>
                                    <IconByName fontSize="30px" color={theme?.palette?.primary.main} iconName="AccountBalanceWalletOutlined"/>
                                    {item?.TAmount?.toFixed(2)}
                                </Quantom_Grid>
                                <Quantom_Grid >
                                    <POSActionButton1 onClick={()=>{
                                         props?.baseProps?.setPrimaryKeyNo?.(item?.BillNo)
                                    }} label="View" iconName="TrendingFlatOutlined" backgroundColor={theme?.palette?.secondary?.main}/>
                                </Quantom_Grid>
                            </Quantom_Grid>

                        </Quantom_Grid>

                        // <Quantom_Grid 
                        //         component={Paper} 
                        //         sx={{FontFamily:font.HeaderFont,fontSize:font.HeaderFont,padding:"4px",borderRadius:'4px',
                        //             borderBottom:`1px solid ${theme?.palette?.primary?.main}`
                        //         }} 
                        // size={{xs:12,sm:12,md:6,lg:4,xl:3}}> 
                        // <div style={{display:'flex',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                        //     <div  style={{fontWeight:500,fontFamily:font.HeaderFont,fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                        //         <div style={{marginRight:"8px"}}>
                        //             <IconByName fontSize="16px" color={theme?.palette?.primary?.main} iconName="TagOutlined"/>
                        //         </div>
                        //             {item?.BillNo}
                        //     </div>
                        //     <div style={{fontWeight:500,fontSize:font.H4FontSize,display:'flex',alignItems:'center'}}>
                                
                        //         <div style={{marginRight:"8px"}}>
                        //             <IconByName fontSize="16px" color={theme?.palette?.primary?.main} iconName="DateRangeOutlined"/>
                        //         </div>
                        //             {dayjs(item?.BillDate).format('DD-MMM-YYYY') }
                        //     </div>

                        //   </div>
                        //   <div style={{fontSize:font.H3FontSize,fontWeight:600,display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                        //          <div style={{marginRight:"8px"}}>
                        //             <IconByName color={theme?.palette?.primary?.main} iconName="PersonOutlineOutlined"/>
                        //         </div>
                        //     {/* {item?.supplier} */}
                        //      {item?.CustName}
                        //   </div>
                        //   <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                        //     <div style={{display:'flex',alignItems:'center',flex:2,fontSize:'30px'}}>
                        //          <div style={{marginRight:"8px"}}>
                        //          <IconByName fontSize="40px" color={theme?.palette?.primary?.main} iconName="AccountBalanceWalletOutlined"/>
                        //         </div>
                        //       {item?.TAmount?.toFixed(2)} 
                        //     </div>
                        //     <div style={{display:'flex',alignItems:'center',flex:1,marginLeft:'8px'}}>
                        //          <Button 
                        //             onClick={()=>{
                        //                 props?.baseProps?.setPrimaryKeyNo?.(item?.BillNo)
                        //                // store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.BillNo}})))
                        //                 //store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                        //             }}
                        //             style={{
                        //                     border:`1px solid ${theme.palette.primary.main}`,width:'100%',
                        //                     fontFamily:font.HeaderFont,fontWeight:'bold',color:theme.palette.secondary.contrastText ,
                        //                     backgroundColor:theme?.palette?.secondary?.main,
                        //                     display:'flex',justifyContent:'center',alignItems:'center'   }}>
                        //             View   
                        //             <div style={{marginLeft:'10px'}}>
                        //              <IconByName color={theme?.palette?.secondary?.contrastText} iconName="EastOutlined"/>
                        //             </div>
                        //          </Button>
                        //     </div>
                        //   </div>

                        // </Quantom_Grid>
                     )
                  })}
               </Quantom_Grid>
          </Quantom_Grid>
        </>
    )
}