/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { BasicKeysProps, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { SetupFormModel } from '../model/setupFormModel'
import { GroupContainer } from '../../../../account/processing/voucher/view/VoucherView'
import { InventoryUnitList } from './InventoryUnitList'
import { useSelector } from 'react-redux'
import { GetSetupFormTypByMenuCode, SetupFormDelete, SetupFormGetOne, SetupFormInsert } from '../impl/setupFormImp'

export const InventoryUnitView = (props?:MenuComponentProps<SetupFormModel>) => {

    const [formCaption,setFormCaption]=React.useState('');

    React.useEffect(()=>{
      setFormBasicKeys<SetupFormModel>({
         SaveMethod:(payload)=>SetupFormInsert(payload,props?.MenuCode),
         DeleteMethod:(payload)=>SetupFormDelete(payload,props?.MenuCode),
         GetOneMethod:(payload)=>SetupFormGetOne(payload,props?.MenuCode),
         SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{}
      })
    },[props])

    React.useEffect(()=>{
      setTimeout(() => {
        props?.setListComponent?.((<InventoryUnitList {...props}/>))
      }, 500);
      
      setFormType();
    },[])

    const setFormType=async()=>{
      let info= await GetSetupFormTypByMenuCode(props?.MenuCode);
       setFormCaption(info?.Capation??"");
    }
  
    // // // let type:any={};
    // // GetSetupFormTypByMenuCode(props?.MenuCode)?.then((res)=>{
    // //    setFormCaption(res?.Capation??"")
    // // })
    
  return (
    <>
     {/* <GroupContainer Label={`${formCaption} Info`}> */}
      
      <Quantom_Grid mt={1} container spacing={.5}>
         <Quantom_Grid item size={{xs:6,sm:6,md:3,lg:2}}>
            <Quantom_Input disabled label='Code' value={props?.state?.Code} />
         </Quantom_Grid>
      </Quantom_Grid>
         <Quantom_Grid item size={{xs:8,md:9,lg:10}}>
            <Quantom_Input label='Name' value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e?.target?.value})}}/>
         </Quantom_Grid>
      
      {/* </GroupContainer> */}
    </>
  )
}



