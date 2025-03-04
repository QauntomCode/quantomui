/* eslint-disable react/jsx-pascal-case */
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { useEffect, useState } from "react";
import { safeParseToNumber } from "../../../../../../../CommonMethods";
import {  useTheme } from "@mui/material";
import { Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import { QuantomDialog } from "../../POSSaleView";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";

export interface ShowSingleSelectedItemDialogProps{
    open?:boolean;
    item?:CommonInvDetailModel;
    onClose?:(type?:"APPLIED"|"CANCEL",item?:CommonInvDetailModel)=>void;
}

export const ShowSingleSelectedItemDialog=(props?:ShowSingleSelectedItemDialogProps)=>{
  
    const theme= useTheme();
    const [qty,setQty]=useState(0);
    const [rate,setRate]=useState(0);
    const [amount,setAmount]=useState(0);
    useEffect(()=>{
        setQty(props?.item?.TransQty??0);
        setRate(props?.item?.TransPrice??0);
    },[props?.item?.TransQty,props?.item?.TransPrice])

    useEffect(()=>{
        setAmount(safeParseToNumber(qty)*safeParseToNumber(rate))
    },[qty,rate])

    return(
     <QuantomDialog heading="Change Item" onClosePress={()=>{props?.onClose?.('CANCEL')}} open={props?.open??false}>
        
            <div className="row g-1">
                 <div className="col-md-12 mt-2">
                    <Quantom_Input size='medium' label="Item Name" value={props?.item?.ItemName}/>
                 </div>
            </div>

            <div className="row g-1 mt-1">
                 <div className="col-md-12">
                     <Quantom_Input label="Qty" value={formatNumber(qty)} onChange={(e)=>{setQty(safeParseToNumber(e.target.value))}}/>
                 </div>
            </div>
            <div className="row g-1 mt-1">
                <div className="col-md-12">
                    <Quantom_Input label="Rate" value={formatNumber(rate)} onChange={(e)=>{setRate(safeParseToNumber(e.target.value))}}/>
                </div>
            </div>
            <div className="row g-12 mt-1">
                <div className="col-md-12">
                    <Quantom_Input label="Amount" value={formatNumber(amount)}/>
                </div>
            </div>

            <div className="row g-1" style={{marginTop:'16px',display:'flex',justifyContent:'center'}}>
                 
                     <POSActionButton1 iconName="CheckCircleOutlineOutlined" label="Apply" iconColor={theme?.palette?.secondary?.contrastText} backgroundColor={theme.palette.secondary.main} onClick={()=>{
                        props?.onClose?.('APPLIED',{...props?.item,Qty:qty,Price:rate})
                     }}/>
                 
                 
                    <POSActionButton1 iconName="CancelPresentationOutlined" label="Cancel" iconColor={theme?.palette?.secondary?.contrastText} backgroundColor={theme.palette.secondary.main}
                      onClick={()=>{props?.onClose?.('CANCEL')}}/>
                 
                
            </div>
        </QuantomDialog>
    )
}



const formatNumber = (value?:any) => {
    if (isNaN(value) || value === null || value === undefined || value === '') {
      return 0;
    }
  
    const num = parseFloat(value);
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
  };