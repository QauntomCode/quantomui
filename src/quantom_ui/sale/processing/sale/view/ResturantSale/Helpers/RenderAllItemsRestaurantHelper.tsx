/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { InventoryItemsModel } from "../../../../../../inventory/config/item/model/InventoryItemsModel";
import { _BORDER_PROPS, _GREEN_COLOR, _LIGHT_PINK_COLOR, _RESTAURANT_SALE_SELECTED_CATEGORY_KEY, _YELLOW_COLOR, SaleCompHelperProps } from "../RestaurantSaleView";
import { form_state_selector, get_form_state_without_selector, get_helperData_by_key, set_form_state, useQuantomFonts } from "../../../../../../../redux/store";
import { useSelector } from "react-redux";
import { GetItemsByCategory } from "../../../../../../inventory/config/item/impl/InventoryitemsImpl";
import ItemsIcon from '@mui/icons-material/VerticalSplitOutlined';
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { CommonInvDetailModel, InventoryAction } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { VmSaleOrderModel } from "../../../../saleOrder/model/VmSaleOrderModel";
import { AddOrRemoveExtendedMethod, AddOrRemoveInventoryItem } from "../../../../../../inventory/CommonComp/CommonInvDetail/Impl/InventoryIoMethods";
import { CommonInvDetailActionQueryBillInfo, CommonInvDetailActionQueryResponse, INVENTORY_PERFORMED_ACTION } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { InvoiceMasterValuesModel } from "../../../../../../tax/CommonModels/InvoiceMasterValuesModel";


export const RenderAllItemsRestaurantHelper=(props?:SaleCompHelperProps)=>{
    const[items,setItems]=React.useState<InventoryItemsModel[]>([])
    const fonts= useQuantomFonts();
    const selectedCategory= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_SELECTED_CATEGORY_KEY))) as string;

    const state= useSelector((state?:any)=>(form_state_selector<VmSaleOrderModel>(state,props?.UniqueId??"")));
    const soldItems= state?.SaleOrderDetails;
    const taxDetail= state?.TaxDetail;

    React.useEffect(()=>{
        handleLoadItems(selectedCategory);
         //alert('selected category is'+selectedCategory)
    },[selectedCategory])

    const handleLoadItems=async(catCode?:string)=>{
            let res= await GetItemsByCategory(catCode);
            setItems(res??[])

    }

    const handleAddItem=async(item?:InventoryItemsModel)=>{
           let nState= await get_form_state_without_selector<VmSaleOrderModel>(props?.UniqueId);
           let masterValues=await GetSaleOrderMasterValues(nState);
           let billIfno = await GetSaleOrderBillInfo(nState);
           let response= await AddOrRemoveExtendedMethod(
                    soldItems,
                    {ItemCode:item?.ItemCode,Qty:1,Price:item?.SalePrice,UnitCode:item?.UnitCode},
                    InventoryAction.Sale,INVENTORY_PERFORMED_ACTION.NEW,billIfno,taxDetail,masterValues
                );
            await SetSaleOrderItemsDetail(response,props?.UniqueId??"")
    }
     
    return(
        <div>
         <div style={{display:'flex',lineHeight:'30px',border:_BORDER_PROPS,width:'100%',fontFamily:fonts.HeaderFont,justifyContent:'center',alignItems:'center',
            fontSize:fonts.H4FontSize,
            backgroundColor:_LIGHT_PINK_COLOR
         }}>
            <ItemsIcon></ItemsIcon>
            All Items
            </div>
        <div style={{display:'flex',flexDirection:'column',width:'100%',borderBottom:_BORDER_PROPS,height:'100%'}}>
        <div style={{flex:1,marginTop:'5px',marginLeft:'5px',marginRight:'5px'}}>
            
         <Quantom_Grid container spacing={.5} >
            
         {
            items?.map((item,index)=>{
                return(
                    <Quantom_Grid  size={{md:4,sm:6,xs:12,lg:3}} sx={{border:_BORDER_PROPS,fontFamily:fonts.HeaderFont}} >
                        <div onClick={()=>{
                            handleAddItem(item);
                        }} style={{backgroundColor:_YELLOW_COLOR,height:'60px',display:'flex',
                            justifyContent:'center',alignItems:'center',fontSize:'11px'}}>
                            {item?.ItemName}
                        </div>
                        <div style={{borderTop:_BORDER_PROPS,display:'flex',backgroundColor:_GREEN_COLOR,justifyContent:'center',fontWeight:'bold',fontSize:'14px'}}>
                            {item?.SalePrice}
                        </div> 
                    </Quantom_Grid>
                )
            })
         }
         
         </Quantom_Grid>
        </div>
         <div style={{display:'flex',lineHeight:'30px',marginTop:'5px',border:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontSize:'13px',
            marginLeft:'5px',
            marginRight:'5px',
            marginBottom:'5px'
         }}>
            <div style={{flex:1,borderRight:_BORDER_PROPS,justifyContent:'center',alignItems:'center',display:'flex'}}> Take Away</div>
            <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>Dine In</div>
         </div>
        </div>
        </div>
    )
}

export const GetSaleOrderMasterValues=async(model?:VmSaleOrderModel):Promise<InvoiceMasterValuesModel>=>{
 
    let obj:InvoiceMasterValuesModel= {
          WillBypassTaxCaluclations:true
    }  

    return Promise.resolve(obj);
}

export const GetSaleOrderBillInfo=async(model?:VmSaleOrderModel):Promise<CommonInvDetailActionQueryBillInfo>=>{
 
    let billIfno:CommonInvDetailActionQueryBillInfo={
        VendorCode:model?.SaleOrder?.CustCode,
        BillDate:model?.SaleOrder?.OrderDate,
        LocId:model?.SaleOrder?.LocId
    }
    return Promise.resolve(billIfno);
}


export const SetSaleOrderItemsDetail=async(res?:CommonInvDetailActionQueryResponse,uniqueId?:string)=>{
     let preState= await get_form_state_without_selector<VmSaleOrderModel>(uniqueId??"");
     set_form_state(uniqueId??"",
                    {
                        ...preState,
                        SaleOrderDetails:[...res?.InventoryDTO?.InventoryList??[]],
                        TaxDetail:[...res?.InventoryDTO?.InventoryIOTaxList??[]]
                    })
}