/* eslint-disable react/jsx-pascal-case */
import React from "react"
import { MenuComponentProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container } from "../../../../../quantom_comps/base_comps"
import { SaleModel } from "../model/SaleModel"

export const SaleView=(props?:MenuComponentProps<SaleModel>)=>{
    React.useEffect(()=>{
        
    },[])
    return(
        <Quantom_Container>
             this is my sale
        </Quantom_Container>
    )
}