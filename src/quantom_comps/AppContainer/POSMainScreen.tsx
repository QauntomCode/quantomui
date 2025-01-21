/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { MenuComponentProps, setFormBasicKeys } from './Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import { full_component_state } from '../../redux/store'
import { Grid2 } from '@mui/material';

export interface model{
    testing?:string;
}
export const POSMainScreen = (props?:MenuComponentProps<model>) => {
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<model>({
            // SaveMethod:(payload)=>SetupFormInsert(payload,props?.MenuCode),
            // DeleteMethod:(payload)=>SetupFormDelete(payload,props?.MenuCode),
            // GetOneMethod:(payload)=>SetupFormGetOne(payload,props?.MenuCode),
            // SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })
        }
    },[fullState?.IsFirstUseEffectCall])
  return (
    
    <Grid2>
       
    </Grid2>
  )
}






