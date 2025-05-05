/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { SubSubAccountModel } from '../model/subSubAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../../../../redux/store'
import { SubSubAccountGetAll } from '../impl/subSubAccountImpl'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box, Paper, useTheme } from '@mui/material'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps'
import { QuantomListViewButton } from '../../subAccount/view/SubAccountList'

export const SubSubAccountList = (props?:MenuComponentProps<SubSubAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as SubSubAccountModel[]

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const height=`calc(100vh - ${HeaderHeight})`
  const handleLoadSubAccountData=async()=>{
     let data= await SubSubAccountGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  const fonts= useQuantomFonts();
  const theme= useTheme();
  return (
    <>
    {/* <Box sx={{marginTop:'10px'}}> */}
      {/* <QUANTOM_Table height={height} columns={[{field:"Code",width:350},{field:'Name'},{field:'subAccount.Name'},{field:'subAccount.mainAccount.Name'}]} data={listData}
        onViewButtonClick={(data)=>{
            props?.setPrimaryKeyNo?.(data?.Code)
        }}/> */}
      {/* </Box> */}


      <Quantom_Grid spacing={1} container size={{xs:12}}>
        {
          listData?.map((item,index)=>{
            return(
                <Quantom_Grid  p={1} font component={Paper} size={{xs:12,sm:12,md:6,lg:4}} 
                    sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize,color:theme?.palette?.text?.disabled}}>
                   <Quantom_Grid borderBottom={`3px solid ${theme?.palette?.text?.disabled}`} container>
                      <div style={{display:'flex',flex:1,alignItems:'center'}}>
                          <IconByName fontSize='16px' color={theme?.palette?.text?.disabled} iconName='Looks3Outlined'/>
                          {item?.Name}
                      </div>
                      <div style={{display:'flex',alignItems:'center'}}></div>
                        <IconByName fontSize='16px' color={theme?.palette?.text?.disabled} iconName='Tag'/>
                      {item?.Code}
                   </Quantom_Grid>
                   {/* <Quantom_Grid pb={.5} borderBottom={`.5px solid ${theme?.palette?.text?.disabled}`} container sx={{color:theme?.palette?.text?.primary}}>
                      <div><IconByName fontSize='16px' color={theme?.palette?.text?.disabled} iconName='AccountTreeOutlined'/></div>
                      {item?.Name}
                   </Quantom_Grid> */}
                   <Quantom_Grid mt={.5} alignItems='center' container>
                        <IconByName fontSize='15px' iconName='LooksTwoOutlined' color={theme.palette.text.disabled}/>
                        <div style={{marginLeft:'2px',fontSize:fonts.H4FontSize}}>{item?.subAccount?.Name}</div>
                   </Quantom_Grid>
                   <Quantom_Grid mt={.5} alignItems='center' container >
                       <div style={{display:'flex',flex:1}}>
                          <IconByName fontSize='15px' iconName='LooksOneOutlined' color={theme.palette.text.disabled}/>
                          <div style={{marginLeft:'2px',fontSize:fonts.H4FontSize}}>{item?.subAccount?.mainAccount?.Name}</div>
                       </div>
                       <div style={{flex:.5}}>
                        <QuantomListViewButton onClick={()=>{props?.setPrimaryKeyNo?.(item?.Code)}}/>
                       </div>
                   </Quantom_Grid>
                </Quantom_Grid>
            )
          })
        }
      </Quantom_Grid>
    </>
  )
}
