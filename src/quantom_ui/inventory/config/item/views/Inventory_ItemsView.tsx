/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { ComponentTabProps, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'

import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { InventoryItemsDelete, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'
import { SetupFormGetAllBulk } from '../../unit/impl/setupFormImp'
import { SetupFormBulkResponseModel } from '../../unit/model/SetupFormBulkResponse'
import { CommonCodeName } from '../../../../../database/db'
import { safeParseToNumber } from '../../../../../CommonMethods'

export const InventoryItemsView = (props?:MenuComponentProps<VMInventoryItemsModel>) => {

   const [setupFormData,setSetupFormData]=React.useState<SetupFormBulkResponseModel[]>([]);
   const[refreshSetupMethod,setRefreshSetupMethod]=React.useState(0);

    React.useEffect(()=>{
      setFormBasicKeys<VMInventoryItemsModel>({
         SaveMethod:(payload)=>InventoryItemsInsert(payload),
         DeleteMethod:(payload)=>InventoryItemsDelete(payload),
         GetOneMethod:(payload)=>InventoryItemsGetOne(payload),
         SetBasicKeys:()=>({keyNoPropName:"Item.ItemCode",keyDatePropsName:""}),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{}
      })
    },[props])

    React.useEffect(()=>{
      if(setupFormData){
        //  alert('refreshed')
        setRefreshSetupMethod((refreshSetupMethod??0)+1)
      }
    },[setupFormData])

    React.useEffect(()=>{
         handleGetSetupItems();
    },[])

    
    React.useEffect(()=>{
      
      if(props?.UniqueId){
        props?.AddComponentTabs?.(GetItemHelperTabs(props))
      }
       
    },[props?.UniqueId])


    const setItem=(item?:InventoryItemsModel)=>{
        props?.setState?.({...props?.state,Item:{...props?.state?.Item,...item}})
    }
    
    const handleGetSetupItems=async()=>{
       let res= await SetupFormGetAllBulk(['Unit','Category','Company','PriceGroup','ItemType']);
       setSetupFormData([...res??[]]);
       console.warn('setup items are',res)
    }

    const getSetupDataWithSetupType=async(type?:string):Promise<CommonCodeName[]>=>{
      let data=  setupFormData?.find(x=>x.Type?.toLocaleLowerCase()===type?.toLocaleLowerCase())?.Data?.map((item,index)=>{
        let obj:CommonCodeName={
          Code:item?.Code,
          Name:item?.Name
        }
        return obj;
       });
       return  Promise.resolve(data??[]);

    }


  return (
    <>
    

      <Quantom_Grid size={{xs:12}} container spacing={.5}>
        <Quantom_Grid item size={{xs:12,sm:12,md:5,lg:4,xl:3}}>
            <GroupContainer height='465px' Label='Item List'>
            </GroupContainer>  
        
        </Quantom_Grid> 
 
      <Quantom_Grid item size={{xs:12,md:7,lg:7,xl:6}}>
      <GroupContainer Label={`$Item Master Information `}>
        <Quantom_Grid container spacing={.5}>
          <Quantom_Grid item size={{xs:4,md:3,lg:2}}>
              <Quantom_Input disabled label='Item Code' value={props?.state?.Item?.ItemCode} />
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:8,md:9,lg:10}}>
              <Quantom_Input label='Item Name' value={props?.state?.Item?.ItemName} 
                  onChange={(e)=>{setItem({...props?.state?.Item,ItemName:e?.target?.value})}}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_Input label='Product' value={props?.state?.Item?.ProductName} 
                  onChange={(e)=>{setItem({...props?.state?.Item,ProductName:e?.target?.value})}}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_Input label='Urdu Name' value={props?.state?.Item?.UrduName} 
                  onChange={(e)=>{setItem({...props?.state?.Item,UrduName:e?.target?.value})}}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_Input label='Search Key' value={props?.state?.Item?.SearchKey} 
                  onChange={(e)=>{setItem({...props?.state?.Item,SearchKey:e?.target?.value})}}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
            <Quantom_LOV FillDtaMethod={()=>getSetupDataWithSetupType('ItemType')} 
                              label='Item Type' 
                              RefreshFillDtaMethod={refreshSetupMethod}
                              selected={{Code:props?.state?.Item?.ItemType?.toString(),Name:props?.state?.Item?.InventoryItemType?.Name}}           
                              onChange={(obj)=>{setItem({ItemType:safeParseToNumber(obj?.Code),InventoryItemType:{Name:obj?.Name}})}}
                  />
          </Quantom_Grid>
          <Quantom_Grid container size={{xs:12}} spacing={.5}>
              <Quantom_Grid item size={{xs:10}}>
                <Quantom_LOV FillDtaMethod={()=>getSetupDataWithSetupType('unit')} 
                             label='Each Unit' 
                             RefreshFillDtaMethod={refreshSetupMethod}
                             selected={{Code:props?.state?.Item?.UnitCode,Name:props?.state?.Item?.UnitName}}           
                             onChange={(obj)=>{setItem({UnitCode:obj?.Code,UnitName:obj?.Name})}}
                 />
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:2}}>
              <Quantom_Input  label='Unit Name' value={props?.state?.Item?.EachUnitName} 
                    onChange={(e)=>{setItem({...props?.state?.Item,EachUnitName:e?.target?.value})}}/>
            </Quantom_Grid>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
            <Quantom_LOV 
                            FillDtaMethod={()=>getSetupDataWithSetupType('Category')} 
                            label='Category' 
                            RefreshFillDtaMethod={refreshSetupMethod}
                            selected={{Code:props?.state?.Item?.CatCode,Name:props?.state?.Item?.Category?.Name}}           
                            onChange={(obj)=>{setItem({CatCode:obj?.Code,Category:{Code:obj?.Code,Name:obj?.Name}})}}
                 />
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
            <Quantom_LOV 
                            FillDtaMethod={()=>getSetupDataWithSetupType('Company')} 
                            label='Company' 
                            RefreshFillDtaMethod={refreshSetupMethod}
                            selected={{Code:props?.state?.Item?.CompCode,Name:props?.state?.Item?.Company?.Name}}           
                            onChange={(obj)=>{setItem({CompCode:obj?.Code,Company:{Code:obj?.Code,Name:obj?.Name}})}}
                 />
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
                  <Quantom_LOV 
                                  FillDtaMethod={()=>getSetupDataWithSetupType('PriceGroup')} 
                                  label='Price Group' 
                                  RefreshFillDtaMethod={refreshSetupMethod}
                                  selected={{Code:props?.state?.Item?.PricGroupCode,Name:props?.state?.Item?.PriceGroup?.Name}}           
                                  onChange={(obj)=>{setItem({PricGroupCode:obj?.Code,PriceGroup:{Code:obj?.Code,Name:obj?.Name}})}}
                      />
          </Quantom_Grid>
          <Quantom_Grid container size={{xs:12,md:12,lg:12}}>
              <Quantom_Grid size={{xs:4}}>
                  <Quantom_Input label='Pack Qty'></Quantom_Input>
              </Quantom_Grid>
          </Quantom_Grid>
        </Quantom_Grid>
        </GroupContainer>
      </Quantom_Grid>

      
      </Quantom_Grid>
      
    </>
  )
}


