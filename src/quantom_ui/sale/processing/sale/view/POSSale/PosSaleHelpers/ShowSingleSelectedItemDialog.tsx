/* eslint-disable react/jsx-pascal-case */
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { useEffect, useState } from "react";
import { safeParseToNumber } from "../../../../../../../CommonMethods";
import { Dialog, DialogContent, useTheme } from "@mui/material";
import { Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import { POSActionButton } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton";

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
        setQty(props?.item?.Qty??0);
        setRate(props?.item?.Price??0);
        //setQty(props?.item?.Qty??0);
    },[props?.item?.Qty,props?.item?.Price])

    useEffect(()=>{
        setAmount(safeParseToNumber(qty)*safeParseToNumber(rate))
    },[qty,rate])

    return(
    <Dialog fullWidth open={props?.open??false} >
        <DialogContent>
            <div className="row g-1">
                 
                 <div className="col-md-12">
                    <Quantom_Input size='medium' label="Item Name" value={props?.item?.ItemName}/>
                 </div>
            </div>

            <div className="row g-1">
                 <div className="col-md-6">
                     <Quantom_Input label="Qty" value={qty} onChange={(e)=>{setQty(safeParseToNumber(e.target.value))}}/>
                 </div>
            </div>
            <div className="row g-1">
                <div className="col-md-6">
                    <Quantom_Input label="Rate" value={rate} onChange={(e)=>{setRate(safeParseToNumber(e.target.value))}}/>
                </div>
            </div>
            <div className="row g-1">
                <div className="col-md-6">
                    <Quantom_Input label="Amount" value={amount}/>
                </div>
            </div>

            <div className="row g-1" style={{marginTop:'16px'}}>
                 <div className="col-md-6">
                     <POSActionButton label="Apply Change" backgroundColor={theme.palette.primary.main} onClick={()=>{
                        props?.onClose?.('APPLIED',{...props?.item,Qty:qty,Price:rate})
                     }}/>
                 </div>
                 <div className="col-md-6">
                    <POSActionButton label="Cancel" backgroundColor={theme.palette.primary.main}
                      onClick={()=>{props?.onClose?.('CANCEL')}}/>
                 </div>
                
            </div>
        </DialogContent>
    </Dialog>
    )
}

