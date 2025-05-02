import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { EmployeeModel, VmEmployee } from '../model/EmployeeModel'
import { useSelector } from 'react-redux'
import store, { full_component_state } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { EmployeeGetAll } from '../Imp/employeesImpl'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box } from '@mui/material'


export const EmployeeList=(props?:MenuComponentProps<VmEmployee>)=>{
     const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData

       React.useEffect(()=>{
        handleEmployeeListData();
       },[])

     const height=`calc(100vh - ${HeaderHeight})`

      const handleEmployeeListData=async()=>{
          let data= await EmployeeGetAll('');
          store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
       }

return (
    <Box sx={{marginTop:'10px'}}>
      <QUANTOM_Table height={height} columns={
        [
          {field:"EmpCode",width:350,header:'Code'},
          {field:'EmpName',header:'Name'},
          {field:'FName',header:'FName'},
          {field:'Email',header:'Email'},
          {field:'CellNo',header:'CellNo'},
          {field:'Address',header:'Address'},
          {field:'Remarks',header:'Remarks'}
        ]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.EmpCode)
        }}/>
    </Box>
  )
}