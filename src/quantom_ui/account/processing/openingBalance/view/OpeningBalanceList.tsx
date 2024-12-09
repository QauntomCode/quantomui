/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { OpeningBalanceModel } from '../model/OpeningBalanceModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { OpeningBalanceGetAll } from '../impl/openingBalanceIml'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'
import { Box } from '@mui/material'
import { HeaderHeight } from '../../../../../CommonMethods'

export const OpeningBalanceList = (props?:MenuComponentProps<OpeningBalanceModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await OpeningBalanceGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  const height= `calc(100vh - ${HeaderHeight})`
  return (
    <Box>
      <QUANTOM_Table height={height} columns={
        [
          {field:"location.LocName",width:350,header:'Location'},
          {field:'OpCode',header:'OPCode'},
          {field:'Date',header:'Date',dataType:'date'},
          {field:'registerAccount.Name',header:'GL Account',},
          {field:'Debit',header:'Debit'},
          {field:'Credit',header:'Credit'},
          {field:'Remarks',header:'Remarks'}
        ]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.OpCode)
        }}/>
    </Box>
  )
}
