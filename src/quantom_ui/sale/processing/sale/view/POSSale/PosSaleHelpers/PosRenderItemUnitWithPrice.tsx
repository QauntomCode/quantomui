/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { Dialog, DialogContent, DialogTitle, Paper, useTheme } from "@mui/material";
import { CommonInvDetailModel, InventoryAction } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import { GetEffectePriceOfAllUnits } from "../../../../../../inventory/config/item/impl/InventoryitemsImpl";
import { InventoryItemPriceListDetailModel } from "../../../../../../inventory/config/PriceList/Model/InventoryItemPriceListModelDetail";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { IconByName } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { isNullOrEmpty } from "../../../../../../../CommonMethods";
import { useEffect, useState } from "react";

export interface UnitRenderProps{
   lineObj?:CommonInvDetailModel
   open:boolean;
   onClose?:()=>void;
   OnSelect?:(price?:InventoryItemPriceListDetailModel,item?:CommonInvDetailModel)=>void;
   vendorCode?:string;
   fromName?:InventoryAction;
}
export const POSRenderItemUnitsWithPirce=(props?:UnitRenderProps)=>{
     const[unitsPrice,setUnitPrice]=useState<InventoryItemPriceListDetailModel[]>([]);

     useEffect(()=>{
        handlePrice();
     },[props?.lineObj?.ItemCode])
     
    const handlePrice=async()=>{
        if(isNullOrEmpty(props?.lineObj?.ItemCode))
        {
           return;         
        }
         let res= await GetEffectePriceOfAllUnits({ItemCode:props?.lineObj?.ItemCode,VendorCode:props?.vendorCode,Form:props?.fromName});
         setUnitPrice([...res??[]])
         
    }

    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
        <Dialog fullWidth  open={props?.open??false}>
            <DialogTitle component={Paper} sx={{backgroundColor:theme.palette.primary.main,display:'flex',alignItems:'center',padding:'2px',margin:'0',borderBottom:`1px solid ${theme.palette.text.primary}`}}>
                <div style={{flex:1,fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,color:theme.palette.text.secondary}}>Select Item Detail</div>
                <div onClick={()=>{props?.onClose?.()}}>
                    <IconByName iconName="CancelPresentation" color={theme.palette.error.dark}></IconByName>
                </div>
            </DialogTitle>
            <DialogContent>
                <Quantom_Grid siz={{xs:12}} container spacing={1.5} sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,}}>
                    {
                        unitsPrice?.map((item,index)=>{
                            return(
                                <Quantom_Grid onClick={()=>{
                                    props?.OnSelect?.(item,props?.lineObj);
                                }} display='flex' alignItems="center" sx={{backgroundColor:theme?.palette?.background?.paper,pl:1,pr:1,pt:1,pb:1,fontSize:'16px',fontWeight:'bold',mt:1}} item component={Paper}  size={{xs:12,sm:12,md:12,lg:6}}>
                                     <div style={{display:'flex',flex:1}}>
                                        <IconByName iconName="AccountTreeOutlined" color={theme?.palette?.primary?.main} />
                                        <div style={{marginLeft:'4px'}}>
                                            ({item?.UnitCode}) {item?.UnitName}    
                                        </div>
                                     </div>
                                     <div style={{display:'flex',alignItems:"center",fontSize:'20px',fontWeight:900}}>
                                        {/* <IconByName iconName="LocalAtmOutlined" color={theme?.palette?.primary?.main} /> */}
                                        {item?.Price}
                                     </div>

                                </Quantom_Grid>
                            )
                        })
                    }
                </Quantom_Grid>
            </DialogContent>
        </Dialog>
    )
}