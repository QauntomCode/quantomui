/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Quantom_Button, Quantom_Grid, Quantom_Input } from '../../../quantom_comps/base_comps'
import { UserModel as user } from '../../User/model/user'
import { GetAllCompaniesByUser, setLogedInUserCompany, UserLoginMethod } from '../Controller/loginContrller'
import { HTTP_RESPONSE_TYPE } from '../../../HTTP/QuantomHttpMethods'
import { useNavigate } from 'react-router-dom'
import { open_new_menu } from '../../../redux/reduxSlice'
import { useSelector } from 'react-redux'
import store, { useQuantomFonts } from '../../../redux/store'
import { APP_TYPE, generateGUID, GetAPPType, HideLoadingDialog, ShowLoadingDialog } from '../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Box, FormControl, FormHelperText, Grid, Grid2, InputAdornment, OutlinedInput, Paper, TextField, useTheme } from '@mui/material'
import { FullWidth } from 'ag-grid-community/dist/types/core/components/framework/componentTypes'
import { POSActionButton } from '../../../quantom_comps/AppContainer/POSHelpers/POSActionButton'
import { POSActionButton1 } from '../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1'
import { ResetSettings } from '../../../quantom_ui/Settings/Settings/SettingMethods'

export const LoginComp = () => {
    const [user,setUser]=React.useState<user>({})
    const [error,setError]=React.useState<string>();
    const navigate= useNavigate()
    // const fonts= useQuantomFonts();

    const appType= GetAPPType()
    const theme= useTheme();
    const fonts= useQuantomFonts();

    const handleLogin=async()=>{
      try{
      ShowLoadingDialog();
      let res= await UserLoginMethod(user);
      if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS && res.Response?.IsValid){
          console.log('current user is',res);
          let comps= await GetAllCompaniesByUser();
          HideLoadingDialog();
          if(comps.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS && (comps?.Response?.length??0)===1){
              setLogedInUserCompany(comps?.Response?.[0])
              ResetSettings()
              if(APP_TYPE.ERP===appType){
                  navigate('/Home');
                  return;
              }
              //navigate('/Home')
              navigate('/POS')

              let uqId= await generateGUID();
              store.dispatch(open_new_menu({MenuCode:'POS_MAIN_SCREEN',MenuCaption:'MAIN MENUS',UniqueKeyNo:uqId}));
              
          }
      }
      else{
        HideLoadingDialog();
          setError(res?.Response?.Message)
      }
    }
    catch
    {
      HideLoadingDialog();
    }
  }
  return (
  
    <div className='row'>
       <div style={{height:'10vh'}}></div>

       <div className='col-12 col-md-2 col-lg-3 col-xl-3'></div>
      <div  className='col-12 col-md-8 col-lg-6 col-xl-6 m-2 '>

        <div className='row'>
          <Box pt={2} pb={2} display='flex' justifyContent='center'  component={Paper} sx={{backgroundColor:theme.palette.primary.main,color:theme.palette.primary.contrastText,fotFamily:fonts.HeaderFont,
            fontWeight:800,fontSize:'25px'
          }}>
             Login form
          </Box>
            
        </div>
        <div className='row  mt-2'>
          <Box>
            <Quantom_Input label="User Name" value={user?.Name} size='medium' onChange={(e)=>{
                setUser({...user,Name:e.target.value})
              }}/>
           </Box>
        </div>
       <div className='row  mt-2'>
          <Box>
            <Quantom_Input type='password' label="Password" size='medium' value={user?.Password}
              onChange={(e)=>{
                setUser({...user,Password:e.target.value})
              }}/>
          </Box>
       </div>
       <div style={{color:theme?.palette?.error?.main,fontFamily:fonts.HeaderFont}}>
        {error}
       </div>
       <div className='row  mt-2'>
          <Box display='flex'  justifyContent='center'>
            <POSActionButton1 onClick={handleLogin} iconName='LockOpen' iconColor={theme?.palette?.secondary?.contrastText} textColor={theme?.palette?.secondary?.contrastText} backgroundColor={theme?.palette?.secondary?.main}  label='Login'/>
          </Box>
       </div>
       </div>
    
    
 
    </div>

      
            
           
   
  )
}
