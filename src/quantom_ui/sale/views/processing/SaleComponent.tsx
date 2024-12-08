/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { Button, Container, Grid, Input, Paper, TextField } from '@mui/material'
import { Quantom_Container, Quantom_Grid, Quantom_Input, Quantom_Paper } from '../../../../quantom_comps/base_comps'
import React from 'react'
import { useSelector } from 'react-redux';
import { form_state_selector, set_form_state, set_initial_state } from '../../../../redux/store';
import { initDB, user } from '../../../../database/db';
import { CommonCodeName, Quantom_LOV } from '../../../../quantom_comps/Quantom_Lov';
import { MenuComponentProps } from '../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper';

import { Email } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2';

interface Email{
  email?:string;
  user?:string;
  userCode?:string;
}

export const SaleComponent =(props?:MenuComponentProps<Email>) => {
  // const key="002"
  
 


   const[isDbReady,setIsDBReady]=React.useState(false);
   const[allUsers,setAllUsers]=React.useState<user[]>([])
   
   const handleInitDB = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  return (

    <Grid2 container sx={{px:2}}>
         {/* <div>UniqueId  is {props?.UniqueId}</div> */}
        <Quantom_Input value={props?.state?.email} onChange={(e)=>{
            props?.setState?.({...props?.state,email:e.target.value})
        }} label='Email' fullWidth/>



      


      <Quantom_LOV label='Lov Control' getData={(search)=>{
          let values:CommonCodeName[]=
           allUsers.map((item,index)=>{
            return {Code:item.email,Name:item.name}
           });
           return Promise.resolve(values);
          }}
      /> 
      
        
      

    </Grid2>
  )
}

