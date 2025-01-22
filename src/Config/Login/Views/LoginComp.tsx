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
import { generateGUID } from '../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { FormControl, FormHelperText, Grid, Grid2, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import { FullWidth } from 'ag-grid-community/dist/types/core/components/framework/componentTypes'

export const LoginComp = () => {
    const [user,setUser]=React.useState<user>({})
    const [error,setError]=React.useState<string>();
    const navigate= useNavigate()
    const fonts= useQuantomFonts();
  return (
  
    <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        
        <div style={{marginTop:'80px',width:'500px',backgroundColor:'yellow',border:'1px solid black',
                 fontFamily:fonts.HeaderFont,alignItems:'center',display:'flex',justifyContent:'center',
                 paddingTop:'15px',paddingBottom:'15px',fontWeight:'bold',borderRadius:'10px',marginBottom:'10px'
                }}> Login Form</div>

        <div style={{width:'500px'}}>
        
        <input type='text' 
                style={{padding:'8px',fontWeight:550,fontFamily:fonts.HeaderFont,width:'100%',border:'1px solid black',borderRadius:'5px'}} 
                placeholder='User Name ...'
                onChange={(e)=>{setUser({...user,Name:e.target.value})}}/>
        </div>
        <div style={{width:'500px',marginTop:'8px'}}>
        <input type='password' 
                style={{fontWeight:550,padding:'8px',fontFamily:fonts.HeaderFont,width:'100%',border:'1px solid black',borderRadius:'5px'}} 
                placeholder='Password ...'
                onChange={(e)=>{setUser({...user,Password:e.target.value})}}/>
        </div>

        <div style={{fontFamily:fonts.HeaderFont,fontWeight:600,color:'red',fontSize:'12px'}}>{error}</div>
        <div style={{flex:1,marginTop:'8px'}}>
        <button onClick={async()=>{
            let res= await UserLoginMethod(user);
            if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS && res.Response?.IsValid){
                console.log('current user is',res);
                let comps= await GetAllCompaniesByUser();
                if(comps.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS && (comps?.Response?.length??0)===1){
                    setLogedInUserCompany(comps?.Response?.[0])
                    //navigate('/Home')
                    navigate('/POS')

                    let uqId= await generateGUID();
                    store.dispatch(open_new_menu({MenuCode:'POS_MAIN_SCREEN',MenuCaption:'MAIN MENUS',UniqueKeyNo:uqId}))
                   // store.dispatch(open_new_menu({MenuCode:'POS_MAIN_SCREEN',MenuCaption:'MAIN MENUS',UniqueKeyNo:uqId}))
                    //useSelector((satte?:any)=>open_new_menu(state,{}))
                    // useSelector((state?:any)=> open_new_menu({
                    //     MenuCode:'POS_MAIN_SCREEN',
                    // }))
                }
            }
            else{
                setError(res?.Response?.Message)
            }

        }} style={{width:'500px',fontFamily:fonts.HeaderFont,fontWeight:'bold',fontSize:'16px',border:'1px solid black',borderRadius:'5px',padding:'5px'}}> Login</button>
        </div>


        {/* <TextField
          label="Login"
          id="outlined-start-adornment"
          fullWidth
          size='medium'
        //   sx={{ m: 1,FullWidth:true}}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            },
          }}
        /> */}
    </div>

      
            
           
   
  )
}
