/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { VmSale } from "../../model/VmSaleModel";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE } from "../../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { add_helper_data_single_key } from "../../../../../../redux/reduxSlice";
import { Button, Paper, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { QUANTOM_Date } from "../../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { FocusOnControlByControlId, safeParseToNumber } from "../../../../../../CommonMethods";
import { DeleteSale, InsertSale, SaleGetAll, SaleGetOne } from "../../impl/SaleImpl";
import { HTTP_RESPONSE_TYPE } from "../../../../../../HTTP/QuantomHttpMethods";
import { POSToolBarComp } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { Quantom_LOV1 } from "../../../../../../quantom_comps/Quantom_Lov";
import { CustomersGetCodeNameMethod } from "../../../../config/customer/impl/CustomerImpl";
import { RenderItemGrid } from "../../../../../Purchase/Processing/Purchase/view/POSPurchaseView";
import { InventoryAction } from "../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { SaleModel } from "../../model/SaleModel";


const POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY"
const POS_CASH_CUSTOMER_VALUE_KEY="POS_CASH_CUSTOMER_VALUE_KEY";

export const POSSaleView1=(props?:MenuComponentProps<VmSale>)=>{

    
    
    
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
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    



    const grossAmount= props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+((current?.Qty??0)*(current?.Price??0)+(current?.DisAmount??0)),0)??0
    const disAmount= safeParseToNumber((props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+(current?.DisAmount??0),0)??0))+ safeParseToNumber((props?.state?.Sale?.ExtraDiscount??0))
     console.warn('discount amount is'+disAmount)
     console.warn('Extra discount is'+props?.state?.Sale?.ExtraDiscount)

    const netAmount= safeParseToNumber(grossAmount??0)-safeParseToNumber(disAmount??0);
    const balance= (netAmount-(props?.state?.Sale?.TotalReceived??0))

    const billNo= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY)));
    useEffect(()=>{
        handleGetOneBillNo();
    },[billNo])

    const handleGetOneBillNo=async()=>{
        if(billNo && billNo!=="0"){
            ShowLoadingDialog();
           let res = await SaleGetOne(billNo);
           HideLoadingDialog();
        //    if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                props?.setState?.({...res})
        //    }
        //    else{
        //       ShowQuantomError({MessageHeader:"Error !",MessageBody:res?.ErrorMessage})
        //    }
        }
        if(billNo==="0"){
            props?.setState?.({})
            store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:""}})))
        }
    }

    const PURCHASE_SUPPLIER_CONTROL_ID="SUPPLIER_CONTROL_ID_PURCHASE_CONTROL";
    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
      <>
        <POSToolBarComp
            SaveAction={()=>InsertSale({...props?.state,Sale:{...props?.state?.Sale,BillDate:props?.state?.Sale?.BillDate?? new Date(),LocId:props?.state?.Sale?.LocId??locId}})}  
            SaveAfterAction={(res?:VmSale)=>{props?.setState?.({...res})}} 
            ResetAction={()=>{props?.setState?.({});FocusOnControlByControlId(PURCHASE_SUPPLIER_CONTROL_ID)}}
            DeleteAction={()=>DeleteSale(props?.state)}
            ListAction={()=>{
                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                 }}
            NewAction= {()=>{props?.setState?.({});FocusOnControlByControlId(PURCHASE_SUPPLIER_CONTROL_ID)}}/>
        <div className="row g-2">
            
            <div className="col-md-9">
                <div className="row  g-2">
                    <div className=" col-md-3">
                        <Quantom_Input label="Bill No" value={props?.state?.Sale?.BillNo} disabled/>
                    </div>
                    <div className=" col-md-3">
                        <QUANTOM_Date   label="Bill Date" value={dayjs(props?.state?.Sale?.BillDate?? new Date())} onChange={(date)=>{
                            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:date?.toDate()??new Date()}})
                        }}/>
                    </div>
                    <div className="col-md-6">
                    <Quantom_LOV1 id={PURCHASE_SUPPLIER_CONTROL_ID} uniqueKeyNo={props?.UniqueId??""}  selected={{Code:props?.state?.Sale?.CustCode,
                                                                                 Name:props?.state?.Sale?.CustName}} 
                                onChange={(item)=>{
                                    // alert('onchage item is called')
                                    props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:item?.Code,CustName:item?.Name}})
                                }} 
                                keyNo="PURCHASE_SUPLIER_LOV_1" label="Customer"  FillDtaMethod={CustomersGetCodeNameMethod} />
                    </div>
                </div>
                <div className="row g-2" style={{marginTop:'0px',paddingBottom:'10px',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                    <div className="col-md-10">
                        <Quantom_Input label="Remarks" value={props?.state?.Sale?.Remarks} onChange={(e)=>{
                            props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,Remarks:e?.target?.value}})
                        }}/>
                    </div>
                    <div className="col-md-2" style={{fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:600}}>
                        <div className=" row g-0" style={{marginTop:'5px'}}>
                            <div className="col-12">
                                <div style={{display:'flex',alignItems:'center',justifyContent:'center',lineHeight:'34px'}}>
                                    <div style={{flex:1,textAlign:'center',
                                            backgroundColor:theme?.palette?.primary?.main,color:theme?.palette?.primary.contrastText}}>SALE</div>
                                    <div style={{flex:1,textAlign:'center',
                                                    backgroundColor:theme?.palette?.text?.disabled}}>RETURN</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-2 mt-2" >
                    <RenderItemGrid  items={props?.state?.SaleDetails} vendorType="SUPPLIER" locId={locId} fromName={InventoryAction.Sale} formNameString="SALE"
                                        vendorCode={props?.state?.Sale?.CustCode} onChange={(items)=>{
                        props?.setState?.({...props?.state,SaleDetails:[...items??[]]})
                    }} baseProps={props}/>

                </div>
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
                        <div style={{marginRight:'5px',fontWeight:700,fontSize:'60px',color:theme.palette.primary.main}}>{balance?.toFixed(2)}</div>     
                    </Quantom_Grid>
                   
                </Quantom_Grid>
                  
              
            </div>

            
           
        </div>
            
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
    return(
        <>
          <Quantom_Grid container  spacing={.5} size={{xs:12}}>
            
               <Quantom_Grid container size={{xs:12}}>
                  <Quantom_Grid item >
                     <POSActionButton1 iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_SELECTED_BILL_NO_HELPER_DATA_KEY,Data:"0"}})))
                        store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:"FORM"}})))
                     }}/>
                  </Quantom_Grid>
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
                        let res = await SaleGetAll(fromDate,toDate,'',locId);
                        console.warn('this is my response',res);
                        // let res = await SaleGetAll(fromDate,toDate,search,locId);
                        store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:PURCHASE_DATA_KEY_RECORD,Data:res}}))
                     }}/>
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


