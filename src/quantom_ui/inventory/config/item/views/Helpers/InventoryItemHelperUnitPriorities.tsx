/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_form_state_without_selector, set_form_state } from "../../../../../../redux/store";
import React from "react";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { InventoryItemUnitsPriorityModel } from "../../model/AssocicateModels/Inventory_ItemUnitsPriorityModel";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { QUANTOM_Table } from "../../../../../account/config/mainAccount/view/MainAccountView";

export const InventoryItemHelperUnitPriorities=(props?:ItemHelperTabs)=>{
  const forms=["SALE","PURCHASE"];
  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""))
  const [data,setData]=React.useState<InventoryItemUnitsPriorityModel[]>([])

  React.useEffect(()=>{
    setUnitFormats()
  },[state?.item?.UnitCode,state?.InventoryItemUnitsPriority])

  const setUnitFormats= async()=>{
      let prData= await getPriorityData();
      console.warn('unit priority data is',prData)
      setData([...prData]);
  }
  const getPriorityData=async():Promise<InventoryItemUnitsPriorityModel[]>=>{
    let funData:InventoryItemUnitsPriorityModel[]=[];
      
    for(let i=0; i<(forms?.length??0);i++){
      let formName= forms[i];
      let mainUnit= await get_selected_obj(state?.item?.UnitCode,formName);
        let mUnitObj= {FormName:formName,ItemCode:state?.item?.ItemCode,UnitCode:state?.item?.UnitCode,Unit:{Code:state?.item?.UnitCode,Name:state?.item?.UnitName},Priority:mainUnit?.Priority??0}
        funData.push(mUnitObj);

        for(let i=0;i<(state?.itemUnits?.length??0);i++){
            
            let item= state?.itemUnits?.[i]
            // alert('item unit is'+item?.Unit?.Code)
            let obj:InventoryItemUnitsPriorityModel={
              UnitCode:item?.UnitCode,
              Unit:{Code:item?.UnitCode,Name:item?.unit?.Name},
              Priority:0,
              FormName:formName
            }
            let selected=  await get_selected_obj(item?.UnitCode,formName)

            if(selected){
                  obj.Priority=selected?.Priority??0
            }
            funData.push(obj);
        }
      }

        

      return Promise.resolve(funData)
  }

   const get_selected_obj=async(unitCode?:string,formName?:string):Promise<InventoryItemUnitsPriorityModel|undefined>=>{
     let selected= state?.InventoryItemUnitsPriority?.find(x=>x.UnitCode===unitCode && x?.FormName?.toUpperCase()===formName?.toUpperCase());
     return Promise.resolve(selected);
  }

  const handleCellValueChange=async(data?: any):Promise<void>=> {
     var state= await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId);
     let uniPrior= [...state?.InventoryItemUnitsPriority??[]];
    //  alert(data?.data?.FormName)
     let index=  uniPrior.findIndex(x=>x.FormName===data?.data?.FormName && x.UnitCode===data?.data?.UnitCode);
     if(index>-1){
      //  alert('found data')
       uniPrior.splice(index,1,data?.data);
     }
     else{
      uniPrior.push(data?.data)
     }

     set_form_state(props?.baseProps?.UniqueId??"",{...state,InventoryItemUnitsPriority:[...uniPrior??[]]})
  }

  return(
    <GroupContainer height='300px' Label='Unit Priorities' >
        <QUANTOM_Table onCellValueChanged={handleCellValueChange} height='240px' data={data} headerHeight={20} hideFloatingFilter viewButtonStatus='HIDE'
         columns={[
            {caption:"Form Name",field:'FormName',width:100},
            {caption:"Unit Code",field:'Unit.Code',width:100},
            {caption:"Unit Name",field:'Unit.Name',width:100},
            {caption:"Priority",field:'Priority',width:100,editable:true},


          ]}/>
    </GroupContainer>
  )
}