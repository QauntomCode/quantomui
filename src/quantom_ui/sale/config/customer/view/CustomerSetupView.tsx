/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import { APP_TYPE, GetAPPType, HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { VmCustomerModel } from "../model/VmCustomerModel";
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE, QuantomSwitch } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { Paper } from "@mui/material";
import { isNullOrEmpty } from "../../../../../CommonMethods";
import { HTTP_RESPONSE_TYPE } from "../../../../../HTTP/QuantomHttpMethods";
import { CustomerDeleteMethod, CustomerGetOneMethod, CustomerSaveMethod,  GetAllCustomers } from "../impl/CustomerImpl";
import { POSToolBarComp } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { CustomerModel } from "../model/CustomerModel";


export const CustomerSetupView=(props?:MenuComponentProps<VmCustomerModel>)=>{

    useEffect(()=>{
              setFormBasicKeys<VmCustomerModel>({
                 SaveMethod:async(payload,ctx)=>{
                    return CustomerSaveMethod(payload)
                 },
                 DeleteMethod:(payload)=>CustomerDeleteMethod(payload),
                 GetOneMethod:(payload)=>CustomerGetOneMethod(payload),
                 SetBasicKeys:()=>({keyNoPropName:"customer.CustCode",keyDatePropsName:""}),
                 uniqueKey:props?.UniqueId??"",
                 baseProps:props??{},
                 settings:{firstControlId:"FIRST_CONTROL_ID"},
                
                //  AfterResetMethod:async(loc)=>{
                //    //props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:location?.LocId}})
                //  },
                 InitOnLocationChange:(loc)=>{ 
                    //props?.setState?.({...props?.state,Sale:{...props?.state?.Sale,BillDate:new Date(),LocId:loc?.LocId}})
                 }
                
                
              })
            },[props])

      const setCust=(cust?:CustomerModel)=>{
        props?.setState?.({...props?.state,customer:{...cust}})
      }
    
    return (
         <Quantom_Grid container>
            <Quantom_Grid spacing={1} container size={{xs:12,sm:12,md:8,lg:5}}>
                 <Quantom_Grid  size={{xs:6}}>
                     <Quantom_Input  disabled label="Code" value={props?.state?.customer?.CustCode}/>
                 </Quantom_Grid>
                 <Quantom_Grid  container size={{xs:12}}>
                     <Quantom_Input id="FIRST_CONTROL_ID"  label="Name" value={props?.state?.customer?.CustName} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,CustName:e?.target?.value})}}/>
                 </Quantom_Grid>
                  <Quantom_Grid  container size={{xs:12}}>
                     <Quantom_Input   label="Comp Name" value={props?.state?.customer?.CompanyName} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,CompanyName:e?.target?.value})}}/>
                 </Quantom_Grid>
                  <Quantom_Grid  container size={{xs:12}}>
                     <Quantom_Input   label="Father Name" value={props?.state?.customer?.FatherName} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,FatherName:e?.target?.value})}}/>
                 </Quantom_Grid>
                  <Quantom_Grid mt={1} container size={{xs:12}}>
                      <Quantom_Grid size={{xs:12,sm:12,md:12,lg:6}}>
                            <Quantom_Input   label="CellNo" value={props?.state?.customer?.CellNo} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,CellNo:e?.target?.value})}}/>
                      </Quantom_Grid>
                      <Quantom_Grid size={{xs:12,sm:12,md:12,lg:6}}>
                            <Quantom_Input   label="Buss CellNo" value={props?.state?.customer?.BusinessCell} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,BusinessCell:e?.target?.value})}}/>
                      </Quantom_Grid>
                 </Quantom_Grid>
                  <Quantom_Grid  container size={{xs:12}}>
                      <Quantom_Grid size={{xs:12,sm:12,md:12,lg:6}}>
                            <Quantom_Input   label="Email" value={props?.state?.customer?.Email} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,Email:e?.target?.value})}}/>
                      </Quantom_Grid>
                      <Quantom_Grid size={{xs:12,sm:12,md:12,lg:6}}>
                            <Quantom_Input   label="CNIC" value={props?.state?.customer?.NIC} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,NIC:e?.target?.value})}}/>
                      </Quantom_Grid>
                 </Quantom_Grid>


                 <Quantom_Grid mt={1} container size={{xs:12}}>
                     <Quantom_Input multiline rows={3} id="FIRST_CONTROL_ID"  label="Address" value={props?.state?.customer?.Address} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,Address:e?.target?.value})}}/>
                 </Quantom_Grid>

                 <Quantom_Grid  container size={{xs:12}}>
                     <Quantom_Input multiline rows={3} id="FIRST_CONTROL_ID"  label="Business Address" value={props?.state?.customer?.BusinessAdress} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,BusinessAdress:e?.target?.value})}}/>
                 </Quantom_Grid>

                  <Quantom_Grid mt={1} container size={{xs:12}}>
                     <Quantom_Input multiline rows={3} id="FIRST_CONTROL_ID"  label="Note" value={props?.state?.customer?.Remarks} 
                                    onChange={(e)=>{setCust({...props?.state?.customer,Remarks:e?.target?.value})}}/>
                 </Quantom_Grid>
            </Quantom_Grid>

         </Quantom_Grid>
    )
}

