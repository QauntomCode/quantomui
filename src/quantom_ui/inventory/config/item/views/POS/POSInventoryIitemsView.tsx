/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { APP_TYPE, GetAPPType, HideLoadingDialog, IconByName, MenuComponentProps, QuantomConfirmationDialog,  setFormBasicKeys, ShowLoadingDialog } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import store, { full_component_state, get_form_state_without_selector, get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store";
import React, { useEffect, useState } from "react";
import {  Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { Box,FormControlLabel,Paper, Snackbar, Switch, useTheme } from "@mui/material";
import { Quantom_LOV } from "../../../../../../quantom_comps/Quantom_Lov";
import { CommonCodeName } from "../../../../../../database/db";
import { GetSetupFormTypByMenuCode, SetupFromGetAll } from "../../../unit/impl/setupFormImp";
import { isNullOrEmpty, safeParseToNumber } from "../../../../../../CommonMethods";
import { GetItemsByCategory, InventoryItemsDelete, InventoryItemsGetOne, InventoryItemsInsert } from "../../impl/InventoryitemsImpl";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../../../HTTP/QuantomHttpMethods";
import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { add_helper_data, add_helper_data_single_key } from "../../../../../../redux/reduxSlice";
import { InventoryItemsModel } from "../../model/InventoryItemsModel";
import { BorderBottom, BorderLeft } from "@mui/icons-material";
import { ShowQuantomError } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/QuantomError";
import POSSoftwareReportIcon from '@mui/icons-material/AssessmentOutlined';
import { POSToolBarComp } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

export const POSInventoryItemsView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
    // const theme= useTheme();
    // const fonts= useQuantomFonts();
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const ViewType:string=useSelector((state?:any)=> get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE))??"LIST"
    const [resetOnSave,setResetAfterSave]=React.useState(true);
    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VMInventoryItemsModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })

         handleCategories();
        }
    },[fullState?.IsFirstUseEffectCall])

     return(
        <>
        {ViewType==='LIST'?
            (<PosInventoryItemsListView {...props}/>):
            (<POSInventoryItemFormView baseProps={props} resetAfterSave={resetOnSave} onChangeResetAfterSave={(checked)=>setResetAfterSave(checked??false)}/>)}

        </>  
     )
}

export interface POSInventoryItemFormViewProps {
    resetAfterSave?:boolean;
    onChangeResetAfterSave?:(check?:boolean)=>void
    baseProps?:MenuComponentProps<VMInventoryItemsModel>
}

