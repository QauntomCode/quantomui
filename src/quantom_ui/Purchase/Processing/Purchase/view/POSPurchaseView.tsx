/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { PurchaseModel, VMPurchaseModel } from "../model/VMPurchaseModel";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE} from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { CommonInvDetailModel, InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { INVENTORY_PERFORMED_ACTION } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { AddOrRemoveExtendedMethod } from "../../../../inventory/CommonComp/CommonInvDetail/Impl/InventoryIoMethods";
import { FocusOnControlByControlId, isNullOrEmpty, safeParseToNumber } from "../../../../../CommonMethods";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input, Quantom_Input1 } from "../../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { Quantom_LOV, Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";
import { GetActiveItemCodeName, GetEffectedPriceOfAllUnits } from "../../../../inventory/config/item/impl/InventoryitemsImpl";
import { SupplierGetCodeNameMethod } from "../../../Config/Supplier/customer/impl/SuppierImpl";
import { PurchaseDeleteMethod, PurchaseGetAll, PurchaseGetOneMethod, PurchaseInsertMethod } from "../impl/PurchaseImp";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../../HTTP/QuantomHttpMethods";
import { POSToolBarComp } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { POSActionButton } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { ShowSingleSelectedItemDialog } from "../../../../sale/processing/sale/view/POSSale/PosSaleHelpers/ShowSingleSelectedItemDialog";




const POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY"
const POS_CASH_CUSTOMER_VALUE_KEY="POS_CASH_CUSTOMER_VALUE_KEY";

