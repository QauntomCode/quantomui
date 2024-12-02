
import React from 'react'
import { AppContainerMenus } from '../AppContainer/Model/AppContainerModelMenus'
import { GetAllMenus } from '../AppContainer/Impl/AppContainerImpl';
import { Grid, Paper } from '@mui/material';
import { append_open_menu } from '../../redux/store';

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
      <Grid container spacing={.5}> {/* Adjust the spacing as needed */}
    {menus?.map((item, index) => (
      <Grid item lg={12} key={index}> {/* Apply correct size here */}
        <Paper onClick={()=>{append_open_menu(item)}} elevation={3} sx={{ padding: 1, }}>
          {item?.MenuCaption}
        </Paper>
      </Grid>
    ))}
  </Grid>
  </div>
  )
}


