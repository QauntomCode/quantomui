/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys, UserGetSelectedLocation } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps"
import { VmStockIssueReceive } from "../Model/Issue"
import { StockIssue } from "../Model/Issue"
import { StockIssueDetail } from "../Model/IssueDetail"
import { InsertStockIssue, DeleteStockIssue, GetOneStockIssue } from "../Impl/StockIssueImpl"
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov"
import { CommonCodeName } from "../../../../../database/db"
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView"
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date"
import { RenderItemGrid, RenderItemsGridV1 } from "../../../../Purchase/Processing/Purchase/view/POSPurchaseView"
import { CommonInvDetailModel, InventoryAction } from "../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import { Button, Paper, useTheme } from "@mui/material"
import store, { get_form_state_without_selector, get_helperData_by_key, getCurrentLocationWithStore, useQuantomFonts } from "../../../../../redux/store"
import { isNullOrEmpty, safeParseToNumber, safePreviewNumber } from "../../../../../CommonMethods"
import dayjs from "dayjs"
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1"
import { useSelector } from "react-redux"
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice"
import { GetLocationsByUserId } from "../../../../Settings/Location/impl/LocationImpl"
import { Console } from "console"
import { LocationModel } from "../../../../Settings/Location/Model/LocationModel"
import { VMPurchaseModel } from "../../../../Purchase/Processing/Purchase/model/VMPurchaseModel"
import { QuantomFormState } from "../../../../../redux/reduxSlice"
import { StockIssueViewList } from "./StockIssueListView"

