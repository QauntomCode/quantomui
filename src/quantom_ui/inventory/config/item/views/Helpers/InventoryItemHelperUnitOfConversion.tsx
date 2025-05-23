/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { form_state_selector, get_form_state_without_selector, get_helperData_by_key, set_form_state, useQuantomFonts } from "../../../../../../redux/store";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import React, { useEffect, useState } from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { InventoryItemUnitsModel, UNIT_CALULATION_TYPE } from "../../model/AssocicateModels/Inventory_ItemUnitsModel";
import { SetupFormBulkResponseModel } from "../../../unit/model/SetupFormBulkResponse";
import { generateGUID, IconByName } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { AsyncFindByIndex, FocusOnControlByControlId, safeParseToNumber } from "../../../../../../CommonMethods";
import { Paper, useTheme } from "@mui/material";
import { GroupContainer } from "../../../../../account/processing/voucher/view/VoucherView";
import { Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { Quantom_LOV1 } from "../../../../../../quantom_comps/Quantom_Lov";
import { ListCompButton } from "../../../../../account/report/Ledger/view/LedgerView";
import { InventoryCompItemMenus } from "../../../../../Purchase/Processing/Purchase/view/POSPurchaseView";
import { ItemHelperTabs } from "../Inventory_ItemsView";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

export const InventoryItemHelperUnitOfConversion=(props?:ItemHelperTabs)=>{
  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""))
  const [calcType,setCalcType]=React.useState<CommonCodeName>({Code:'Multiply_By',Name:"Multiply_By"});
  const [refreshUnits,setRefreshUnits]=React.useState(0);
  const [itemUnit,setItemUnit]=React.useState<InventoryItemUnitsModel>({})
  const [refreshGuid,setRefreshGuid]= useState('')
  const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
  
  useEffect(()=>{
    const method= async()=> {let guid= await generateGUID();setRefreshGuid(guid)}
      if(setupFormData && setupFormData?.length>0){
        method();
      }
  },[setupFormData])
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
  
  React.useEffect(()=>{
    setRefreshUnits(refreshUnits+1)
  },[setupFormData])

  

