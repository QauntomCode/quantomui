/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  PaymentType, PettyCashModel } from '../model/PettyCashModel'
import {  MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
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
     
      setFormBasicKeys<PettyCashModel>({
      SaveMethod:(payload)=>PettyCashInsert(payload),
      DeleteMethod:(payload)=>PettyCashDelete(payload),
      GetOneMethod:(payload)=>PettyCashGetOne(payload),
      uniqueKey:props?.UniqueId??"",
      settings:{willShowLocations:true},
      InitOnLocationChange:(loc)=>(props?.setState?.({...props?.state,LocId:loc?.LocId,Date:new Date()})),
      AfterResetMethod:(loc)=>(props?.setState?.({LocId:loc?.LocId,Date:new Date()})),
      baseProps:props??{},
      SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
     })

    },[props]);

    React.useEffect(()=>{
       setTimeout(() => {
        props?.setListComponent?.((<PettyCashList {...props}/>))
       }, (500));
    },[])

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
    
      <Quantom_Grid mt={2} container >
        <Quantom_Grid size={{xs:12,sm:12,md:4,lg:3,xl:3}}>
         <Quantom_Input label="Code" value={props?.state?.Code} disabled/>
         </Quantom_Grid>
      </Quantom_Grid>
      <Quantom_Grid container mt={1}>
      <Quantom_Grid size={{xs:12,sx:12,md:4,lg:3,xl:3}}>
         <QUANTOM_Date 
              value={dayjs( props?.state?.Date)} 
              onChange={(val)=>props?.setState?.({...props?.state,Date:val?.toDate()})} 
              label='Date' />
            </Quantom_Grid>
      </Quantom_Grid>

      <Quantom_Grid container mt={1} >
      <Quantom_Grid size={{xs:12,sx:12,md:4,lg:3,xl:3}}>
         <Quantom_LOV label='Type' FillDtaMethod={handlePayReceive} 
                      selected={getSelected()} 
                      onChange={(sel)=>{setPayType(sel?.Code)}} />
        </Quantom_Grid>
      </Quantom_Grid>

      <Quantom_Grid container  mt={1}>
      <Quantom_Grid size={{xs:12,sx:12,md:4,lg:3,xl:3}}>
         <RegisterAccountLOV 
                
                selected={{Code:props?.state?.GlAccount,Name:props?.state?.glAccountRegisterAccount?.Name}}  
                onChange={(selected)=>{
                     props?.setState?.({...props?.state,GlAccount:selected?.Code,glAccountRegisterAccount:selected})
                }}
          />
        </Quantom_Grid>
        </Quantom_Grid>
        <Quantom_Grid container mt={1}>
        <Quantom_Grid size={{xs:12,sx:12,md:4,lg:3,xl:3}}>
            <Quantom_Input label="Amount" value={props?.state?.TotalAmount} 
                    onChange={(val)=>props?.setState?.({...props?.state,TotalAmount:safeParseToNumber(val.target?.value)})}/>
        </Quantom_Grid>
        </Quantom_Grid>

        <Quantom_Grid container mt={1}>
        <Quantom_Grid size={{xs:12,sx:12,md:4,lg:3,xl:3}}>
            <Quantom_Input multiline label="Remarks" 
                  value={props?.state?.Remarks} 
                  onChange={(e)=>{props?.setState?.({...props?.state,Remarks:e.target.value})}}/>
         
        </Quantom_Grid>
        </Quantom_Grid>

    </>
  )
}



 