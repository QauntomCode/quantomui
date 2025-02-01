/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { VmSale } from "../model/VmSaleModel"
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { ReactNode, useEffect, useState } from "react";
import { SetupFromGetAll } from "../../../../inventory/config/unit/impl/setupFormImp";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { SetupFormModel } from "../../../../inventory/config/unit/model/setupFormModel";
import { BorderBottom, Category, Padding, Today } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, Paper, PopoverPaper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { Quantom_Button, Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { isNullOrEmpty, safeParseToNumber } from "../../../../../CommonMethods";
import { CommonCodeName } from "../../../../../database/db";
import { InventoryItemsModel } from "../../../../inventory/config/item/model/InventoryItemsModel";
import { GetItemsByCategory } from "../../../../inventory/config/item/impl/InventoryitemsImpl";
import { AddOrRemoveExtendedMethod } from "../../../../inventory/CommonComp/CommonInvDetail/Impl/InventoryIoMethods";
import { CommonInvDetailModel, InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { INVENTORY_PERFORMED_ACTION } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { AccountSettings, GetSingleSetting } from "../../../../../Config/Settings/SettingsImp";
import { InsertSale, SaleGetAll } from "../impl/SaleImpl";
import { HTTP_RESPONSE_TYPE } from "../../../../../HTTP/QuantomHttpMethods";
import { CustomersGetCodeNameMethod } from "../../../config/customer/impl/CustomerImpl";
import { BlobOptions } from "buffer";
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";
import { ShowQuantomError } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import { SaleModel } from "../model/SaleModel";


const POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY"
const POS_CASH_CUSTOMER_VALUE_KEY="POS_CASH_CUSTOMER_VALUE_KEY";

export const POSSaleView=(props?:MenuComponentProps<VmSale>)=>{

    
    
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'
   
    
    

    useEffect(()=>{
        handleLoadCashCustomer()
    },[])

    const handleLoadCashCustomer=async()=>{
       let res= await GetSingleSetting(AccountSettings.sale_cash_customer)
       //setCashCustomer(res?.DefaultValue??"");
       store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:POS_CASH_CUSTOMER_VALUE_KEY,Data:res?.DefaultValue??""}}));
    }
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

         handleLoadCashCustomer();
         handleCategories();
        }
    },[fullState?.IsFirstUseEffectCall])


    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }

    
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



