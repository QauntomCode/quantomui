/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {MenuComponentProps, setFormBasicKeys } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";

import { useSelector } from "react-redux";
import store, { full_component_state,  get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";

import { add_helper_data_single_key } from "../../../../redux/reduxSlice";

import { VmCustomerPaymentModel } from "../model/CustomerPaymentReceiptModel";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton, QuantomSwitch } from "../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useTheme } from "@mui/material";
import { Quantom_Input } from "../../../../quantom_comps/base_comps";
import { QUANTOM_Date } from "../../../../quantom_comps/BaseComps/Quantom_Date";
import dayjs from "dayjs";

export const POSCustomerReceiptView=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    

    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmCustomerPaymentModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })
        }
    },[fullState?.IsFirstUseEffectCall])

    return(
        <>
        {
            isList?(<List {...props}></List>):(<Form {...props}></Form>)
        }
        </>
    )
}


export const List=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{

    
    
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
            
        </>
    )
}

const Form=(props?:MenuComponentProps<VmCustomerPaymentModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
   
    var catCode= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",'SELECTED_CAT_CODE'));
    useEffect(()=>{
        handleGetOne();
    },[catCode])


    useEffect(()=>{
        
        if(!props?.state?.master?.ReceiptDate){
            alert('state is changed')
            props?.setState?.({...props?.state,master:{...props?.state?.master,ReceiptDate:props?.state?.master?.ReceiptDate??new Date()}})
        }
    },[props?.state])

    const handleGetOne=async()=>{
        // if(isNullOrEmpty(catCode)){
        //     return;
        // }

        // try{
        //     ShowLoadingDialog();
        //       let res= await SetupFormGetOne(catCode,menuCode);
        //       HideLoadingDialog();
        //       if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
        //         props?.setState?.(res?.Response)
        //       }
        // }
        // catch{
        //    HideLoadingDialog();
        // }
    }

    return(
        <>
         <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE"  iconName="SaveOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.setState?.({})}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" buttonType='DELETE'  iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{
                    store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                }} iconName="FeaturedPlayListOutlined"/>
           </div>
        </div>
        
         <div className="row g-1" style={{marginTop:'16px'}}>
            <div className="col-md-2  offset-md-2">
                <Quantom_Input label="Code"  disabled/>
            </div>
            <div className="col-md-2 ">
                <QUANTOM_Date label="Date"  value={dayjs( props?.state?.master?.ReceiptDate)} onChange={(e)=>{
                    props?.setState?.({...props?.state,master:{...props?.state?.master,ReceiptDate:e?.toDate()}})
                }} />
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <Quantom_Input label="Remarks" value={props?.state?.master?.Remarks} onChange={(e)=>{
                    props?.setState?.({...props?.state,master:{...props?.state?.master,Remarks:e.target.value}})
                }} />
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <QuantomSwitch label="Reset After Save" value={resetAfterSave} onChange={(e)=>{setResetAfterSave(e??false)}}/>
            </div>
         </div>

        </>
    )
}