React.useEffect(()=>{
 
  if(calcType.Code?.toUpperCase()==='Multiply_By'.toUpperCase() || !calcType?.Code){
     setItemUnit({...itemUnit,CalculationType:UNIT_CALULATION_TYPE.MULTIPLY_BY,CalculationTypeDesc:'MULTIPLY_BY'})
  }
  else{
    setItemUnit({...itemUnit,CalculationType:UNIT_CALULATION_TYPE.DIVIED_BY,CalculationTypeDesc:'DIVIDED_BY'})
  }

},[calcType])



  const calculationType=():Promise<CommonCodeName[]>=>{
    let obj:CommonCodeName[]=[
      {
        Code:"Multiply_By",
        Name:"Multiply_By"
      },
      {
        Code:"Divided_By",
        Name:'Divided_By'
      }
    ] 
    return Promise.resolve(obj);
  }

  const onDeleteViewClick=async(lineData?: any)=> {
     
    let internalState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.baseProps?.UniqueId)
      

      let  obj= lineData as InventoryItemUnitsModel;
      // alert(obj?.UnitCode);
      // alert(obj?.PrimaryUnits);
           
     console.warn('units are',internalState);
     let units=[...internalState?.itemUnits??[]]
     console.warn('units before',units)
     let selectedIndex= await AsyncFindByIndex(internalState?.itemUnits,(x)=>x?.UnitCode===obj?.UnitCode && x?.PrimaryUnits===obj?.PrimaryUnits)
      
      if(units){

           units.splice(selectedIndex??0,1)
           set_form_state(props?.baseProps?.UniqueId,{...internalState,ItemUnits:units})
           console.warn('unit after',units)
         //  set_form_state(props?.baseProps?.UniqueId,{...state,ItemUnits:[...units]})
      }

     //  alert('index is'+selectedIndex)
  }
  
  const theme= useTheme();
  const fonts= useQuantomFonts();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex,setSelectedIndex]=useState<number>()

  return(
    <GroupContainer Label='Unit Of Conversion' >
       <Quantom_Grid container   mt={2}  spacing={.5} >
        <Quantom_Grid container pb={.5} sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}} size={{xs:12,sm:12,md:12,lg:8,xl:8}}>


        <Quantom_Grid  size={{xs:12,sm:12,md:2.5}}>
              <Quantom_Input disabled label='From Unit' value={state?.item?.UnitName}/>
          </Quantom_Grid>
          <Quantom_Grid  size={{xs:12,sm:12,md:3,}}>
              {/* <Quantom_LOV1 label='Calc_Type' FillDtaMethod={calculationType} selected={calcType} onChange={(e) => { setCalcType({ ...e }) } } uniqueKeyNo={''}/> */}
              <Quantom_LOV1
                        id="CALCULATION_COMBO_BOX_ID"
                        keyNo='INVENTORY_ITEM_CALCULATION_COMBOBOX'
                        mobileSelectionButtonIcon='BrandingWatermarkOutlined'
                        uniqueKeyNo={props?.baseProps?.UniqueId??""}
                        label='Calc_Type' 
                        FillDtaMethod={calculationType}
                        selected={calcType}         
                        onChange={(e) => { setCalcType({ ...e }) } } />
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:12,sm:12,md:1.5}}>
              <Quantom_Input label='Qty' value={itemUnit?.CalucltionNumber??0} onChange={(e)=>{
                  setItemUnit({...itemUnit,CalucltionNumber:safeParseToNumber(e.target.value)})
              }}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:12,sm:12,md:3.5}}>
                      <Quantom_LOV1
                        keyNo='INVENTORY_ITEM_UNIT_CONVERSION_UNIT_CONVERSION'
                        mobileSelectionButtonIcon='BrandingWatermarkOutlined'
                        refreshMethod={refreshGuid}
                        uniqueKeyNo={props?.baseProps?.UniqueId??""}
                        label='To Unit' 
                        FillDtaMethod={getSetupUnits}
                        selected={itemUnit?.unit}        
                        onChange={(e)=>{setItemUnit({...itemUnit,UnitCode:e?.Code,unit:{Code:e?.Code,Name:e?.Name}})}} />
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:12,sm:12,md:1.5}}>
              <POSActionButton1   width="100%" iconName='AddBoxTwoTone'  onClick={()=>{
                  if(!itemUnit || !itemUnit?.unit ||  !itemUnit?.UnitCode){
                    props?.baseProps?.errorToast?.('Select To Unit')
                    return;
                  }
                  if(itemUnit?.UnitCode===state?.item?.UnitCode){
                    props?.baseProps?.errorToast?.(`From Unit And To Unit Can't Be Same`)
                    return;
                  }
                  if(!itemUnit?.CalucltionNumber || safeParseToNumber(itemUnit?.CalucltionNumber)===0){
                    props?.baseProps?.errorToast?.(`Qty Must Be Greater Than Zero`)
                    return;
                  }
              
                  set_form_state<VMInventoryItemsModel>(props?.baseProps?.UniqueId,{...state,itemUnits:[...state?.itemUnits??[],
                    {...itemUnit,PUnitName:state?.item?.UnitName}]});
                  
                  setItemUnit({...itemUnit,UnitCode:'',UnitName:'',unit:{},PrimaryUnits:0,})

                  FocusOnControlByControlId('CALCULATION_COMBO_BOX_ID')
              }}/>
          </Quantom_Grid>



          
        </Quantom_Grid>
         


        

       


       </Quantom_Grid>
       

       <Quantom_Grid container mt={1} size={{xs:12}}>
          <Quantom_Grid container spacing={.5} size={{xs:12,sm:12,md:12,lg:8,xl:8}}>
             {
                state?.itemUnits?.map((item,index)=>{

                  return(
                    <Quantom_Grid pl={1} pr={1} pt={.3} pb={.3} borderBottom={`2px solid ${theme?.palette?.primary?.main}`}  
                            container size={{xs:12,sm:12,md:12,lg:12,xl:12}} component={Paper}>
                        <Quantom_Grid  size={{xs:12}} display='flex' sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H4FontSize}}>
                              <Quantom_Grid display='flex' alignItems='center' size={{xs:4}}>
                                 <div style={{paddingRight:'5px'}}> {state?.item?.UnitName}</div>
                                 <IconByName iconName='ArrowRightAltOutlined' fontSize='16px' />
                             </Quantom_Grid>
                             <Quantom_Grid display='flex' alignItems='center' size={{xs:4}}>
                                {/* <IconByName iconName='CalculateOutlined' fontSize='16px' /> */}
                                 <div  style={{paddingLeft:'5px',fontSize:fonts.H4FontSize,fontWeight:700}}> 1 {(item?.CalculationType===UNIT_CALULATION_TYPE.DIVIED_BY)?'/':'X'} {item?.CalucltionNumber}</div>
                             </Quantom_Grid>

                             <Quantom_Grid display='flex' alignItems='center' size={{xs:3}} >
                                <IconByName iconName='ArrowRightAltOutlined' fontSize='16px' />
                                <div style={{paddingLeft:'5px'}}> {item?.unit?.Name}</div>
                             </Quantom_Grid>

                             <Quantom_Grid display='flex' justifyContent='right' alignItems='center' size={{xs:1}} >
                                <div onClick={(e)=>{setAnchorEl(e?.currentTarget);setSelectedIndex(index)}}>

                                  <IconByName color={theme?.palette?.text?.primary} iconName='MoreVertOutlined' fontSize='20px' />
                                </div>

                                <InventoryCompItemMenus  anchorEl={anchorEl} onclose={()=>{setAnchorEl(null)}} 
                                  onDeleteClick={()=>{
                                         const selUnit=state?.itemUnits?.[selectedIndex??-1];
                                         let units= state?.itemUnits?.filter(x=>x.unit?.Name!==selUnit?.UnitCode && x.CalucltionNumber!==selUnit?.CalucltionNumber)??[];
                                         console.log('new units are',units)
                                         props?.baseProps?.setState?.({...state,itemUnits:[...units]})
                                    setAnchorEl(null);
                                    // alert('slected Index'+selectedIndex)
                                  }}
                                  onEditClick={()=>{
                                    setAnchorEl(null);
                                    // alert('slected Index'+selectedIndex)
                                }}
                                />
                             </Quantom_Grid>

                        </Quantom_Grid>
{/* 
                        <Quantom_Grid  size={{xs:12}} display='flex' sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H4FontSize}}>
                             <Quantom_Grid display='flex' alignItems='center' flex={1}>
                                <IconByName iconName='ArrowRightAltOutlined' fontSize='16px' />
                                 <div style={{paddingLeft:'5px'}}> {props?.baseProps?.state?.item?.UnitName}</div>
                             </Quantom_Grid>

                             <Quantom_Grid display='flex' alignItems='center' >
                                <IconByName iconName='ArrowRightAltOutlined' fontSize='16px' />
                                <div style={{paddingLeft:'5px'}}> {item?.unit?.Name}</div>
                             </Quantom_Grid>
                        </Quantom_Grid> */}
                    </Quantom_Grid>
                  )
                })
             }
           </Quantom_Grid>
        </Quantom_Grid>

       {/* <QUANTOM_Table onViewButtonClick={onDeleteViewClick} viewButtonOverrideIcon='DeleteTwoTone' hideFloatingFilter headerHeight={20} data={state?.itemUnits??[]} columns={[
          {field:"PUnitName",caption:'From Unit',width:120,},  
          {field:"CalculationTypeDesc",caption:'Calc_Type',width:160},
          {field:"CalucltionNumber",caption:'Qty',width:120},
          {field:"unit.Name",caption:'To Unit',width:120},

       ]} height='250px'/> */}

       {/* </QUANTOM_Table> */}
    </GroupContainer>
  )
}
