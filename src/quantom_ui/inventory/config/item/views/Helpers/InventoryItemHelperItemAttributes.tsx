/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { getSetupDataWithSetupType, ItemHelperTabs } from "../Inventory_ItemsView";
import { form_state_selector, get_helperData_by_key, set_form_state, useQuantomFonts } from "../../../../../../redux/store";
import React, { useEffect, useState } from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import { getAttributevalueByAttributeCode } from "../../impl/InventoryitemsImpl";
import { InventoryItemAtributeValuesModel } from "../../model/AssocicateModels/InventoryItemAtributeValuesModel";
import { Quantom_Grid } from "../../../../../../quantom_comps/base_comps";
import {  Quantom_LOV1 } from "../../../../../../quantom_comps/Quantom_Lov";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { generateGUID, IconByName } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { FocusOnControlByControlId } from "../../../../../../CommonMethods";
import { Paper, useTheme } from "@mui/material";
import { InventoryCompItemMenus } from "../../../../../Purchase/Processing/Purchase/view/POSPurchaseView";


export const InventoryItemHelperItemAttributes=(props?:ItemHelperTabs)=>{
  const setupData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"","setup_data"));
  const state=useSelector((state?:any)=>(form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??"")))
  const [refreshAttributes,setRefreshAttributes]= useState('')
  const [refreshValue,setRefreshValue]=React.useState(0);
  const [attribute,setAttribute]=React.useState<CommonCodeName>();
  const[attributeValue,setAttributeValue]=React.useState<CommonCodeName>();
  const fonts= useQuantomFonts();
  const theme= useTheme();
  
  useEffect(()=>{
    if(setupData){
       generateGUID()?.then((val)=>{
        setRefreshAttributes(val)
       })
    }
  },[setupData])

  // const attributes = state?.InventoryItemAttributes;
  
   React.useEffect(()=>{
    setRefreshValue(refreshValue+1)
    // setAttributeValue({});
   },[attribute])

   const handleAttributeValues=async():Promise<CommonCodeName[]>=>{
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
    <>
    <Quantom_Grid container>
         <Quantom_Grid pb={.5} borderBottom={`3px solid ${theme?.palette?.text?.disabled}`} mt={1} container spacing={.5} size={{xs:12,sm:12,md:12,lg:8}}>
            <Quantom_Grid  size={{xs:12,sm:12,md:5,lg:5.5}}>
              
               <Quantom_LOV1 
                            refreshMethod={refreshAttributes} 
                            key="INVENTORY_ITEM_ATTRIBUTES" 
                            keyNo="INVENTORY_ITEM_ATTRIBUTES" 
                            label="Attribute" 
                            FillDtaMethod={() => getSetupDataWithSetupType(setupData, 'attributes')}
                            selected={attribute} 
                            onChange={(att) => { setAttribute(att); } } 
                            uniqueKeyNo={props?.baseProps?.UniqueId??""}/>    
               {/* <Quantom_LOV label='Attribute'  FillDtaMethod={()=>getSetupDataWithSetupType(setupData,'attributes')} 
                  selected={attribute} onChange={(att)=>{setAttribute(att)}}/> */}
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:12,sm:12,md:5,lg:5.5}}>
               {/* <Quantom_LOV label='Attribute Value' RefreshFillDtaMethod={refreshValue}  FillDtaMethod={()=>handleAttributeValues(attribute?.Code)} 
                  selected={attributeValue} onChange={(att)=>{setAttributeValue(att)}}/> */}
                  <Quantom_LOV1 
                            refreshMethod={refreshValue?.toString()} 
                            key={"INVENTORY_ITEM_ATTRIBUTES_VALUES"} 
                            keyNo="INVENTORY_ITEM_ATTRIBUTES_VALUES" 
                            label="Attribute Value" 
                            FillDtaMethod={() => handleAttributeValues()}
                            selected={attributeValue} 
                            onChange={setAttributeValue} 
                            uniqueKeyNo={props?.baseProps?.UniqueId??""}/>    
            </Quantom_Grid>
            <Quantom_Grid  size={{xs:12,sm:12,md:2,lg:1}}>
                  <POSActionButton1 width="100%" onClick={async()=>{
                    let object= await getNewObject()
                    handleChangeInAttributes(object,'ADD')
                    FocusOnControlByControlId('INVENTORY_ITEM_ATTRIBUTES')
                  }}  iconName='AddBoxTwoTone'  />
              </Quantom_Grid>
         </Quantom_Grid>


         <Quantom_Grid container size={{xs:12,md:12,lg:8}}>
           {
            state?.InventoryItemAttributes?.map((item,index)=>{
              function setAnchorEl(currentTarget: EventTarget & HTMLDivElement) {
                throw new Error("Function not implemented.");
              }

                return(
                  <Quantom_Grid mt={1} p={1} container component={Paper} sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H4FontSize}} size={{xs:12}}>
                      <Quantom_Grid container size={{xs:12}}>
                          <Quantom_Grid display='flex' alignItems='center' size={{xs:2}}>
                            <IconByName iconName="Tag" color={theme?.palette?.text?.disabled} fontSize="16px"/>
                              {item?.AttrCode}
                          </Quantom_Grid>
                          <Quantom_Grid display='flex' alignItems='center' size={{xs:4}}>
                            <IconByName iconName="DnsOutlined" color={theme?.palette?.text?.disabled} fontSize="16px"/>
                              {item?.Attributes?.AttrName}
                          </Quantom_Grid>


                          <Quantom_Grid display='flex' alignItems='center' size={{xs:2}}>
                            <IconByName iconName="Tag" color={theme?.palette?.text?.disabled} fontSize="16px"/>
                              {item?.ValueCode}
                          </Quantom_Grid>
                          <Quantom_Grid display='flex' alignItems='center' size={{xs:3}}>
                            <IconByName iconName="DnsOutlined" color={theme?.palette?.text?.disabled} fontSize="16px"/>
                              {item?.AttributeValues?.AttrValueName}
                          </Quantom_Grid>
                          <Quantom_Grid size={{xs:1}} display='flex' justifyContent='flex_end' alignItems='end'>
                              <RenderQuantomMenus index={index} onDeleteClick={(ind)=>{
                                 let obj= state?.InventoryItemAttributes?.[ind??-1];
                                 let vale= state?.InventoryItemAttributes?.filter(x=>x.AttrCode!==obj?.AttrCode);
                                 set_form_state<VMInventoryItemsModel>(props?.baseProps?.UniqueId,{...state,InventoryItemAttributes:[...vale??[]]})}}/>
                          </Quantom_Grid>
                      </Quantom_Grid>


                          
                      
                  </Quantom_Grid>
                )
            })
           }
         </Quantom_Grid>

       {/* <Quantom_Grid container size={{xs:12,ms:12,md:12,lg:9,xl:9}} sx={{marginTop:'8px'}} > */}
       {/* <div style={{marginTop:'8px'}}>
         <QUANTOM_Table onViewButtonClick={(data)=>handleChangeInAttributes(data,'DELETE')} viewButtonOverrideIcon='DeleteTwoTone' height='200px' hideFloatingFilter headerHeight={30} 
         data={[...state?.InventoryItemAttributes??[]]}
         columns={
          [
            {field:'Attributes.AttrName',caption:'Attribute',width:200},
            {field:'AttributeValues.AttrValueName',caption:'AttributeValue',width:200},

          ]
         }  ></QUANTOM_Table>
         </div> */}
</Quantom_Grid>
         </>
  )
}



interface  RenderQuantomMenusProps{
  onDeleteClick?:(index?:number)=>void;
  OnEditClick?:(index?:number)=>void;
  index?:number;
}


export const RenderQuantomMenus=(props?:RenderQuantomMenusProps)=>{

  const theme= useTheme();
  const fonts= useQuantomFonts();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return(
    <>
    <div onClick={(e)=>{setAnchorEl(e?.currentTarget)}}>

    <IconByName color={theme?.palette?.text?.primary} iconName='MoreVertOutlined' fontSize='20px' />
  </div>
  <InventoryCompItemMenus  anchorEl={anchorEl} onclose={()=>{setAnchorEl(null)}} 
      onDeleteClick={()=>{
        props?.onDeleteClick?.(props?.index)
        setAnchorEl(null);
        // alert('slected Index'+selectedIndex)
      }}
      onEditClick={()=>{
        props?.OnEditClick?.(props?.index)
        setAnchorEl(null);
        // alert('slected Index'+selectedIndex)
    }}
    />

</>
  )
}