/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { generateGUID, MenuComponentProps, setFormBasicKeys } from './Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../redux/store'
import { Box,Paper } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Quantom_Grid } from '../base_comps';
import ItemsIcon from '@mui/icons-material/ListAltOutlined';
import CategoryICon from '@mui/icons-material/DynamicFormOutlined';
import { open_new_menu } from '../../redux/reduxSlice';
import { POS_CATEGORY_FORM_MENU_CODE, POS_CUSTOMER_FORM_MENU_CODE, POS_INVENTORY_ITEM_MENU_CODE, POS_PURCHASE_FORM_MENU_CODE, POS_SALE_FORM_MENU_CODE, POS_SUPPLIER_FORM_MENU_CODE } from '../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SaleIcon from '@mui/icons-material/BusAlertOutlined';
import { POSCustomerSetup } from '../../quantom_ui/sale/config/customer/view/POSCustomerSetup';

export interface model{
    testing?:string;
}
export const POSMainScreen = (props?:MenuComponentProps<model>) => {
    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<model>({
            // SaveMethod:(payload)=>SetupFormInsert(payload,props?.MenuCode),
            // DeleteMethod:(payload)=>SetupFormDelete(payload,props?.MenuCode),
            // GetOneMethod:(payload)=>SetupFormGetOne(payload,props?.MenuCode),
            // SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })
        }
    },[fullState?.IsFirstUseEffectCall])

    const theme= useTheme();
    const fonts= useQuantomFonts();
    const border=`1px solid ${theme?.palette.primary.contrastText}`;
    const fontStyle={fontFamily:fonts.HeaderFont,fontSize:'20px',fontWeight:'bold'}
    const flexStyle={flex:5,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}

    const openNewMenu=async(menuCode?:string,caption?:string)=>{
      let guid=await generateGUID();
      store.dispatch(open_new_menu({MenuCode:menuCode,MenuCaption:caption,UniqueKeyNo:guid}))
    }
  return (
     <>
        <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'10px'}} spacing={.5} >
            <Quantom_Grid  item size={{sm:0,xs:0,md:2,lg:2,xl:2}}></Quantom_Grid>
             <Quantom_Grid onClick={()=>{
               openNewMenu(POS_INVENTORY_ITEM_MENU_CODE,'Item Setup');
             }} item component={Paper} size={{md:4,sm:12,xs:12,lg:4,xl:4}} sx={{height:'100px', ...flexStyle,borderBottom:border}}>
                {/* <Box  style={{}> */}
                <>
                  <ItemsIcon color='primary' sx={{fontSize:'60px'}}></ItemsIcon>
                </>
                Item Setup
                {/* </Box> */}
             </Quantom_Grid>

             <Quantom_Grid onClick={()=>{
                openNewMenu(POS_CATEGORY_FORM_MENU_CODE,'Item Category')
             }} container component={Paper} size={{md:2,sm:12,xs:12,lg:2,xl:2}} sx={{height:'100px',...flexStyle,borderBottom:border,}}>
                <>
                <CategoryICon color='primary' sx={{fontSize:'60px'}}></CategoryICon>
                </>
                   Category
             </Quantom_Grid>
        </Quantom_Grid>


        <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'25px'}} spacing={.5} >

         
            <Quantom_Grid  item size={{sm:0,xs:0,md:2,lg:2,xl:2}}></Quantom_Grid>

            <Quantom_Grid onClick={()=>{
                openNewMenu(POS_CUSTOMER_FORM_MENU_CODE,'Customer Setup')
             }} container component={Paper} size={{md:2,sm:12,xs:12,lg:2,xl:2}} sx={{height:'100px',...flexStyle,borderBottom:border,}}>
                <>
                <PeopleOutlineOutlinedIcon color='primary' sx={{fontSize:'60px'}}></PeopleOutlineOutlinedIcon>
                </>
                   Customer Setup
             </Quantom_Grid>
             <Quantom_Grid onClick={()=>{
               openNewMenu(POS_SALE_FORM_MENU_CODE,'Sale');
             }} item component={Paper} size={{md:4,sm:12,xs:12,lg:4,xl:4}} sx={{height:'100px', ...flexStyle,borderBottom:border}}>
                <>
                  <SaleIcon color='primary' sx={{fontSize:'60px'}}></SaleIcon>
                </>
                Sale
             </Quantom_Grid>

            
        </Quantom_Grid>




        <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'25px'}} spacing={.5} >

            
         <Quantom_Grid  item size={{sm:0,xs:0,md:2,lg:2,xl:2}}></Quantom_Grid>

         <Quantom_Grid onClick={()=>{
            openNewMenu(POS_SUPPLIER_FORM_MENU_CODE,'Supplier Setup')
         }} container component={Paper} size={{md:2,sm:12,xs:12,lg:2,xl:2}} sx={{height:'100px',...flexStyle,borderBottom:border,}}>
            <>
            <PeopleOutlineOutlinedIcon color='primary' sx={{fontSize:'60px'}}></PeopleOutlineOutlinedIcon>
            </>
               Supplier Setup
         </Quantom_Grid>

         <Quantom_Grid onClick={()=>{
               openNewMenu(POS_PURCHASE_FORM_MENU_CODE,'Purchase');
             }} item component={Paper} size={{md:4,sm:12,xs:12,lg:4,xl:4}} sx={{height:'100px', ...flexStyle,borderBottom:border}}>
                <>
                  <SaleIcon color='primary' sx={{fontSize:'60px'}}></SaleIcon>
                </>
                Purchase
             </Quantom_Grid>

         {/* <Quantom_Grid onClick={()=>{
            openNewMenu(POS_SALE_FORM_MENU_CODE,'Sale');
         }} item component={Paper} size={{md:4,sm:12,xs:12,lg:4,xl:4}} sx={{height:'100px', ...flexStyle,borderBottom:border}}>
            <>
               <SaleIcon color='primary' sx={{fontSize:'60px'}}></SaleIcon>
            </>
            Sale
      </Quantom_Grid> */}


      </Quantom_Grid>
      

        {/* <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText}}>
            <Quantom_Grid  item size={{sm:0,xs:0,md:4,lg:6,xl:6}}></Quantom_Grid>
             <Quantom_Grid  item size={{md:2}} >Testing</Quantom_Grid>
        </Quantom_Grid> */}
            
     </>
  )
}






