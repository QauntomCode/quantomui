/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { VmSale } from "../../model/VmSaleModel";
import { HideLoadingDialog, IconByName, MenuComponentProps, QuantomConfirmationDialog, setFormBasicKeys, ShowLoadingDialog } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE } from "../../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { ReactNode, useEffect, useState } from "react";
import { add_helper_data_single_key } from "../../../../../../redux/reduxSlice";
import { Button, Paper, useMediaQuery, useTheme } from "@mui/material";
import {  Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { QUANTOM_Date } from "../../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { FocusOnControlByControlId, safeParseToNumber } from "../../../../../../CommonMethods";
import { SaleGetAll, SaleGetOne } from "../../impl/SaleImpl";
import { SaleModel } from "../../model/SaleModel";
// import { PrintSaleSlip } from "../../../../reports/SaleSlips/A4Slip";


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PosItemsRenderer } from "./PosSaleHelpers/PosItemRenders";
import { SoldItemsRenderer } from "./PosSaleHelpers/SoldItemsHelper";
import { handleAddItem, QuantomDialog } from "../POSSaleView";
import { INVENTORY_PERFORMED_ACTION } from "../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";

import { SalePaymentViewRender } from "./PosSaleHelpers/SalePaymentViewRender";
import { POSCustomerComp } from "./PosSaleHelpers/POSCustomerCompProps";
import { useTheme as breakPointTheme } from "styled-components";
import { RenderAllCategoriesRestaurantHelper } from "../ResturantSale/Helpers/RenderAllCategoriesRestaurantHelper";
pdfMake.vfs = (pdfFonts as any)?.pdfMake?.vfs;


export const POSDentalJob=(props?:MenuComponentProps<VmSale>)=>{

    
    
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'
   
    
    

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmSale>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true,willShowLocations:true},
            InitOnLocationChange:(location)=>{
                store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_SALE_LOCID_KEY,Data:location?.LocId}}))
            }
         })

        }
    },[fullState?.IsFirstUseEffectCall])



    
    return(
        <>
          {
            isList?(
                <POSBillList uniqueId={props?.UniqueId} />
                
            ):(
                <POSBillView {...props}/>
            )
          }
          
        </>
    )
}


 const POSBillView=(props?:MenuComponentProps<VmSale>)=>{
    const locid= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    const[openSoldItemsDialog,setOpenSoldItemsDialog]=useState(false)
    const[showPaymentView,setShowPaymentview]=useState(false)

    // const grossAmount= props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+((current?.Qty??0)*(current?.Price??0)+(current?.DisAmount??0)),0)??0
    // const disAmount= safeParseToNumber((props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+(current?.DisAmount??0),0)??0))+ safeParseToNumber((props?.state?.Sale?.ExtraDiscount??0))
    //  console.warn('discount amount is'+disAmount)
    //  console.warn('Extra discount is'+props?.state?.Sale?.ExtraDiscount)

    // const netAmount= safeParseToNumber(grossAmount??0)-safeParseToNumber(disAmount??0);
    // const balance= (netAmount-(props?.state?.Sale?.TotalReceived??0))

    const billNo= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY)));
    useEffect(()=>{
        handleGetOneBillNo();
    },[billNo])

    const handleGetOneBillNo=async()=>{
        if(billNo && billNo!=="0"){
            ShowLoadingDialog();
           let res = await SaleGetOne(billNo);
           props?.setState?.({...res})
           HideLoadingDialog();
        }
        if(billNo==="0"){
            props?.setState?.({})
            store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:""}})))
        }
    }

    useEffect(()=>{
        FocusOnControlByControlId(PURCHASE_SUPPLIER_CONTROL_ID)
    },[])

    const PURCHASE_SUPPLIER_CONTROL_ID="SUPPLIER_CONTROL_ID_PURCHASE_CONTROL";
    

    const handlePaymentClick=()=>{
        setShowPaymentview(true);setOpenSoldItemsDialog(false)
    }
    const handleListclick=()=>{
        setShowPaymentview(false);setOpenSoldItemsDialog(false)
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}}))
    }
    return(
      <>
        
            <div className="row g-1">
                
                <div className="col-lg-7">
                    <POSCustomerComp 
                        onChange={(sel)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:sel?.Code,CustName:sel?.Name}})}}
                        selectedCustomer={{Code:props?.state?.Sale?.CustCode,Name:props?.state?.Sale?.CustName}} />
                    
                    <Quantom_Grid container size={{xs:12}}>
                    <Quantom_Grid component={Paper}  size={{xs:4}}>
                       <RenderAllCategoriesRestaurantHelper UniqueId={props?.UniqueId??""}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:8}}>
                        <PosItemsRenderer 
                                onCartClick={()=>{setOpenSoldItemsDialog(true)}} 
                                onCancelClick={()=>{
                                    props?.setState?.({Sale:{BillDate:new Date()}})
                                }}
                                onItemSelection={
                                        (item)=>{
                                                handleAddItem(locid,props,item,INVENTORY_PERFORMED_ACTION.NEW)
                                            }
                                    } 
                                ItemLoadType='ALL_ITEMS' />
                        </Quantom_Grid>
                    </Quantom_Grid>
                </div>
                <div className="col-lg-5">
                    <SoldItemsRenderer onListClick={handleListclick} onPaymentClik={handlePaymentClick} baseProps={props}/>
                </div>


                <QuantomDialog heading="Selected Items " onClosePress={()=>{setOpenSoldItemsDialog(false)}} open={openSoldItemsDialog}>
                    <SoldItemsRenderer onListClick={handleListclick} onPaymentClik={handlePaymentClick} baseProps={props}/>
                </QuantomDialog>

                <QuantomDialog  heading="Enter Payment" onClosePress={()=>{setShowPaymentview(false)}} open={showPaymentView}>
                    <SalePaymentViewRender onclose={(tpe)=>{
                        setShowPaymentview(false);
                        if(tpe==='SAVE'){
                            props?.setState?.({Sale:{BillDate:new Date()}})
                        }
                    }}  baseProps={props}/>
                </QuantomDialog>

                {/* <QuantomConfirmationDialog open={showConfirmationDialog}></QuantomConfirmationDialog> */}
                
            </div>
       </>
    )
}

