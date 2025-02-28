/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { Dialog, DialogContent, DialogTitle, Paper, useTheme } from "@mui/material";
import { CommonInvDetailModel, InventoryAction } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import { GetEffectedPriceOfAllUnits } from "../../../../../../inventory/config/item/impl/InventoryitemsImpl";
import { InventoryItemPriceListDetailModel } from "../../../../../../inventory/config/PriceList/Model/InventoryItemPriceListModelDetail";
import { Quantom_Grid, Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import { IconByName } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { FocusOnControlByControlId, isNullOrEmpty, safeParseToNumber } from "../../../../../../../CommonMethods";
import { useEffect, useState } from "react";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

export interface UnitRenderProps{
   lineObj?:CommonInvDetailModel
   open:boolean;
   onClose?:()=>void;
   OnSelect?:(price?:InventoryItemPriceListDetailModel,item?:CommonInvDetailModel)=>void;
   vendorCode?:string;
   fromName?:InventoryAction;
}
export const POSRenderItemUnitsWithPrice=(props?:UnitRenderProps)=>{
     const[unitsPrice,setUnitPrice]=useState<InventoryItemPriceListDetailModel[]>([]);
     const[selectedUnit,setSelectedUnit]=useState<CommonInvDetailModel>()
     useEffect(()=>{
        handlePrice();
     },[props?.lineObj?.ItemCode])

     useEffect(()=>{
        if(unitsPrice.length===1){
            //alert('Selected Units Price is'+unitsPrice?.[0].Price)
            let unit:any={...selectedUnit,ItemCode:props?.lineObj?.ItemCode}
             unit.Qty=1;
            props?.OnSelect?.(unit,unit);
            
        }
     },[unitsPrice])
     
    const handlePrice=async()=>{
        if(isNullOrEmpty(props?.lineObj?.ItemCode))
        {
           return;         
        }
         let res= await GetEffectedPriceOfAllUnits({ItemCode:props?.lineObj?.ItemCode,VendorCode:props?.vendorCode,Form:props?.fromName});
         setUnitPrice([...res??[]]);
         setSelectedUnit({...res?.[0],Qty:1});

        
         
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
                    <Quantom_Grid siz={{xs:12,sm:12,md:12,lg:12}}   spacing={1.5} sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,marginTop:'15px',}}>
                        {
                            unitsPrice?.map((item,index)=>{
                                return(
                                    <Quantom_Grid onClick={()=>{
                                        setSelectedUnit({...item,Qty:selectedUnit?.Qty??1});
                                        FocusOnControlByControlId('UNIT_RATE_CONTROL_ID')
                                        //props?.OnSelect?.(item,props?.lineObj);
                                    }} display='flex' alignItems="center" sx={{pl:1,pt:1,pb:1,pr:1,mb:1,fontSize:'16px',fontWeight:'bold',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}} 
                                                    item component={Paper}  size={{xs:12,sm:12,md:12,lg:12}}>
                                        <div style={{display:'flex',flex:1}}>
                                             <IconByName iconName="Straighten" color={theme?.palette?.primary?.main} /> 
                                            <div style={{marginLeft:'4px',fontSize:fonts.H4FontSize,fontWeight:800,color:theme.palette.text.primary}}>
                                                {item?.UnitName}  
                                            </div>
                                        </div>
                                        <div style={{display:'flex',alignItems:"center",fontSize:fonts.H3FontSize,fontWeight:800,color:theme.palette.text.primary}}>
                                            {/* <IconByName iconName="LocalAtmOutlined" color={theme?.palette?.primary?.main} /> */}
                                            {item?.Price}
                                        </div>

                                    </Quantom_Grid>
                                )
                            })
                        }
                    </Quantom_Grid>

                    <Quantom_Grid pt={2} pb={2} siz={{xs:12,sm:12,md:12,lg:12}} display='flex' justifyContent='center' component={Paper}  spacing={1.5} 
                            sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,color:theme?.palette?.secondary?.contrastText,fontWeight:600,marginTop:'15px',backgroundColor:theme?.palette?.secondary?.main}}>
                         {selectedUnit?.UnitName}
                    </Quantom_Grid>
                    <Quantom_Grid  size={{xs:12}} mt={2}>
                        <Quantom_Input id="UNIT_RATE_CONTROL_ID" size='medium' label="Rate" value={selectedUnit?.Price} onChange={(e)=>{
                            setSelectedUnit({...selectedUnit,Price:safeParseToNumber(e?.target?.value)})
                        }}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:12}} sx={{mt:2}}>
                        <Quantom_Input label="Qty" size='medium' value={selectedUnit?.Qty??0}  onChange={(e)=>{
                            setSelectedUnit({...selectedUnit,Qty:safeParseToNumber(e?.target?.value)})
                        }}/>
                    </Quantom_Grid>

                    <Quantom_Grid size={{xs:12}} mt={2}>
                        <Quantom_Input disabled label="Amount" size='medium' value={(selectedUnit?.Qty??0)*(selectedUnit?.Price??0)}  />
                    </Quantom_Grid>
                    <Quantom_Grid display='flex' justifyContent='center' alignItems='center' mt={1}>
                        <POSActionButton1   
                                            onClick={()=>{
                                                // alert(props?.lineObj?.ItemCode)
                                                let unit:any={...selectedUnit,ItemCode:props?.lineObj?.ItemCode}
                                                props?.OnSelect?.(unit,unit)
                                            }}
                                            rightMargin="8px" label="OK" 
                                            backgroundColor={theme?.palette.secondary?.main} 
                                            iconName="VerifiedUser" iconColor={theme?.palette?.secondary.contrastText}/>

                            <POSActionButton1  
                                            onClick={()=>{
                                                props?.onClose?.();
                                            }}
                                            label="CANCEL" 
                                            backgroundColor={theme?.palette.secondary?.main} 
                                            iconName="CancelPresentation" iconColor={theme?.palette?.primary?.main}/>
                    </Quantom_Grid>

                    
            </DialogContent>
        </Dialog>
    )
}