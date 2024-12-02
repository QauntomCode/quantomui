/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { SubAccountModel } from '../model/SubAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { SubAccountGetAll } from '../impl/subAccountImpl'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'

export const SubAccountList = (props?:MenuComponentProps<SubAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await SubAccountGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  return (
    <>
      <QUANTOM_Table height='400px' columns={[{field:"Code",width:350},{field:'Name'},{field:'mainAccount.Name'}]} data={listData}
      onViewButtonClick={(data)=>{
          props?.setPrimaryKeyNo?.(data?.Code)
      }}/>
    </>
  )
}