export interface FilterHandlerPorps{
   children?:ReactNode
   OkAndAplyFilter?:()=>void;
}

export const FilterHandler=(props?:FilterHandlerPorps)=>{
    // const theme= breakPointTheme();
    const theme= useTheme();
    const[showDialog,setShowDialog]=useState(false);
    const isMobile = useIsMobile();
    // alert('is Mobile'+isMobile)
    
    return (
        <>
            {
                !isMobile?(<>{props?.children}</>):
                (<>
                    <POSActionButton1 onClick={()=>{setShowDialog(true)}} iconColor={theme?.palette?.primary?.main} textColor={theme?.palette?.primary?.main} iconName="FilterAltOutlined" label="Filter" />
                </>)
            }

            <QuantomDialog open={showDialog} heading="Filter Info" onClosePress={()=>{setShowDialog(false)}}>
                <>
                    {props?.children}
                </>
                <Quantom_Grid  display='flex' justifyContent='center' mt={2}>
                    <POSActionButton1 backgroundColor={theme.palette.secondary.main} iconName="CheckCircleOutlined" textColor={theme.palette.secondary.contrastText} 
                    iconColor={theme?.palette?.primary?.main} label="Ok" onClick={()=>{
                            setShowDialog(false);
                            props?.OkAndAplyFilter?.()
                           
                        }} />
                </Quantom_Grid>
            </QuantomDialog>
        </>
    )
}










