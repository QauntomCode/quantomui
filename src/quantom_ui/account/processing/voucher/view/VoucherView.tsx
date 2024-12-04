/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { PettyCashList } from './PettyCashList'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { safeParseToNumber } from '../../../../../CommonMethods'
import { RegisterAccountLOV } from '../../openingBalance/view/OpeningBalanceView'
import { VMVoucherModel } from '../model/VmVoucherModel'
import { VoucherDelete, VoucherGetOne, VoucherInsert } from '../impl/vouchreImpl'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material'
import { VoucherDetailModel } from '../model/VoucherDetailModel'

export const VoucherView = (props?:MenuComponentProps<VMVoucherModel>) => {


    React.useEffect(()=>{
     props?.setInitOnLocationChange?.((loc)=>(props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,LocId:loc?.LocId,VDate:new Date()}})))
     props?.setAfterResetMethod?.((loc)=>(props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,LocId:loc?.LocId,VDate:new Date()}})))
     props?.setSaveMethod?.((payload)=>VoucherInsert(payload))
     props?.setDeleteMethod?.((payload)=>VoucherDelete(payload))
     props?.setListComponent?.((<PettyCashList {...props}/>))
     props?.setGetOneMethod?.((payload)=>VoucherGetOne(payload))
     props?.setCompSettings?.({willShowLocations:true})
    },[]);
     
    const [vDetail,setVDetail]=React.useState<VoucherDetailModel>()

    
  return (
    <>
      <Quantom_Grid container  spacing={.5}>
        <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={1.5}>
          <Quantom_Input label="VCode" value={props?.state?.voucher?.VCode} disabled/>
        </Quantom_Grid>
        <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={1.5}>
          <QUANTOM_Date 
              value={dayjs( props?.state?.voucher?.VDate)} 
              onChange={(val)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VDate:val?.toDate()}})} 
              label='VDate' />
          </Quantom_Grid>
          <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={1.5}>
          <Quantom_Input 
              value={ props?.state?.voucher?.VType} 
               onChange={(e)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VType:e.target.value}})}
              label='V Type' />
          </Quantom_Grid>
        </Quantom_Grid>
      
        <Quantom_Grid container  spacing={.5}>
          <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={1.5}>
              <Quantom_Input label="RefNo" value={props?.state?.voucher?.VRefNo} 
                      onChange={(val)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VRefNo:val.target?.value}})}/>
          </Quantom_Grid>
          <Quantom_Grid item xs={12} sm={6} md={9} lg={10} xl={10.5}>
            <Quantom_Input label="Remarks" 
                  value={props?.state?.voucher?.VRemarks} 
                  onChange={(e)=>{props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VRemarks:e.target.value}})}}/>
         
        </Quantom_Grid>
        </Quantom_Grid>
        

        <Quantom_Grid container sx={{marginTop:'10px'}} display='flex' justifyContent='center' alignItems='center'   spacing={.5}>
           <Quantom_Grid item xs={4}>
               <RegisterAccountLOV  selected={{ Code:vDetail?.registerAccount?.Code,Name:vDetail?.registerAccount?.Name}}
                          onChange={(selected)=>{setVDetail({...vDetail,registerAccount:selected})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={4}>
               <Quantom_Input label='Narration' value={vDetail?.Remarks} onChange={(e)=>{setVDetail({...vDetail,Remarks:e.target.value})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={1.5} >
           <Quantom_Input label='Debit' value={vDetail?.Debit} onChange={(e)=>{setVDetail({...vDetail,Debit:safeParseToNumber( e.target.value),Credit:0})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={1.5}>
           <Quantom_Input label='Credit' value={vDetail?.Credit} onChange={(e)=>{setVDetail({...vDetail,Debit:0,Credit:safeParseToNumber( e.target.value)})}}/>
           </Quantom_Grid>

           <Quantom_Grid item xs={1} >
             <Button sx={{marginTop:'10px'}} fullWidth size='small' variant='contained'>
                <AddCircleIcon fontSize='medium'/>
             </Button>
           </Quantom_Grid>
        </Quantom_Grid>
      

    </>
  )
}



 