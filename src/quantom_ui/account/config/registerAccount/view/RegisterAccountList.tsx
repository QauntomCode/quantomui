/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { RegisterAccountModel } from '../model/registerAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'
import { RegisterAccountGetAll } from '../impl/registerAccountIml'

export const RegisterAccountList = (props?:MenuComponentProps<RegisterAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await RegisterAccountGetAll('',true);
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  return (
    <>
      <QUANTOM_Table height='400px' columns={
        [
          {field:"Code",width:350,header:'Code'},
          {field:'Name',header:'Name'},
          {field:'Balance',header:'Balance'},
          {field:'subSubAccount.Name',header:'Sub Sub Account'},
          {field:'subSubAccount.subAccount.Name',header:'Sub Account'},
          {field:'subSubAccount.subAccount.mainAccount.Name',header:'Main Account'}
        ]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.Code)
        }}/>
    </>
  )
}
