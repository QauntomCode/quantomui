/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { SubSubAccountModel } from '../model/subSubAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { SubSubAccountGetAll } from '../impl/subSubAccountImpl'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box } from '@mui/material'

export const SubSubAccountList = (props?:MenuComponentProps<SubSubAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const height=`calc(100vh - ${HeaderHeight})`
  const handleLoadSubAccountData=async()=>{
     let data= await SubSubAccountGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  return (
    <>
    <Box sx={{marginTop:'10px'}}>
      <QUANTOM_Table height={height} columns={[{field:"Code",width:350},{field:'Name'},{field:'subAccount.Name'},{field:'subAccount.mainAccount.Name'}]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.Code)
        }}/>
      </Box>
    </>
  )
}
