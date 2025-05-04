/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { OpeningBalanceModel } from '../model/OpeningBalanceModel'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { OpeningBalanceGetAll } from '../impl/openingBalanceIml'
import { QUANTOM_Table } from '../../../config/mainAccount/view/MainAccountView'
import { Box, useTheme,Paper } from '@mui/material'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps'
import { QuantomListViewButton } from '../../../config/subAccount/view/SubAccountList'

export const OpeningBalanceList = (props?:MenuComponentProps<OpeningBalanceModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as OpeningBalanceModel[]
  const fonts= useQuantomFonts();
  const theme= useTheme();
  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const handleLoadSubAccountData=async()=>{
     let data= await OpeningBalanceGetAll();
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  // const height= `calc(100vh - ${HeaderHeight})`
  return (
    <>
      <Quantom_Grid spacing={1} container size={{xs:12}}>
        {
          listData?.map((item,index)=>{
            return(
              <Quantom_Grid p={1} component={Paper} size={{xs:12,sm:12,md:6,lg:4,xl:4,borderBottom:theme?.palette?.text?.primary,}} 
                    sx={{fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize,color:theme?.palette?.text?.disabled,borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                  <Quantom_Grid sx={{color:theme?.palette?.text?.primary,borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}} alignItems='center' container>
                     <IconByName fontSize='16px' iconName='DynamicForm' color={theme?.palette?.text?.disabled}/>
                      {item?.registerAccount?.Name}
                  </Quantom_Grid>

                  <Quantom_Grid sx={{color:theme?.palette?.text?.primary}} mt={1}  alignItems='center' justifyContent='right' container>
                    
                     <div style={{flex:1}}>
                        <IconByName fontSize='16px' iconName={item?.Debit?'Add':"Remove"} color={theme?.palette?.primary.main}/>
                             {(item?.Debit)?item?.Debit:item?.Credit}
                     </div>
                     <div style={{flex:1}}>
                      <QuantomListViewButton onClick={()=>{
                        props?.setPrimaryKeyNo?.(item?.OpCode)
                      }}/>
                     </div>
                     {/* <IconByName fontSize='16px' iconName='DynamicForm' color={theme?.palette?.text?.disabled}/>
                      {item?.Remarks} */}
                  </Quantom_Grid>
              </Quantom_Grid>
            )
          })
        }
      </Quantom_Grid>
    </>
    // <Box>
    //   <QUANTOM_Table height={height} columns={
    //     [
    //       {field:"location.LocName",width:350,header:'Location'},
    //       {field:'OpCode',header:'OPCode'},
    //       {field:'Date',header:'Date',dataType:'date'},
    //       {field:'registerAccount.Name',header:'GL Account',},
    //       {field:'Debit',header:'Debit'},
    //       {field:'Credit',header:'Credit'},
    //       {field:'Remarks',header:'Remarks'}
    //     ]} data={listData}
    //     onViewButtonClick={(data)=>{
    //         props?.setPrimaryKeyNo?.(data?.OpCode)
    //     }}/>
    // </Box>
  )
}
