/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { generateGUID, MenuComponentProps, setFormBasicKeys } from './Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import store, { full_component_state, useQuantomFonts } from '../../redux/store'
import { Box,Paper } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Quantom_Grid } from '../base_comps';
import ItemsIcon from '@mui/icons-material/LocalMallOutlined';
import CategoryICon from '@mui/icons-material/DynamicFormOutlined';
import { open_new_menu } from '../../redux/reduxSlice';
import { POS_CATEGORY_FORM_MENU_CODE, POS_CUSTOMER_FORM_MENU_CODE, POS_INVENTORY_ITEM_MENU_CODE, POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE, POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE, POS_PURCHASE_FORM_MENU_CODE, POS_SALE_FORM_MENU_CODE, POS_SOFTWARE_REPORTS_MENU_CODE, POS_SUPPLIER_FORM_MENU_CODE } from '../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SaleIcon from '@mui/icons-material/BusAlertOutlined';
import CustomerReceiptIcon from '@mui/icons-material/AddCardOutlined';
import SupplierPaymentIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import POSSoftwareReportIcon from '@mui/icons-material/AssessmentOutlined';

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
    const border=`1px solid ${theme?.palette.primary.main}`;
    const fontStyle={fontFamily:fonts.HeaderFont,fontSize:'20px',fontWeight:'bold'}
    const flexStyle={flex:5,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}

    const openNewMenu=async(menuCode?:string,caption?:string)=>{
      let guid=await generateGUID();
      store.dispatch(open_new_menu({MenuCode:menuCode,MenuCaption:caption,UniqueKeyNo:guid}))
    }
  return (
     <>
        <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'10px'}} spacing={.5} >
            <Quantom_Grid  item size={{sm:0,xs:0,md:3,lg:3,xl:3}}></Quantom_Grid>
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

         
            <Quantom_Grid  item size={{sm:0,xs:0,md:3,lg:3,xl:3}}></Quantom_Grid>

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

            
         <Quantom_Grid  item size={{sm:0,xs:0,md:3,lg:3,xl:3}}></Quantom_Grid>

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

      </Quantom_Grid>


      <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'25px'}} spacing={.5} >

            
         <Quantom_Grid  item size={{sm:0,xs:0,md:3,lg:3,xl:3}}></Quantom_Grid>

            <Quantom_Grid onClick={()=>{
               openNewMenu(POS_PAYMENT_CUSTOMER_RECEIPT_MENU_CODE,'Customer Receipt')
            }} container component={Paper} size={{md:3,sm:12,xs:12,lg:3,xl:3}} sx={{height:'100px',...flexStyle,borderBottom:border,}}>
               <>
               <CustomerReceiptIcon color='primary' sx={{fontSize:'60px'}}></CustomerReceiptIcon>
               </>
                  Customer Receipt
            </Quantom_Grid>

            <Quantom_Grid onClick={()=>{
               openNewMenu(POS_PAYMENT_SUPPLIER_PAYMENT_MENU_CODE,'Supplier Payment');
               }} item component={Paper} size={{md:3,sm:12,xs:12,lg:3,xl:3}} sx={{height:'100px', ...flexStyle,borderBottom:border}}>
                  <>
                     <SupplierPaymentIcon color='primary' sx={{fontSize:'60px'}}></SupplierPaymentIcon>
                  </>
                  Supplier Payment
            </Quantom_Grid>

          </Quantom_Grid>




          <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle,marginTop:'25px'}} spacing={.5} >

            
          <Quantom_Grid  item size={{sm:0,xs:0,md:3,lg:3,xl:3}}></Quantom_Grid>

            <Quantom_Grid onClick={()=>{
               openNewMenu(POS_SOFTWARE_REPORTS_MENU_CODE,'Reports')
            }} container component={Paper} size={{md:6,sm:12,xs:12,lg:6,xl:6}} sx={{height:'100px',...flexStyle,borderBottom:border,}}>
               <>
               <POSSoftwareReportIcon color='primary' sx={{fontSize:'60px'}}></POSSoftwareReportIcon>
               </>
                  Reports
            </Quantom_Grid>

          </Quantom_Grid>


          
      

            
     </>
  )
}






