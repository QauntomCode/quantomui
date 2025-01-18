/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import store, { get_helperData_by_key, useQuantomFonts } from "../../../../../../../redux/store";
import { _BORDER_PROPS, _ORANGE_COLOR, _RESTAURANT_SALE_ALL_CATEGORIES_KEY, _RESTAURANT_SALE_SELECTED_CATEGORY_KEY, SaleCompHelperProps } from "../RestaurantSaleView";
import { CommonCodeName } from "../../../../../../../database/db";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import CategoryIcon from '@mui/icons-material/ArticleTwoTone';
import { add_helper_data_single_key } from "../../../../../../../redux/reduxSlice";

export const RenderAllCategoriesRestaurantHelper=(props?:SaleCompHelperProps)=>{
    const fonts= useQuantomFonts();
    const cats= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_ALL_CATEGORIES_KEY))) as CommonCodeName[];
    console.warn('item information',cats)
    return(
        <Quantom_Grid container>
             <div style={{

                border:_BORDER_PROPS,
                display:'flex',width:'100%',lineHeight:'30px',backgroundColor:_ORANGE_COLOR,fontFamily:fonts.RegularFont,justifyContent:'center',
                alignItems:'center',fontSize:fonts.H4FontSize,fontWeight:'bold'}}>
                 <CategoryIcon fontSize="small"></CategoryIcon>
                 <div>Categories</div>
             </div>
             {
                cats?.map((item,index)=>{
                    return(
                        <div
                           onClick={()=>{
                             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:_RESTAURANT_SALE_SELECTED_CATEGORY_KEY,Data:item?.Code}}))
                           }} 
                            style={{display:'flex',width:'100%',lineHeight:'30px',
                            borderLeft:_BORDER_PROPS,
                            borderRight:_BORDER_PROPS,
                            borderBottom:_BORDER_PROPS,
                            justifyContent:"center",
                            fontFamily:fonts.HeaderFont,
                            fontSize:fonts.H4FontSize,
                            }}>
                            {item?.Name}
                        </div>
                    )
                })
             }
        </Quantom_Grid>
    )
}
