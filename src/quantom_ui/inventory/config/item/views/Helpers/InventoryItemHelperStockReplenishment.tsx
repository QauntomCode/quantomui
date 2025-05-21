/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_current_user_locations, get_form_state_without_selector, set_form_state } from "../../../../../../redux/store";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { InventoryItemStockReplenishmentModel } from "../../model/AssocicateModels/InventoryItemStockReplenishmentModel";
import { QUANTOM_Table } from "../../../../../account/config/mainAccount/view/MainAccountView";
import { AsyncFindByIndex } from "../../../../../../CommonMethods";

export const InventoryItemHelperStockReplenishment=(props?:ItemHelperTabs)=>{

  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""));

  
  const locations= useSelector((state:any)=>get_current_user_locations(state));

 
    let replenishData=
     locations?.map((item,index)=>{
        let replenish:InventoryItemStockReplenishmentModel|undefined= 
              state?.InventoryItemStockReplenishments?.find(x=>x.LocCode===item?.LocId)||{GraceDays:0,GraceQty:0,MinQty:0,MaxQty:0,LocCode:item.LocId,Location:item};;
        return {...replenish};

     })

   

  


  return(
    <GroupContainer height='300px' Label='Stock Replenishment' >
       <QUANTOM_Table onCellValueChanged={async(e)=>{
          const nState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId??"");
          let oldData=[...nState?.InventoryItemStockReplenishments??[]];
           let index= await AsyncFindByIndex(oldData,(obj)=>obj?.LocCode===e?.data?.LocCode);
           
           if(oldData && index>-1 && oldData?.[index] ){
             oldData[index]={
              ...oldData[index],
              GraceDays:e.data?.GraceDays,GraceQty:e?.Data?.GraceQty,MinQty:e?.Data?.MinQty,MaxQty:e?.data?.MaxQty,
              Location:{...e?.data?.Location}
            }
             oldData?.splice(index,1,{...e?.data});
           }
           else{
            oldData.push({...e?.data})
           }

           let newState={...nState,InventoryItemStockReplenishments:[...oldData??[]]}
           
          //  store.dispatch(set_state_with_immmer({stateKey:props?.baseProps?.UniqueId,QuantomFormCoreState:{...newState}}))
          set_form_state(props?.baseProps?.UniqueId,newState)
         console.warn('cell value changed',e?.data)
        console.warn(e);
       }} headerHeight={30} hideFloatingFilter height='250px' viewButtonStatus='HIDE'   data={replenishData}
          columns={[
            {field:"Location.LocName",caption:"LocName",width:200},
            {field:"GraceDays",caption:"GraceDays",width:100,editable:true},
            {field:"GraceQty",caption:"GraceQty",width:100,editable:true},
            {field:"MinQty",caption:"MinQty",width:100,editable:true},
            {field:"MaxQty",caption:"MaxQty",width:100,editable:true},
          ]}
          />
    </GroupContainer>
  )
}
