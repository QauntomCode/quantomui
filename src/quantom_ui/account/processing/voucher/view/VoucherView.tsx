/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode } from 'react'
import {  IconByName, MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
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
import { form_state_selector, set_form_state,  useQuantomFonts } from '../../../../../redux/store'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { VoucherList } from './VoucherList'
import { useTheme } from '@mui/material/styles'
import { ListCompButton } from '../../../report/Ledger/view/LedgerView'
import { useSelector } from 'react-redux'


export const VoucherView = (props?:MenuComponentProps<VMVoucherModel>) => {



  React.useEffect(()=>{
      setFormBasicKeys<VMVoucherModel>({
      SaveMethod:(payload)=>VoucherInsert(payload),
      DeleteMethod:(payload)=>VoucherDelete(payload),
      GetOneMethod:(payload)=>VoucherGetOne(payload),
      settings:{willShowLocations:true},
      uniqueKey:props?.UniqueId??"",
      InitOnLocationChange:(loc)=>(props?.setState?.({...props?.state,voucher:{LocId:loc?.LocId,VDate:new Date()},details:[]})),
      AfterResetMethod:(loc)=>(props?.setState?.({...props?.state,voucher:{LocId:loc?.LocId,VDate:new Date()},details:[]})),
      baseProps:props??{}
    })
  },[props?.fullState?.IsFirstUseEffectCall])

    React.useEffect(()=>{
     props?.setListComponent?.((<VoucherList {...props}/>))
    },[]);



    React.useEffect(()=>{
      
      if(props?.UniqueId){
        props?.AddComponentTabs?.([
          {
            TabCaption:"Voucher Detail",
            TabComponent:(<VoucherDetailTabComp  {...props} />),
            SortNumber:0
          }
        ])
      }
       
    },[props?.UniqueId])
     
  return (
    <>
     {/* <GroupContainer Label='Voucher Master Info'> */}
      <Quantom_Grid container  spacing={.5}>
        <Quantom_Grid item size={{xs:12,sm:6,md:3,lg:2,xl:1.5}}>
          <Quantom_Input label="VCode" value={props?.state?.voucher?.VCode} disabled/>
        </Quantom_Grid>
        <Quantom_Grid item size={{xs:12,sm:6,md:3,lg:2,xl:1.5}}>
          <QUANTOM_Date 
              value={dayjs( props?.state?.voucher?.VDate)} 
              onChange={(val)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VDate:val?.toDate()}})} 
              label='VDate' />
          </Quantom_Grid>
          <Quantom_Grid size={{xs:12,sm:12,md:3,lg:2,xl:1.5}}>
          <Quantom_Input 
              value={ props?.state?.voucher?.VType} 
               onChange={(e)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VType:e.target.value}})}
              label='V Type' />
          </Quantom_Grid>
      </Quantom_Grid>
      
        <Quantom_Grid container mt={1}  spacing={.5}>
          <Quantom_Grid item size={{xs:12,sm:12,md:3,lg:2,xl:1.5}}>
              <Quantom_Input label="RefNo" value={props?.state?.voucher?.VRefNo} 
                      onChange={(val)=>props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VRefNo:val.target?.value}})}/>
          </Quantom_Grid>
          <Quantom_Grid item size={{xs:12,sm:12,md:6,lg:4,xl:3}}>
            <Quantom_Input label="Remarks" 
                  value={props?.state?.voucher?.VRemarks} 
                  onChange={(e)=>{props?.setState?.({...props?.state,voucher:{...props?.state?.voucher,VRemarks:e.target.value}})}}/>
         
          </Quantom_Grid>
        </Quantom_Grid>
        {/* </GroupContainer> */}
       
    </>
  )
}




