/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'

import { useSelector } from 'react-redux'
import store, { full_component_state, get_component_selected_locations, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { VMVoucherModel } from '../model/VmVoucherModel'
import { VoucherGetAll } from '../impl/vouchreImpl'
import { QuantomListSearchButton } from '../../pettyCash/view/PettyCashList'
import { HeaderHeight } from '../../../../../CommonMethods'
import { FilterHandler, useIsMobile } from '../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty'
import { useTheme,Paper } from '@mui/material'
import { QuantomListViewButton } from '../../../config/subAccount/view/SubAccountList'



export const VoucherList = (props?:MenuComponentProps<VMVoucherModel>) => {
  const location= useSelector((state:any)=>get_component_selected_locations(state,props?.UniqueId??""));
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as any[]
  const[fromDate,setFromDate]=React.useState(new Date())
  const[toDate,setToDate]=React.useState(new Date())
  const[searchText,setSearchText]=React.useState("")

  React.useEffect(()=>{
     handleLoadSubAccountData(new Date(),new Date(),'');
  },[])
  
  const handleLoadSubAccountData=async(fromDate1?:Date,toDate1?:Date,searchText1?:string)=>{
     let data= await VoucherGetAll(fromDate1,toDate1,searchText1,location?.LocId);
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  const fonts= useQuantomFonts();
  const theme= useTheme();
  // const height= `calc(100vh - ${HeaderHeight})`

  const isMobile= useIsMobile();
  return (
    <>
      <FilterHandler OkAndAplyFilter={()=>{
        handleLoadSubAccountData(fromDate,toDate,searchText)
      }}>
        <Quantom_Grid container spacing={.5} sx={{marginBottom:'5px'}} display='flex' alignItems='center'>
            <Quantom_Grid item size={{xs:12,sm:6,md:6,lg:2,xl:2}}>
              <QUANTOM_Date label='From Date' value={dayjs(fromDate)} onChange={(date)=>{setFromDate(date?.toDate()??new Date())}}/>
            </Quantom_Grid>
            <Quantom_Grid item size={{xs:12,sm:6,md:6,lg:2,xl:2}}>
              <QUANTOM_Date label='To Date' value={dayjs(toDate)} onChange={(date)=>{setToDate(date?.toDate()??new Date())}}/>
            </Quantom_Grid>
            <Quantom_Grid  size={{xs:12,sm:6,md:4,lg:7.5,xl:7.5}} item xs={12} sm={6} md={4} lg={7} xl={7}>
              <Quantom_Input label='Search' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            </Quantom_Grid>
            {
              isMobile?(<></>):(
                <Quantom_Grid item size={{xs:12,sm:6,md:2,lg:.5,xl:.5}}>
                  <QuantomListSearchButton  onClick={()=>{
                    handleLoadSubAccountData(fromDate,toDate,searchText)
                  }}/>
                </Quantom_Grid>
              )
            }
            
        </Quantom_Grid>
      </FilterHandler>

       <Quantom_Grid spacing={1} mt={1.5} container>
         {
            listData?.map((item,index)=>{
              return(
                <Quantom_Grid  p={1} component={Paper} container size={{xs:12,sm:12,md:6,lg:4}} sx={{fontFamily:fonts?.HeaderFont,fontSize:'12px',color:theme?.palette?.text?.disabled}}>
                       <Quantom_Grid sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}} display='flex' size={{xs:12}}>
                          <div style={{flex:1,display:'flex',alignItems:'center'}}>
                             <IconByName iconName='Tag' fontSize='16px' color={theme?.palette?.text?.disabled}/>
                              {item?.VCode}
                           </div>
                           <div style={{display:'flex',alignItems:'center'}}>
                             <IconByName iconName='DateRangeOutlined' fontSize='14px' color={theme?.palette?.text?.disabled}/>
                              {dayjs(item?.VDate).format('DD/MMM/YYYY')}
                           </div>
                       </Quantom_Grid>

                       <Quantom_Grid  display='flex' size={{xs:12}}>
                          <IconByName iconName='AbcOutlined' fontSize='14px' color={theme?.palette?.text?.disabled}/>
                          {item?.VRemarks}
                       </Quantom_Grid>


                       <Quantom_Grid  display='flex' size={{xs:12}}>
                          <div style={{flex:1,display:'flex',alignItems:'center'}}>
                             <IconByName iconName='Tag' fontSize='16px' color={theme?.palette?.text?.disabled}/>
                              {item?.FormName}
                           </div>
                           <div style={{flex:1,display:'flex',alignItems:'center'}}>
                             <QuantomListViewButton onClick={()=>{ props?.setPrimaryKeyNo?.(item?.VCode)}}/>
                           </div>
                       </Quantom_Grid>
                </Quantom_Grid>
              )
            })
         }
       </Quantom_Grid>

      {/* <QUANTOM_Table height={height} columns={
        [
          {field:"VCode",width:200,header:'VCode'},
          {field:"VDate",width:130,header:'VDate', dataType:'date'},
          {field:"VType",width:300,header:'VType', },
          {field:"EffectedHeads",width:400,header:'Account Heads', },
          {field:"VRemarks",width:300,header:'Remarks', },
          {field:"FormName",width:150,header:'FormName', },
          
        ]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.VCode)
        }}/> */}
    </>
  )
}

