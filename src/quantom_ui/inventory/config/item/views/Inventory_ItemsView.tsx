/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { BasicKeysProps, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'

import { useSelector } from 'react-redux'
import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { InventoryItemsDelete, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'

export const InventoryItemsView = (props?:MenuComponentProps<VMInventoryItemsModel>) => {


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
      
      if(props?.UniqueId){
        props?.AddComponentTabs?.([
          {
            TabCaption:"Unit Of Conversion",
            TabComponent:(<InventoryItemHelperUnitOfconversion  {...props} />),
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
        ])
      }
       
    },[props?.UniqueId])


    const setItem=(item?:InventoryItemsModel)=>{
        props?.setState?.({...props?.state,Item:{...item}})
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
              <Quantom_Input label='Item Type Combo' value={props?.state?.Item?.UrduName} 
                  onChange={(e)=>{setItem({...props?.state?.Item,UrduName:e?.target?.value})}}/>
          </Quantom_Grid>
          <Quantom_Grid container size={{xs:12}} spacing={.5}>
              <Quantom_Grid item size={{xs:10}}>
                <Quantom_LOV label='Each Unit'></Quantom_LOV>
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:2}}>
              <Quantom_Input label='Unit Name' value={props?.state?.Item?.EachUnitName} 
                    onChange={(e)=>{setItem({...props?.state?.Item,EachUnitName:e?.target?.value})}}/>
            </Quantom_Grid>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_LOV label='Category'></Quantom_LOV>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_LOV label='Company'></Quantom_LOV>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,md:12,lg:12}}>
              <Quantom_LOV label='Price Group'></Quantom_LOV>
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





export const InventoryItemHelperUnitOfconversion=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
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