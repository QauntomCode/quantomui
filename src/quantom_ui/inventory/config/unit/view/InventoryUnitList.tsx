/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box } from '@mui/material'
import { SetupFormModel } from '../model/setupFormModel'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { SetupFromGetAll } from '../impl/setupFormImp'

export const InventoryUnitList = (props?:MenuComponentProps<SetupFormModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const height= `calc(100vh - ${HeaderHeight})`
  const handleLoadSubAccountData=async()=>{
     let data= await SetupFromGetAll(props?.MenuCode,'');
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  return (
    <>
     <Box sx={{marginTop:'10px'}}>
      <QUANTOM_Table height={height} columns={[{field:"Code",width:350},{field:'Name'},{field:'mainAccount.Name'}]} data={listData}
      onViewButtonClick={(data)=>{
          props?.setPrimaryKeyNo?.(data?.Code)
      }}/>
      </Box>
    </>
  )
}