export const StockIssueView=(props?:MenuComponentProps<VmStockIssueReceive>)=>{

    const location= UserGetSelectedLocation(props);

    useEffect(()=>{
        if(!props?.state?.stockIssue?.IssueDate){
            props?.setState?.({...props?.state,stockIssue:{...props?.state?.stockIssue,IssueDate:new Date()}})
        }
    },[props?.state?.stockIssue?.IssueDate])

    useEffect(()=>{
        if(!props?.state?.stockIssue?.LocId && !isNullOrEmpty(location?.LocId)){
            props?.setState?.({...props?.state,stockIssue:{...props?.state?.stockIssue,LocId:location?.LocId,FromLocCode:location?.LocId}})
            console.log("Location");
        }
        
    },[location])

  React.useEffect(()=>{
            setTimeout(() => {
              props?.setListComponent?.((<StockIssueViewList baseProps={props} uniqueId={props?.UniqueId}/>))
            }, 500);
          },[])
  
   

    React.useEffect(()=>{
          setFormBasicKeys<VmStockIssueReceive>({
             SaveMethod:async(payload,ctx)=>{
                let nP={...payload}
              
                 if(ctx?.Location &&  isNullOrEmpty(payload?.stockIssue?.LocId)){
                   nP={...nP,stockIssue:{...nP.stockIssue,LocId:ctx?.Location?.LocId}}
                 }
                 if(!nP?.stockIssue?.IssueDate){
                    nP={...nP,stockIssue:{...nP.stockIssue,IssueDate:new Date()}}
                 }
                return InsertStockIssue(nP)
             },
             overRideSetStateAfterSave:async(payload,ctx)=>{
                let s= await get_form_state_without_selector(props?.UniqueId) as VmStockIssueReceive
                console.log('after save data is',payload)
                props?.setState?.({...s,stockIssue:{...s?.stockIssue,Code:payload?.stockIssue?.Code}})
             },
             DeleteMethod:(payload)=>DeleteStockIssue(payload),
             GetOneMethod:(payload)=>GetOneStockIssue(payload),
             SetBasicKeys:()=>({keyNoPropName:"StockIssue.Code",keyDatePropsName:""}),
             uniqueKey:props?.UniqueId??"",
             baseProps:props??{},
             settings:{firstControlId:"inventory_items_item_name",willShowLocations:true},
             InitOnLocationChange:(loc)=>{ 
             }
          })
        },[props])

        const theme =useTheme();
        const fonts= useQuantomFonts();

        const handleToLocCode = async (): Promise<CommonCodeName[]> => {
          const res = await GetLocationsByUserId();
          const mAccounts = res?.map((item: LocationModel) => ({
            Code: item?.LocId,
            Name: item?.LocName,
          }));
          
          return Promise.resolve([...mAccounts]);
         };

         const IssueDetailToVMPurchase=(vm:VmStockIssueReceive):VMPurchaseModel=>{
                return {
                    purchase:{
                        BillNo:vm.stockIssue?.Code,
                        DayClosed:vm.stockIssue?.DayClosed,
                        BillDate:vm.stockIssue?.IssueDate,
                        LocId:vm.stockIssue?.LocId,
                    },
                    purchaseDetails: vm.stockIssueDetails?.map(detail => ({
                        ItemId: detail.ItemCode,
                        Qty: detail.Qty,
                        Rate: detail.Price,
                        Amount: detail.Amount,
                    })) ?? [],
                    

                 }
             }

            //  const mappedProps: MenuComponentProps<VMPurchaseModel> = {
            //     ...props,
            //     state: IssueDetailToVMPurchase(props?.state!),
            //     MenuCode:props?.MenuCode,
            //     UniqueId:props?.UniqueId,
            //     fullState: undefined,
            //     AddComponentTabs: undefined,
            //     errorToast:undefined,
            //     setListComponent:undefined,
            //     setPrimaryKeyNo:props?.setPrimaryKeyNo,
            //     };
         

    return(
        <>
            <Quantom_Grid container size={12}>
                 <Quantom_Grid size={9}>
                    <GroupContainer Label="Master Information">
                        <Quantom_Grid spacing={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:6,md:6,lg:4}}>
                                <Quantom_Input disabled value={props?.state?.stockIssue?.Code} label="Issue No"/>
                            </Quantom_Grid>
                            <Quantom_Grid  size={{xs:6,md:6,lg:4}}>
                                <QUANTOM_Date value={dayjs(props?.state?.stockIssue?.IssueDate)}  onChange={(date)=>{
                                    props?.setState?.({...props?.state,stockIssue:{...props?.state?.stockIssue,IssueDate:date?.toDate()}})
                                }} label="Issue Date"/>
                            </Quantom_Grid>
                        </Quantom_Grid>
                        <Quantom_Grid mt={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:12,md:12,lg:8}}>
                            <Quantom_Input disabled value={location?.LocName} label="From LocCode"/>
                            </Quantom_Grid>
                        </Quantom_Grid>
                        <Quantom_Grid mt={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:12,md:12,lg:8}}>
                            <Quantom_LOV1
                                        selected={{
                                          Code: props?.state?.stockIssue?.ToLocCode ?? "",
                                          Name: props?.state?.stockIssue?.ToLocName ?? "",
                                        }}
                                        onChange={(des) => {
                                          props?.setState?.({
                                            ...props?.state!,
                                            stockIssue: {
                                              ...props?.state?.stockIssue!,
                                              ToLocCode: des?.Code,
                                              ToLocName:des?.Name,
                                            },
                                          });
                                        }}
                                        label="To LocCode"
                                        uniqueKeyNo={props?.UniqueId ?? ""}
                                        FillDtaMethod={handleToLocCode}
                                        keyNo="LocId"
                                      />
                            </Quantom_Grid>
                        </Quantom_Grid>

                        <Quantom_Grid mt={.5} size={{xs:12}} container>
                            <Quantom_Grid  size={{xs:12,md:12,lg:8}}>
                                <Quantom_Input onChange={(s)=>{props?.setState?.({...props?.state,stockIssue:{...props?.state?.stockIssue,Remarks:s?.target?.value}})}} value={props?.state?.stockIssue?.Remarks} label="Remarks"/>
                            </Quantom_Grid>
                        </Quantom_Grid>
                    </GroupContainer>


                    <GroupContainer>
                        <RenderItemsGridV1 items={props?.state?.stockIssueDetails} vendorType="SUPPLIER" locId={location?.LocId} fromName={InventoryAction.STOCK_ISSUE} formNameString="SALE"
                         vendorCode={props?.state?.stockIssue?.Code} onChange={(items)=>{
                         props?.setState?.({...props?.state,stockIssueDetails:[...items??[]]})
                        }} baseProps={props}/>
                    </GroupContainer>

                 </Quantom_Grid>
            </Quantom_Grid> 
        </>
    )
}