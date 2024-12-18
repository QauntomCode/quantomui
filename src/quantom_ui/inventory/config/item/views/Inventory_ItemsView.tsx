/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { ComponentTabProps, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { Quantom_Container, Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'

import { VMInventoryItemsModel } from '../model/VMInventory_itemsModel'
import { getAttributevalueByAttributeCode, InventoryItemsDelete, InventoryItemsGetAll, InventoryItemsGetOne, InventoryItemsInsert } from '../impl/InventoryitemsImpl'
import { InventoryItemsModel } from '../model/InventoryItemsModel'
import { SetupFormGetAllBulk } from '../../unit/impl/setupFormImp'
import { SetupFormBulkResponseModel } from '../../unit/model/SetupFormBulkResponse'
import { CommonCodeName } from '../../../../../database/db'
import { AsyncDeepCopy, AsyncFindByIndex, AsyncFindObject, safeParseToNumber } from '../../../../../CommonMethods'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { ListCompButton } from '../../../../account/report/Ledger/view/LedgerView'
import { useSelector } from 'react-redux'
import store, { form_state_selector, get_current_user_locations, get_form_state_without_selector, get_helperData_by_key, set_form_state } from '../../../../../redux/store'
import { add_helper_data, set_state } from '../../../../../redux/reduxSlice'
import { InventoryItemUnitsModel, UNIT_CALULATION_TYPE } from '../model/AssocicateModels/Inventory_ItemUnitsModel'
import { InventoryItemUnitsPriorityModel } from '../model/AssocicateModels/Inventory_ItemUnitsPriorityModel'
import { QuantomGET } from '../../../../../HTTP/QuantomHttpMethods'
import { InventoryItemStockReplenishmentModel } from '../model/AssocicateModels/InventoryItemStockReplenishmentModel'
import { InventoryAttributeValuesModel } from '../../InventoryItemAtributeValues/Model/InventoryItemAtributeValuesModel'

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
       let res= await SetupFormGetAllBulk(['Unit','Category','Company','PriceGroup','ItemType','attributes']);
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
  const [refreshUnt,setRefreshUnit]=React.useState(0);
  const [itemUnit,setItemUnit]=React.useState<InventoryItemUnitsModel>({})

  const setupFormData= useSelector((state:any)=>get_helperData_by_key(state,props?.baseProps?.UniqueId??"",'setup_data')) as SetupFormBulkResponseModel[]
  


  React.useEffect(()=>{
      setRefreshUnit((refreshUnt??0)+1);
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
     let units=[...internalState?.ItemUnits??[]]
     console.warn('units before',units)
     let selectedIndex= await AsyncFindByIndex(internalState?.ItemUnits,(x)=>x?.UnitCode===obj?.UnitCode && x?.PrimaryUnits===obj?.PrimaryUnits)
      
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
       <Quantom_Grid container spacing={.5} >
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_Input disabled label='From Unit' value={state?.Item?.UnitName}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2.5,xl:1.5}}>
              <Quantom_LOV label='Calc_Type' FillDtaMethod={calculationType} selected={calcType} onChange={(e)=>{setCalcType({...e})}}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1}}>
              <Quantom_Input label='Qty' value={itemUnit?.PrimaryUnits??0} onChange={(e)=>{
                  setItemUnit({...itemUnit,PrimaryUnits:safeParseToNumber(e.target.value)})
              }}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
              <Quantom_LOV label='To Unit' RefreshFillDtaMethod={refreshUnt} selected={itemUnit?.Unit} FillDtaMethod={()=>getSetupDataWithSetupType(setupFormData,'Unit')} onChange={(e)=>{
                 setItemUnit({...itemUnit,UnitCode:e?.Code,Unit:{Code:e?.Code,Name:e?.Name}})
                }}/>
          </Quantom_Grid>

          <Quantom_Grid item size={{xs:6,sm:6,md:1,lg:1}}>
              <ListCompButton Label='Add' iconName='AddBoxTwoTone' marginTop='4px' onClick={()=>{
                  if(!itemUnit || !itemUnit?.Unit ||  !itemUnit?.UnitCode){
                    props?.baseProps?.errorToast?.('Select To Unit')
                    return;
                  }
                  if(itemUnit?.UnitCode===state?.Item?.UnitCode){
                    props?.baseProps?.errorToast?.(`From Unit And To Unit Can't Be Same`)
                    return;
                  }
                  if(!itemUnit?.PrimaryUnits){
                    props?.baseProps?.errorToast?.(`Qty Must Be Greater Than Zero`)
                    return;
                  }
              
                  set_form_state<VMInventoryItemsModel>(props?.baseProps?.UniqueId,{...state,ItemUnits:[...state?.ItemUnits??[],
                    {...itemUnit,PUnitName:state?.Item?.UnitName}]});
                  
                  setItemUnit({...itemUnit,UnitCode:'',UnitName:'',Unit:{},PrimaryUnits:0,})


              }}/>
          </Quantom_Grid>

       </Quantom_Grid>
       

       <QUANTOM_Table onViewButtonClick={onDeleteViewClick} viewButtonOverrideIcon='DeleteTwoTone' hideFloatingFilter headerHeight={20} data={state?.ItemUnits??[]} columns={[
          {field:"PUnitName",caption:'From Unit',width:120,},  
          {field:"CalculationTypeDesc",caption:'Calc_Type',width:160},
          {field:"PrimaryUnits",caption:'Qty',width:120},
          {field:"Unit.Name",caption:'To Unit',width:120},

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
  const reportData= state?.ReportUnits?.map((item,index)=>{
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

  

  return(
    <GroupContainer height='300px' Label='Unit For Report' >
         <Quantom_Grid container spacing={.5}>
              <Quantom_Grid item size={{xs:4}}>
                  <Quantom_LOV label='Reports' FillDtaMethod={fillReportsMethod} selected={selectedReport} onChange={(e)=>{setSelectedReport(e)}}/>
              </Quantom_Grid>
              <Quantom_Grid item size={{xs:4}}>
                  <Quantom_LOV label='Unit' FillDtaMethod={()=>getSetupDataWithSetupType(setupFormData,'Unit')} selected={selectedUnit} onChange={(e)=>setSelectedUnit(e)}/>
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
                    let reportUnits=[...state?.ReportUnits??[]];
                    if(state?.ReportUnits && state?.ReportUnits?.length>0){
                      
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
              <QUANTOM_Table viewButtonStatus='HIDE' viewButtonOverrideIcon='DeleteTwoTone' data={reportData} headerHeight={20} height='250px'  hideFloatingFilter 
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
  const [refresValue,setRefreshValue]=React.useState(0);
  // const [attributeValues,setAttributevalues]=React.useState<CommonCodeName[]>([])

   const [attribute,setAttribute]=React.useState<CommonCodeName>();
   const[selectedValue,setSelectedValue]=React.useState<CommonCodeName>()

   React.useEffect(()=>{
    // alert('hello')
    setRefreshValue(refresValue+1)
    setSelectedValue({});
    //  handleAttributeValues()
   },[attribute])

   const handleAttributeValues=async(attrCode?:string)=>{
      // alert(attribute?.Code)
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
        //return data;
        // setAttributevalues(data);
      }
      else{
        return Promise.resolve([])
         //setAttributevalues([])
      }
   }

  //  React.useEffect(()=>{
  //   console.warn('data inside useeffect is',attributeValues)
  //   setRefreshValue(refresValue??0+1)
  //  },[attributeValues])
  return(
    <GroupContainer height='300px' Label='Item Attributes' >
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid item size={{xs:4}}>
               <Quantom_LOV label='Attribute'  FillDtaMethod={()=>getSetupDataWithSetupType(setupData,'attributes')} 
                  selected={attribute} onChange={(att)=>{setAttribute(att)}}/>
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:4}}>
               <Quantom_LOV label='Attribute' RefreshFillDtaMethod={refresValue}  FillDtaMethod={()=>handleAttributeValues(attribute?.Code)} 
                  selected={selectedValue} onChange={(att)=>{setSelectedValue(att)}}/>
            </Quantom_Grid>
            <Quantom_Grid  size={{xs:1}}>
                  <ListCompButton Label='Add' iconName='AddBoxTwoTone' marginTop='4px' />
              </Quantom_Grid>
         </Quantom_Grid>
    </GroupContainer>
  )
}



export const InventoryItemHelperItemLocations=(props?:ItemHelperTabs)=>{
  return(
    <GroupContainer height='300px' Label='Item Locations' >

    </GroupContainer>
  )
}



export const InventoryItemHelperUnitPriorities=(props?:ItemHelperTabs)=>{
  const forms=["SALE","PURCHASE"];
  const state= useSelector((state:any)=>form_state_selector<VMInventoryItemsModel>(state,props?.baseProps?.UniqueId??""))
  const [data,setData]=React.useState<InventoryItemUnitsPriorityModel[]>([])

  React.useEffect(()=>{
    setUnitFormats()
  },[state?.Item?.UnitCode,state?.InventoryItemUnitsPriority])

  const setUnitFormats= async()=>{
      let prData= await getPriorityData();
      console.warn('unit priority data is',prData)
      setData([...prData]);
  }
  const getPriorityData=async():Promise<InventoryItemUnitsPriorityModel[]>=>{
    let funData:InventoryItemUnitsPriorityModel[]=[];
      
    for(let i=0; i<(forms?.length??0);i++){
      let formName= forms[i];
      let mainUnit= await get_selected_obj(state?.Item?.UnitCode,formName);
        let mUnitObj= {FormName:formName,ItemCode:state?.Item?.ItemCode,UnitCode:state?.Item?.UnitCode,Unit:{Code:state?.Item?.UnitCode,Name:state?.Item?.UnitName},Priority:mainUnit?.Priority??0}
        funData.push(mUnitObj);

        for(let i=0;i<(state?.ItemUnits?.length??0);i++){
            
            let item= state?.ItemUnits?.[i]
            // alert('item unit is'+item?.Unit?.Code)
            let obj:InventoryItemUnitsPriorityModel={
              UnitCode:item?.UnitCode,
              Unit:{Code:item?.UnitCode,Name:item?.Unit?.Name},
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

  return(
    <GroupContainer height='300px' Label='Unit Priorities' >
        <QUANTOM_Table height='240px' data={data} headerHeight={20} hideFloatingFilter viewButtonStatus='HIDE'
         columns={[
            {caption:"Form Name",field:'FormName',width:100},
            {caption:"Unit Code",field:'Unit.Code',width:100},
            {caption:"Unit Name",field:'Unit.Name',width:100},
            {caption:"Priority",field:'Priority',width:100,editable:true},


          ]}/>
    </GroupContainer>
  )
}