export const POSBillView=(props?:MenuComponentProps<VmSale>)=>{
    const locid= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY)) 

    const [showCustomerDialog,setShowCustomerDialog]=useState(false)
    const [catCode,setCatCode]=useState<string>()
    const cashCustomer=useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_CASH_CUSTOMER_VALUE_KEY));


    

    const grossAmount= props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+((current?.Qty??0)*(current?.Price??0)+(current?.DisAmount??0)),0)??0
    const disAmount= props?.state?.SaleDetails?.reduce((preVal,current)=>(preVal)+(current?.DisAmount??0),0)??0+(props?.state?.Sale?.ExtraDiscount??0)
    const netAmount= grossAmount-disAmount;
    const balance= (netAmount-(props?.state?.Sale?.TotalReceived??0))

    const handleAddItem=async(workingItem?:CommonInvDetailModel,action?:INVENTORY_PERFORMED_ACTION)=>{
        
        var oldItems= props?.state?.SaleDetails??[];
        var taxDetail= props?.state?.TaxDetail;
        let res= 
        await AddOrRemoveExtendedMethod(oldItems,workingItem,InventoryAction.Sale,action,{
            VendorCode:props?.state?.Sale?.CustCode,
            BillDate:new Date(),
            LocId:locid,
        },taxDetail,{
            BpCode:props?.state?.Sale?.CustCode,
            BpType:"CUSTOMER",
            TaxForm:"SALE",
            EffectedDate:new Date(),
            WillBypassTaxCaluclations:true,
        })

        if(!isNullOrEmpty(res?.Message)){
            ShowQuantomError({MessageHeader:"Error !", MessageBody:res?.Message})
        }
        else{
       
        props?.setState?.({...props?.state,SaleDetails:[...res?.InventoryDTO?.InventoryList??[]],TaxDetail:[...res?.InventoryDTO?.InventoryIOTaxList??[]]})
        }

    }
    const theme= useTheme();
    return(
      <>
       <QuantomDialog open={showCustomerDialog} onClosePress={()=>{setShowCustomerDialog(false)}} heading="Customers List">
            <POSCustomerControlRenderer onSelection={(cust)=>{
                props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:cust?.Code,CustName:cust?.Name}})
                setShowCustomerDialog(false);
            }} />
        </QuantomDialog>
        <div className="row g-2">
            <div className="col-md-7" style={{height:'100vh',display:'flex',flexDirection:'column',flexGrow:1}}>
                <div className="row g-2" style={{overflowY: 'auto',overflowX:'hidden',flexGrow:1}}>
                    
                    <div className="col-md-3">
                        <POSCategoriesRenderer selectedCategory={catCode} onSelected={(code)=>{
                            setCatCode(code)
                        }} categories={categories} />
                    </div>
                    <div className="col-md-9" style={{backgroundColor:theme?.palette?.background.paper}}>
                        <PosItemsRenderer OnItemClick={(item)=>{handleAddItem({ItemCode:item?.ItemCode,UnitCode:item?.UnitCode,Qty:1},INVENTORY_PERFORMED_ACTION.NEW)}} selectedCat={catCode} size={{md:6,lg:6,xl:4}} />
                    </div>
                </div>
                <div style={{bottom: 0,color: 'white',textAlign: 'center',fontSize: '16px'}}>
                <div className="row g-1" style={{marginBottom:'30px'}}>
                        <div className="col-md-2">
                            <POSActionButton  label="Customer" iconName="FactCheckOutlined" onClick={()=>{setShowCustomerDialog(true)}} 
                                            iconColor={theme.palette.secondary.main}/>
                        </div>
                        <div className="col-md-2">
                            <POSActionButton buttonType='SAVE' responseClick={async()=>{
                                let nSate:VmSale={...props?.state,Sale:{...props?.state?.Sale,LocId:locid,CustCode:props?.state?.Sale?.CustCode??cashCustomer,BillDate:props?.state?.Sale?.BillDate??new Date()}}
                                 let res=await InsertSale(nSate) 
                                 if(res?.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                                    props?.setState?.({});
                                 }
                                 return Promise.resolve(res)

                            }} label="Save" iconName="SaveOutlined"
                                    iconColor={theme.palette.secondary.main}/>
                        </div>
                        <div className="col-md-2">
                            <POSActionButton buttonType='LIST' label="List" iconName="FactCheckOutlined" 
                                            iconColor={theme.palette.secondary.main}/>
                        </div>
                        <div className="col-md-2">
                            <POSActionButton onClick={()=>{
                                  props?.setState?.({})
                            }}  label="Reset" buttonType='RESET' iconName="PermIdentityOutlined" 
                                    iconColor={theme.palette.secondary.main}/>
                        </div>
                        <div className="col-md-2">
                            <POSActionButton onClick={()=>{

                               store.dispatch( add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}}))
                            }} buttonType='LIST' label="List" iconName="FactCheckOutlined" 
                                            iconColor={theme.palette.secondary.main}/>
                        </div>
                      
                        
                    </div>
                </div>
            </div>
            <div className="col-md-5" style={{height:'100vh',display:'flex',flexDirection:'column',flexGrow:1}}>
                <div style={{overflowY: 'auto',flexGrow: 1}}>
                        <SoldItemsRenderer baseProps={props} onEditItem={(item)=>{
                        handleAddItem(item,INVENTORY_PERFORMED_ACTION.EDIT);
                        }} onDeleteItem={(item)=>{handleAddItem(item,INVENTORY_PERFORMED_ACTION.DELETE)}}/>
                </div>

                <div style={{position: 'sticky',bottom: 0,color: 'white',textAlign: 'center',fontSize: '16px',marginTop:'30px'}}>
                    <div className="row g-1">
                        <div className="col-md-5">
                            <Quantom_Input label="Gross Am" value={grossAmount}/>
                        </div>
                        <div className="col-md-2">
                            <Quantom_Input label="Dis" value={disAmount}/>
                        </div>
                        <div className="col-md-5">
                            <Quantom_Input label="Net Amount" value={netAmount}/>
                        </div>
                    </div>
                    <div className="row g-1" style={{}}>
                        <div className="col-md-6">
                            <Quantom_Input label="Received" value={props?.state?.Sale?.TotalReceived} onChange={(e)=>{
                                props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,TotalReceived:safeParseToNumber(e.target?.value)}})
                            }}/>
                        </div>
                        <div className="col-md-6">
                            <Quantom_Input label="Balance" value={balance}/>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
      </>
    )

}


