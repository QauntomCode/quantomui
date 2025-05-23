/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { ComponentTabProps, generateGUID, IconByName, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV1 } from '../../../../../quantom_comps/Quantom_Lov'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'


import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { InventoryItemsDelete, InventoryItemsGetAll, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'
import { SetupFormGetAllBulk } from '../../unit/impl/setupFormImp'
import { SetupFormBulkResponseModel } from '../../unit/model/SetupFormBulkResponse'
import { CommonCodeName } from '../../../../../database/db'
import {  safeParseToNumber } from '../../../../../CommonMethods'
import store, { set_form_state, useQuantomFonts } from '../../../../../redux/store'
import { InventoryItemLocationsModel } from '../model/AssocicateModels/InventoryItemLocationsModel'
import { AddHPD, useGetHelperData } from '../../../../sale/reports/Appointments/CustomerAppointmentReports'
import { AccountSettings, useGetSetting } from '../../../../Settings/Settings/SettingMethods'
import { InventoryItemHelperUnitPriorities } from './Helpers/InventoryItemHelperUnitPriorities'
import { InventoryItemHelperUnitOfConversion } from './Helpers/InventoryItemHelperUnitOfConversion'
import { InventoryItemHelperUnitForReport } from './Helpers/InventoryItemHelperUnitForReport'
import { InventoryItemHelperStockReplenishment } from './Helpers/InventoryItemHelperStockReplenishment'
import { InventoryItemHelperItemAttributes } from './Helpers/InventoryItemHelperItemAttributes'
import { InventoryItemHelperItemLocations } from './Helpers/InventoryItemHelperItemLocations'
import { Paper, useTheme } from '@mui/material'
import { POSActionButton1 } from '../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1'


export const InventoryItemsView = (props?:MenuComponentProps<VMInventoryItemsModel>) => {
  

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
   
   React.useEffect(()=>{
             setTimeout(() => {
               props?.setListComponent?.((<List {...props} />))
             }, 500);
           },[])
   
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
// <<<<<<< HEAD
//      },[props?.state])
// =======

      if(!props?.state?.item?.UnitCode  && defEachUnit?.Code){
        props?.setState?.({...props?.state,item:{...props?.state?.item,UnitCode:defEachUnit?.Code,UnitName:defEachUnit?.Name}})
      }
     },[props?.state?.item])
// >>>>>>> d8cd6ea2c88e75b1ea70e399c75d79dbe2fb786b



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
          setAllLocations();
         },
        
      })
    },[props])


    React.useEffect(()=>{
      if(props?.fullState?.IsFirstUseEffectCall){
        // alert('this is first call')
        setAllLocations();
      }
    },[props?.fullState?.IsFirstUseEffectCall])

    const setAllLocations=async()=>{
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
        //  handleGetSearchItems();
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
     
       setTimeout(() => {
          setRefreshSetupMethod((refreshSetupMethod??0)+1)
       }, 100);
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
                        mobileSelectionButtonIcon='ClassOutlined'
                        uniqueKeyNo={props?.UniqueId??""}
                        refreshMethod={refreshGuid}
                        label='Category' 
                        FillDtaMethod={()=>getSetupDataWithSetupType('Category')}
                        onChange={(obj)=>{setItem({CatCode:obj?.Code,category:{Code:obj?.Code,Name:obj?.Name}})}}
                        selected={{Code:props?.state?.item?.CatCode,Name:props?.state?.item?.category?.Name}} />
               
                </Quantom_Grid>
                <Quantom_Grid mt={.5} item size={{xs:12,md:12,lg:12}}>
                  <Quantom_LOV1
                        keyNo='INVENTORY_ITEM_COMPANY_MASTER_TYPE'
                        mobileSelectionButtonIcon='BrandingWatermarkOutlined'
                        uniqueKeyNo={props?.UniqueId??""}
                        refreshMethod={refreshGuid}
                        label='Company' 
                        FillDtaMethod={()=>getSetupDataWithSetupType('Company')}
                        selected={{Code:props?.state?.item?.CompCode,Name:props?.state?.item?.company?.Name}}           
                        onChange={(obj)=>{setItem({CompCode:obj?.Code,company:{Code:obj?.Code,Name:obj?.Name}})}} />
                 </Quantom_Grid>
          </Quantom_Grid>

        </Quantom_Grid>
 
      <Quantom_Grid mt={1} item size={{xs:12,md:7,lg:7,xl:6}}>
      </Quantom_Grid>

      
      </Quantom_Grid>
      
    </>
  )
}


export interface ItemHelperTabs{
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



export const List=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{

   const searchedItem= useGetHelperData<CommonCodeName[]>(props,'INVENTORY_ITEMS_LIST');
   const searchText= useGetHelperData<string>(props,'INVENTORY_ITEMS_LIST_SEARCH_TEXT');
  //  const[searchedItem,setSearchedItems]=React.useState<CommonCodeName[]>([]);
  //  const [searchText,setSearchText]=React.useState('');
   const handleGetSearchItems=async()=>{
       let items= await InventoryItemsGetAll(searchText);
       AddHPD(props,'INVENTORY_ITEMS_LIST',items)
    }
    useEffect(()=>{
      handleGetSearchItems();
    },[searchText])

    const fonts= useQuantomFonts();
    const theme= useTheme();
  return(
    <Quantom_Grid container size={{xs:12}}>
        <Quantom_Grid size={{xs:12}}>
           <Quantom_Input value={searchText} label='Search' onChange={(e)=>{AddHPD(props,'INVENTORY_ITEMS_LIST_SEARCH_TEXT',e?.target?.value)}}/>
        </Quantom_Grid>
        <Quantom_Grid mt={1} sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H4FontSize}} container spacing={1.5} size={{xs:12}}>
           {
            searchedItem?.map((item,index)=>{
              return(
                <Quantom_Grid p={1} container component={Paper} size={{xs:12,sm:12,md:6,lg:4}}>
                      <Quantom_Grid display='flex' alignItems='center' borderBottom={`1px dotted ${theme?.palette?.text?.disabled}`} size={{xs:12}}>
                        <IconByName iconName='Tag' fontSize='14px' color={theme?.palette?.text?.disabled}/>
                        {item?.Code}
                      </Quantom_Grid>
                      <Quantom_Grid p={0} display='flex' alignItems='center' size={{xs:12}}>
                        <div style={{flex:1}}>
                          <IconByName iconName='LocalMallOutlined' fontSize='14px' color={theme?.palette?.text?.disabled}/>
                          {item?.Name}
                        </div>
                        <div>
                          <POSActionButton1 onClick={()=>{
                             props?.setPrimaryKeyNo?.(item?.Code)
                          }} height='25px' label='View' backgroundColor={theme?.palette?.secondary?.main}  iconName='ArrowRightAltOutlined'/>
                        </div>
                      </Quantom_Grid>
                </Quantom_Grid>
              )
            })
           }
        </Quantom_Grid>
    </Quantom_Grid>
  )
}



export interface InventoryItemHelperUnitModel{
  UnitName?:string;
  ReportName?:string;
} 









