/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { ComponentTabProps, generateGUID, MenuComponentProps, setFormBasicKeys, UserGetSelectedLocation } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV, Quantom_LOV1 } from '../../../../../quantom_comps/Quantom_Lov'
import { Quantom_Container, Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'

import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { getAttributevalueByAttributeCode, InventoryItemsDelete, InventoryItemsGetAll, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'
import { SetupFormGetAllBulk } from '../../unit/impl/setupFormImp'
import { SetupFormBulkResponseModel } from '../../unit/model/SetupFormBulkResponse'
import { CommonCodeName } from '../../../../../database/db'
import {  AsyncFindByIndex, safeParseToNumber } from '../../../../../CommonMethods'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { ListCompButton } from '../../../../account/report/Ledger/view/LedgerView'
import { useSelector } from 'react-redux'
import store, { form_state_selector, get_current_user_locations, get_form_state_without_selector, get_helperData_by_key, set_form_state } from '../../../../../redux/store'
import { add_helper_data } from '../../../../../redux/reduxSlice'
import { InventoryItemUnitsModel, UNIT_CALULATION_TYPE } from '../model/AssocicateModels/Inventory_ItemUnitsModel'
import { InventoryItemUnitsPriorityModel } from '../model/AssocicateModels/Inventory_ItemUnitsPriorityModel'
import { HTTP_RESPONSE_TYPE } from '../../../../../HTTP/QuantomHttpMethods'
import { InventoryItemStockReplenishmentModel } from '../model/AssocicateModels/InventoryItemStockReplenishmentModel'
import { InventoryItemAtributeValuesModel } from '../model/AssocicateModels/InventoryItemAtributeValuesModel'
import { InventoryItemLocationsModel } from '../model/AssocicateModels/InventoryItemLocationsModel'
import { Paper, useTheme } from '@mui/material'
import { QuantomBasiSelect } from '../../../../Purchase/Processing/Purchase/view/POSPurchaseView'
import { AddHPD, useGetHelperData } from '../../../../sale/reports/Appointments/CustomerAppointmentReports'
import { AccountSettings, useGetSetting } from '../../../../Settings/Settings/SettingMethods'


export const InventoryItemsView = (props?:MenuComponentProps<VMInventoryItemsModel>) => {
   const[searchedItem,setSearchedItems]=React.useState<CommonCodeName[]>([]);
   const [searchText,setSearchText]=React.useState('');
   const[refreshSetupMethod,setRefreshSetupMethod]=React.useState(0);
   const [refreshGuid,setRefreshGuid]=useState('')
   const[defaultItemType,setdefaultItemType]=useState<CommonCodeName>()
   const setupFormData= useGetHelperData<SetupFormBulkResponseModel[]>(props,'setup_data');// useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
   
   const eachUnitCode=useGetSetting(AccountSettings.DEFAULT_EACH_UNIT)?.DefaultValue;

   console.log('each unit code from setting is',eachUnitCode)


   let defEachUnit= setupFormData?.find(x=>x.Type?.toLocaleLowerCase()==="unit")?.Data?.find(x=>x.Code===eachUnitCode);

   console.log('default unit is',defEachUnit)

   useEffect(()=>{
       if(setupFormData){
        const method=async()=>{
          let gid= await generateGUID();
          setRefreshGuid(gid)
        }
        method();
       }
   },[setupFormData])
   
  //const defaultItemType= setupFormData?.find(x=>x?.Type?.toUpperCase()==="ItemType".toUpperCase())?.Data?.find(x=>x?.Name?.toUpperCase()==="STOCK_ITEM");

    useEffect(()=>{
      if(!props?.state?.item?.ItemType){
        const defItemType= setupFormData?.find(x=>x?.Type?.toUpperCase()==="ItemType".toUpperCase())?.Data?.find(x=>x?.Name?.toUpperCase()==="STOCK_ITEM");
        setdefaultItemType(defItemType)
        if(props?.state?.item?.ItemType!==safeParseToNumber(defaultItemType?.Code)){
          ///alert('default item type is'+defaultItemType)
          props?.setState?.({...props?.state,item:{...props?.state?.item,ItemType:safeParseToNumber(defaultItemType?.Code),InventoryItemType:{Name:defaultItemType?.Name}}})
        }
      }
<<<<<<< HEAD
     },[props?.state])
=======

      if(!props?.state?.item?.UnitCode  && defEachUnit?.Code){
        props?.setState?.({...props?.state,item:{...props?.state?.item,UnitCode:defEachUnit?.Code,UnitName:defEachUnit?.Name}})
      }
     },[props?.state?.item])
>>>>>>> d8cd6ea2c88e75b1ea70e399c75d79dbe2fb786b



    React.useEffect(()=>{
      setFormBasicKeys<VMInventoryItemsModel>({
         SaveMethod:(payload)=>InventoryItemsInsert(payload),
         DeleteMethod:(payload)=>InventoryItemsDelete(payload),
         GetOneMethod:(payload)=>InventoryItemsGetOne(payload),
         SetBasicKeys:()=>({keyNoPropName:"Item.ItemCode",keyDatePropsName:""}),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{},
         settings:{firstControlId:"inventory_items_item_name"},
         AfterResetMethod:async(loc)=>{
          setAllLcoations();
         },
        //  InitOnLocationChange:(loc)=>{ alert('chanegd')}
        
        
      })
    },[props])


    React.useEffect(()=>{
      if(props?.fullState?.IsFirstUseEffectCall){
        // alert('this is first call')
        setAllLcoations();
      }
    },[props?.fullState?.IsFirstUseEffectCall])

    const setAllLcoations=async()=>{
      // const state= await get_form_state_without_selector<VMInventoryItemsModel>(props?.UniqueId);
      const locs= store.getState().formsState.UserLocations?.map((x,index)=>{
       let loc:InventoryItemLocationsModel={
         LocCode:x.LocId,
       }
       return loc;
      });
     set_form_state<VMInventoryItemsModel>(props?.UniqueId,{ItemLocation:[...locs??[]]})
    }

  

    React.useEffect(()=>{
         handleGetSetupItems();
         handleGetSearchItems();
    },[])

    
    React.useEffect(()=>{
      
      if(props?.UniqueId){
        props?.AddComponentTabs?.(GetItemHelperTabs({baseProps:props,refreshMethod:refreshSetupMethod}))
      }
       
    },[props?.UniqueId])


    const setItem=(item?:InventoryItemsModel)=>{
        props?.setState?.({...props?.state,item:{...props?.state?.item,...item}})
    }
    
    const handleGetSetupItems=async()=>{
       let res= await SetupFormGetAllBulk(['Unit','Category','Company','PriceGroup','ItemType','attributes']);

       AddHPD(props,'setup_data',res)
      //  store.dispatch(add_helper_data({UniqueId:props?.UniqueId,data:[{
      //     keyNo:'setup_data',
      //     Data:res
      //  }]}));
       
       setTimeout(() => {
          setRefreshSetupMethod((refreshSetupMethod??0)+1)
       }, 100);
    }

    const handleGetSearchItems=async()=>{
       let items= await InventoryItemsGetAll(searchText);
       setSearchedItems(items)
    }

    const getSetupDataWithSetupType=async(type?:string):Promise<CommonCodeName[]>=>{

      console.log('all setup data is',setupFormData)
      let data=  setupFormData?.find(x=>x.Type?.toLocaleLowerCase()===type?.toLocaleLowerCase())?.Data?.map((item,index)=>{
          let obj:CommonCodeName={
            Code:item?.Code,
            Name:item?.Name
          }
          return obj;
       });

       console.warn('item type data is',data);
       return  Promise.resolve(data??[]);
    }

  return (
    <>
    

      <Quantom_Grid size={{xs:12}} container spacing={.5}>
        
        <Quantom_Grid p={2} container size={{xs:12}} spacing={2}>
          <Quantom_Grid  spacing={1}   size={{xs:12,sm:12,md:6,lg:4,xl:4}}>
             <Quantom_Grid spacing={.5} container={{xs:12}}>
                <Quantom_Grid item size={{xs:6,sm:6,md:4}}>
                  <Quantom_Input disabled label='Item Code' value={props?.state?.item?.ItemCode} />
                </Quantom_Grid>
                <Quantom_Grid item size={{xs:12,sm:6,md:8}}>
                    <Quantom_Input id='inventory_items_item_name' label='Item Name' value={props?.state?.item?.ItemName} 
                        onChange={(e)=>{setItem({...props?.state?.item,ItemName:e?.target?.value})}}/>
                </Quantom_Grid>
             </Quantom_Grid>

            
             <Quantom_Grid mt={1} item size={{xs:12,md:12,lg:12}}>
                <Quantom_Input label='Product' value={props?.state?.item?.ProductName} 
                    onChange={(e)=>{setItem({...props?.state?.item,ProductName:e?.target?.value})}}/>
                </Quantom_Grid>
                <Quantom_Grid mt={1} item size={{xs:12,md:12,lg:12}}>
                    <Quantom_Input label='Urdu Name' value={props?.state?.item?.UrduName} 
                        onChange={(e)=>{setItem({...props?.state?.item,UrduName:e?.target?.value})}}/>
                </Quantom_Grid>
                <Quantom_Grid mt={1} item size={{xs:12,md:12,lg:12}}>
                  <Quantom_Input label='Search Key' value={props?.state?.item?.SearchKey} 
                    onChange={(e)=>{setItem({...props?.state?.item,SearchKey:e?.target?.value})}}/>
                </Quantom_Grid>
          </Quantom_Grid>

          <Quantom_Grid  size={{xs:12,sm:12,md:6,lg:4,xl:4}}>
              
              <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
                {/* <QuantomBasiSelect list={itemTypes}  label='ItemType' 
                  editValue={props?.state?.item?.ItemType?.toString()}           
                                  onChange={(obj)=>{setItem({ItemType:safeParseToNumber(obj?.Code),InventoryItemType:{Name:obj?.Name}})}}/> */}
                                  
                {/* <Quantom_LOV FillDtaMethod={()=>getSetupDataWithSetupType('ItemType')} 
                                  label='Item Type' 
                                  RefreshFillDtaMethod={refreshSetupMethod}
                                  selected={{Code:props?.state?.item?.ItemType?.toString(),Name:props?.state?.item?.InventoryItemType?.Name}}           
                                  onChange={(obj)=>{setItem({ItemType:safeParseToNumber(obj?.Code),InventoryItemType:{Name:obj?.Name}})}}
                      />  */}
                <Quantom_LOV1
                  keyNo='INVENTORY_ITEM_ITEM_TYPE'
                  uniqueKeyNo={props?.UniqueId??""}
                  refreshMethod={refreshGuid}
                  mobileSelectionButtonIcon='KitchenOutlined'
                  label='Item Type' 
                  FillDtaMethod={()=>getSetupDataWithSetupType('ItemType')}
                  onChange={(obj)=>{setItem({ItemType:safeParseToNumber(obj?.Code),InventoryItemType:{Name:obj?.Name}})}}
                  selected={{Code:props?.state?.item?.ItemType?.toString(),Name:props?.state?.item?.InventoryItemType?.Name}}     />
              </Quantom_Grid>

              <Quantom_Grid mt={.5} container spacing={.5}>
                  <Quantom_Grid item size={{xs:12,sm:12,md:9}}>

                     <Quantom_LOV1
                        keyNo='INVENTORY_ITEM_UNIT_MASTER_TYPE'
                        // mobileSelectionButtonWidth='150px'
                        mobileSelectionButtonIcon='DynamicFormOutlined'
                        uniqueKeyNo={props?.UniqueId??""}
                        refreshMethod={refreshGuid}
                        label='Unit' 
                        FillDtaMethod={()=>getSetupDataWithSetupType('Unit')}
                        onChange={(obj)=>{setItem({UnitCode:obj?.Code,UnitName:obj?.Name})}}
                        selected={{Code:props?.state?.item?.UnitCode,Name:props?.state?.item?.UnitName}} />

                </Quantom_Grid>
                <Quantom_Grid item size={{xs:12,sm:12,md:3}}>
                  <Quantom_Input  label='Unit Name' value={props?.state?.item?.EachUnitName} 
                        onChange={(e)=>{setItem({...props?.state?.item,EachUnitName:e?.target?.value})}}/>
                </Quantom_Grid>
              </Quantom_Grid>

              <Quantom_Grid mt={.5} item size={{xs:12,md:12,lg:12}}>

                <Quantom_LOV1
                        keyNo='INVENTORY_ITEM_CATEGORY_MASTER_TYPE'
                        // mobileSelectionButtonWidth='150px'
                        mobileSelectionButtonIcon='ClassOutlined'
                        uniqueKeyNo={props?.UniqueId??""}
                        refreshMethod={refreshGuid}
                        label='Category' 
                        FillDtaMethod={()=>getSetupDataWithSetupType('Category')}
                        onChange={(obj)=>{setItem({CatCode:obj?.Code,category:{Code:obj?.Code,Name:obj?.Name}})}}
                        selected={{Code:props?.state?.item?.CatCode,Name:props?.state?.item?.category?.Name}} />
                {/* <Quantom_LOV 
                                FillDtaMethod={()=>getSetupDataWithSetupType('Category')} 
                                label='Category' 
                                RefreshFillDtaMethod={refreshSetupMethod}
                                selected={{Code:props?.state?.item?.CatCode,Name:props?.state?.item?.category?.Name}}           
                                onChange={(obj)=>{setItem({CatCode:obj?.Code,category:{Code:obj?.Code,Name:obj?.Name}})}}
                    /> */}
                </Quantom_Grid>
                <Quantom_Grid mt={.5} item size={{xs:12,md:12,lg:12}}>
                  <Quantom_LOV1
                        keyNo='INVENTORY_ITEM_COMPANY_MASTER_TYPE'
                        // mobileSelectionButtonWidth='150px'
                        mobileSelectionButtonIcon='BrandingWatermarkOutlined'
                        uniqueKeyNo={props?.UniqueId??""}
                        refreshMethod={refreshGuid}
                        label='Company' 
                        FillDtaMethod={()=>getSetupDataWithSetupType('Company')}
                        selected={{Code:props?.state?.item?.CompCode,Name:props?.state?.item?.company?.Name}}           
                        onChange={(obj)=>{setItem({CompCode:obj?.Code,company:{Code:obj?.Code,Name:obj?.Name}})}} />
                  {/* <Quantom_LOV 
                              FillDtaMethod={()=>getSetupDataWithSetupType('Company')} 
                              label='Company' 
                              RefreshFillDtaMethod={refreshSetupMethod}
                              selected={{Code:props?.state?.item?.CompCode,Name:props?.state?.item?.company?.Name}}           
                              onChange={(obj)=>{setItem({CompCode:obj?.Code,company:{Code:obj?.Code,Name:obj?.Name}})}}
                  /> */}
                 </Quantom_Grid>
          </Quantom_Grid>

        </Quantom_Grid>
 
      <Quantom_Grid mt={1} item size={{xs:12,md:7,lg:7,xl:6}}>
        {/* <Quantom_Grid container spacing={.5}>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
                  <Quantom_LOV 
                                  FillDtaMethod={()=>getSetupDataWithSetupType('PriceGroup')} 
                                  label='Price Group' 
                                  RefreshFillDtaMethod={refreshSetupMethod}
                                  selected={{Code:props?.state?.item?.PricGroupCode,Name:props?.state?.item?.PriceGroup?.Name}}           
                                  onChange={(obj)=>{setItem({PricGroupCode:obj?.Code,PriceGroup:{Code:obj?.Code,Name:obj?.Name}})}}
                      />
          </Quantom_Grid>
          <Quantom_Grid container size={{xs:12,md:12,lg:12}}>
              <Quantom_Grid size={{xs:4}}>
                  <Quantom_Input label='Pack Qty'></Quantom_Input>
              </Quantom_Grid>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
            <Quantom_LOV 
                  FillDtaMethod={()=>getSetupDataWithSetupType('unit')} 
                  label='Price Unit' 
                  RefreshFillDtaMethod={refreshSetupMethod}
                  selected={{Code:props?.state?.item?.DefUnitCodeForPrice,Name:props?.state?.item?.defUnitNameForPrice}}           
                  onChange={(obj)=>{setItem({DefUnitCodeForPrice:obj?.Code,defUnitNameForPrice:obj?.Name})}}
                      />
            </Quantom_Grid>
        </Quantom_Grid> */}
      </Quantom_Grid>

      
      </Quantom_Grid>
      
    </>
  )
}


