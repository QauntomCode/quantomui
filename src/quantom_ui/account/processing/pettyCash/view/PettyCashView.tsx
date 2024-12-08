/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  PaymentType, PettyCashModel } from '../model/PettyCashModel'
import {  MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { PettyCashList } from './PettyCashList'
import { PettyCashDelete, PettyCashGetOne,PettyCashInsert } from '../impl/PettyCashImp'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { safeParseToNumber } from '../../../../../CommonMethods'
import { RegisterAccountLOV } from '../../openingBalance/view/OpeningBalanceView'
import { GroupContainer } from '../../voucher/view/VoucherView'

export const PettyCashView = (props?:MenuComponentProps<PettyCashModel>) => {


    React.useEffect(()=>{
     props?.setInitOnLocationChange?.((loc)=>(props?.setState?.({...props?.state,LocId:loc?.LocId,Date:new Date()})))
     props?.setAfterResetMethod?.((loc)=>(props?.setState?.({LocId:loc?.LocId,Date:new Date()})))
     props?.setSaveMethod?.((payload)=>PettyCashInsert(payload))
     props?.setDeleteMethod?.((payload)=>PettyCashDelete(payload))
     props?.setListComponent?.((<PettyCashList {...props}/>))
     props?.setGetOneMethod?.((payload)=>PettyCashGetOne(payload))
     props?.setCompSettings?.({willShowLocations:true})
    },[]);

    const pay='Pay';
    const receive='Receive'

    const handlePayReceive=()=>{
      let obj:CommonCodeName[]=[
        {
          Code:pay,
          Name:pay  
        },
        {
          Code:receive,
          Name:receive
        }
      ]

      return Promise.resolve(obj);
    }

    const getSelected=():CommonCodeName=>{

        // alert(Paymentype[props?.state?.PayType??Paymentype.Paid])
       if( props?.state?.PayType===  PaymentType.Received){
        return {Code:receive,Name:receive}
       }
       else{
        return {Code:pay,Name:pay}
       }
    }

    const setPayType=(type?:string):void=>{
      if(type=== receive){
        props?.setState?.({...props?.state,PayType:PaymentType.Received})
      }
      else{
        props?.setState?.({...props?.state,PayType:PaymentType.Paid})
      }
   }
    
  return (
    <>
    <GroupContainer Label='Petty Cash Info'>
      <Quantom_Grid container xs={12} md={4} lg={3} xl={1.5}>
         <Quantom_Input label="Code" value={props?.state?.Code} disabled/>
      </Quantom_Grid>
      <Quantom_Grid container xs={12} md={4} lg={3} xl={1.5}>
         <QUANTOM_Date 
              value={dayjs( props?.state?.Date)} 
              onChange={(val)=>props?.setState?.({...props?.state,Date:val?.toDate()})} 
              label='Date' />
      </Quantom_Grid>

      <Quantom_Grid container xs={12} md={4} lg={3} xl={1.5}>
         <Quantom_LOV label='Type' FillDtaMethod={handlePayReceive} 
                      selected={getSelected()} 
                      onChange={(sel)=>{setPayType(sel?.Code)}} />
      </Quantom_Grid>

      <Quantom_Grid container xs={12} md={8} lg={6} xl={4}>
         <RegisterAccountLOV 
                
                selected={{Code:props?.state?.GlAccount,Name:props?.state?.glAccountRegisterAccount?.Name}}  
                onChange={(selected)=>{
                     props?.setState?.({...props?.state,GlAccount:selected?.Code,glAccountRegisterAccount:selected})
                }}
          />
        </Quantom_Grid>
        <Quantom_Grid container xs={12} md={4} lg={3} xl={1.5}>
            <Quantom_Input label="Amount" value={props?.state?.TotalAmount} 
                    onChange={(val)=>props?.setState?.({...props?.state,TotalAmount:safeParseToNumber(val.target?.value)})}/>
        </Quantom_Grid>

        <Quantom_Grid container xs={12} md={8} lg={6} xl={4}>
            <Quantom_Input label="Remarks" 
                  value={props?.state?.Remarks} 
                  onChange={(e)=>{props?.setState?.({...props?.state,Remarks:e.target.value})}}/>
         
        </Quantom_Grid>
        </GroupContainer>

    </>
  )
}



 