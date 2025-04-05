/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { MenuComponentProps, setFormBasicKeys, UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps"
import { SaleModel } from "../model/SaleModel"
import { VmSale } from "../model/VmSaleModel"
import { DeleteSale, InsertSale, SaleGetOne, SaleGetOne1 } from "../impl/SaleImpl"
import { CustomerListComp } from "./POSSale/PosSaleHelpers/POSCustomerCompProps"
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov"
import { CommonCodeName } from "../../../../../database/db"
import { CustomersGetCodeNameMethod } from "../../../config/customer/impl/CustomerImpl"
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView"
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date"

export const SaleView=(props?:MenuComponentProps<VmSale>)=>{

    

    React.useEffect(()=>{
          setFormBasicKeys<VmSale>({
             SaveMethod:(payload)=>InsertSale(payload),
             DeleteMethod:(payload)=>DeleteSale(payload),
             GetOneMethod:(payload)=>SaleGetOne1(payload),
             SetBasicKeys:()=>({keyNoPropName:"Item.ItemCode",keyDatePropsName:""}),
             uniqueKey:props?.UniqueId??"",
             baseProps:props??{},
             settings:{firstControlId:"inventory_items_item_name",willShowLocations:true},
             AfterResetMethod:async(loc)=>{
              //
              // setAllLcoations();
             },
            //  InitOnLocationChange:(loc)=>{ alert('chanegd')}
            
            
          })
        },[props])

        const location= UserGetSelectedLocation(props);

        // useEffect(()=>{
        //     if(location && location.LocId){
        //         alert(location.LocId)
        //     }
        // },[location])


    return(
        <>
            <GroupContainer Label="Master Information">
                <Quantom_Grid spacing={.5} size={{xs:12}} container>
                    <Quantom_Grid  size={{xs:6,md:6,lg:3}}>
                        <Quantom_Input value={props?.state?.Sale?.BillNo} label="Bill No"/>
                    </Quantom_Grid>
                    <Quantom_Grid  size={{xs:6,md:6,lg:3}}>
                        <QUANTOM_Date  label="Bill Date"/>
                    </Quantom_Grid>
                </Quantom_Grid>
                <Quantom_Grid mt={.5} size={{xs:12}} container>
                    <Quantom_Grid  size={{xs:12,md:12,lg:6}}>
                        <CustomerCombo baseProps={props} 
                                    OnChange={(cust)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,CustCode:cust?.Code,CustName:cust?.Name}})}} 
                                    Customer={{Code:props?.state?.Sale?.CustCode,Name:props?.state?.Sale?.CustName}}/>
                    </Quantom_Grid>
                </Quantom_Grid>

                <Quantom_Grid mt={.5} size={{xs:12}} container>
                    <Quantom_Grid  size={{xs:12,md:12,lg:6}}>
                        <Quantom_Input onChange={(s)=>{props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,Remarks:s?.target?.value}})}} value={props?.state?.Sale?.Remarks} label="Remarks"/>
                    </Quantom_Grid>
                </Quantom_Grid>
            </GroupContainer>
        </>
    )
}




export interface CustomerComboProps{

    baseProps?:MenuComponentProps<any>;
    Customer?:CommonCodeName
    OnChange?:(val?:CommonCodeName)=>void;
}

export const CustomerCombo=(props?:CustomerComboProps)=>{
    return(
            <Quantom_LOV1  label="Customer" uniqueKeyNo={props?.baseProps?.UniqueId??""} keyNo="CUSTOMER_PAYMENT_RECEIPT_UNIQUE_KEY_NO"
                            selected={props?.Customer}
                            onChange={props?.OnChange}
                            FillDtaMethod={CustomersGetCodeNameMethod}/>
    )
}


