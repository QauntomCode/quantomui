/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import {  AppDispatch, useAppDispatch, set_form_state, useTypedSelector, set_initial_state, form_state_selector } from './redux/store';
// import { increment } from './redux/reduxSlice';
import { useDispatch, useSelector } from 'react-redux';
import { QuantomFormState, set_state,create_initial_state } from './redux/reduxSlice';
// import { SaleComponent } from './quantom_ui/sale/views/processing/SaleComponent';
import { AppContainer } from './quantom_comps/AppContainer/AppContainer';
// import { ThemeProvider } from 'styled-components';
// import theme from './quantom_comps/theme';
import { createTheme, Theme, ThemeProvider, useTheme } from "@mui/material/styles";
import QuantomTheme, { bg_color, QuantomLightTheme } from './quantom_comps/QuantomTheme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginComp } from './Config/Login/Views/LoginComp';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "./style/ag_grid_style.css"
import { AppContainerTabHelper, generateGUID, MenuComponentRenderer, MenuContainerProps } from './quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper';
import { SubAccountView } from './quantom_ui/account/config/subAccount/view/SubAccountView';
// import { AppContainer } from './quantom_comps/AppContainer';

function App() {
  
  const [key,setKey]=React.useState("0001");
  
  const obj= useSelector((state:any)=>form_state_selector<sale>(state,key));
  //let obj= useTypedSelector(state=>state.formsState).FormsState?.find(x=>x.stateKey===key)?.QuantomformCoreState;
 
  React.useEffect(()=>{
      set_initial_state(key)
      if(window?.globalConfig?.appName){
        document.title=window.globalConfig.appName
      }
  },[])
  

  // const newTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#536493",
  //     },
  //     secondary: {
  //       main:  "#536493",
  //     },
  //     background: {
  //       default: "#536493",
  //       paper: "#536493", // Optional: white for cards, dialogs, etc.
  //     },
  //     text: {
  //       primary:  "#ffff",
  //     },
  //   },
  // });

  const theme= useTheme();
  return (
    <>
    <React.StrictMode>
    <div style={{minHeight:window?.innerHeight,backgroundColor:bg_color}}>
      <ThemeProvider theme={QuantomLightTheme}>
         <RouterProvider router={router}/>
      </ThemeProvider>
    </div>
    </React.StrictMode>
    
    </>
   


  );
}



interface DirectRenderComponentProps{
  MenuCode?:string
}
export const DirectRenderComponent=<T,>(props?:DirectRenderComponentProps)=>{
  const[state,setState]=React.useState<MenuContainerProps<T>>();
  
  React.useEffect(()=>{
    const fillInitialValues=async()=>{
      let guid= state?.UniqueId;
      if(!state?.UniqueId)
      {
        guid= await generateGUID();
      }
      setState({...state,MenuCode:props?.MenuCode,UniqueId:guid})
    }

    fillInitialValues();
  },[props?.MenuCode])
  return(
  <>
    <MenuComponentRenderer {...state}/>
  </>)
}


const router= createBrowserRouter([
  {
    path:"/",
    element:(<LoginComp/>)
  },
  {
    path:"/Home",
    element:(<AppContainer/>)
  },
  {
    path:'/POS',
    element:(<AppContainerTabHelper/>)

  },
  {
    path:'/SubAccount',
    element:(<DirectRenderComponent MenuCode='001-002'/>)

  }

])


interface sale{
  billNo?:string
}

export default App;
