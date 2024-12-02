/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  OpeningBalanceModel } from '../model/PettyCashModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { OpeningBalanceList } from './PettyCashList'
import {  RegisterAccountGetCodeName } from '../../../config/registerAccount/impl/registerAccountIml'
import { OpeningBalanceDelete, OpeningBalanceGetOne, OpeningBalanceInsert } from '../impl/PettyCashImp'

export const OpeningBalanceView = (props?:MenuComponentProps<OpeningBalanceModel>) => {


    React.useEffect(()=>{
     props?.setSaveMethod?.((payload)=>OpeningBalanceInsert(payload))
     props?.setDeleteMethod?.((payload)=>OpeningBalanceDelete(payload))
     props?.setListComponent?.((<OpeningBalanceList {...props}/>))
     props?.setGetOneMethod?.((payload)=>OpeningBalanceGetOne(payload))
    },[])

    
  return (
    <>
      <Quantom_Grid container>

        {/* <RegisterAccountLOV onChange={(sel)=>{
            props?.setState?.({...props?.state,Code:sel?.Code,registerAccount:{Code:sel?.Code,Name:sel?.Name}})}
            } 
            selected={{Code:props?.state?.Code,Name:props?.state?.registerAccount?.Name}}/>  */}
        
      </Quantom_Grid>
    </>
  )
}



 interface RegisterAccountLOVProps{
 selected?:CommonCodeName;
 onChange?:(sel?:CommonCodeName)=>void;  
}
export const RegisterAccountLOV=(props?:RegisterAccountLOVProps)=>{
   const handleRegisterAccount=async()=>{
      let res= await RegisterAccountGetCodeName();
      return Promise.resolve(res);
   }
   return(
      <Quantom_LOV onChange={props?.onChange} 
         selected={props?.selected} 
         FillDtaMethod={handleRegisterAccount} label='Sub Sub Account' />
   )
}
