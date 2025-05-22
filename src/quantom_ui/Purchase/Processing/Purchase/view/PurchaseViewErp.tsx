/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { PurchaseModel, VMPurchaseModel } from "../model/VMPurchaseModel";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog, UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE} from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { add_helper_data_single_key, set_component_record_key } from "../../../../../redux/reduxSlice";
import { CommonInvDetailModel, InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { INVENTORY_PERFORMED_ACTION } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { AddOrRemoveExtendedMethod } from "../../../../inventory/CommonComp/CommonInvDetail/Impl/InventoryIoMethods";
import { FocusOnControlByControlId, get_obtain_am_of_percent, get_percent_of_obtain_am, isNullOrEmpty, safeParseToNumber, safePreviewNumber } from "../../../../../CommonMethods";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input, Quantom_Input1 } from "../../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { Quantom_LOV, Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";
import { GetActiveItemCodeName, GetEffectedPriceOfAllUnits } from "../../../../inventory/config/item/impl/InventoryitemsImpl";
import { SupplierGetCodeNameMethod } from "../../../Config/Supplier/customer/impl/SuppierImpl";
import { PurchaseDeleteMethod, PurchaseGetAll, PurchaseGetOneMethod, PurchaseInsertMethod } from "../impl/PurchaseImp";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../../HTTP/QuantomHttpMethods";

import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

import { POS_SALE_LOCID_KEY, POS_SELECTED_BILL_NO_HELPER_DATA_KEY, RenderItemsGridV1 } from "./POSPurchaseView";
import { FilterHandler, useIsMobile } from "../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty";




