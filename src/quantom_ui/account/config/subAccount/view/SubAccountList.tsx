/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { SubAccountModel } from '../model/SubAccountModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../../../../redux/store'
import { SubAccountGetAll } from '../impl/subAccountImpl'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { QUANTOM_Table } from '../../mainAccount/view/MainAccountView'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box, Paper, useTheme } from '@mui/material'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps'

export const SubAccountList = (props?:MenuComponentProps<SubAccountModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as SubAccountModel[]
  const fonts= useQuantomFonts();
  const theme= useTheme();
  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await SubAccountGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  return (
    <>

      <Quantom_Grid spacing={1} mt={2} container>
          {
            listData?.map((item,index)=>{
              return(
                <Quantom_Grid p={1.5} component={Paper} 
                              borderBottom={`1px solid ${theme?.palette?.primary?.main}`}  
                              size={{xs:12,sm:12,md:6,lg:4,xl:3}} sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize}}>
                    <Quantom_Grid alignItems='center' display='flex' container sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}}>
                         <div style={{display:'flex',alignItems:'center',marginRight:'8px',flex:1}}>
                            <IconByName iconName='LooksTwoOutlined' fontSize='16px' color={theme?.palette?.text?.disabled}/>
                              <div style={{marginLeft:'3px'}}>
                              {item?.Name}
                              </div>
                          </div>
                         <div style={{alignItems:'center'}}>
                            <IconByName iconName='Tag' fontSize='16px'  color={theme?.palette?.text?.disabled}/>
                            {item?.Code}
                          </div>
                    </Quantom_Grid>
                    <Quantom_Grid mt={.5} alignItems='center' display='flex' container >
                         <div style={{display:'flex',alignItems:'center',marginRight:'8px',flex:1}}>
                            <IconByName iconName='LooksOneOutlined' fontSize='16px' color={theme?.palette?.text?.disabled}/>
                              <div style={{marginLeft:'3px'}}>
                              {item?.mainAccount?.Name}
                              </div>
                          </div>
                         <div style={{alignItems:'center',flex:1}}>
                             <QuantomListViewButton onClick={()=>{props?.setPrimaryKeyNo?.(item?.Code)}}/>
                          </div>
                    </Quantom_Grid>
                    {/* <div style={{display:'flex',alignItems:'center'}}>
                      <IconByName fontSize='15px' iconName='Tag' color={theme.palette.text.disabled}/>
                        <div style={{marginLeft:'2px',color:theme?.palette?.text.disabled,letterSpacing:1.5}}>{item?.Code}</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',borderBottom:`.5px solid ${theme.palette.text.disabled}`,paddingBottom:'3px'}}>
                      <IconByName iconName='AccountTreeOutlined' color={theme.palette.text.disabled}/>
                        <div style={{marginLeft:'2px',fontSize:fonts.H3FontSize}}>{item?.Name}</div>
                    </div>
                    <div style={{display:'flex'}}>
                      <div style={{display:'flex',flex:'1',alignItems:'center',marginTop:'3px'}}>
                        <IconByName fontSize='15px' iconName='LooksOneOutlined' color={theme.palette.text.disabled}/>
                          <div style={{marginLeft:'2px',fontSize:fonts.H4FontSize}}>{item?.mainAccount?.Name}</div>
                      </div>
                      <div style={{display:'flex',flex:'.75',alignItems:'center',marginTop:'3px'}}>
                            <QuantomListViewButton onClick={()=>{props?.setPrimaryKeyNo?.(item?.Code)}}/>
                      </div> 

                    </div>*/}
                </Quantom_Grid>
              )
            })
          }
      </Quantom_Grid>
     {/* <Box sx={{marginTop:'10px'}}>
      <QUANTOM_Table height={height} columns={[{field:"Code",width:350},{field:'Name'},{field:'mainAccount.Name'}]} data={listData}
      onViewButtonClick={(data)=>{
          props?.setPrimaryKeyNo?.(data?.Code)
      }}/>
      </Box> */}
    </>
  )
}

export interface QuantomListViewProps{
   onClick?:()=>void;
}

export const QuantomListViewButton=(props?:QuantomListViewProps)=>{
  const theme= useTheme();
  const fonts= useQuantomFonts();
  return(
    <Box pr={1} display='flex' alignItems='center' justifyContent='center' component={Paper} onClick={()=>{
        props?.onClick?.();
     }} style={{
                      height:'100%',width:'100%',
                      backgroundColor:theme?.palette?.secondary?.main,
                      border:'none',
                      fontFamily:fonts.HeaderFont,fontWeight:'bold',
                      color:theme?.palette?.secondary?.contrastText,
                      marginRight:'10px'
                      }}>
        <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
         View
         </div> 
         <IconByName color={theme?.palette?.secondary?.contrastText} iconName="EastOutlined"/>
     </Box>
  )
}