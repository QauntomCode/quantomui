/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { InventoryItemHelperUnitModel, ItemHelperTabs } from "../Inventory_ItemsView";
import { useSelector } from "react-redux";
import { form_state_selector, get_helperData_by_key, set_form_state } from "../../../../../../redux/store";
import { SetupFormBulkResponseModel } from "../../../unit/model/SetupFormBulkResponse";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps";
import { Quantom_LOV } from "../../../../../../quantom_comps/Quantom_Lov";
import { ListCompButton } from "../../../../../account/report/Ledger/view/LedgerView";
import { QUANTOM_Table } from "../../../../../account/config/mainAccount/view/MainAccountView";

export const InventoryItemHelperUnitForReport=(props?:ItemHelperTabs)=>{
  
  const [selectedUnit,setSelectedUnit]=React.useState<CommonCodeName>();
  const [selectedReport,setSelectedReport]=React.useState<CommonCodeName>();
  const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
  const state= useSelector((state?:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""));
  const reportData= state?.reportUnits?.map((item,index)=>{
     let obj:InventoryItemHelperUnitModel={
      UnitName: item?.Unit?.Name,
      ReportName:item?.ReportName
     }
     return obj ;
  })??[]

  

  const fillReportsMethod=():Promise<CommonCodeName[]>=>{
       let reportNames:string[]=['STOCK_REPORT'];
       let reports=
       reportNames.map((item,index)=>{
         let obj:CommonCodeName={
          Code:item,
          Name:item
         }
         return obj ;
       })
       return Promise.resolve(reports)
  }

  const getSetupUnits=async():Promise<CommonCodeName[]>=>{
    let data=  setupFormData?.find(x=>x.Type?.toLocaleLowerCase()==='unit'?.toLocaleLowerCase())?.Data?.map((item,index)=>{
        let obj:CommonCodeName={
          Code:item?.Code,
          Name:item?.Name
        }
        return obj;
     });
     return  Promise.resolve(data??[]);
  }
  const [refreshUnits,setRefreshUnits]=React.useState(0);
  React.useEffect(()=>{
    setRefreshUnits(refreshUnits+1)
  },[setupFormData])
  

  return(
    <GroupContainer height='300px' Label='Unit For Report' >
         <Quantom_Grid container spacing={.5}>
              <Quantom_Grid item size={{xs:4}}>
                  <Quantom_LOV label='Reports' FillDtaMethod={fillReportsMethod} selected={selectedReport} onChange={(e)=>{setSelectedReport(e)}}/>
              </Quantom_Grid>
              <Quantom_Grid item size={{xs:4}}>
                  <Quantom_LOV label='Unit' FillDtaMethod={getSetupUnits} selected={selectedUnit} onChange={(e)=>setSelectedUnit(e)}/>
              </Quantom_Grid>
              <Quantom_Grid  size={{xs:1}}>
                  <ListCompButton Label='Add' iconName='AddBoxTwoTone' marginTop='4px' onClick={()=>{
                    if(!selectedReport?.Name){
                        props?.baseProps?.errorToast?.('Select Report First');
                        return;
                    }
                    if(!selectedUnit?.Code || !selectedUnit.Name){
                      props?.baseProps?.errorToast?.('Select Unit First');
                      return;
                    }
                    let reportUnits=[...state?.reportUnits??[]];
                    if(state?.reportUnits && state?.reportUnits?.length>0){
                      
                      let index= reportUnits?.findIndex?.(x=>x?.ReportName===selectedReport?.Name);
                      if(index!==-1){
                        reportUnits.splice(index,1);
                      }
                    }
                    reportUnits.push({
                      Unit:{...selectedUnit},
                      UnitCode:selectedUnit?.Code,
                      ReportName:selectedReport?.Name
                    })
                    
                   set_form_state(props?.baseProps?.UniqueId??"",{...state,ReportUnits:reportUnits})
                  
                  }}/>
              </Quantom_Grid>
         </Quantom_Grid>
         <Quantom_Grid container>
          <Quantom_Grid item size={{xs:9}}>
              <QUANTOM_Table  viewButtonStatus='HIDE' viewButtonOverrideIcon='DeleteTwoTone' data={reportData} headerHeight={20} height='250px'  hideFloatingFilter 
               columns={[
                {field:"ReportName",caption:'ReportName',width:120,},  
                {field:"UnitName",caption:'UnitName',width:160},
             ]}/>
          </Quantom_Grid>
         </Quantom_Grid>
         
    </GroupContainer>
  )
}