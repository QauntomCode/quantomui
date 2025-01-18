/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { form_state_selector, set_form_state, useQuantomFonts } from "../../../../../../../redux/store";
import { _BLUE_COLOR, _BORDER_PROPS, _GRAY_COLOR, _MOSS_GREEN, _ORANGE_COLOR, SaleCompHelperProps } from "../RestaurantSaleView";
import { VmSaleOrderModel } from "../../../../saleOrder/model/VmSaleOrderModel";
import { Sale_RestaurantTablesModel } from "../../../../../config/Sale_ResturantTables/model/Sale_ResturantTablesModel";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone';


export interface TableCompProps extends SaleCompHelperProps{

}
export const RenderTablesRestaurantHelper=(props?:TableCompProps)=>{

    const fonts= useQuantomFonts();
    const state=useSelector((state?:any)=>form_state_selector<VmSaleOrderModel>(state,props?.UniqueId??""));
    const selectedTable= state?.ResturantTable?.[0]
    const handleOnTableClick=(item?:Sale_RestaurantTablesModel)=>{
        set_form_state<VmSaleOrderModel>(props?.UniqueId,{...state,ResturantTable:[{TableNo:item?.Code}]})
    }
    return(
        <Quantom_Grid container style={{fontFamily:fonts.RegularFont,fontSize:'10px',border:_BORDER_PROPS,paddingBottom:'5px'}}>
            
            <div style={{width:'100%',lineHeight:'30px',display:'flex',justifyContent:'center',borderBottom:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontWeight:fonts.RegularFontSize}}>
                                <div style={{display:'flex',justifyContent:'center',flex:1,backgroundColor:_ORANGE_COLOR}}>
                                    Tables
                                </div>
                                
                </div>

             {
                tables.map((item,index)=>{
                    return(
                    <div   style={{display:'flex',marginLeft:'8px',marginTop:'6px',flexDirection:'column'}} onClick={()=>{
                        // alert('clicked')
                        handleOnTableClick(item)
                    }}>
                    <div style={{display:'flex',lineHeight:'17px',border:_BORDER_PROPS}}>
                       <div style={{width:'50px',backgroundColor:_ORANGE_COLOR}}>
                          {item?.Name}
                       </div>
                       <div style={{borderLeft:_BORDER_PROPS,width:'50px',backgroundColor:_BLUE_COLOR}}>
                         {item?.OrderValue??0}
                       </div>
                       </div>
                       <div style={{paddingTop:'20px',paddingBottom:'20px',border: _BORDER_PROPS,backgroundColor:(selectedTable?.TableNo===item?.Code)?_MOSS_GREEN:_GRAY_COLOR,justifyContent:'center',alignItems:'center',display:'grid'}}>
                         <TableRestaurantTwoToneIcon sx={{ fontSize:"50px"}}/>
                       </div>
                    </div>
                    )
                })
             }
        </Quantom_Grid>
    )
}


export const tables:Sale_RestaurantTablesModel[]=[
    {
        Code:'001',
        Name:"R1-C1",
        OrderValue:500,
        TableStatus:'BOOKED',
    },
    {
        Code:'002',
        Name:"R2-C2",
        OrderValue:500
    },
    {
        Code:'003',
        Name:"R3-C3",
        OrderValue:500
    },
    {
        Code:'004',
        Name:"R4-C1",
        OrderValue:500
    },
    {
        Code:'005',
        Name:"R4-C2",
        OrderValue:500
    },
    {
        Code:'006',
        Name:"R4-C3",
        OrderValue:500
    },
    {   Code:'006',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'007',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'008',
        Name:"R1-C1",
        OrderValue:500,
        TableStatus:'BOOKED',
    },
    {
        Code:'009',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'010',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'011',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'012',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'013',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'014',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'015',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'016',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'017',
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Code:'018',
        Name:"R1-C1",
        OrderValue:500
    }
]