export const POSPurchaseView=(props?:MenuComponentProps<VMPurchaseModel>)=>{

    
    
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'
   
    
    

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VMPurchaseModel>({
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


 const POSBillView=(props?:MenuComponentProps<VMPurchaseModel>)=>{
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    



    const grossAmount= props?.state?.purchaseDetails?.reduce((preVal,current)=>(preVal)+((current?.Qty??0)*(current?.Price??0)+(current?.DisAmount??0)),0)??0
    const disAmount= safeParseToNumber((props?.state?.purchaseDetails?.reduce((preVal,current)=>(preVal)+(current?.DisAmount??0),0)??0))+ safeParseToNumber((props?.state?.purchase?.ExtraDiscount??0))
     console.warn('discount amount is'+disAmount)
     console.warn('Extra discount is'+props?.state?.purchase?.ExtraDiscount)

    const netAmount= safeParseToNumber(grossAmount??0)-safeParseToNumber(disAmount??0);
    const balance= (netAmount-(props?.state?.purchase?.PaidAmount??0))

    const billNo= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SELECTED_BILL_NO_HELPER_DATA_KEY)));
    useEffect(()=>{
        handleGetOneBillNo();
    },[billNo])

    const handleGetOneBillNo=async()=>{
        if(billNo && billNo!=="0"){
            ShowLoadingDialog();
           let res = await PurchaseGetOneMethod(billNo);
           HideLoadingDialog();
           if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                props?.setState?.({...res?.Response})
           }
           else{
              ShowQuantomError({MessageHeader:"Error !",MessageBody:res?.ErrorMessage})
           }
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
            SaveAction={()=>PurchaseInsertMethod({...props?.state,purchase:{...props?.state?.purchase,BillDate:props?.state?.purchase?.BillDate?? new Date(),LocId:props?.state?.purchase?.LocId??locId}})}  
            SaveAfterAction={(res?:VMPurchaseModel)=>{props?.setState?.({...res})}} 
            ResetAction={()=>{props?.setState?.({});FocusOnControlByControlId(PURCHASE_SUPPLIER_CONTROL_ID)}}
            DeleteAction={()=>PurchaseDeleteMethod(props?.state)}
            ListAction={()=>{
                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                 }}
            NewAction= {()=>{props?.setState?.({});FocusOnControlByControlId(PURCHASE_SUPPLIER_CONTROL_ID)}}/>
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

                <div className="row g-2 mt-2" >
                    <RenderItemGrid  items={props?.state?.purchaseDetails} vendorType="SUPPLIER" locId={locId} fromName={InventoryAction.Purchase} formNameString="PURCHAES"
                                        vendorCode={props?.state?.purchase?.SuppCode} onChange={(items)=>{
                        props?.setState?.({...props?.state,purchaseDetails:[...items??[]]})
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



export interface RenderItemGridProps{
    baseProps?:MenuComponentProps<VMPurchaseModel>
    fromName?:InventoryAction;
    vendorCode?:string;
    vendorType?:string;
    formNameString?:string;
    items?:CommonInvDetailModel[];
    onChange?:(vals?:CommonInvDetailModel[])=>void;
    locId?:string;
    height?:string;

}

export const RenderItemGrid=(props?:RenderItemGridProps)=>{
    const [lineObj,setLineObj]=useState<CommonInvDetailModel>()
    const [selectedItemForChange,setselectedItemForChange]=useState<CommonInvDetailModel>();
    const [showItemChangeDialog,setShowItemChangeDialog]=useState(false);

    const getAmount=(qty?:number,price?:number)=>{
         const amount= (qty??0)*(price??0)
         return amount;
    }

    useEffect(()=>{
        handlePrice();
    },[lineObj?.ItemCode])

    const handlePrice=async()=>{
        if(isNullOrEmpty(lineObj?.ItemCode))
        {
           return;         
        }
         let res= await GetEffectedPriceOfAllUnits({ItemCode:lineObj?.ItemCode,VendorCode:props?.vendorCode,Form:props?.fromName});
         if(res && (res?.length??0)>0)
         {
            let price= res?.[0]?.Price??0;
            setLineObj({...lineObj,Price:price,Qty:lineObj?.Qty??1,Amount:getAmount(lineObj?.Qty??1,price)})
         }
    }

    const handleAddItem=async(workingItem?:CommonInvDetailModel,action?:INVENTORY_PERFORMED_ACTION)=>{
        
        var oldItems= props?.items;
         var taxDetail:any= [];
        let res= 
        await AddOrRemoveExtendedMethod(oldItems,workingItem,props?.fromName,action,{
            VendorCode:props?.vendorCode,
            BillDate:new Date(),
            LocId:props?.locId,
        }
        ,taxDetail,{
            BpCode:props?.vendorCode,
            BpType:props?.vendorType,
            TaxForm:props?.formNameString,
            EffectedDate:new Date(),
            WillBypassTaxCaluclations:true,
        })
    
        if(!isNullOrEmpty(res?.Message)){
            ShowQuantomError({MessageHeader:"Error !", MessageBody:res?.Message})
        }
        else{
       
            props?.onChange?.(res?.InventoryDTO?.InventoryList);
            //props?.setState?.({...props?.state,purchaseDetails:[...res?.InventoryDTO?.InventoryList??[]]})
        }
    
    }

    const fonts= useQuantomFonts();
    const headerStyle={fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:400}
 
    const theme= useTheme();
    const ITEM_CONTROL_ID="ITEM_CONTROL_ID_202514";
    return(
        <>
            
            <div style={{display:'flex'}}>
                <div style={{flexGrow:1}}>
                    <div className="row g-0" style={{backgroundColor:theme?.palette?.primary?.main,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:500,paddingTop:'4px',paddingBottom:'4px',color:theme?.palette?.primary?.contrastText}}>
                    <div className="col-md-7" style={{paddingLeft:'5px'}}>ITEM INFO</div>
                    <div className="col-md-1" style={{}}>QTY</div>
                    <div className="col-md-2" style={{}}>PRICE</div>
                    <div className="col-md-2" style={{}}>AMOUNT</div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-7">
                            <Quantom_LOV1 willHideLabel id={ITEM_CONTROL_ID} uniqueKeyNo={props?.baseProps?.UniqueId??""}  selected={{Code:lineObj?.ItemCode,Name:lineObj?.ItemName}} 
                                        onChange={(item)=>{
                                            setLineObj({...lineObj,ItemCode:item?.Code,ItemName:item?.Name})
                                        }} 
                                        keyNo="PURCHASE_ALL_ITEMS"   FillDtaMethod={GetActiveItemCodeName} />
                        </div>
                        <div className="col-md-1">
                            <Quantom_Input  willHideLabel  value={lineObj?.Qty??0} onChange={(e)=>{
                                const qty=safeParseToNumber(e?.target?.value);
                                setLineObj({...lineObj,Qty:qty,Amount:getAmount(qty,lineObj?.Price)})
                            }}/>
                        </div>
                        <div className="col-md-2">
                            <Quantom_Input  willHideLabel  value={lineObj?.Price??0} onChange={(e)=>{
                                const price=safeParseToNumber(e?.target?.value);
                                setLineObj({...lineObj,Price:price,Amount:getAmount(price,lineObj?.Qty)})
                            }}/>
                        </div>
                        <div className="col-md-2">
                            <Quantom_Input disabled   willHideLabel value={lineObj?.Amount??0} />
                        </div>
                    </div>
                </div>
                <div style={{marginLeft:'5px'}}>
                    <POSActionButton rightMargin="0px" label="Add" iconName="LocalHospitalOutlined" onClick={()=>{
                            if(isNullOrEmpty(lineObj?.ItemCode)){
                                ShowQuantomError({MessageBody:"Item Code Can't Be Null Or Empty     ",MessageHeader:"Error !"});
                                return;
                            }
                            if((lineObj?.Qty??0)===0){
                                ShowQuantomError({MessageBody:"Qty Can't Be Zero '0'",MessageHeader:"Error !"});
                                return;
                            }
                            
                            handleAddItem({...lineObj},INVENTORY_PERFORMED_ACTION.NEW);
                            setLineObj({})
                            FocusOnControlByControlId(ITEM_CONTROL_ID)
                        }}/>
                </div>
            </div>
            
            <div >
                <div className="row g-0 " style={{color:'white',height:'calc(100vh - 255px)',overflowY:'auto'}}>
                    <Paper>
                    <ShowSingleSelectedItemDialog item={selectedItemForChange} open={showItemChangeDialog} onClose={(type,item)=>{
                        
                        setShowItemChangeDialog(false)
                        if(type==='APPLIED'){
                            handleAddItem(item,INVENTORY_PERFORMED_ACTION.EDIT);
                        }
                    }}/>
                    <TableContainer>
                        <Table  size="small" aria-label="a dense table" >
                            {/* <TableHead style={{backgroundColor:theme?.palette?.primary?.main}}>
                                <TableRow>
                                    <TableCell className="col-8" style={{...headerStyle}}>ITEM_INFORMATION</TableCell>
                                    <TableCell className="col-md-1" style={{...headerStyle}}>QTY</TableCell>
                                    <TableCell className="col-md-1" style={{...headerStyle}}>RATE</TableCell>
                                    <TableCell className="col-md-2" style={{...headerStyle}}>AMOUNT</TableCell>
                                </TableRow>
                            </TableHead> */}
                            <TableBody>
                                {
                                    props?.items?.map((item,index)=>{
                                        return(
                                            <TableRow component={Paper}  sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                                                <div style={{display:'flex'}}>

                                                    <div className="row" style={{flexGrow:1}}>
                                                        <TableCell className="col-md-7" style={{...headerStyle}}>
                                                            <div className="row">
                                                            
                                                                <div className="col-md-5 ">
                                                                    <div style={{display:'flex',alignItems:'center'}}>
                                                                        <div className="col-md-1">{item?.CustomSortNo}</div>
                                                                        <div onClick={()=>{handleAddItem(item,INVENTORY_PERFORMED_ACTION.DELETE)}}> 
                                                                            <IconByName color={theme?.palette?.primary.main} iconName="DeleteOutlined" />
                                                                        </div>
                                                                        <div onClick={()=>{
                                                                            setselectedItemForChange(item);
                                                                            setShowItemChangeDialog(true);
                                                                        }}>
                                                                            <IconByName color={theme?.palette?.primary.main} iconName="EditCalendarOutlined"/>
                                                                        </div>
                                                                        <div style={{flex:1,marginLeft:'5px'}}> {item?.ItemCode} </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-7">{item?.ItemName}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="col-md-1" style={{...headerStyle}}>
                                                            {item?.Qty}
                                                        </TableCell>
                                                        <TableCell className="col-md-2" style={{...headerStyle}}>
                                                            {item?.Price}
                                                        </TableCell>
                                                        <TableCell className="col-md-2" style={{...headerStyle}}>
                                                            {item?.Amount}
                                                        </TableCell>
                                                    </div>
                                                    <div style={{width:'70px'}}></div>
                                                </div>
                                                
                                                

                                                   
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
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
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.uniqueId??"",PURCHASE_DATA_KEY_RECORD)) as PurchaseModel[];
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
                        let res = await PurchaseGetAll({FromDate:fromDate,ToDate:toDate,Search:search,LocId:locId});
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
                             {item?.SuppName}
                          </div>
                          <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                            <div style={{display:'flex',alignItems:'center',flex:2,fontSize:'30px'}}>
                                 <div style={{marginRight:"8px"}}>
                                 <IconByName fontSize="40px" color={theme?.palette?.primary?.main} iconName="AccountBalanceWalletOutlined"/>
                                </div>
                              {item?.NetTotal?.toFixed(2)} 
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