export const PurchaseViewErp=(props?:MenuComponentProps<VMPurchaseModel>)=>{

    
    
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    
    

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VMPurchaseModel>({
            uniqueKey:props?.UniqueId??"",
            SaveMethod:(payload,ctx)=>{

                let load={...payload}
                if(isNullOrEmpty(load?.purchase?.LocId) && ctx?.Location?.LocId){
                    load={...load,purchase:{...load?.purchase,LocId:ctx?.Location?.LocId}}
                }
                if(!load?.purchase?.BillDate){
                    load={...load,purchase:{...load?.purchase,BillDate:new Date()}}
                }
                return PurchaseInsertMethod(load)
            },
            GetOneMethod:(payload,ctx)=>PurchaseGetOneMethod(payload),
            DeleteMethod:(payload,ctx)=>PurchaseDeleteMethod(payload),
            baseProps:props??{},
            settings:{WillHideUserLog:true,willShowLocations:true},
            InitOnLocationChange:(location)=>{
                store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_SALE_LOCID_KEY,Data:location?.LocId}}))
            }
         })

        }
    },[fullState?.IsFirstUseEffectCall])

    useEffect(()=>{
        setTimeout(() => {
          props?.setListComponent?.((<POSBillList baseProps={props}/>))
        }, 500);
      },[])



    
    return(
        <>
         
            <POSBillView {...props}/>
        </>
    )
}


 const POSBillView=(props?:MenuComponentProps<VMPurchaseModel>)=>{
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    



    const grossAmount= props?.state?.purchaseDetails?.reduce((preVal,current)=>(preVal)+((current?.Qty??0)*(current?.Price??0)-(current?.DisAmount??0)),0)??0
    const disAmount= /*safeParseToNumber((props?.state?.purchaseDetails?.reduce((preVal,current)=>(preVal)+(current?.DisAmount??0),0)??0))+*/ safeParseToNumber((props?.state?.purchase?.ExtraDiscount??0))
     console.warn('discount amount is'+disAmount)
     console.warn('Extra discount is'+props?.state?.purchase?.ExtraDiscount)

    const netAmount= safeParseToNumber(grossAmount??0)-safeParseToNumber(disAmount??0);
    const balance= (netAmount-(props?.state?.purchase?.PaidAmount??0))

    // const billNo= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY)));
    // useEffect(()=>{
    //     handleGetOneBillNo();
    // },[billNo])

    // const handleGetOneBillNo=async()=>{
    //     if(billNo && billNo!=="0"){
    //         ShowLoadingDialog();
    //        let res = await PurchaseGetOneMethod(billNo);
    //        HideLoadingDialog();
    //        if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
    //             props?.setState?.({...res?.Response})
    //        }
    //        else{
    //           ShowQuantomError({MessageHeader:"Error !",MessageBody:res?.ErrorMessage})
    //        }
    //     }
    //     if(billNo==="0"){
    //         props?.setState?.({})
    //         store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:""}})))
    //     }
    // }

    const PURCHASE_SUPPLIER_CONTROL_ID="SUPPLIER_CONTROL_ID_PURCHASE_CONTROL";
    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
      <>
       
        <div className="row g-2">
            
            <div className="col-md-9">
                <div className="row  g-2">
                    <div className=" col-md-3">
                        <Quantom_Input label="Bill No" value={props?.state?.purchase?.BillNo} disabled/>
                    </div>
                    <div className=" col-md-3">
                        <QUANTOM_Date   label="Bill Date" value={dayjs(props?.state?.purchase?.BillDate?? new Date())} onChange={(date)=>{
                            props?.setState?.({...props?.state,purchase:{...props?.state?.purchase,BillDate:date?.toDate()??new Date()}})
                        }}/>
                    </div>
                    <div className="col-md-6">
                    <Quantom_LOV1 id={PURCHASE_SUPPLIER_CONTROL_ID} uniqueKeyNo={props?.UniqueId??""}  selected={{Code:props?.state?.purchase?.SuppCode,
                                                                                 Name:props?.state?.purchase?.SuppName}} 
                                onChange={(item)=>{
                                    // alert('onchage item is called')
                                    props?.setState?.({...props?.state,purchase:{...props?.state?.purchase,SuppCode:item?.Code,SuppName:item?.Name}})
                                }} 
                                keyNo="PURCHASE_SUPLIER_LOV_1" label="Supplier"  FillDtaMethod={SupplierGetCodeNameMethod} />
                    </div>
                </div>
                <div className="row g-2" style={{marginTop:'0px',paddingBottom:'10px',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                    <div className="col-md-12">
                        <Quantom_Input label="Remarks" value={props?.state?.purchase?.Remarks} onChange={(e)=>{
                            props?.setState?.({...props?.state,purchase:{...props?.state?.purchase,Remarks:e?.target?.value}})
                        }}/>
                    </div>
                </div>

                
                    <Quantom_Grid size={{xs:12}}>
                        <RenderItemsGridV1  items={props?.state?.purchaseDetails} vendorType="SUPPLIER" locId={locId} fromName={InventoryAction.Purchase} formNameString="PURCHAES"
                                            vendorCode={props?.state?.purchase?.SuppCode} onChange={(items)=>{
                            props?.setState?.({...props?.state,purchaseDetails:[...items??[]]})
                        }} baseProps={props}/>
                    </Quantom_Grid>
                
            </div>
            <div className="col-md-3" >
                <Quantom_Grid container display='flex' flexDirection='column' component={Paper} sx={{height:'calc(100vh - 40px)',
                                    fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                    
                    <Quantom_Grid display='flex' container  sx={{padding:'5px',paddingTop:'30px',paddingBottom:'30px',
                            borderTopLeftRadius:'5px',borderTopRightRadius:'5px',
                            backgroundColor:theme.palette.primary.main,borderBottom:`1px solid ${theme?.palette?.text.primary}`}}>
                        <div style={{flex:1,fontSize:'25px',letterSpacing:1,fontWeight:700,display:'flex',justifyContent:'center',color:theme.palette.primary.contrastText,
                        }}>Summary </div>
                             
                    </Quantom_Grid>
                    <Quantom_Grid display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,
                    padding:'5px'}}>
                        <div style={{flex:1,alignItems:'center',display:'flex'}}>
                            <div style={{marginRight:'5px'}}>
                                <IconByName color={theme?.palette?.primary?.main} iconName="BusAlertOutlined"/>
                            </div>
                            Total Am 
                        </div>
                        <div style={{marginRight:'5px',fontWeight:700,fontSize:fonts.H3FontSize}}>{grossAmount?.toFixed(2)}</div>     
                    </Quantom_Grid>
                    <Quantom_Grid  display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px',}}>
                        
                                <Quantom_Grid style={{marginRight:'15px',display:'flex',alignItems:'center'}}>
                                    <div style={{marginRight:'5px'}}>
                                        <IconByName color={theme?.palette?.primary?.main} iconName="DoNotDisturbOnTotalSilenceOutlined"/>
                                    </div>
                                    Discount 
                                </Quantom_Grid>
                                

                                <Quantom_Grid style={{flex:1}}>
                                    <input  value={props?.state?.purchase?.ExtraDiscount} 
                                            onChange={(e)=>{props?.setState?.({...props?.state,purchase:{...props?.state?.purchase,ExtraDiscount:safeParseToNumber(e?.target?.value)}})}}
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
                        <div style={{marginRight:'5px',fontWeight:700,fontSize:fonts.H3FontSize}}>{netAmount?.toFixed(2)}</div>     
                    </Quantom_Grid>

                    <Quantom_Grid  display='flex' container component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,padding:'5px'}}>
                        
                                <Quantom_Grid style={{marginRight:'15px',display:'flex',alignItems:'center'}}>
                                    <div style={{marginRight:'5px'}}>
                                        <IconByName color={theme?.palette?.primary?.main} iconName="CreditScoreOutlined"/>
                                    </div>
                                    Paid Am 
                                </Quantom_Grid>
                                

                                <Quantom_Grid style={{flex:1}}>
                                    <input value={props?.state?.purchase?.PaidAmount} onChange={(e)=>{
                                        props?.setState?.({...props?.state,purchase:{...props?.state?.purchase,PaidAmount:safeParseToNumber(e?.target?.value)}})
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
                        <div style={{marginRight:'5px',fontWeight:700,fontSize:'60px',color:theme.palette.primary.main}}>{balance?.toFixed(2)}</div>     
                    </Quantom_Grid>
                   
                </Quantom_Grid>
                  
              
            </div>

            
           
        </div>
            
      </>
    )
}










interface POSBillListProps{
    baseProps?:MenuComponentProps<VMPurchaseModel>
}

 const POSBillList=(props?:POSBillListProps)=>{

    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());
    const [search,setSearch] =useState<string>('');
    const location= UserGetSelectedLocation(props?.baseProps);

    const PURCHASE_DATA_KEY_RECORD="PURCHASE_DATA_KEY_RECORD"
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",PURCHASE_DATA_KEY_RECORD)) as PurchaseModel[];
    const theme= useTheme();
    const fonts= useQuantomFonts();

    const isMobile= useIsMobile();
    return(
        <>
        
         <FilterHandler OkAndAplyFilter={async()=>{
            let res = await PurchaseGetAll({FromDate:fromDate,ToDate:toDate,Search:search,LocId:location?.LocId});
            console.warn('this is my response',res);
            store.dispatch(add_helper_data_single_key({UniqueId:props?.baseProps?.UniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
         }}>
                <Quantom_Grid container  spacing={.5} size={{xs:12}}>               
                        <Quantom_Grid container size={{xs:12}}>
                        
                        </Quantom_Grid>
                        <Quantom_Grid item  size={{xs:12,sm:12,md:2}}>
                            <QUANTOM_Date  label ="From Date" value={dayjs(fromDate)} onChange={(date,ctc)=>{setFromDate(date?.toDate()??new Date())}}/>
                        </Quantom_Grid>
                        <Quantom_Grid item size={{xs:12,sm:12,md:2}}>
                            <QUANTOM_Date  label ="To Date" value={dayjs(toDate)} onChange={(date,ctc)=>{setToDate(date?.toDate()??new Date())}}/>
                        </Quantom_Grid>
                        <Quantom_Grid item size={{xs:12,sm:12,md:5}}>
                            <Quantom_Input  label ="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        </Quantom_Grid>

                         {
                            isMobile?(<></>):(<>
                                <Quantom_Grid item >
                                    <POSActionButton1 iconName="ScreenSearchDesktopOutlined" label="Search" onClick={async()=>{
                                        let res = await PurchaseGetAll({FromDate:fromDate,ToDate:toDate,Search:search,LocId:location?.LocId});
                                        console.warn('this is my response',res);
                                        store.dispatch(add_helper_data_single_key({UniqueId:props?.baseProps?.UniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
                                    }}/>
                                </Quantom_Grid>
                            </>)
                         }
                       
                        
                    </Quantom_Grid>
            </FilterHandler>

               <Quantom_Grid container size={{xs:12}}  spacing={2} sx={{padding:"20px"}}>
                  {listData?.map((item,index)=>{
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
                                {item?.SuppName}
                            </Quantom_Grid>
                            

                            <Quantom_Grid display='flex' size={{xs:12}}>
                                <Quantom_Grid alignItems='center' display='flex' fontSize='22px' fontWeight='bold' flex={1}>
                                    <IconByName fontSize="30px" color={theme?.palette?.primary.main} iconName="AccountBalanceWalletOutlined"/>
                                    {item?.NetTotal?.toFixed(2)}
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
                        //         sx={{FontFamily:font.HeaderFont,fontSize:font.HeaderFont,padding:"8px",borderRadius:'8px',
                        //             borderBottom:`1px solid ${theme?.palette?.primary?.main}`
                        //         }} 
                        // size={{xs:12,sm:12,md:6,lg:4,xl:3}}> 
                        // <div style={{display:'flex',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                        //     <div style={{fontWeight:600,fontFamily:font.HeaderFont,fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                        //         <div style={{marginRight:"8px"}}>
                        //             <IconByName color={theme?.palette?.primary?.main} iconName="TagOutlined"/>
                        //         </div>
                        //             {item?.BillNo}
                        //     </div>
                        //     <div style={{fontWeight:'bold',fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                        //         <div style={{marginRight:"8px"}}>
                        //             <IconByName color={theme?.palette?.primary?.main} iconName="DateRangeOutlined"/>
                        //         </div>
                        //             {dayjs(item?.BillDate).format('DD-MMM-YYYY') }
                        //     </div>

                        //   </div>
                        //   <div style={{fontSize:font.H3FontSize,fontWeight:600,display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                        //          <div style={{marginRight:"8px"}}>
                        //             <IconByName color={theme?.palette?.primary?.main} iconName="PersonOutlineOutlined"/>
                        //         </div>
                        //     {/* {item?.supplier} */}
                        //      {item?.SuppName}
                        //   </div>
                        //   <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                        //     <div style={{display:'flex',alignItems:'center',flex:2,fontSize:'30px'}}>
                        //          <div style={{marginRight:"8px"}}>
                        //          <IconByName fontSize="40px" color={theme?.palette?.primary?.main} iconName="AccountBalanceWalletOutlined"/>
                        //         </div>
                        //       {item?.NetTotal?.toFixed(2)} 
                        //     </div>
                        //     <div style={{display:'flex',alignItems:'center',flex:1,marginLeft:'8px'}}>
                        //          <Button 
                        //             onClick={()=>{
                        //                 //store?.dispatch(set_component_record_key({stateKey:props?.baseProps?.UniqueId,keyNo:item?.BillNo}));
                        //                 props?.baseProps?.setPrimaryKeyNo?.(item?.BillNo);
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
        </>
    )
}


















