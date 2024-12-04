/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { PettyCashModel } from '../model/PettyCashModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { PettyCashGetAll } from '../impl/PettyCashImp'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'

export const OpeningBalanceList = (props?:MenuComponentProps<PettyCashModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await PettyCashGetAll();
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
