/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { InventoryItemsModel } from "../../../../../../inventory/config/item/model/InventoryItemsModel";
import { _BORDER_PROPS, _GREEN_COLOR, _LIGHT_PINK_COLOR, _RESTAURANT_SALE_SELECTED_CATEGORY_KEY, _YELLOW_COLOR, SaleCompHelperProps } from "../RestaurantSaleView";
import { get_helperData_by_key, useQuantomFonts } from "../../../../../../../redux/store";
import { useSelector } from "react-redux";
import { GetItemsByCategory } from "../../../../../../inventory/config/item/impl/InventoryitemsImpl";
import ItemsIcon from '@mui/icons-material/VerticalSplitOutlined';
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";


export const RenderAllItemsRestaurantHelper=(props?:SaleCompHelperProps)=>{
    const[items,setItems]=React.useState<InventoryItemsModel[]>([])
    const fonts= useQuantomFonts();
    const selectedCategory= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_SELECTED_CATEGORY_KEY))) as string;

    React.useEffect(()=>{
        handleLoadItems(selectedCategory);
         //alert('selected category is'+selectedCategory)
    },[selectedCategory])

    const handleLoadItems=async(catCode?:string)=>{
            let res= await GetItemsByCategory(catCode);
            setItems(res??[])

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
                        <div style={{backgroundColor:_YELLOW_COLOR,height:'60px',display:'flex',
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