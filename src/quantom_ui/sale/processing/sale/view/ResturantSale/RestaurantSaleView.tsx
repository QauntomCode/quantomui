/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { MenuComponentProps, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps"
import store, { form_state_selector,  get_form_state_without_selector,  get_helperData_by_key } from "../../../../../../redux/store"
import { Box, Dialog } from "@mui/material"

import { CommonInvDetailModel } from "../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import {  add_helper_data_single_key } from "../../../../../../redux/reduxSlice"
import { useSelector } from "react-redux"
import { VmSaleOrderModel } from "../../../saleOrder/model/VmSaleOrderModel"
import { SetupFormGetAllBulk } from "../../../../../inventory/config/unit/impl/setupFormImp"
import { RenderAllItemsRestaurantHelper } from "./Helpers/RenderAllItemsRestaurantHelper"
import { RenderAllCategoriesRestaurantHelper } from "./Helpers/RenderAllCategoriesRestaurantHelper"
import { RenderSoldItemsCompRestaurantHelper } from "./Helpers/RenderSoldItemsCompRestaurantHelper"
import { RenderHeaderContainerRestaurantHelper } from "./Helpers/RenderHeaderContainerRestaurantHelper"

export const RestaurantSaleView=(props?:MenuComponentProps<VmSaleOrderModel>)=>{
    
    React.useEffect(()=>{
        setFormBasicKeys<VmSaleOrderModel>({
                 SetBasicKeys:()=>({keyNoPropName:"Sale.BillNo",keyDatePropsName:""}),
                 uniqueKey:props?.UniqueId??"",
                 baseProps:props??{},
                 settings:{firstControlId:"inventory_items_item_name",WillHideUserLog:true,wWillHideToolbar:true,willShowLocations:true},
                 InitOnLocationChange:(async(loc)=>{
                    let state= await get_form_state_without_selector<VmSaleOrderModel>(props?.UniqueId);
                    props?.setState?.({...state,SaleOrder:{...state?.SaleOrder,LocId:loc?.LocId,OrderDate:new Date()}});
                 })
              })
    },[props?.fullState?.IsFirstUseEffectCall]);

    React.useEffect(()=>{
        if(props?.fullState?.IsFirstUseEffectCall){
            handleLoadAllCategories();
        }
    },[props?.fullState?.IsFirstUseEffectCall])

    const handleLoadAllCategories=async ()=>{
        let catsData= await SetupFormGetAllBulk(['Category']);
        let data= catsData.find(x=>x.Type?.toUpperCase()==="CATEGORY")?.Data;
        store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_ALL_CATEGORIES_KEY,Data:data}})))
    }
    return(
        <>
         <ItemsPopupComp UniqueId={props?.UniqueId??""}/>
         <Quantom_Grid container spacing={.5}>
            {/* <div style={{marginBottom:'5px'}}> */}
            <RenderHeaderContainerRestaurantHelper  UniqueId={props?.UniqueId}/>
            </Quantom_Grid>
            <div style={{marginTop:'5px'}}>
                <Quantom_Grid container spacing={.5}>
                    <Quantom_Grid size={{xs:2}}>
                        <RenderAllCategoriesRestaurantHelper UniqueId={props?.UniqueId}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:4}}>
                        <RenderAllItemsRestaurantHelper UniqueId={props?.UniqueId}/>
                    </Quantom_Grid>
                    <Quantom_Grid  size={{xs:6}}>
                        <RenderSoldItemsCompRestaurantHelper  UniqueId={props?.UniqueId}/>
                    </Quantom_Grid>
                </Quantom_Grid>
            </div>
        </>
    )
}


export const ItemsPopupComp=(props?:SaleCompHelperProps)=>{

    const state= useSelector((state?:any)=>form_state_selector<VmSaleOrderModel>(state,props?.UniqueId??""));

    const selectedTable= state?.ResturantTable?.[0];
    const willShowModel= useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY)) as boolean;

    React.useEffect(()=>{
        if(selectedTable && selectedTable?.TableNo){
             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY,Data:true}}))
        }
    },[selectedTable?.TableNo])

    return(

        <Dialog
        fullWidth
        maxWidth={'large'}
        // maxWidth={maxWidth}
        open={willShowModel??false}
        // onClose={handleClose}
      >
    <Box>
        <div style={{display:'flex'}}>
            <div style={{width:'170px'}}>
                <RenderAllCategoriesRestaurantHelper UniqueId={props?.UniqueId}/>
            </div>
            <div style={{flex:1}}>
                <RenderAllItemsRestaurantHelper UniqueId={props?.UniqueId} />
            </div>
            <div style={{flex:1}}>
                <RenderSoldItemsCompRestaurantHelper willShowHeader UniqueId={props?.UniqueId}/>
            </div>
        </div>
        </Box>
    </Dialog>
    )
}

export interface SaleCompHelperProps{
    UniqueId?:string;
}






export const SelectedItemPopup=(props?:SaleCompHelperProps)=>{
      const selectedItem= useSelector((state:any)=>(get_helperData_by_key(state,_RESTAURANT_SALE_OPEN_ITEM_INFO_KEY,props?.UniqueId??""))) as CommonInvDetailModel
      const [isShowModel,setShowModel]=React.useState(false);
      React.useEffect(()=>{
          if(selectedItem?.ItemCode){
            setShowModel(true);
          }
      },[selectedItem?.ItemCode])

    
    return(
        <>
          <Dialog fullWidth maxWidth={'large'} open={isShowModel}>
              {selectedItem?.ItemCode}
              {selectedItem?.ItemName}
          </Dialog>
        </>
    )
}



export const _MOSS_GREEN="#CDFFCC"
export const _YELLOW_COLOR="#FAFFCD"
export const _LIGHT_LEMON_GREEN="#E1F4A2"
export const _LIGHT_PINK_COLOR='#FFCCC9'

export const _GRAY_COLOR="#CECECE"
export const _GREEN_COLOR="#A2FF69"
export const _BLUE_COLOR="#E3DFFF";
export const _ORANGE_COLOR="#FFCC67";
export const _BORDER_PROPS="2px solid rgb(116, 115, 114)"
export const _RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY="RESTAURANT_SALE_OPEN_ITEM_MODEL_KEY";
export const _RESTAURANT_SALE_OPEN_ITEM_INFO_KEY="RESTAURANT_SALE_OPEN_ITEM_INFO_KEY";
export const _RESTAURANT_SALE_ALL_CATEGORIES_KEY="_RESTAURANT_SALE_ALL_CATEGORIES_KEY";
export const _RESTAURANT_SALE_SELECTED_CATEGORY_KEY="_RESTAURANT_SALE_SELECTED_CATEGORY_KEY";







