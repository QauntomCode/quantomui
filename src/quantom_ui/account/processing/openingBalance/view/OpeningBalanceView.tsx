/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  OpeningBalanceModel } from '../model/OpeningBalanceModel'
import { MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV, Quantom_LOV_PROPS } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { OpeningBalanceList } from './OpeningBalanceList'
import {  RegisterAccountGetCodeName } from '../../../config/registerAccount/impl/registerAccountIml'
import { OpeningBalanceDelete, OpeningBalanceGetOne, OpeningBalanceInsert } from '../impl/openingBalanceIml'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { safeParseToNumber } from '../../../../../CommonMethods'
import { GetLocationsByUserId } from '../../../../Settings/Location/impl/LocationImpl'
import { GroupContainer } from '../../voucher/view/VoucherView'

export const OpeningBalanceView = (props?:MenuComponentProps<OpeningBalanceModel>) => {

  React.useEffect(()=>{
    console.log(props?.state)
  },[props?.state])

    React.useEffect(()=>{
      setFormBasicKeys<OpeningBalanceModel>({
        SaveMethod:(payload)=>OpeningBalanceInsert(payload),
        DeleteMethod:(payload)=>OpeningBalanceDelete(payload),
        GetOneMethod:(payload)=>OpeningBalanceGetOne(payload),
        uniqueKey:props?.UniqueId??"",
      })
    },[])


    React.useEffect(()=>{
       setTimeout(() => {
        props?.setListComponent?.((<OpeningBalanceList {...props}/>))
       }, (500));
    },[])


    
  return (
    <>
      <GroupContainer Label='Opening Balance Detail'>
       <Quantom_Grid container spacing={0.5}>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
            <Quantom_Input  disabled label='OP Code' value={props?.state?.OpCode} />
          </Quantom_Grid>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
            <QUANTOM_Date disabled label='OP Code' value={dayjs(props?.state?.Date)}
                onChange={(date)=>{
                  props?.setState?.({...props?.state,Date:date?.toDate()})
                }} />
          </Quantom_Grid>
        </Quantom_Grid>
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <LocationSelectorLOV onChange={(loc)=>{ 
               props?.setState?.({...props?.state,LocCode:loc?.Code,location:{LocId:loc?.Code,LocName:loc?.Name}})
          }} selected={{Code:props?.state?.LocCode,Name:props?.state?.location?.LocName}}/> 
        </Quantom_Grid>
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <RegisterAccountLOV onChange={(sel)=>{
              props?.setState?.({...props?.state,Code:sel?.Code,registerAccount:{Code:sel?.Code,Name:sel?.Name}})}
              } 
              selected={{Code:props?.state?.Code,Name:props?.state?.registerAccount?.Name}}/> 
        </Quantom_Grid>
        <Quantom_Grid container spacing={0.5}>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
            <Quantom_Input   label='Debit' value={props?.state?.Debit} 
                  onChange={(e)=>{props?.setState?.({...props?.state,Debit:safeParseToNumber(e?.target?.value),Credit:0})}}/>
          </Quantom_Grid>
          <Quantom_Grid  item xs={12} md={4} lg={3} xl={1.5}>
             <Quantom_Input   label='Credit' value={props?.state?.Credit} 
                    onChange={(e)=>{props?.setState?.({...props?.state,Credit:safeParseToNumber(e?.target?.value),Debit:0})}} />
          </Quantom_Grid>
        </Quantom_Grid>
      
        
        <Quantom_Grid  container xs={12} md={8} lg={6} xl={3}>
          <Quantom_Input label='Remarks' value={props?.state?.Remarks} onChange={(e)=>{
             props?.setState?.({...props?.state,Remarks:e?.target?.value}) 
          }
          }/>
        </Quantom_Grid>
        </GroupContainer>
      {/* </Quantom_Grid> */}
    </>
  )
}



 interface RegisterAccountLOVProps{
 selected?:CommonCodeName;
 onChange?:(sel?:CommonCodeName)=>void;  
 ref?: React.Ref<any>;
}
export const RegisterAccountLOV=(props?:RegisterAccountLOVProps)=>{
   React.useEffect(()=>{
      if(props?.ref){
        alert('ref is')
      }
   },[]) 
  const handleRegisterAccount=async()=>{
      let res= await RegisterAccountGetCodeName();
      return Promise.resolve(res);
   }
   return(
      <Quantom_LOV onChange={props?.onChange} 
         ref={props?.ref}
         selected={props?.selected} 
         FillDtaMethod={handleRegisterAccount} label='GL Account' />
   )
}



 export const LocationSelectorLOV=(props?:Quantom_LOV_PROPS)=>{
    const handleRegisterAccount=async()=>{
       let res= await GetLocationsByUserId();
       let locs= res?.map(x=>{ return {Code:x.LocId,Name:x.LocName}});
       return Promise.resolve(locs);
    }
    return(
       <Quantom_LOV selectedIndex={0} onChange={props?.onChange} 
          selected={props?.selected} 
          FillDtaMethod={handleRegisterAccount} label='Location' />
    )
 }