/* eslint-disable react/jsx-pascal-case */

import React from 'react'
import { AppContainerMenus } from '../AppContainer/Model/AppContainerModelMenus'
import { GetAllMenus } from '../AppContainer/Impl/AppContainerImpl';
import { Grid, Paper } from '@mui/material';
import { append_open_menu } from '../../redux/store';
import { Quantom_Grid } from '../base_comps';

export const MenuContainer = () => {
    const[menus,setMenus]=React.useState<AppContainerMenus[]>();
    React.useEffect(()=>{
        _HandleGetAllMenus();
    },[])
    const _HandleGetAllMenus= async()=>{
        let res= await GetAllMenus();
        setMenus([...res]);
    }
  return (
    <div>
      <Quantom_Grid container spacing={.5}> {/* Adjust the spacing as needed */}
    {menus?.map((item, index) => (
      <Quantom_Grid item lg={12} key={index}> {/* Apply correct size here */}
        <Paper onClick={()=>{append_open_menu(item)}} elevation={3} sx={{ padding: 1, }}>
          {item?.MenuCaption}
        </Paper>
      </Quantom_Grid>
    ))}
  </Quantom_Grid>
  </div>
  )
}