interface POSBillListProps{
    uniqueId?:string;
}

export const POSBillList=(props?:POSBillListProps)=>{

    const [fromDate,setFromDate]=useState(new Date());
    const [toDate,setToDate]=useState(new Date());
    const [search,setSearch] =useState<string>('');
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.uniqueId??"",POS_SALE_LOCID_KEY))) as string;

    const SALE_DATA_KEY="SALE_LIST_DATA"
    const listData= useSelector((state?:any)=>get_helperData_by_key(state,props?.uniqueId??"",SALE_DATA_KEY)) as SaleModel[];
    const theme= useTheme();
    const font= useQuantomFonts();
    return(
        <>
          <Quantom_Grid container  spacing={.5} size={{xs:12}}>
               <Quantom_Grid container size={{xs:12}}>
                  <Quantom_Grid item size={{md:2}}>
                     <POSActionButton iconName="LocalHospitalOutlined" label="Add New"  onClick={()=>{
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
                  <Quantom_Grid item size={{md:1}}>
                     <POSActionButton iconName="ScreenSearchDesktopOutlined" label="Search" onClick={async()=>{
                        let res = await SaleGetAll(fromDate,toDate,search,locId);
                        store.dispatch(add_helper_data_single_key({UniqueId:props?.uniqueId,data:{keyNo:SALE_DATA_KEY,Data:res}}))
                     }}/>
                  </Quantom_Grid>
                  
               </Quantom_Grid>

               <Quantom_Grid container size={{xs:12}} component={Paper} spacing={2} sx={{padding:"20px"}}>
                  {listData?.map((item,index)=>{
                    // alert(item?.CustName)
                     return(
                        <Quantom_Grid sx={{FontFamily:font.HeaderFont,fontSize:font.RegularFont,backgroundColor:theme.palette?.background.default,padding:"8px",borderRadius:'8px'}} 
                        size={{xs:12,sm:12,md:6,lg:4,xl:3}}> 
                        <div style={{display:'flex',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                            <div style={{fontWeight:'bold',fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                                <div style={{marginRight:"8px"}}>
                                    <IconByName iconName="BrandingWatermarkOutlined"/>
                                </div>
                                    {item?.BillNo}
                            </div>
                            <div style={{fontWeight:'bold',fontSize:font.H4FontSize,display:'flex',alignItems:'center',flex:1}}>
                                
                                <div style={{marginRight:"8px"}}>
                                    <IconByName iconName="BrandingWatermarkOutlined"/>
                                </div>
                                    {dayjs(item?.BillDate).format('DD-MMM-YYYY') }
                            </div>

                          </div>
                          <div style={{fontSize:font.H4FontSize,fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                                 <div style={{marginRight:"8px"}}>
                                    <IconByName iconName="PersonOutlineOutlined"/>
                                </div>
                            {item?.CustName}
                          </div>
                          <div style={{fontSize:"20px",fontWeight:"bold",display:'flex',fontFamily:font.HeaderFont,alignItems:'center',marginTop:'5px'}}>
                            <div style={{display:'flex',alignItems:'center',flex:1}}>
                                 <div style={{marginRight:"8px",fontSize:font.H4FontSize,opacity:0.6}}>
                                     Sale Amount :
                                </div>
                                {item?.TAmount}
                            </div>
                            <div style={{display:'flex',alignItems:'center',flex:1}}>
                                 <div style={{marginRight:"8px",fontSize:font.H4FontSize,opacity:0.6}}>
                                     Sale Amount :
                                </div>
                                {item?.TAmount}
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

export interface RenderCategoriesProps{
     categories?:SetupFormModel[];
     selectedCategory?:string;
     onSelected?:(code?:string)=>void;
}

export const POSCategoriesRenderer=(props?:RenderCategoriesProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const [search,setSearch]=useState('');
    const [searchedCats,setSearchedCats]=useState<SetupFormModel[]>([])

    useEffect(()=>{
        if(props?.categories && props?.categories?.length>0){
            setSearchedCats(JSON.parse(JSON.stringify(props?.categories)))
            return;
        }
        else{
            setSearchedCats([])
        }
    },[props?.categories])

    useEffect(()=>{
        handleSearch()
    },[search,searchedCats])

    const handleSearch=()=>{

        if(isNullOrEmpty(search) || !props?.categories || props?.categories?.length<1){
            setSearchedCats([...props?.categories??[]]);
            return;
        }


        let matchedItems:CommonCodeName[]=[] 
        for(const item of  props?.categories??[]){
              if(item?.Code?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())|| item?.Name?.toLowerCase()?.includes(search?.toLocaleLowerCase())){
                matchedItems.push({...item});
              }
        }

        setSearchedCats([...matchedItems])
    }
    return(
        <Quantom_Grid container>
            <Quantom_Grid container size={{xs:12}} sx={{marginBottom:"5px"}}>
                <Quantom_Input label="Category Search" value={search} onChange={(e)=>setSearch(e?.target?.value)}/>
            </Quantom_Grid>
            <Quantom_Grid container>
            {
                searchedCats?.map((item,index)=>{
                    return(
                        <Quantom_Grid container fullWidth size={{xs:12,md:12,lg:12,xl:12}}
                            onClick={()=>{props?.onSelected?.(item?.Code)}}
                            
                            sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,paddingLeft:'8px',borderBottom:`1px solid ${theme?.palette?.text?.primary}`,
                            paddingTop:'5px',paddingBottom:'5px',backgroundColor:(item.Code===props?.selectedCategory)?theme?.palette?.secondary?.main:undefined}} 
                                         component={Paper}>
                            {item?.Name}
                        </Quantom_Grid>
                    )
                })
            }
            </Quantom_Grid>
           
        </Quantom_Grid>
    )
}




export interface POSItemsRendererViewProps{
  uniqueId?:string;
  selectedCat?:string;
  size?:QuantomSize
  OnItemClick?:(itemCode?:InventoryItemsModel)=>void;
}

interface QuantomSize{
    md?:number;
    xs?:number;
    lg?:number;
    xl?:number;
}

export const PosItemsRenderer=(props?:POSItemsRendererViewProps)=>{

    //const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY)) as SetupFormModel[];
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const [allItems,setAllItems]=useState<InventoryItemsModel[]>([])
    const [items,setItems]=useState<InventoryItemsModel[]>([])
    const [itemSearch,setItemSearch]=useState('');

     useEffect(()=>{
       if(props?.selectedCat){
           handleLoadItems()
       }
     },[props?.selectedCat])


      useEffect(()=>{
       if(itemSearch){
           handleSearch();
       }
       else{
           setItems([...allItems])
       }
     },[itemSearch])
   

     const handleSearch=()=>{
       const search= itemSearch?.toLocaleLowerCase();
        let searchedItems= allItems?.filter(x=>
                   x.ItemName?.toLocaleLowerCase()?.includes(search) 
                   || x?.SearchKey?.toLocaleLowerCase()?.includes(search)
                   ||x?.category?.Name?.toLocaleLowerCase()?.includes(search)
               )

       setItems([...searchedItems])
     }

     const handleLoadItems=async()=>{
          let res= await GetItemsByCategory(props?.selectedCat??"0");
          setItems([...res])
          setAllItems([...res])
     }

   return(
   <> 
     <div className="row">
           <Box sx={{height:'100%',width:'100%'}}>
                 <Quantom_Grid container spacing={.5} sx={{paddingLeft:'10px',paddingRight:'10px'}} >
                 
                    <Quantom_Grid item size={{xs:6,sm:6,md:4,lg:7.5,xl:7.5}}>
                        <Quantom_Input value={itemSearch} onChange={(e)=>{setItemSearch(e.target.value)}} label='Search' />
                    </Quantom_Grid>
                    <Quantom_Grid item size={{xs:6,sm:6,md:4,lg:1.5,xl:1.5}} sx={{marginTop:'5px'}}>
                       <POSActionButton label="Search"/>
                    </Quantom_Grid>
                   
                 </Quantom_Grid>
                 <Quantom_Grid container spacing={1} padding={'10px'}>
                 
                {items?.map((item,index)=>{
                   return(
                       <Quantom_Grid component={Paper} sx={{backgroundColor:theme?.palette?.background?.default}} item size={{xs:12,sm:6,md:4,lg:4,xl:3,...props?.size}}>
                           <div onClick={()=>{props?.OnItemClick?.(item)}} 
                               style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                               <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                   
                                   <IconByName iconName="BallotOutlined" fontSize="20px"/>
                                   <div style={{marginLeft:'5px'}}>
                                       {item?.SearchKey??item.ManualCode}
                                   </div>
                               </div>
                               <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                 <IconByName iconName="InventoryOutlined" fontSize="20px"/>
                                 <div style={{marginLeft:'5px'}}>
                                   {item?.ItemName}
                                 </div>
                               </div>
                               <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                   <IconByName iconName="DnsOutlined" fontSize="20px"/>
                                   <div style={{marginLeft:'5px'}}>
                                   {item?.category?.Name}
                                 </div>
                               </div>
                           </div>
                       </Quantom_Grid>
                   )
                })}
                </Quantom_Grid>
           </Box>
        </div>
   </>
 )
}



interface SoldItemsRendererProps{
  baseProps?:MenuComponentProps<VmSale>
  itemGridSize?:QuantomSize;
  onDeleteItem?:(workingItem?:CommonInvDetailModel)=>void;
  onEditItem?:(workingItem?:CommonInvDetailModel)=>void;

}

export const SoldItemsRenderer=(props?: SoldItemsRendererProps)=>{

    const [showDialog,setShowDialog]=useState(false);
    const[selecteditem,setSelectedItem]=useState<CommonInvDetailModel>();
    const soldItems= props?.baseProps?.state?.SaleDetails;
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const headerFont={fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:'bold',backgroundColor:theme?.palette?.background?.default};
    const bodyFont={fontFamily:fonts.HeaderFont,fontSize:'12px',backgroundColor:theme?.palette?.background?.default};
    
    return(
        <>
        <ShowSingleSelectedItemDialog item={selecteditem} open={showDialog} onClose={(type,item)=>{
            setShowDialog(false);
            if(type==='APPLIED'){
                props?.onEditItem?.(item);
            }
        }}></ShowSingleSelectedItemDialog>
        <Quantom_Grid container sx={{height:'100%',backgroundColor:theme.palette.background.paper}} spacing={1}>
            <TableContainer component={Paper} sx={{backgroundColor:theme.palette.background.paper}}>
            <Table size="small" aria-label="a dense table">
                <TableHead  >
                    <TableRow>
                        <TableCell sx={{...headerFont,width:'10px'}}></TableCell>
                        <TableCell sx={{...headerFont,width:'10px'}}>#</TableCell>
                        <TableCell sx={{...headerFont,width:'auto'}}>Item Name</TableCell>
                        <TableCell sx={{...headerFont,width:'25px'}}>Qty</TableCell>
                        <TableCell sx={{...headerFont,width:'15px'}}>Rate</TableCell>
                        <TableCell sx={{...headerFont,width:'15px'}}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {soldItems?.map((item, index) => (
                    <TableRow key={index} sx={{padding:0,lineHeight:'10px'}}>
                    <TableCell sx={{...bodyFont,wdith:'10px'}}>
                        <div style={{display:'flex'}}>
                            <div onClick={()=>{setShowDialog(true);setSelectedItem(item)}}>
                                <IconByName fontSize="22px"  iconName="EditCalendarOutlined"/>
                            </div>
                            <div onClick={()=>{props?.onDeleteItem?.(item)}}>
                                <IconByName fontSize="22px"  iconName="DeleteOutlineOutlined"/>
                            </div>
                        </div>

                    </TableCell>
                    <TableCell sx={{...bodyFont,wdith:'10px'}}>{item?.CustomSortNo}</TableCell>
                    <TableCell sx={{...bodyFont,width:'auto'}}>{item?.ItemName}</TableCell>
                    <TableCell sx={{...bodyFont,width:'25px'}}>{item?.Qty}</TableCell>
                    <TableCell sx={{...bodyFont,width:'15px'}}>{item?.Price}</TableCell>
                    <TableCell sx={{...bodyFont,width:'15px'}}>{item?.Amount}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Quantom_Grid>
        </>
    )
}

export interface ShowSingleSelectedItemDialogProps{
    open?:boolean;
    item?:CommonInvDetailModel;
    onClose?:(type?:"APPLIED"|"CANCEL",item?:CommonInvDetailModel)=>void;
}

export const ShowSingleSelectedItemDialog=(props?:ShowSingleSelectedItemDialogProps)=>{
  
    const theme= useTheme();
    const [qty,setQty]=useState(0);
    const [rate,setRate]=useState(0);
    const [amount,setAmount]=useState(0);
    useEffect(()=>{
        setQty(props?.item?.Qty??0);
        setRate(props?.item?.Price??0);
        //setQty(props?.item?.Qty??0);
    },[props?.item?.Qty,props?.item?.Price])

    useEffect(()=>{
        setAmount(safeParseToNumber(qty)*safeParseToNumber(rate))
    },[qty,rate])

    return(
    <Dialog fullWidth open={props?.open??false} >
        <DialogContent>
            <div className="row g-1">
                 <div className="col-md-4">
                     <Quantom_Input label="Item Code" value={props?.item?.ItemCode}/>
                 </div>
                 <div className="col-md-8">
                    <Quantom_Input label="Item Item Name" value={props?.item?.ItemName}/>
                 </div>
            </div>

            <div className="row g-1">
                 <div className="col-md-3">
                     <Quantom_Input label="Qty" value={qty} onChange={(e)=>{setQty(safeParseToNumber(e.target.value))}}/>
                 </div>
                 <div className="col-md-4">
                    <Quantom_Input label="Rate" value={rate} onChange={(e)=>{setRate(safeParseToNumber(e.target.value))}}/>
                 </div>
                 <div className="col-md-5">
                    <Quantom_Input label="Amount" value={amount}/>
                 </div>
            </div>

            <div className="row g-1" style={{marginTop:'16px'}}>
                 <div className="col-md-6">
                     <POSActionButton label="Apply Change" backgroundColor={theme.palette.primary.main} onClick={()=>{
                        props?.onClose?.('APPLIED',{...props?.item,Qty:qty,Price:rate})
                     }}/>
                 </div>
                 <div className="col-md-6">
                    <POSActionButton label="Cancel" backgroundColor={theme.palette.primary.main}
                      onClick={()=>{props?.onClose?.('CANCEL')}}/>
                 </div>
                
            </div>
        </DialogContent>
    </Dialog>
    )
}


export interface POSCustomerControlProps{
   onSelection?:(customer?:CommonCodeName)=>void;
}
export const POSCustomerControlRenderer=(props?:POSCustomerControlProps)=>{
    const[customers,setCustomers]=useState<CommonCodeName[]>([])
    useEffect(()=>{
        handleLoadAllCustomers();
    },[])
    const handleLoadAllCustomers=async()=>{
        const custs=  await CustomersGetCodeNameMethod();
        if(custs?.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
            setCustomers([...custs?.Response??[]])
        }   
    }

    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
            {
                customers?.map((item,index)=>{
                    return(
                        <Quantom_Grid onClick={()=>{
                            props?.onSelection?.(item)
                        }} container   sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,
                            backgroundColor:theme.palette.background.default,marginBottom:'5px',
                            borderBottom:`1px solid ${theme?.palette?.primary.main}`,paddingTop:'5px',paddingBottom:"5px"}}>
                            <IconByName iconName="PersonOutlineOutlined"/>
                            {item?.Name}
                        </Quantom_Grid>
                    )
                })
            }
        </>
    )
   
    
}


export interface POSSaleBillsProps{

     onBillSelection?:(billNo?:string)=>void;
}

export const POSSaleBillList=(props?:POSSaleBillsProps)=>{
    const [fromDate,setFromDate]=useState<Date>(new Date())
    const [toDate,setToDate]=useState<Date>(new Date())
    const [Search,setSearch]=useState('')

    useEffect(()=>{
        handleSearch();
    },[])

    const handleSearch=()=>{
        // saleinertmo
    }
    return(
        <div> Testing</div>
    )
   
    
}

 interface QuantomDialogProps{
    open:boolean;
    children?:ReactNode;
    heading?:string;
    onClosePress?:()=>void;
}
export const QuantomDialog=(props?:QuantomDialogProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <Dialog fullWidth open={props?.open??false}>
            <DialogTitle sx={{fonFamily:fonts?.HeaderFont,fontSize:fonts.H3FontSize,fontWeight:"bold",borderBottom:`1px solid ${theme?.palette?.text?.primary}`}}>
                <div style={{display:'flex'}}>
                    <div style={{flex:1}}>
                        {props?.heading}
                    </div>
                    <div onClick={props?.onClosePress}>
                        <IconByName iconName="CancelPresentation"/>
                    </div>
                    
                </div>
            </DialogTitle>
          <DialogContent>
            {props?.children}
          </DialogContent>
        </Dialog>
    )
}


export const POS_SALE_LOCID_KEY="POS_SALE_LOCID_KEY"