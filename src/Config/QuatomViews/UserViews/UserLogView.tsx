/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { Box, Paper } from '@mui/material'
import React from 'react'
import { QUANTOM_Table } from '../../../quantom_ui/account/config/mainAccount/view/MainAccountView';
import { useSelector } from 'react-redux';
import { form_state_selector, full_component_state, get_selected_menu_Code } from '../../../redux/store';
import { getValueByPropertyName } from '../../../CommonMethods';
import { GetUserLog } from './impl/UserLogImpl';
import { BasicKeysProps } from '../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper';


interface UserLogViewProps{
  UniqueId?:string;
}

export const UserLogView = (props?:UserLogViewProps) => {
   
  const[data,setData]=React.useState<any[]>([])
  const[keyNo,setKeyNo]=React.useState('');
  const[selectedMenuCode,setSelectedMenuCode]=React.useState('');
  // const[menuCode,setMenuCode]=React.useState('');

  const fullState= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""));
  const menuInfo= useSelector((state?:any)=>get_selected_menu_Code(state,props?.UniqueId??""));
  const method=fullState?.SetBasicKeysMethod;

  

  React.useEffect(()=>{
    let keys= method?.();
    let value= getValueByPropertyName(fullState?.QuantomFormCoreState,keys?.keyNoPropName??"");
    if(keyNo!== value){
      setKeyNo(value??"");
    }
    if(menuInfo!==selectedMenuCode){
      setSelectedMenuCode(menuInfo??"");
    }
  },[fullState])
  
  React.useEffect(()=>{

      console.warn('called')
      handleData(keyNo)

  },[keyNo])


  const handleData=async(keyNo?:string)=>{
    let res= await GetUserLog(selectedMenuCode,keyNo);
    console.warn(res)
    setData(res?.Response??[])
  }


  return (
     <Box Component={Paper}>
        <QUANTOM_Table height='300px' data={data} columns={
          [
            {field:"UserName",caption:"UserName",width:200},
            {field:"TransState",caption:"Action",width:100},
            {field:"TransTime",caption:"Tx Date",width:150,dataType:'date'},
            {field:"TransTime",caption:"Tx Time",width:150,dataType:'time'}


          ]
        } />
     </Box>
  )
}



