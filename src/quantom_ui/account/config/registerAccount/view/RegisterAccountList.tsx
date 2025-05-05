/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { RegisterAccountModel } from '../model/registerAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'
import { RegisterAccountGetAll } from '../impl/registerAccountIml'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box, Paper, useTheme } from '@mui/material'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps'
import { FixedSizeList as List } from 'react-window';
import { QuantomListViewButton } from '../../subAccount/view/SubAccountList'

export const RegisterAccountList = (props?:MenuComponentProps<RegisterAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as RegisterAccountModel[]

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])

  const height=`calc(100vh - ${HeaderHeight})`
  const handleLoadSubAccountData=async()=>{
     let data= await RegisterAccountGetAll('',true);
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }
 
  const theme= useTheme();
  const fonts= useQuantomFonts();
  return (
    <Quantom_Grid spacing={1} container size={{xs:12}}>
      {
        listData?.map((item,index)=>{
          return(
             <Quantom_Grid  p={1} component={Paper}  size={{xs:12,sm:12,md:6,lg:4,xl:4}} 
                          sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>
                <Quantom_Grid  display='flex' container alignItems='center' sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}}>
                  <div style={{flex:1,display:'flex',alignItems:'center'}}>
                      <IconByName fontSize='16px' iconName='DynamicFormOutlined' color={theme?.palette?.text.primary}></IconByName>
                      {item?.Name}
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <IconByName fontSize='16px' iconName='Tag' color={theme?.palette?.text?.disabled}></IconByName>
                    {item?.Code}
                  </div>
                 
                </Quantom_Grid>

                <Quantom_Grid pt={.5}  container alignItems='center'>
                  <IconByName fontSize='16px' iconName='Looks3Outlined' color={theme?.palette?.text.primary}></IconByName>
                  {item?.subSubAccount?.Name}
                </Quantom_Grid>

                <Quantom_Grid pt={.5}  container alignItems='center'>
                  <IconByName fontSize='16px' iconName='LooksTwoOutlined' color={theme?.palette?.text.primary}></IconByName>
                  {item?.subSubAccount?.subAccount?.Name}
                </Quantom_Grid>

                <Quantom_Grid pt={.5}  container alignItems='center'>
                  <IconByName fontSize='16px' iconName='LooksOneOutlined' color={theme?.palette?.text.primary}></IconByName>
                  {item?.subSubAccount?.subAccount?.mainAccount?.Name}
                </Quantom_Grid>

                <Quantom_Grid pt={.5}  container alignItems='center' sx={{color:theme?.palette?.primary.main,fontSize:fonts.H3FontSize}}>
                  <div style={{flex:1}}>
                    <IconByName fontSize='25px' iconName='AccountBalanceWalletOutlined' color={theme?.palette?.text.primary}></IconByName>
                    {item?.Balance}
                  </div>
                  <div style={{flex:.5}}>
                    <QuantomListViewButton onClick={()=>{
                       props?.setPrimaryKeyNo?.(item?.Code)
                    }}/>
                  </div>
                </Quantom_Grid>

             </Quantom_Grid>
          )
        })
      }
    </Quantom_Grid>
    // <Box sx={{marginTop:'10px'}}>
    //   <QUANTOM_Table height={height} columns={
    //     [
    //       {field:"Code",width:350,header:'Code'},
    //       {field:'Name',header:'Name'},
    //       {field:'Balance',header:'Balance'},
    //       {field:'subSubAccount.Name',header:'Sub Sub Account'},
    //       {field:'subSubAccount.subAccount.Name',header:'Sub Account'},
    //       {field:'subSubAccount.subAccount.mainAccount.Name',header:'Main Account'}
    //     ]} data={listData}
    //     onViewButtonClick={(data)=>{
    //         props?.setPrimaryKeyNo?.(data?.Code)
    //     }}/>
    // </Box>
  )
}
