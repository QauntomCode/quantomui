/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_current_user_locations, get_form_state_without_selector, set_form_state, useQuantomFonts } from "../../../../../../redux/store";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import React from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps";
import { LocationModel } from "../../../../../Settings/Location/Model/LocationModel";
import { IconByName } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { Grid2, Paper, useTheme } from "@mui/material";
import { QuantomSwitch } from "../POS/POSInventoryIitemsView";
import { InventoryItemLocationsModel } from "../../model/AssocicateModels/InventoryItemLocationsModel";

export const InventoryItemHelperItemLocations=(props?:ItemHelperTabs)=>{
  const locations= useSelector((state:any)=>get_current_user_locations(state));
  const state= useSelector((state?:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""));
  const theme= useTheme();
  return(
      <Quantom_Grid p={1} borderBottom={`2px solid ${theme?.palette?.primary?.main}`}  container size={{xs:6}} component={Paper}>
         
          <BranchSelectionComp 
                onChange={async(data)=>{
                    let nState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId);
                    let newState={...nState,ItemLocation:data?.map((item,index)=>{
                            let obj:InventoryItemLocationsModel={LocCode:item?.LocId,Location:{LocId:item?.LocId,LocName:item?.LocName}}
                            return obj;
                        })
                    }
                    set_form_state(props?.baseProps?.UniqueId,newState)
                }}
                selectedBranches={state?.ItemLocation?.map((item,index)=>{
                   let loc:LocationModel={LocId:item?.LocCode,LocName:item?.Location?.LocName}  
                   return loc;
                })}/>
      </Quantom_Grid>
  )
}


export interface BranchSelectionCompProps{
    selectedBranches?:LocationModel[];
    onChange?:(branches?:LocationModel[])=>void
}
export const BranchSelectionComp=(props?:BranchSelectionCompProps)=>{
     const locations= useSelector((state:any)=>get_current_user_locations(state));
     console.log('selected branches are',locations)
     console.log('user locations are',locations)
    const fonts= useQuantomFonts();
    const theme = useTheme();
     return(
        <>
         
        <Quantom_Grid mt={2} container size={{xs:12}}>
             {
                locations?.map((item,index)=>{
                     const isChecked=props?.selectedBranches?.some(x=>x?.LocId===item?.LocId);
                     console.log('is checked',isChecked)
                    return(
                        <Quantom_Grid container sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H4FontSize}} 
                                      display='flex' mb={.5} pl={1} pr={1} pt={.2} bp={.2} size={{xs:12}} component={Paper}>
                                
                                <Quantom_Grid display='flex' sx={{alignItems:'center'}}>
                                    <QuantomSwitch onChange={(val)=>{
                                        let items= [...props?.selectedBranches??[]];
                                        if(val){
                                            items=[...items,{...item}]
                                             props?.onChange?.(items)
                                        }
                                        else{
                                            let nItems= items?.filter(x=>x.LocId!==item?.LocId)??[];
                                            items=[...nItems]
                                             props?.onChange?.(items)
                                        }

                                       
                                    }} value={isChecked}/>
                                </Quantom_Grid>
                               <Quantom_Grid display='flex' pl={1} sx={{color:theme?.palette?.text?.disabled,alignItems:'center'}}>
                                  <IconByName iconName="Tag"  fontSize="16px"/>
                                  {item?.LocId}
                               </Quantom_Grid>
                               <Quantom_Grid display='flex' pl={3} sx={{flex:1,alignItems:'center'}}>
                                   <IconByName color={theme?.palette?.text?.disabled} iconName="LocationOnOutlined"/>
                                   {item?.LocName}
                               </Quantom_Grid>
                        </Quantom_Grid>
                    )
                })
             }
        </Quantom_Grid>
        </>
     )
}