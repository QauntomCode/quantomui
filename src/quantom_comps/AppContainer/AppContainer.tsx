import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import store, { append_open_menu, form_state_selector, get_open_menus } from '../../redux/store';
import { AppContainerModel } from './Model/AppContainerModel';
import { GetMenuModel } from './Impl/AppContainerImpl';
import { Grid, Paper } from '@mui/material';
import { Quantom_Grid } from '../base_comps';
import { AppContainerTabHelper, menu_screen_menu_code } from './Helpers/TabHelper/AppContainerTabHelper';
import DashboardLayoutBasic from './Navigation/NavigationComponent';
import { open_new_menu } from '../../redux/reduxSlice';
import { openNewMenu } from './POSMainScreen';

export const AppContainer = () => {
  useEffect(()=>{
    openNewMenu(menu_screen_menu_code,"Menus")
    //store.dispatch(open_new_menu({MenuCaption:"All Menus",MenuCode:menu_screen_menu_code}))
  },[])
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
