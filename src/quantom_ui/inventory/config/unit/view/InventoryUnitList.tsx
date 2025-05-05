/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../../../../redux/store'
import { set_list_data } from '../../../../../redux/reduxSlice'
import { HeaderHeight } from '../../../../../CommonMethods'
import { Box, Paper, useTheme } from '@mui/material'
import { SetupFormModel } from '../model/setupFormModel'
import { QUANTOM_Table } from '../../../../account/config/mainAccount/view/MainAccountView'
import { SetupFromGetAll } from '../impl/setupFormImp'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps'
import { QuantomListViewButton } from '../../../../account/config/subAccount/view/SubAccountList'
import { QuantomSwitch } from '../../item/views/POS/POSInventoryIitemsView'

export const InventoryUnitList = (props?:MenuComponentProps<SetupFormModel>) => {
  const listData= useSelector((state:any)=>full_component_state(state,props?.UniqueId??""))?.listData as SetupFormModel[]

  React.useEffect(()=>{
     handleLoadSubAccountData();
  },[])
  
  const height= `calc(100vh - ${HeaderHeight})`
  const handleLoadSubAccountData=async()=>{
     let data= await SetupFromGetAll(props?.MenuCode,'');
     console.log('data of ')
     store.dispatch(set_list_data({stateKey:props?.UniqueId??"",ListData:data}))
  }

  const fonts= useQuantomFonts();
  const theme= useTheme();
  return (
    <>
      <Quantom_Grid spacing={1} container>
        {
           listData?.map((item,index)=>{
              return(
                <>
                  <Quantom_Grid   container size={{xs:12,sm:12,md:6,lg:4}} component={Paper} 
                        sx={{fontFamily:fonts?.HeaderFont,fontSize:'12px',color:theme?.palette?.text?.disabled,borderBottom:`1px solid ${theme?.palette?.primary?.main}`}} >
                  <Quantom_Grid  p={1} container size={{xs:12}} sx={{borderBottom:`3px solid ${theme?.palette?.text?.disabled}`}}>
                    <div style={{flex:1,alignItems:'center'}}>
                        <IconByName iconName='AbcOutlined'/>
                        {item?.Name}
                    </div>

                    <div style={{alignItems:'center'}}>
                        <IconByName fontSize='16px' iconName='Tag'/>
                        {item?.Code}
                    </div>
                  </Quantom_Grid>
                  <Quantom_Grid display='flex' size={{xs:12}} p={1} mt={.5} container>
                     <div style={{flex:1}}>
                        Active : {item?.Active?"Yes":"No" }
                     </div>
                     <div style={{flex:1}}><QuantomListViewButton  onClick={()=>{props?.setPrimaryKeyNo?.(item?.Code)}}/></div>
                  </Quantom_Grid>

                  </Quantom_Grid>
                </>
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
