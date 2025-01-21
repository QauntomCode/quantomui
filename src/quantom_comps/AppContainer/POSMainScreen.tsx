/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { MenuComponentProps, setFormBasicKeys } from './Helpers/TabHelper/AppContainerTabHelper'
import { useSelector } from 'react-redux'
import { full_component_state, useQuantomFonts } from '../../redux/store'
import { Box,Paper } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Quantom_Grid } from '../base_comps';
import ItemsIcon from '@mui/icons-material/ListAltOutlined';

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
  return (
     <>
        <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText, ...fontStyle}} >
            <Quantom_Grid  item size={{sm:0,xs:0,md:4,lg:4,xl:4}}></Quantom_Grid>
             <Quantom_Grid spacing={.5} container 
                size={{md:4,sm:12,xs:12,lg:4,xl:4}}   
               sx={{height:'100px',
                 display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Box component={Paper} style={{...flexStyle,borderBottom:border}}>
                <>
                  <ItemsIcon color='primary' sx={{fontSize:'60px'}}></ItemsIcon>
                </>
                Item Setup
                </Box>
                
                <div  style={{fontSize:'16px',display:'flex',height:'100%'}}> 
                   

                </div>
                
             </Quantom_Grid>
        </Quantom_Grid>
        {/* <Quantom_Grid container sx={{color:theme?.palette?.primary?.contrastText}}>
            <Quantom_Grid  item size={{sm:0,xs:0,md:4,lg:6,xl:6}}></Quantom_Grid>
             <Quantom_Grid  item size={{md:2}} >Testing</Quantom_Grid>
        </Quantom_Grid> */}
            
     </>
  )
}