interface ItemHelperTabs{
  baseProps?:MenuComponentProps<VMInventoryItemsModel>,
  setupFroms?:SetupFormBulkResponseModel[],
  refreshMethod?:number;
}

const GetItemHelperTabs=(props?:ItemHelperTabs):ComponentTabProps[]=>{

  let tabs:ComponentTabProps[]= [
    {
      TabCaption:"Unit Of Conversion",
      TabComponent:(<InventoryItemHelperUnitOfConversion  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Units Priorities",
      TabComponent:(<InventoryItemHelperUnitPriorities  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Unit For Reports",
      TabComponent:(<InventoryItemHelperUnitForReport  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Stock Replenishment",
      TabComponent:(<InventoryItemHelperStockReplenishment  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Item Attributes",
      TabComponent:(<InventoryItemHelperItemAttributes  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Item Locations",
      TabComponent:(<InventoryItemHelperItemLocations  {...props} />),
      SortNumber:0
    }
  ];

  return tabs;
}


export const getSetupDataWithSetupType=async(setupFormData:SetupFormBulkResponseModel[],type?:string):Promise<CommonCodeName[]>=>{
  let data=  setupFormData?.find(x=>x.Type?.toLocaleLowerCase()===type)?.Data?.map((item,index)=>{
      let obj:CommonCodeName={
        Code:item?.Code,
        Name:item?.Name
      }
      return obj;
   });
   return  Promise.resolve(data??[]);
}


export const InventoryItemHelperUnitOfConversion=(props?:ItemHelperTabs)=>{
  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""))
  const [calcType,setCalcType]=React.useState<CommonCodeName>({Code:'Multiply_By',Name:"Multiply_By"});
  const [refreshUnits,setRefreshUnits]=React.useState(0);
  const [itemUnit,setItemUnit]=React.useState<InventoryItemUnitsModel>({})
  
  const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
  
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
  

  return(
    <GroupContainer height='300px' Label='Unit Of Conversion' >
       <Quantom_Grid mt={2} container spacing={.5} >
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_Input disabled label='From Unit' value={state?.item?.UnitName}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2.5,xl:1.5}}>
              <Quantom_LOV label='Calc_Type' FillDtaMethod={calculationType} selected={calcType} onChange={(e)=>{setCalcType({...e})}}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1}}>
              <Quantom_Input label='Qty' value={itemUnit?.CalucltionNumber??0} onChange={(e)=>{
                  setItemUnit({...itemUnit,CalucltionNumber:safeParseToNumber(e.target.value)})
              }}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_LOV label='To Unit' RefreshFillDtaMethod={refreshUnits} selected={itemUnit?.unit} FillDtaMethod={()=>getSetupUnits()} onChange={(e)=>{
                 setItemUnit({...itemUnit,UnitCode:e?.Code,unit:{Code:e?.Code,Name:e?.Name}})
                }}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1,lg:1}}>
              <ListCompButton Label='Add' iconName='AddBoxTwoTone' marginTop='4px' onClick={()=>{
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


              }}/>
          </Quantom_Grid>

       </Quantom_Grid>
       

       <QUANTOM_Table onViewButtonClick={onDeleteViewClick} viewButtonOverrideIcon='DeleteTwoTone' hideFloatingFilter headerHeight={20} data={state?.itemUnits??[]} columns={[
          {field:"PUnitName",caption:'From Unit',width:120,},  
          {field:"CalculationTypeDesc",caption:'Calc_Type',width:160},
          {field:"CalucltionNumber",caption:'Qty',width:120},
          {field:"unit.Name",caption:'To Unit',width:120},

       ]} height='250px'/>

       {/* </QUANTOM_Table> */}
    </GroupContainer>
  )
}



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

export interface InventoryItemHelperUnitModel{
  UnitName?:string;
  ReportName?:string;
} 
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