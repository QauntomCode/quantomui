/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_current_user_locations, get_form_state_without_selector, set_form_state } from "../../../../../../redux/store";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import React from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps";
import { QUANTOM_Table } from "../../../../../account/config/mainAccount/view/MainAccountView";

export const InventoryItemHelperItemLocations=(props?:ItemHelperTabs)=>{
  const locations= useSelector((state:any)=>get_current_user_locations(state));
  const state= useSelector((state?:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""));
  const[selectedLocations,setSelectedLocations]=React.useState<CommonCodeName[]>();
  React.useEffect(()=>{
    let locs=
     locations.map((item,index)=>{
          let obj:CommonCodeName={
            Code:item?.LocId,
            Name:item?.LocName,
            Checked:false
          }
         let loc= state?.ItemLocation?.find(x=>x.LocCode===item?.LocId)
         if(loc && loc?.LocCode){
           obj.Checked=true;
         }

         return obj ;
     })

     setSelectedLocations([...locs]);

  },[locations,state])
  return(
    <GroupContainer height='300px' Label='Item Locations' >
      <Quantom_Grid size={{xs:9}}>
        <QUANTOM_Table onCellValueChanged={async(e)=>{
          let nState=await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId);
          let isChecked=e?.data?.Checked;
          // alert(isChecked)
          let itemsLocations=[...nState?.ItemLocation??[]];
          let selIndex= itemsLocations?.findIndex(x=>x.LocCode===e?.data?.Code);
          
          if(isChecked && selIndex<0){
            // alert(selIndex)
             itemsLocations.push({LocCode:e?.data?.Code,Location:{LocId:e?.data?.Code,LocName:e?.data?.Name}})
          }
          if(!isChecked && selIndex>-1){
              itemsLocations?.splice(selIndex,1)
          }
          let newState={...nState,ItemLocation:[...itemsLocations]}
          set_form_state(props?.baseProps?.UniqueId,newState)
          // alert('values are changed')
        }} height='200px' headerHeight={30} viewButtonStatus='HIDE' hideFloatingFilter data={selectedLocations} columns={[
          {field:"Checked",caption:"Selected",width:120,dataType:'boolean',editable:true,headerCheckboxSelection: true,},
          {field:"Code",caption:"LocId",width:100},
          {field:"Name",caption:"LocName",width:250},
          


        ]}/>
      </Quantom_Grid>
    </GroupContainer>
  )
}
