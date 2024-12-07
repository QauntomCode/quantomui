/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import {  MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'

import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { safeParseToNumber } from '../../../../../CommonMethods'
import { RegisterAccountLOV } from '../../openingBalance/view/OpeningBalanceView'
import { VMVoucherModel } from '../model/VmVoucherModel'
import { VoucherDelete, VoucherGetOne, VoucherInsert } from '../impl/vouchreImpl'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Paper } from '@mui/material'
import { VoucherDetailModel } from '../model/VoucherDetailModel'
import { useQuantomFonts } from '../../../../../redux/store'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { VoucherList } from './VoucherList'


export const VoucherView = (props?:MenuComponentProps<VMVoucherModel>) => {


    React.useEffect(()=>{
     props?.setInitOnLocationChange?.((loc)=>(props?.setState?.({...props?.state,voucher:{LocId:loc?.LocId,VDate:new Date()},details:[]})))
     props?.setAfterResetMethod?.((loc)=>(props?.setState?.({...props?.state,voucher:{LocId:loc?.LocId,VDate:new Date()},details:[]})))
     props?.setSaveMethod?.((payload)=>VoucherInsert(payload))
     props?.setDeleteMethod?.((payload)=>VoucherDelete(payload))
     props?.setListComponent?.((<VoucherList {...props}/>))
     props?.setGetOneMethod?.((payload)=>VoucherGetOne(payload))
     props?.setCompSettings?.({willShowLocations:true})
    },[]);
     
    const [vDetail,setVDetail]=React.useState<VoucherDetailModel>()

    const totalDebit= parseFloat( props?.state?.details?.reduce((sum,cur)=>sum+parseFloat(cur?.Debit?.toString()??"0"),0).toString()??"0");
    const totalCredit= parseFloat(props?.state?.details?.reduce((sum,cur)=>sum+safeParseToNumber(cur?.Credit?.toString()??"0"),0).toString()??"0");
    const vDetailRef= React.useRef<any>(null);
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
           <Quantom_Grid item xs={lineSize.GL_ACCOUNT_SIZE}>
               <RegisterAccountLOV  ref={vDetailRef} selected={{ Code:vDetail?.registerAccount?.Code,Name:vDetail?.registerAccount?.Name}}
                          onChange={(selected)=>{setVDetail({...vDetail,Code:selected?.Code,registerAccount:selected})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={lineSize.NARRATION_SIZE}>
               <Quantom_Input label='Narration' value={vDetail?.Remarks} onChange={(e)=>{setVDetail({...vDetail,Remarks:e.target.value})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={lineSize.DEBIT_SIZE} >
           <Quantom_Input label='Debit' value={vDetail?.Debit} onChange={(e)=>{setVDetail({...vDetail,Debit:safeParseToNumber( e.target.value),Credit:0})}}/>
           </Quantom_Grid>
           <Quantom_Grid item xs={lineSize.CREDIT_SIZE}>
           <Quantom_Input label='Credit' value={vDetail?.Credit} onChange={(e)=>{setVDetail({...vDetail,Debit:0,Credit:safeParseToNumber( e.target.value)})}}/>
           </Quantom_Grid>

           <Quantom_Grid item xs={lineSize.BUTTON_SIZE} >
             <Button onClick={()=>{
                if(!vDetail?.registerAccount?.Code){
                  props?.errorToast?.('Select GlAccount first')
                  return;
                }
                if(!vDetail?.Debit && !vDetail?.Credit){
                  props?.errorToast?.('Enter Debit or Credit')
                  return;
                }
                props?.setState?.({...props?.state, details:[...props?.state?.details??[],{...vDetail,registerAccount:{...vDetail?.registerAccount}}]})
                setVDetail({});
                if(vDetailRef?.current){
                  alert('have current ref')
                }
                vDetailRef?.current?.focus();
             }} sx={{marginTop:'10px'}} fullWidth size='small' variant='contained'>
                <AddCircleIcon fontSize='medium'/>
             </Button>
           </Quantom_Grid>
        </Quantom_Grid>

        
          {
            props?.state?.details?.map((item,index)=>{
              return(<RenderVoucherDetail key={index} detail={item} basePorps={props}/>)
            })
          }

        <Quantom_Grid container spacing={.5}>
             <Quantom_Grid item xs={12-(lineSize.DEBIT_SIZE+lineSize.CREDIT_SIZE+lineSize.BUTTON_SIZE)}/>

             <Quantom_Grid item xs={lineSize.DEBIT_SIZE}>
                <Quantom_Input value={totalDebit} label='Total Debit' disabled/>
             </Quantom_Grid>
             
             <Quantom_Grid item xs={lineSize.CREDIT_SIZE}>
                <Quantom_Input value={totalCredit} label='Total Credit' disabled/>
             </Quantom_Grid>

        </Quantom_Grid>
        
      

    </>
  )
}

interface VoucherDetailProps{
  basePorps?:MenuComponentProps<VMVoucherModel>;
  detail?:VoucherDetailModel;
  index?:number;
}
export const RenderVoucherDetail=(props?:VoucherDetailProps)=>{
  const font= useQuantomFonts();
  const style={
    fontFamily:font.RegularFont,fontWeight:500,fontSize:'10px'
  }
  return(
    <>
      <Quantom_Grid container xs={12} sx={{marginTop:'4px'}} component={Paper} display='flex' alignItems='center' spacing={.5}>
        <Quantom_Grid item xs={lineSize.GL_ACCOUNT_SIZE} sx={style} justifyContent='center' alignItems='center' display='flex'>
            <Box onClick={()=>{
               let d= [...props?.basePorps?.state?.details??[]];
               d.splice(props?.index??-1,1);
               props?.basePorps?.setState?.({...props?.basePorps?.state,details:d});
            }}>
              <DeleteOutlineRoundedIcon fontSize='small' />
            </Box>
            <Box style={{flex:1}}>
          {props?.detail?.registerAccount?.Name}
            </Box>
        </Quantom_Grid>
        <Quantom_Grid item xs={lineSize.NARRATION_SIZE} sx={style}>
            {props?.detail?.Remarks}
        </Quantom_Grid>
        <Quantom_Grid item xs={lineSize.DEBIT_SIZE} display='flex' justifyContent='right' sx={style}>
            {props?.detail?.Debit}
        </Quantom_Grid>
        <Quantom_Grid item xs={lineSize.CREDIT_SIZE} display='flex' justifyContent='right' sx={style}>
            {props?.detail?.Credit}
        </Quantom_Grid>
      </Quantom_Grid>
    </>
  )

  

}




 const lineSize={
  GL_ACCOUNT_SIZE:4,
  NARRATION_SIZE:4,
  DEBIT_SIZE:1.5,
  CREDIT_SIZE:1.5,
  BUTTON_SIZE:1,

}
 