/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { ComponentTabProps, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'

import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { InventoryItemsDelete, InventoryItemsGetAll, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'
import { SetupFormGetAllBulk } from '../../unit/impl/setupFormImp'
import { SetupFormBulkResponseModel } from '../../unit/model/SetupFormBulkResponse'
import { CommonCodeName } from '../../../../../database/db'
import { safeParseToNumber } from '../../../../../CommonMethods'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { ListCompButton } from '../../../../account/report/Ledger/view/LedgerView'
import { useSelector } from 'react-redux'
import store, { form_state_selector, get_helperData_by_key } from '../../../../../redux/store'
import { add_helper_data } from '../../../../../redux/reduxSlice'

export const InventoryItemsView = (props?:MenuComponentProps<VMInventoryItemsModel>) => {
   const[searchedItem,setSearchedItems]=React.useState<CommonCodeName[]>([]);
   const [searchText,setSearchText]=React.useState('');
   const[refreshSetupMethod,setRefreshSetupMethod]=React.useState(0);

   const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]

  //  React.useEffect(()=>{
  //   console.log('setup form data is',setupFormData);
  //   console.warn('setup form data is',setupFormData)

  //  },[setupFormData])

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

    // React.useEffect(()=>{
    //   // if(setupFormData){
    //     //  alert('refreshed')
    //     // setRefreshSetupMethod((refreshSetupMethod??0)+1)
    //   // }
    // },[])

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
        props?.setState?.({...props?.state,Item:{...props?.state?.Item,...item}})
    }
    
    const handleGetSetupItems=async()=>{
       let res= await SetupFormGetAllBulk(['Unit','Category','Company','PriceGroup','ItemType']);
       store.dispatch(add_helper_data({UniqueId:props?.UniqueId,data:[{
          keyNo:'setup_data',
          Data:res
       }]}));
       
       setTimeout(() => {
          setRefreshSetupMethod((refreshSetupMethod??0)+1)
       }, 100);
    }

    const handleGetSearchItems=async()=>{
       let items= await InventoryItemsGetAll(searchText);
       setSearchedItems(items)
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
            <GroupContainer height='410px' Label='Item List'>
               <div style={{display:'flex',width:'100%'}}>
                  <Quantom_Input label='Search' value={searchText} onChange={(e)=>{setSearchText(e?.target?.value)}}/>
                  <div style={{width:'60px',marginLeft:'5px'}}>
                    <ListCompButton onClick={()=>{
                      handleGetSearchItems()
                    }} marginTop='4px' Label='Search'  iconName='PlagiarismTwoTone'/>
                  </div>
               </div>
               <QUANTOM_Table headerHeight={0} data={[...searchedItem]} height='390px' columns={[
                  {field:"Code",caption:"ItemCode",width:105 },
                  {field:"Name",caption:"ItemName",width:250 },
                ]} />
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


export const InventoryItemHelperUnitOfConversion=(props?:ItemHelperTabs)=>{
  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""))
  const [calcType,setCalcType]=React.useState<CommonCodeName>({Code:'Multiply_By',Name:"Multiply_By"});
  const [refreshUnt,setRefreshUnit]=React.useState(0);
  const [selectedUnit,setSelectedUnit]=React.useState<CommonCodeName>();

  const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
  
  const getSetupDataWithSetupType=async(type?:string):Promise<CommonCodeName[]>=>{
    let data=  setupFormData?.find(x=>x.Type?.toLocaleLowerCase()==="unit")?.Data?.map((item,index)=>{
        let obj:CommonCodeName={
          Code:item?.Code,
          Name:item?.Name
        }
        return obj;
     });
     return  Promise.resolve(data??[]);
  }

  React.useEffect(()=>{
      setRefreshUnit((refreshUnt??0)+1);
  },[setupFormData])


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

  return(
    <GroupContainer height='300px' Label='Unit Of Conversion' >
       <Quantom_Grid container spacing={.5} >
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_Input label='From Unit' value={state?.Item?.UnitName}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2.5,xl:1.5}}>
              <Quantom_LOV label='Calc_Type' FillDtaMethod={calculationType} selected={calcType} onChange={(e)=>{setCalcType({...e})}}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1}}>
              <Quantom_Input label='Qty' value={state?.Item?.UnitName}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_LOV label='To Unit' RefreshFillDtaMethod={refreshUnt} selected={selectedUnit} FillDtaMethod={getSetupDataWithSetupType} onChange={(e)=>{setSelectedUnit({...e})}}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1,lg:1}}>
              <ListCompButton Label='Add' iconName='AddBoxTwoTone' marginTop='4px'/>
          </Quantom_Grid>

       </Quantom_Grid>
       
    </GroupContainer>
  )
}

export const InventoryItemHelperUnitPriorties=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Unit Priorties' >

    </GroupContainer>
  )
}

export const InventoryItemHelperUnitForReport=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Unit For Report' >

    </GroupContainer>
  )
}


export const InventoryItemHelperStockReplenishment=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Stock Replenishment' >

    </GroupContainer>
  )
}


export const InventoryItemHelperItemAtributes=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Item Atributes' >

    </GroupContainer>
  )
}



export const InventoryItemHelperItemLocations=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Item Locations' >

    </GroupContainer>
  )
}