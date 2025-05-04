/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { HideLoadingDialog, IconByName, MenuComponentProps, ShowLoadingDialog } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { PaymentType, PettyCashModel } from '../model/PettyCashModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, get_component_selected_locations, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { PettyCashGetAll } from '../impl/PettyCashImp'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { Box, Button, IconButton, Paper,useTheme } from '@mui/material'
import SearchButtonIcon from '@mui/icons-material/FindInPageOutlined';
import { HeaderHeight } from '../../../../../CommonMethods'
import { ListCompButton } from '../../../report/Ledger/view/LedgerView'
import { FilterHandler, useIsMobile } from '../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty'
import { QuantomListViewButton } from '../../../config/subAccount/view/SubAccountList'


export const PettyCashList = (props?:MenuComponentProps<PettyCashModel>) => {
  const location= useSelector((state:any)=>get_component_selected_locations(state,props?.UniqueId??""));
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as PettyCashModel[]
  const[fromDate,setFromDate]=React.useState(new Date())
  const[toDate,setToDate]=React.useState(new Date())
  const[searchText,setSearchText]=React.useState("")

  React.useEffect(()=>{
     handleLoadSubAccountData(new Date(),new Date(),'');
  },[])
  
  const handleLoadSubAccountData=async(fromDate1?:Date,toDate1?:Date,searchText1?:string)=>{
     ShowLoadingDialog();
     try{
        let data= await PettyCashGetAll(fromDate1,toDate1,searchText1,location?.LocId);
        console.log('data of ')
        store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
     }
     finally{
       HideLoadingDialog();
     }
  }

  const isMobile= useIsMobile();
  const theme= useTheme();
  const fonts= useQuantomFonts();

  const height= `calc(100vh - ${HeaderHeight})`
  return (
    <Box>
      <FilterHandler OkAndAplyFilter={()=>{handleLoadSubAccountData(fromDate,toDate,searchText)}}>
          <Quantom_Grid container spacing={.5} sx={{marginBottom:'5px'}} display='flex' alignItems='center'>
              <Quantom_Grid item size={{xs:12,sm:6,md:3,lg:2,xl:2}} xs={12} sm={6} md={3} lg={2} xl={2}>
                <QUANTOM_Date label='From Date' value={dayjs(fromDate)} onChange={(date)=>{setFromDate(date?.toDate()??new Date())}}/>
              </Quantom_Grid>
              <Quantom_Grid item size={{xs:12,sm:6,md:3,lg:2,xl:2}} xs={12} sm={6} md={3} lg={2} xl={2}>
                <QUANTOM_Date label='To Date' value={dayjs(toDate)} onChange={(date)=>{setToDate(date?.toDate()??new Date())}}/>
              </Quantom_Grid>
              <Quantom_Grid item size={{xs:12,sm:6,md:4,lg:7,xl:7}} xs={12} sm={6} md={4} lg={7} xl={7}>
                <Quantom_Input label='Search' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
              </Quantom_Grid>
              {
                isMobile?(<></>):(<>
                  <Quantom_Grid item size={{xs:12,sm:6,md:2,lg:1,xl:1}} xs={12} sm={6} md={2} lg={1} xl={1}>
                  <QuantomListSearchButton  onClick={()=>{
                    handleLoadSubAccountData(fromDate,toDate,searchText)
                  }}/>
                  </Quantom_Grid>
                </>)
              }
              
          </Quantom_Grid>
      </FilterHandler>

      <Quantom_Grid  mt={1} spacing={1} container >
          {
            listData?.map((item,index)=>{
              return(
                <Quantom_Grid  p={1} borderBottom={`1px solid ${theme?.palette?.primary.main}`}  component={Paper} container size={{xs:12,sm:12,md:6,lg:4,xl:3}}
                    sx={{fontFamily:fonts?.HeaderFont,fontSize:'12px',color:theme?.palette?.text?.disabled}}>
                      <Quantom_Grid display='flex' size={{xs:12}}>
                        <Quantom_Grid flex={1}>
                            <IconByName iconName='LocationOnOutlined' fontSize='16px' color={theme?.palette?.text?.disabled} />
                            {item?.Location?.LocName}
                        </Quantom_Grid>

                        <Quantom_Grid justifyContent='right' >
                            <IconByName iconName='CalendarTodayOutlined' fontSize='14px' color={theme?.palette?.text?.disabled} />
                            {dayjs(item?.Date)?.format('DD/MMM/YYYY')}
                        </Quantom_Grid>
                      </Quantom_Grid>

                      <Quantom_Grid size={{xs:12}} sx={{color:theme?.palette?.text?.primary}}>
                            <IconByName iconName='DynamicFormOutlined' fontSize='16px'  />
                            {item?.glAccountRegisterAccount?.Name}
                      </Quantom_Grid>




                      <Quantom_Grid display='flex' size={{xs:12}}>
                        <Quantom_Grid flex={1} sx={{color:theme?.palette?.text?.primary,fontWeith:'bold'}}>
                            {/* <IconByName iconName='LocationOnOutlined' fontSize='16px' color={theme?.palette?.text?.disabled} /> */}
                            {item?.PayType=== PaymentType.Received ?"Receive : "+item?.TotalAmount:"Pay : "+item?.TotalAmount}
                            {/* {item?.TotalAmount} */}
                        </Quantom_Grid>

                        <Quantom_Grid flex={1} justifyContent='right' >
                            <QuantomListViewButton  onClick={()=>{props?.setPrimaryKeyNo?.(item?.Code)}}/>
                        </Quantom_Grid>
                      </Quantom_Grid>
                </Quantom_Grid>



              )
            })
          }
      </Quantom_Grid>
      {/* <QUANTOM_Table height={height} columns={
        [
          {field:"Location.LocName",width:200,header:'Location'},
          {field:"Code",width:120,header:'Code'},
          {field:"Date",width:170,header:'Date',dataType:'date'},
          {field:"PayType",width:80,header:'Type',valueFormatter:(data:any)=>{
            if(data?.value===1){
              return "Receive"
            }
            else return "Pay"
          }
          },
          {field:"glAccountRegisterAccount.Name",width:300,header:'Name',},
          {field:"TotalAmount",width:90,header:'Amount'},
          {field:"Remarks",width:190,header:'Remarks'},

        ]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.Code)
        }}/> */}
    </Box>
  )
}

interface QuantomListSearchButtonProps{
  onClick?:()=>void
}

export const QuantomListSearchButton=(props?:QuantomListSearchButtonProps)=>{
 const theme= useTheme();
//  const fonts= useQuantomFonts();

  return(
    // <Box fullWidth  onClick={props?.onClick} component={Paper} >
      
      <ListCompButton onClick={props?.onClick} Label='Search' iconName='PageviewTwoTone'  />
    // </Box>
  )
}
