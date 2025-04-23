/* eslint-disable react/jsx-pascal-case */
import React from "react"
import { MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps"

export const ActivityLog=(props?:MenuComponentProps<any>)=>{
    React.useEffect(()=>{
        setFormBasicKeys<any>({
           settings:{willShowLocations:false,WillHideUserLog:true,wWillHideToolbar:true},
           uniqueKey:props?.UniqueId??"",
           baseProps:props??{}
        })
      },[props])
    return(
        <>
         <Quantom_Grid container>
            <Quantom_Grid size={{xs:2}}>Frist</Quantom_Grid>
            <Quantom_Grid size={{xs:10}}>Second</Quantom_Grid>
         </Quantom_Grid>

        </>
    )
}




interface ReportFilterProps{
    baseProps?:MenuComponentProps<any>
}

export const ReportFitler=(props?:ReportFilterProps)=>{

    return(
        <></>
    )
}