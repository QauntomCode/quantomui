/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { full_component_state, get_form_state_without_selector, useQuantomFonts } from "../../../../../../redux/store";
import React, { useEffect } from "react";
import { Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { Box,Paper, useTheme } from "@mui/material";
import { Quantom_LOV } from "../../../../../../quantom_comps/Quantom_Lov";
import { CommonCodeName } from "../../../../../../database/db";
import { GetSetupFormTypByMenuCode, SetupFromGetAll } from "../../../unit/impl/setupFormImp";
import { safeParseToNumber } from "../../../../../../CommonMethods";
import { InventoryItemsInsert } from "../../impl/InventoryitemsImpl";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../../../HTTP/QuantomHttpMethods";

export const POSInventoryItemsView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
    // const theme= useTheme();
    // const fonts= useQuantomFonts();
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const [refresCategoreis,setRefreshCategories]=React.useState(0);


    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VMInventoryItemsModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })
        }
    },[fullState?.IsFirstUseEffectCall])
    return(
        <>
        <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2">
              
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE" responseClick={async()=>{
                      const newState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.UniqueId);
                      let res= await  InventoryItemsInsert(newState);
                      return Promise.resolve(res);
                      
                    }} iconName="SaveOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" onClick={()=>{alert('save button pressed')}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" onClick={()=>{alert('save button pressed')}} iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{alert('save button pressed')}} iconName="FeaturedPlayListOutlined"/>
           </div>
        </div>

        <div className="row" style={{marginTop:'25px'}}>

          <div className="col-md-2" />
          <div className="col-md-2">
             <Paper style={{width:'100%',height:'100%'}}>
                 Image
             </Paper>
          </div>
          <div className="col-md-6">
               <div className="row">
                   <div className=" col-md-6">
                        <Quantom_Input label="Item Code" onChange={(e)=>{
                        props?.setState?.({...props?.state,item:{...props?.state?.item,ManualCode:e.target.value}})
                        }} value={props?.state?.item?.ManualCode} size='small'/>
                    </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <div className="col-md-12">
                            <Quantom_Input label="Item Name" onChange={(e)=>{
                            props?.setState?.({...props?.state,item:{...props?.state?.item,ItemName:e.target.value}})
                            }} value={props?.state?.item?.ItemName} size='medium'/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <Quantom_LOV label="Category" RefreshFillDtaMethod={refresCategoreis} 
                                    FillDtaMethod={
                                                    async()=>{ 
                                                            let categories= await SetupFromGetAll('003-002','');
                                                            //setRefreshCategories(refresCategoreis+1);
                                                            return Promise.resolve(categories);
                                                        }}
                                    onChange={(code)=>{
                                          props?.setState?.({...props?.state,item:{...props?.state,CatCode:code?.Code,category:{Code:code?.Code,Name:code?.Name}}})
                                    }} 
                                    selected={{Code:props?.state?.item?.CatCode,Name:props?.state?.item?.category?.Name}} />
                    </div>
          </div>
          
        </div>

         <div className="row" >
            <div className="col-md-2" />
              <div className="col-md-8 col-12" style={{marginTop:'16px'}}>
                  <div className="row g-1">
                     <div className="col-4">
                        <Quantom_Input label="Sale Price" onChange={(e)=>{
                        props?.setState?.({...props?.state,item:{...props?.state?.item,SalePrice:safeParseToNumber( e.target.value)}})
                        }} value={props?.state?.item?.SalePrice} size='small'/>
                     </div>
                     <div className="col-4">
                        <Quantom_Input label='Purchase price'  value={props?.state?.item?.PurchasePrice} onChange={(e)=>{
                             props?.setState?.({...props?.state,item:{...props?.state?.item,PurchasePrice:safeParseToNumber(e.target.value)}})
                        }}/>
                     </div>
                     <div className="col-4">
                        <Quantom_Input label='Opening Stock'  value={props?.state?.OpeningQty} onChange={(e)=>{
                            props?.setState?.({...props?.state,OpeningQty:safeParseToNumber(e.target.value)})
                        }}/>
                     </div>
                  </div>
                  
            </div>
         </div>
        </>
    )
}

export const POS_INVENTORY_ITEM_MENU_CODE="POS_INVENTORY_ITEM_MENU_CODE";



interface POSActionButtonProps{
  label?:string;
  iconName?:string;
  onClick?:()=>void;
  buttonType?:'SAVE'|'RESET'|'DELETE'|'LIST'
  responseClick?:()=>Promise<HttpResponse<any>>
}
export const POSActionButton=(props?:POSActionButtonProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <button onClick={async()=>{
            if(props?.responseClick){
               let res= await props?.responseClick?.()
               if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                  // success message
               }
               else if(res.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
                // error message
               }
            }
            else{
                props?.onClick?.()
            }
        }}    
         style={{display:'flex',justifyContent:'center',alignItems:'center',lineHeight:'35px',backgroundColor:theme?.palette?.background.paper,zIndex:999,width:'100%',border:`1px solid ${theme.palette.primary.main}`,
                     borderRadius:'5px',fontFamily:fonts.HeaderFont,fontWeight:'bold',fontSize:'16px',color:theme.palette.text.primary,opacity:.8}}>
                    <div style={{display:'flex',justifyContent:'center',marginRight:'10px'}}>
                        <IconByName iconName={props?.iconName}/>
                    </div>
                {props?.label}
                
              </button>
    )
}