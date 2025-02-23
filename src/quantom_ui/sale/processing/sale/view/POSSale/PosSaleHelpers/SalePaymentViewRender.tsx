/* eslint-disable react/jsx-pascal-case */
import { useTheme } from "@mui/material";
import { MenuComponentProps } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { useSelector } from "react-redux";
import { POS_SALE_LOCID_KEY, SalePrintAableTotalValue, SalePrintNumbers } from "../POSSaleView1";
import { useEffect, useState } from "react";
import { get_helperData_by_key } from "../../../../../../../redux/store";
import { Quantom_Grid, Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
// import { POSCustomerComp } from "../POSSaleViewWithEmpty";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { InsertSale } from "../../../impl/SaleImpl";
import { safeParseToNumber } from "../../../../../../../CommonMethods";
import { VmSale } from "../../../model/VmSaleModel";
import { POSCustomerComp } from "./POSCustomerCompProps";

export interface SalePaymentViewRenderProps{
    baseProps?:MenuComponentProps<VmSale>
    onclose?:(type?:'SAVE'|'CANCEL')=>void
}

export const SalePaymentViewRender=(props?:SalePaymentViewRenderProps)=>{
    const theme= useTheme();
    const locid= useSelector((state?:any)=>(get_helperData_by_key(state,props?.baseProps?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    
    const [totals,setTotals]=useState<SalePrintNumbers>()
    useEffect(()=>{
        handleTotalvalue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props?.baseProps?.state])
    const handleTotalvalue=async()=>{
        let res = await SalePrintAableTotalValue(props?.baseProps?.state)
        console.log('total values are',res)
        setTotals(res);
    }
    return(
        <>
        <Quantom_Grid container size={{xs:12}}>
            <POSCustomerComp 
                        onChange={(sel)=>{props?.baseProps?.setState?.({...props?.baseProps?.state,Sale:{...props?.baseProps?.state?.Sale,CustCode:sel?.Code,CustName:sel?.Name}})}}
                        selectedCustomer={{Code:props?.baseProps?.state?.Sale?.CustCode,Name:props?.baseProps?.state?.Sale?.CustName}} />

        </Quantom_Grid>
         <Quantom_Grid container size={{xs:12}} mt={2}>
               <Quantom_Input label="Total Amount" disabled value={totals?.TotalGrossAmount} />
         </Quantom_Grid>
         <Quantom_Grid container size={{xs:12}} mt={1}>
               <Quantom_Input label="Discount" 
                        onChange={(e)=>{props?.baseProps?.setState?.({...props?.baseProps?.state,Sale:{...props?.baseProps?.state?.Sale,ExtraDiscount:safeParseToNumber(e?.target?.value)}})}} 
                        value={totals?.TotalDiscount} />
         </Quantom_Grid>
         <Quantom_Grid container size={{xs:12}} mt={1}>
               <Quantom_Input label="Net Total" disabled value={totals?.NetTotal} />
         </Quantom_Grid>
         <Quantom_Grid container size={{xs:12}} mt={1}>
               <Quantom_Input label="Received"
                    onChange={(e)=>{props?.baseProps?.setState?.({...props?.baseProps?.state,Sale:{...props?.baseProps?.state?.Sale,TotalReceived:safeParseToNumber(e?.target?.value)}})}} 
                     value={totals?.Received} />
         </Quantom_Grid>
         <Quantom_Grid container size={{xs:12}} mt={1}>
               <Quantom_Input label="Balance" value={totals?.RemBalance} />
         </Quantom_Grid>

         <Quantom_Grid container display='flex' justifyContent='center' alignItems='center' size={{xs:12}} mt={1}>
                <POSActionButton1 label="Save" 
                    backgroundColor={theme?.palette?.secondary?.main} 
                    iconColor={theme?.palette?.secondary?.contrastText} 
                    textColor={theme?.palette?.secondary?.contrastText} 
                    buttonType='SAVE'
                    iconName="SaveOutlined"
                    rightMargin="10px" 
                    responseAfterMethod={(d)=>{props?.onclose?.('SAVE')}}
                    responseClick={ ()=>InsertSale({...props?.baseProps?.state,Sale:{...props?.baseProps?.state?.Sale,BillDate:props?.baseProps?.state?.Sale?.BillDate?? new Date(),
                            LocId:props?.baseProps?.state?.Sale?.LocId??locid}})}
                    />
                <POSActionButton1 
                    label="Cancel"
                    onClick={()=>{props?.onclose?.('CANCEL')}}
                    backgroundColor={theme?.palette?.secondary?.main} 
                    iconColor={theme?.palette?.secondary?.contrastText} 
                    textColor={theme?.palette?.secondary?.contrastText} 
                    iconName="CancelPresentationOutlined"
                    rightMargin="10px"/>

         </Quantom_Grid>
        </>
    )
}