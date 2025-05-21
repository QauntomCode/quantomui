/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { getSetupDataWithSetupType, ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_helperData_by_key, set_form_state } from "../../../../../../redux/store";
import React from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { getAttributevalueByAttributeCode } from "../../impl/InventoryitemsImpl";
import { InventoryItemAtributeValuesModel } from "../../model/AssocicateModels/InventoryItemAtributeValuesModel";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps";
import { Quantom_LOV } from "../../../../../../quantom_comps/Quantom_Lov";
import { ListCompButton } from "../../../../../account/report/Ledger/view/LedgerView";
import { QUANTOM_Table } from "../../../../../account/config/mainAccount/view/MainAccountView";

export const InventoryItemHelperItemAttributes=(props?:ItemHelperTabs)=>{
  const setupData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"","setup_data"));
  const [refreshValue,setRefreshValue]=React.useState(0);
  const [attribute,setAttribute]=React.useState<CommonCodeName>();
  const[attributeValue,setAttributeValue]=React.useState<CommonCodeName>();

  const state=useSelector((state?:any)=>(form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??"")))
  // const attributes = state?.InventoryItemAttributes;
  
   React.useEffect(()=>{
    setRefreshValue(refreshValue+1)
    setAttributeValue({});
   },[attribute])

   const handleAttributeValues=async(attrCode?:string)=>{
      if(attribute?.Code)
      {
        let res= await getAttributevalueByAttributeCode(attribute?.Code)
        let data=
        res?.map((item,index)=>{
         let obj:CommonCodeName={
            Code:item?.AttrValueCode,
            Name:item?.AttrValueName
         };
         return obj;
        })??[]

        return Promise.resolve(data);
      }
      else{
        return Promise.resolve([])
      }
   }

  
  const handleChangeInAttributes=async(obj?:InventoryItemAtributeValuesModel,type?:'DELETE'|'ADD'): Promise<boolean> =>{
   
    const allAttributes=[...state?.InventoryItemAttributes??[]]
    console.warn("all attributes are",allAttributes);
    console.warn('new attribute is ',obj)
    var oldObj= allAttributes.find(x=>x.AttrCode===obj?.AttrCode);
    if(oldObj){
        let index= allAttributes.findIndex(x=>x.AttrCode===obj?.AttrCode)
        allAttributes?.splice(index,1);
    }
    //let oldObj= await  AsyncFindObject(allAttributes,(t=>(t?.AttrCode===obj?.AttrCode )));
    
    // if(oldObj){
    //   alert('found old object')
    //      let index= await AsyncFindByIndex(allAttributes,(t=>t?.AttrCode===obj?.AttrCode));
    //      allAttributes.splice(index,1)
      
    // }
    if(type==='ADD' && obj){
    
      allAttributes.push(obj);
      console.warn("new state is",allAttributes)
    }
    const nState={...state,InventoryItemAttributes:[...allAttributes??[]]}
    set_form_state(props?.baseProps?.UniqueId??"",nState);

    return Promise.resolve(true);
    //throw new Error('Function not implemented.')
  }

  const getNewObject=():Promise<InventoryItemAtributeValuesModel>=>{
    let newObj:InventoryItemAtributeValuesModel={
      AttrCode:attribute?.Code,
      Attributes:{
        AttrCode:attribute?.Code,
        AttrName:attribute?.Name,
      },
      ValueCode:attributeValue?.Code,
      AttributeValues:{
        AttrValueCode:attributeValue?.Code,
        AttrValueName:attributeValue?.Name
      }
    }

    return Promise.resolve(newObj);
  }

  return(
    <GroupContainer height='300px' Label='Item Attributes' >
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid item size={{xs:4}}>
               <Quantom_LOV label='Attribute'  FillDtaMethod={()=>getSetupDataWithSetupType(setupData,'attributes')} 
                  selected={attribute} onChange={(att)=>{setAttribute(att)}}/>
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:4}}>
               <Quantom_LOV label='Attribute Value' RefreshFillDtaMethod={refreshValue}  FillDtaMethod={()=>handleAttributeValues(attribute?.Code)} 
                  selected={attributeValue} onChange={(att)=>{setAttributeValue(att)}}/>
            </Quantom_Grid>
            <Quantom_Grid  size={{xs:1}}>
                  <ListCompButton onClick={async()=>{
                    let object= await getNewObject()
                    handleChangeInAttributes(object,'ADD')
                  }} Label='Add' iconName='AddBoxTwoTone' marginTop='4px' />
              </Quantom_Grid>
         </Quantom_Grid>

       {/* <Quantom_Grid container size={{xs:12,ms:12,md:12,lg:9,xl:9}} sx={{marginTop:'8px'}} > */}
       <div style={{marginTop:'8px'}}>
         <QUANTOM_Table onViewButtonClick={(data)=>handleChangeInAttributes(data,'DELETE')} viewButtonOverrideIcon='DeleteTwoTone' height='200px' hideFloatingFilter headerHeight={30} 
         data={[...state?.InventoryItemAttributes??[]]}
         columns={
          [
            {field:'Attributes.AttrName',caption:'Attribute',width:200},
            {field:'AttributeValues.AttrValueName',caption:'AttributeValue',width:200},

          ]
         }  ></QUANTOM_Table>
         </div>
       {/* </Quantom_Grid> */}
        
    </GroupContainer>
  )
}
