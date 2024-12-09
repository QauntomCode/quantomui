/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { PettyCashModel } from '../model/PettyCashModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, get_component_selected_locations, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { PettyCashGetAll } from '../impl/PettyCashImp'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { QUANTOM_Date } from '../../../../../quantom_comps/BaseComps/Quantom_Date'
import dayjs from 'dayjs'
import { Box, Button, IconButton, Paper } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import SearchButtonIcon from '@mui/icons-material/FindInPageOutlined';
import { HeaderHeight } from '../../../../../CommonMethods'


export const PettyCashList = (props?:MenuComponentProps<PettyCashModel>) => {
  const location= useSelector((state:any)=>get_component_selected_locations(state,props?.UniqueId??""));
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData
  const[fromDate,setFromDate]=React.useState(new Date())
  const[toDate,setToDate]=React.useState(new Date())
  const[searchText,setSearchText]=React.useState("")

  React.useEffect(()=>{
     handleLoadSubAccountData(new Date(),new Date(),'');
  },[])
  
  const handleLoadSubAccountData=async(fromDate1?:Date,toDate1?:Date,searchText1?:string)=>{
     let data= await PettyCashGetAll(fromDate1,toDate1,searchText1,location?.LocId);
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  const height= `calc(100vh - ${HeaderHeight})`
  return (
    <Box>
      <Quantom_Grid container spacing={.5} sx={{marginBottom:'5px'}} display='flex' alignItems='center'>
          <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
            <QUANTOM_Date label='From Date' value={dayjs(fromDate)} onChange={(date)=>{setFromDate(date?.toDate()??new Date())}}/>
          </Quantom_Grid>
          <Quantom_Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
            <QUANTOM_Date label='To Date' value={dayjs(toDate)} onChange={(date)=>{setToDate(date?.toDate()??new Date())}}/>
          </Quantom_Grid>
          <Quantom_Grid item xs={12} sm={6} md={4} lg={7} xl={7}>
            <Quantom_Input label='Search' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
          </Quantom_Grid>
          <Quantom_Grid item xs={12} sm={6} md={2} lg={1} xl={1}>
            <QuantomListSearchButton  onClick={()=>{
              handleLoadSubAccountData(fromDate,toDate,searchText)
            }}/>
          </Quantom_Grid>
      </Quantom_Grid>
      <QUANTOM_Table height={height} columns={
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
        }}/>
    </Box>
  )
}

interface QuantomListSearchButtonProps{
  onClick?:()=>void
}

export const QuantomListSearchButton=(props?:QuantomListSearchButtonProps)=>{
 const theme= useTheme();
 const fonts= useQuantomFonts();

  return(
    <Box  onClick={props?.onClick} component={Paper}  sx={{
      width:'100%',height:'100%',backgroundColor:theme.palette.primary.light,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px',marginTop:'8px',
      padding:'5px 0px',
    
    }} display='flex' alignItems='center' justifyContent='center'> 
       <div style={{marginLeft:'10px'}}>
          <SearchButtonIcon fontSize='small' sx={{color:theme.palette.primary.contrastText}}/>
       </div>
       <div style={{fontFamily:fonts?.HeaderFont,fontSize:fonts?.H3FontSize,color:theme.palette.primary.contrastText,flex:1,display:'flex', alignItems:'center',justifyContent:'center'}}>
          Search
        </div>
    </Box>
  )
}