interface POSBillListProps{
    uniqueId?:string;
}

 const POSBillList=(props?:POSBillListProps)=>{

    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());
    const [search,setSearch] =useState<string>('');
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.uniqueId??"",POS_SALE_LOCID_KEY))) as string;

    const PURCHASE_DATA_KEY_RECORD="PURCHASE_DATA_KEY_RECORD"
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.uniqueId??"",PURCHASE_DATA_KEY_RECORD)) as SaleModel[];
    const theme= useTheme();
    const font= useQuantomFonts();
    useEffect(()=>{
       handleLoadData();
    },[])

    const handleLoadData=async()=>{
           try{
                ShowLoadingDialog();
                    let res = await SaleGetAll(fromDate,toDate,'',locId);
                    console.warn('this is my response',res);
                    store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}));
                HideLoadingDialog();
           }
           catch{
             HideLoadingDialog();
           }
           finally{
            HideLoadingDialog();
           }
            
         }
    const isMobile= useIsMobile();
    return(
        <>
          <Quantom_Grid container  spacing={.5} size={{xs:12}}>
            
               <Quantom_Grid container spacing={1} size={{xs:12}}>
                  <Quantom_Grid item  >
                     <POSActionButton1 isIconOnly={isMobile} iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:"0"}})))
                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                     }}/>
                  </Quantom_Grid>
                  <Quantom_Grid flex={1} item>
                    <Quantom_Grid container spacing={.5}>
                        <FilterHandler OkAndAplyFilter={()=>{
                                    
                                    handleLoadData()
                                }} >
                            <Quantom_Grid item  size={{md:3}}>
                                <QUANTOM_Date  label ="From Date" value={dayjs(fromDate)} onChange={(date,ctc)=>{setFromDate(date?.toDate()??new Date())}}/>
                            </Quantom_Grid>
                            <Quantom_Grid item size={{md:3}}>
                                <QUANTOM_Date  label ="To Date" value={dayjs(toDate)} onChange={(date,ctc)=>{setToDate(date?.toDate()??new Date())}}/>
                            </Quantom_Grid>
                            <Quantom_Grid item size={{md:6}}>
                                <Quantom_Input  label ="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            </Quantom_Grid>
                        </FilterHandler>
                    </Quantom_Grid>
                  </Quantom_Grid>
                  <Quantom_Grid item >
                     <POSActionButton1  iconName="ScreenSearchDesktopOutlined" label="Search" onClick={handleLoadData}/>
                  </Quantom_Grid>
                  
               </Quantom_Grid>

               <Quantom_Grid container size={{xs:12}}  spacing={2} sx={{padding:"20px"}}>
                  {listData?.map((item,index)=>{
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
                                    {item?.BillNo}
                            </div>
                            <div style={{fontWeight:'bold',fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                                <div style={{marginRight:"8px"}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="DateRangeOutlined"/>
                                </div>
                                    {dayjs(item?.BillDate).format('DD-MMM-YYYY') }
                            </div>

                          </div>
                          <div style={{fontSize:font.H3FontSize,fontWeight:600,display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                                 <div style={{marginRight:"8px"}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="PersonOutlineOutlined"/>
                                </div>
                            {/* {item?.supplier} */}
                             {item?.CustName}
                          </div>
                          <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                            <div style={{display:'flex',alignItems:'center',flex:2,fontSize:'30px'}}>
                                 <div style={{marginRight:"8px"}}>
                                 <IconByName fontSize="40px" color={theme?.palette?.primary?.main} iconName="AccountBalanceWalletOutlined"/>
                                </div>
                              {item?.TAmount?.toFixed(2)} 
                            </div>
                            <div style={{display:'flex',alignItems:'center',flex:1,marginLeft:'8px'}}>
                                 <Button 
                                    onClick={()=>{
                                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:item?.BillNo}})))
                                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
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


export const POS_SALE_LOCID_KEY="POS_SALE_LOCID_KEY"
export const POS_SELECTED_BILL_NO_HELPER_DATA_KEY="POS_SELECTED_BILL_NO_HELPER_DATA_KEY"







export const useIsMobile = (): boolean => {
    return !useMediaQuery('(min-width:600px)', { noSsr: true });
  };