const GetItemHelperTabs=(props?:MenuComponentProps<VMInventoryItemsModel>):ComponentTabProps[]=>{

  let tabs:ComponentTabProps[]= [
    {
      TabCaption:"Unit Of Conversion",
      TabComponent:(<InventoryItemHelperUnitOfConversion  {...props} />),
      SortNumber:0
    },
    {
      TabCaption:"Units Priorties",
      TabComponent:(<InventoryItemHelperUnitPriorties  {...props} />),
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
      TabComponent:(<InventoryItemHelperItemAtributes  {...props} />),
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


export const InventoryItemHelperUnitOfConversion=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Unit Of Convesion' >

    </GroupContainer>
  )
}

export const InventoryItemHelperUnitPriorties=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Unit Priorties' >

    </GroupContainer>
  )
}

export const InventoryItemHelperUnitForReport=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Unit For Report' >

    </GroupContainer>
  )
}


export const InventoryItemHelperStockReplenishment=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Stock Replenishment' >

    </GroupContainer>
  )
}


export const InventoryItemHelperItemAtributes=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Item Atributes' >

    </GroupContainer>
  )
}



export const InventoryItemHelperItemLocations=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
  return(
    <GroupContainer height='300px' Label='Item Locations' >

    </GroupContainer>
  )
}