export const VoucherDetailTabComp=(props:MenuComponentProps<VMVoucherModel>)=>{
  

  const setState=(obj:VMVoucherModel)=>{
    set_form_state(props?.UniqueId,{...obj})
  }
  const state= useSelector((state:any)=>form_state_selector<VMVoucherModel>(state,props?.UniqueId||""));

  const [vDetail,setVDetail]=React.useState<VoucherDetailModel>()
  const totalDebit= parseFloat( state?.details?.reduce((sum,cur)=>sum+parseFloat(cur?.Debit?.toString()??"0"),0).toString()??"0");
  const totalCredit= parseFloat(state?.details?.reduce((sum,cur)=>sum+safeParseToNumber(cur?.Credit?.toString()??"0"),0).toString()??"0");
  const vDetailRef= React.useRef<any>(null);

  return(
    <>
    {/* <GroupContainer Label='Voucher Detail Line'> */}
          
    <Quantom_Grid container fullWidth  xs={12}  spacing={.5}>
      <Quantom_Grid item size={{md:lineSize.GL_ACCOUNT_SIZE}} >
          <RegisterAccountLOV   selected={{ Code:vDetail?.registerAccount?.Code,Name:vDetail?.registerAccount?.Name}}
                      onChange={(selected)=>{setVDetail({...vDetail,Code:selected?.Code,registerAccount:selected})}}/>
      </Quantom_Grid>
      <Quantom_Grid item size={{md:lineSize.NARRATION_SIZE}} >
          <Quantom_Input label='Narration' value={vDetail?.Remarks} onChange={(e)=>{setVDetail({...vDetail,Remarks:e.target.value})}}/>
      </Quantom_Grid>
      <Quantom_Grid item size={{md:lineSize.DEBIT_SIZE}} >
      <Quantom_Input label='Debit' value={vDetail?.Debit} onChange={(e)=>{setVDetail({...vDetail,Debit:safeParseToNumber( e.target.value),Credit:0})}}/>
      </Quantom_Grid>
      <Quantom_Grid item size={{md:lineSize.CREDIT_SIZE}}>
      <Quantom_Input label='Credit' value={vDetail?.Credit} onChange={(e)=>{setVDetail({...vDetail,Debit:0,Credit:safeParseToNumber( e.target.value)})}}/>
      </Quantom_Grid>
     
      <Quantom_Grid item size={{md:lineSize.BUTTON_SIZE}} >
        <ListCompButton onClick={()=>{
            if(!vDetail?.registerAccount?.Code){
              props?.errorToast?.('Select GlAccount first')
              return;
            }
            if(!vDetail?.Debit && !vDetail?.Credit){
              props?.errorToast?.('Enter Debit or Credit')
              return;
            }
            setState?.({...props?.state, details:[...state?.details??[],{...vDetail,registerAccount:{...vDetail?.registerAccount}}]})
            setVDetail({});
            if(vDetailRef?.current){
              alert('have current ref')
            }
            vDetailRef?.current?.focus();
        }} Label='Add' iconName='AddCircleTwoTone'>
            {/* <AddCircleIcon fontSize='medium'/> */}
        </ListCompButton>
      </Quantom_Grid>
    </Quantom_Grid>

    {
      state?.details?.map((item,index)=>{
        return(<RenderVoucherDetail key={index} detail={item} basePorps={props}/>)
      })
    }
  {/* </GroupContainer> */}
  
    
       <Quantom_Grid mt={1.5} container display='flex' justifyContent='flex-end'>
        {/* <GroupContainer Label='Voucher Summary'> */}
          <Quantom_Grid container  xs={12} spacing={.5}>
          <Quantom_Grid item xs={6} >
              <Quantom_Input value={totalDebit} label='Total Debit' disabled/>
          </Quantom_Grid>
          
          <Quantom_Grid item xs={6}>
              <Quantom_Input value={totalCredit} label='Total Credit' disabled/>
          </Quantom_Grid>
          </Quantom_Grid>
        {/* </GroupContainer> */}
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
    fontFamily:font.HeaderFont,fontSize:'10px'
  }

  return(
    <>
      <Quantom_Grid pt={.5} pb={.5} container xs={12} sx={{marginTop:'4px'}} component={Paper}  alignItems='center' spacing={.5}>
        <Quantom_Grid item size={{xs:lineSize.GL_ACCOUNT_SIZE}} xs={lineSize.GL_ACCOUNT_SIZE} sx={style} justifyContent='center' alignItems='center' display='flex'>
            <Box onClick={()=>{
               let d= [...props?.basePorps?.state?.details??[]];
               d.splice(props?.index??-1,1);
               props?.basePorps?.setState?.({...props?.basePorps?.state,details:d});
            }}>
              <IconByName iconName='DeleteOutlined' fontSize='16px'/>
              {/* <DeleteOutlineRoundedIcon fontSize='small' sx={{fontSize:'12px'}} /> */}
            </Box>
            <Box style={{flex:1}}>
          {props?.detail?.registerAccount?.Name}
            </Box>
        </Quantom_Grid>
        <Quantom_Grid item size={{xs:lineSize.NARRATION_SIZE}} xs={lineSize.NARRATION_SIZE} sx={style}>
            {props?.detail?.Remarks}
        </Quantom_Grid>
        <Quantom_Grid item size={{xs:lineSize.DEBIT_SIZE}} xs={lineSize.DEBIT_SIZE} display='flex' justifyContent='right' sx={style}>
            {props?.detail?.Debit}
        </Quantom_Grid>
        <Quantom_Grid item size={{xs:lineSize.CREDIT_SIZE}} xs={lineSize.CREDIT_SIZE} display='flex' justifyContent='right' sx={style}>
            {props?.detail?.Credit}
        </Quantom_Grid>
      </Quantom_Grid>
    </>
  )

  

}




 const lineSize={
  GL_ACCOUNT_SIZE:4,
  NARRATION_SIZE:4.5,
  DEBIT_SIZE:1.5,
  CREDIT_SIZE:1.5,
  BUTTON_SIZE:.5,

}
 

export interface GroupContainerProps{
  children?:ReactNode;
  Label?:string;
  height?:string;
}

export const GroupContainer=(props?:GroupContainerProps)=>{
  const theme= useTheme();
  const fonts= useQuantomFonts();
  return(
    // <Box 
    //     fullWidth 
    //     component={Paper}  
    //     sx={{borderBottom:`.5px solid ${theme?.palette?.primary?.main}`,paddingBottom:'8px',marginTop:'15px',backgroundColor:theme?.palette?.background?.paper }}>
    //         <Box sx={{borderBottom:`.5px solid ${theme?.palette?.primary?.main}`,padding:'2px 10px',fontFamily:fonts?.HeaderFont,
    //            fontSize:'12px',fontWeight:'bold',letterSpacing:1.2,color:theme.palette.text.primary,borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}>
    //             {props?.Label}
    //         </Box>
    //         <Box sx={{paddingLeft:'8px',paddingRight:'8px',height:props?.height??undefined,overflowY: props?.height?'scroll':undefined,}}>
    //           {
    //             <div style={{marginTop:'8px'}}>
    //               {
    //                 props?.children
    //               }
    //             </div>
    //           }
    //         </Box>

      
    // </Box>

    <>
      {props?.children}
    </>
  )
}