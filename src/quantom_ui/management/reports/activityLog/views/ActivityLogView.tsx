/* eslint-disable react/jsx-pascal-case */
import React from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps"
import { Box, Paper, useTheme } from "@mui/material"
import { Height } from "@mui/icons-material"

const ActivityLogView=(props?:MenuComponentProps<any>)=>{
    React.useEffect(()=>{
        setFormBasicKeys<any>({
           settings:{willShowLocations:false,WillHideUserLog:true,wWillHideToolbar:true},
           uniqueKey:props?.UniqueId??"",
           baseProps:props??{}
        })
      },[props])
    return(
        <>
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid size={{xs:3,md:4,lg:2.5,xl:2.5}}>
                <ReportFilter baseProps={props}/>
            </Quantom_Grid>
            <Quantom_Grid size={{xs:9,md:8,lg:8.5,}}>Second</Quantom_Grid>
         </Quantom_Grid>

        </>
    )
}


export default ActivityLogView




interface ReportFilterProps{
    baseProps?:MenuComponentProps<any>
}

export const ReportFilter=(props?:ReportFilterProps)=>{

    const theme= useTheme();

    return(
        <>
         <Quantom_Grid spacing={.5} container sx={{lineHeight:'80px'}}>
            <Quantom_Grid size={{xs:4}}>
                <Box fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="FilterAltOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
            <Quantom_Grid size={{xs:4}}>
                <Box fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="FolderOpenOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
            <Quantom_Grid size={{xs:4}}>
                <Box fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="LocalPrintshopOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
         </Quantom_Grid>

         <Quantom_Grid container component={Paper}>
            <Box component={Paper} sx={{height:'250px'}}></Box>
         </Quantom_Grid>
        </>
    )
}