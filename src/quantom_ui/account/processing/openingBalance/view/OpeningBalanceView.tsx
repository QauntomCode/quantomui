/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  OpeningBalanceModel } from '../model/OpeningBalanceModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { OpeningBalanceList } from './OpeningBalanceList'
import {  RegisterAccountGetCodeName } from '../../../config/registerAccount/impl/registerAccountIml'
import { OpeningBalanceDelete, OpeningBalanceGetOne, OpeningBalanceInsert } from '../impl/openingBalanceIml'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { Paper } from '@mui/material'
import { safeParseToNumber } from '../../../../../CommonMethods'

export const OpeningBalanceView = (props?:MenuComponentProps<OpeningBalanceModel>) => {


    React.useEffect(()=>{
     props?.setSaveMethod?.((payload)=>OpeningBalanceInsert(payload))
     props?.setDeleteMethod?.((payload)=>OpeningBalanceDelete(payload))
     props?.setListComponent?.((<OpeningBalanceList {...props}/>))
     props?.setGetOneMethod?.((payload)=>OpeningBalanceGetOne(payload))
    },[])

    
  return (
    <>

       <Quantom_Grid container spacing={0.5}>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
            <Quantom_Input  disabled label='OP Code' value={props?.state?.OpCode} />
          </Quantom_Grid>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
            <QUANTOM_Date disabled label='OP Code' value={dayjs(props?.state?.Date??new Date())}
                onChange={(date)=>{
                  props?.setState?.({...props?.state,Date:date?.toDate()})
                }} />
          </Quantom_Grid>
        </Quantom_Grid>
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
        <RegisterAccountLOV onChange={(sel)=>{
            props?.setState?.({...props?.state,Code:sel?.Code,registerAccount:{Code:sel?.Code,Name:sel?.Name}})}
            } 
            selected={{Code:props?.state?.Code,Name:props?.state?.registerAccount?.Name}}/> 
        </Quantom_Grid>
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <Quantom_Input label='Type'/>
        </Quantom_Grid>
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <Quantom_Input value={props?.state?.Amount} label='Amount' onChange={(e)=>{
            props?.setState?.({...props?.state, Amount:safeParseToNumber(e?.target?.value)})
          }}/>
        </Quantom_Grid>
      
        
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <Quantom_Input label='Remarks' value={props?.state?.Remarks} onChange={(e)=>{
             props?.setState?.({...props?.state,Remarks:e?.target?.value}) 
          }
          }/>
        </Quantom_Grid>
      {/* </Quantom_Grid> */}
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
         FillDtaMethod={handleRegisterAccount} label='GL Account' />
   )
}