export const POSInventoryItemFormView=(props?:POSInventoryItemFormViewProps)=>
{
    const [refresCategoreis,setRefreshCategories]=React.useState(0);
    
    // const[resetAfterSave,setResetAfterSave]=React.useState(true);

    const theme= useTheme();
    const fonts= useQuantomFonts();
    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.baseProps?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }

    const itemCode:string=useSelector((state?:any)=> get_helperData_by_key(state,props?.baseProps?.UniqueId??"",POS_INVENTORY_ITEM_SET_ITEM_CODE))as string;
    React.useEffect(()=>{
         handleGetOne();
    },[itemCode])

    const handleGetOne=async()=>{
        if(itemCode){
            try{
                 ShowLoadingDialog();
                let res= await InventoryItemsGetOne(itemCode);
                if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                     props?.baseProps?.setState?.(res?.Response)
                }
                else{
                    HideLoadingDialog();
                    alert(res?.ErrorMessage)
                }
                HideLoadingDialog()

            }
            catch{
                 HideLoadingDialog()
            }
            
        }
    }

    const handleSaveAction=async()=>{
        const newState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId);
        let res= await  InventoryItemsInsert(newState);
        return Promise.resolve(res);
      }

      const appType= GetAPPType();
      const itemCodeCaption=appType===APP_TYPE.DENTAL_APP?"Service Code" :"Item Code"
      const itemNameCatpion=appType===APP_TYPE.DENTAL_APP?"Service Name" :"Item Name"
      const categoryCaption=appType===APP_TYPE.DENTAL_APP?"Service Type" :"Item Category"
      const salePriceCatpion=appType===APP_TYPE.DENTAL_APP?"Price" :"Item Category"




    return(
        <>
        <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-md-8">
            <POSToolBarComp 
                SaveAction={handleSaveAction} 
                ResetAction={()=>{props?.baseProps?.setState?.({})}}
                DeleteAction={()=>InventoryItemsDelete(props?.baseProps?.state)}
                ListAction={()=>{store.dispatch((add_helper_data_single_key({UniqueId:props?.baseProps?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))}}
                SaveAfterAction={(obj)=>{
                    if(props?.resetAfterSave){
                        props?.baseProps?.setState?.({})
                    }
                    else{
                        props?.baseProps?.setState?.({...obj});
                    }
                }}
                />
           </div>
           
        </div>

        <div className="row" style={{marginTop:'25px'}}>

          <div className="col-md-2" />
          {/* <div className="col-md-2">
             <Paper style={{width:'100%',height:'100%'}}>
                 
             </Paper>
          </div> */}
          <div className="col-md-6">
               <div className="row">
                   <div className=" col-md-6">
                        <Quantom_Input label={itemCodeCaption} onChange={(e)=>{
                        props?.baseProps?.setState?.({...props?.baseProps?.state,item:{...props?.baseProps?.state?.item,ManualCode:e.target.value}})
                        }} value={props?.baseProps?.state?.item?.ManualCode} size='small'/>
                    </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <div className="col-md-12">
                            <Quantom_Input label={itemNameCatpion} onChange={(e)=>{
                            props?.baseProps?.setState?.({...props?.baseProps?.state,item:{...props?.baseProps?.state?.item,ItemName:e.target.value}})
                            }} value={props?.baseProps?.state?.item?.ItemName} size='medium'/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <Quantom_LOV label={categoryCaption} RefreshFillDtaMethod={refresCategoreis} 
                                    FillDtaMethod={handleCategories}
                                    onChange={(code)=>{
                                          props?.baseProps?.setState?.({...props?.baseProps?.state,item:{...props?.baseProps?.state?.item,CatCode:code?.Code,category:{Code:code?.Code,Name:code?.Name}}})
                                    }} 
                                    selected={{Code:props?.baseProps?.state?.item?.CatCode,Name:props?.baseProps?.state?.item?.category?.Name}} />
                    </div>
          </div>
          
        </div>

         <div className="row" >
            <div className="col-md-2" />
              <div className="col-md-8 col-12" style={{marginTop:'16px'}}>
                  <div className="row g-1">
                     <div className="col-3">
                        <Quantom_Input label={salePriceCatpion} onChange={(e)=>{
                        props?.baseProps?.setState?.({...props?.baseProps?.state,item:{...props?.baseProps?.state?.item,SalePrice:safeParseToNumber( e.target.value)}})
                        }} value={props?.baseProps?.state?.item?.SalePrice} size='small'/>
                     </div>
                     {
                        appType=== APP_TYPE.DENTAL_APP?(<></>):(
                        <>
                             <div className="col-3">
                                <Quantom_Input label='Purchase price'  value={props?.baseProps?.state?.item?.PurchasePrice} onChange={(e)=>{
                                    props?.baseProps?.setState?.({...props?.baseProps?.state,item:{...props?.baseProps?.state?.item,PurchasePrice:safeParseToNumber(e.target.value)}})
                                }}/>
                            </div>
                            <div className="col-3">
                                <Quantom_Input label='Opening Stock'  value={props?.baseProps?.state?.OpeningQty} onChange={(e)=>{
                                    props?.baseProps?.setState?.({...props?.baseProps?.state,OpeningQty:safeParseToNumber(e.target.value)})
                                }}/>
                            </div>
                        </>)
                     }
                    
                  </div>
                  
            </div>
         </div>
         
         <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10" >
                <div style={{display:'flex',color:theme.palette.text.primary,fontWeight:600,alignItems:'center',fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize}} >
                    <Switch checked={props?.resetAfterSave} onChange={(e)=>{props?.onChangeResetAfterSave?.(e.target.checked)}} />
                    Reset After Save
                </div>
            </div>
         </div>
         
        </>
    )
}
export const POS_INVENTORY_ITEM_MENU_CODE="POS_INVENTORY_ITEM_MENU_CODE";
export const POS_INVENTORY_ITEM_VIEW_TYPE="POS_INVENTORY_ITEM_VIEW_TYPE";
export const POS_INVENTORY_ITEM_SET_ITEM_CODE="POS_INVENTORY_SET_ITEM_CODE";
export const POS_CATEGORY_FORM_MENU_CODE="POS_CATEGORY_FORM_MENU_CODE";

export const POS_CUSTOMER_FORM_MENU_CODE="POS_CUSTOMER_FORM_MENU_CODE";
export const POS_SALE_FORM_MENU_CODE="POS_SALE_FORM_MENU_CODE";
export const POS_SALE_FORM_WITH_EMPTY_MENU_CODE="POS_SALE_FORM_WITH_EMPTY_MENU_CODE";
export const POS_SALE_FORM_DENTAL_JOB_INFO_WITH_DETAIL="POS_SALE_FORM_DENTAL_JOB_INFO_WITH_DETAIL";



export const POS_SUPPLIER_FORM_MENU_CODE="POS_SUPPLIER_FORM_MENU_CODE";
export const POS_PURCHASE_FORM_MENU_CODE="POS_PURCHASE_FORM_MENU_CODE";

export const POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE="POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE";
export const POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE="POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE";

export const POS_SOFTWARE_REPORTS_MENU_CODE="POS_SOFTWARE_REPORTS_MENU_CODE";
export const POS_INVENTORY_STOCK_REPORT_MEN_CODE="POS_INVENTORY_STOCK_REPORT_MENU_CODE"



export const POS_ACCOUNT_REPORT_LEDGER="POS_ACCOUNT_REPORT_LEDGER"
export const POS_PAYMENT_SUPPLIER_PAYMENT_REPORT_MENU_CODE="POS_PAYMENT_SUPPLIER_PAYMENT_REPORT_MENU_CODE"
export const POS_PAYMENT_CUSTOMER_RECEIPT_REPORT_MENU_CODE="POS_PAYMENT_CUSTOMER_RECEIPT_REPORT_MENU_CODE"


export const POS_INVENTORY_SALE_REPORT="POS_INVENTORY_SALE_REPORT"
export const POS_INVENTORY_PURCHASE_REPORT="POS_INVENTORY_PURCHASE_REPORT"
export const POS_CUSTOMER_APPOINTMENTS_MENU_CODE="POS_CUSTOMER_APPOINTS_MENU_CODE"














export const PosInventoryItemsListView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{

     const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY)) as SetupFormModel[];
     const fonts= useQuantomFonts();
     const theme= useTheme();
     const [category,setCategory]= React.useState('')
     const [allItems,setAllItems]=React.useState<InventoryItemsModel[]>([])
     const [items,setItems]=React.useState<InventoryItemsModel[]>([])
     const [itemSearch,setItemSearch]=React.useState('');
    //  const [categories,setCategories]=React.useState<SetupFormModel[]>([]);

     const [catSearch,setCatSearch]=React.useState('');

     const appType= GetAPPType();
    const categoryCaption=appType===APP_TYPE.DENTAL_APP?"Service Types" :"Category"
    //  useEffect(()=>{
    //      setCategories([...allCategories])
    //  },[allCategories])


     useEffect(()=>{
         //handleCategoriesSearch()
     },[catSearch])

    //  const handleCategoriesSearch=()=>{
    //     if(!allCategories || allCategories?.length<1){
    //         return;
    //     }
    //     if(isNullOrEmpty(catSearch)){
    //        // setCategories([...allCategories??[]]);
    //         return;
    //     }
    //       const search= catSearch?.toLowerCase();
    //       let res=  allCategories?.filter?.((x=>x?.Name?.toLocaleLowerCase()?.includes(search)));
    //       setCategories([...res]);
    //  }

      React.useEffect(()=>{
        if(category){
            handleLoadItems()
        }
      },[category])


      React.useEffect(()=>{
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
           let res= await GetItemsByCategory(category);
           setItems([...res])
           setAllItems([...res])
      }

    return(
    <> 
      <div className="row g-2" style={{marginTop:'8px'}}>
         <div className="col-md-4 col-lg-3">
            
             
              <Quantom_Grid container  sx={{marginBottom:"5px"}}>
                 <Quantom_Input label={`Search ${categoryCaption}`} value={catSearch} onChange={(e)=>{
                    setCatSearch(e.target.value)
                 }}/>
              </Quantom_Grid>    
              <Quantom_Grid container  
                sx={{fontFamily:fonts.HeaderFont,color:theme.palette.primary.contrastText,backgroundColor:theme.palette.primary.main,justifyContent:'center',letterSpacing:1.5,fontWeight:650}}>All {categoryCaption}</Quantom_Grid>

            {
               
                categories?.map((item,index)=>{
                    return(
                        <div onClick={()=>{
                            setCategory(item?.Code??"")
                        }}>
                        <Quantom_Grid contain component={Paper} 
                            sx={{fontFamily:fonts.HeaderFont,fontWeight:500,backgroundColor:item?.Code===category?(theme?.palette?.secondary?.main): undefined,fontSize:fonts.H4FontSize,borderBottom:`1px solid ${theme.palette.primary.main}`,
                                paddingTop:'8px',paddingBottom:'8px',alignItems:'center',paddingLeft:'15px'}}>{item?.Name}</Quantom_Grid>
                        </div>
                    )
                })
            }
         </div>
         <div className="col-md-8 col-lg-9">
            <Box sx={{height:'100%',width:'100%'}}>
                  <Quantom_Grid display='flex' container spacing={.5} sx={{paddingLeft:'10px',paddingRight:'10px'}} >
                    
                    <Quantom_Grid item >
                        <POSActionButton1 onClick={()=>{
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_SET_ITEM_CODE,Data:''}})))
                             props?.setState?.({});
                        }} label="Add New" iconName="AddBoxOutlined"/>
                     </Quantom_Grid>
                     <Quantom_Grid item flex={1}>
                         <Quantom_Input value={itemSearch} onChange={(e)=>{setItemSearch(e.target.value)}} label='Search' />
                     </Quantom_Grid>
                     <Quantom_Grid  >
                        <POSActionButton1 label="Search" iconName="ScreenSearchDesktopOutlined"/>
                     </Quantom_Grid>
                     {/* <Quantom_Grid item size={{xs:2}} sx={{marginTop:'5px'}}>
                        <POSActionButton label="Add New"/>
                     </Quantom_Grid> */}
                  </Quantom_Grid>
                  <Quantom_Grid container spacing={1} padding={'10px'}>
                  {/* <Quantom_Grid size={{xs:12}} sx={{fontFamily:fonts.HeaderFont,color:theme.palette.text.primary,backgroundColor:theme.palette.primary.main,justifyContent:'center'}}>
                    All Items</Quantom_Grid> */}
                 {items?.map((item,index)=>{
                    return(
                        <Quantom_Grid component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`}} item size={{xs:12,sm:6,md:4,lg:3,xl:2.4}}>
                            <div onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_SET_ITEM_CODE,Data:item?.ItemCode}})))
                                props?.setState?.({});

                            }} style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                                <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                    
                                    <IconByName  color={theme?.palette?.primary?.main} iconName="BallotOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px',fontWeight:650}}>
                                        {item?.SearchKey??item.ManualCode}
                                    </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                  <IconByName color={theme?.palette?.primary?.main} iconName="InventoryOutlined" fontSize="20px"/>
                                  <div style={{marginLeft:'5px'}}>
                                    {item?.ItemName}
                                  </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                    <IconByName color={theme?.palette?.primary?.main} iconName="DnsOutlined" fontSize="20px"/>
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
      </div>
    </>
  )
}


export const POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY"



export interface ToastProps{
    open?:boolean;
    oncClose?:()=>void;
    message?:string;
}
export const Toast=(props?:ToastProps)=>{

    

    return(
        <Box sx={{ width: 500 }}>
      {/* {buttons} */}
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={props?.open}
        onClose={props?.oncClose}
        message={props?.message}
        key={'top'+'right'}
      />
    </Box>

    )
}


interface QuantomSwithProps{
    value?:boolean;
    label?:string;
    onChange?:(checked?:boolean)=>void;
}

export const QuantomSwitch=(props?:QuantomSwithProps)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
        <div style={{display:'flex',color:theme.palette.text.primary,fontWeight:600,alignItems:'center',fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize}} >
                    <Switch checked={props?.value} onChange={(e)=>{props?.onChange?.(e.target.checked)}} />
                    {props?.label}
                </div>
    )
}



