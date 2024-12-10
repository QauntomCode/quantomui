import React from 'react'
import { useSelector } from 'react-redux';
import { append_open_menu, form_state_selector, get_open_menus } from '../../redux/store';
import { AppContainerModel } from './Model/AppContainerModel';
import { GetMenuModel } from './Impl/AppContainerImpl';
import { Grid, Paper } from '@mui/material';
import { Quantom_Grid } from '../base_comps';
import { AppContainerTabHelper } from './Helpers/TabHelper/AppContainerTabHelper';
import DashboardLayoutBasic from './Navigation/NavigationComponent';

export const AppContainer = () => {
    // const [menus,setMenus]=React.useState<AppContainerModel>();
    //  const key= "APP_CONTAINER_KEY";
    //  const openMenus= useSelector((state:any)=>get_open_menus(state));  

    // React.useEffect(()=>{
    //      _HandleGetAllMenus();
         
    // },[])
    // const _HandleGetAllMenus=async()=>{
    //    let res= await GetMenuModel()
    //    setMenus(res);
    // }
  return (
    <div>
   
    <DashboardLayoutBasic/>
    {/* <AppContainerTabHelper /> */}
  </div>
  )
}
