/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { VmSale } from "../model/VmSaleModel"
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { SetupFromGetAll } from "../../../../inventory/config/unit/impl/setupFormImp";
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { SetupFormModel } from "../../../../inventory/config/unit/model/setupFormModel";
import { Category, Padding } from "@mui/icons-material";
import { Paper, useTheme } from "@mui/material";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";


const POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY"
export const POSSaleView=(props?:MenuComponentProps<VmSale>)=>{

    const [catCode,setCatCode]=useState<string>()
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'
    const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY)) as SetupFormModel[]


    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmSale>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })

         handleCategories();
        }
    },[fullState?.IsFirstUseEffectCall])


    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }
    
    return(
        <div className="row">
            <div className="col-md-2">
                <RenderCategories selectedCategory={catCode} onSelected={(code)=>{
                    setCatCode(code)
                }} categories={[...categories]} />
            </div>
            
        </div>
    )
}

export interface RenderCategoriesProps{
     categories?:SetupFormModel[];
     selectedCategory?:string;
     onSelected?:(code?:string)=>void;
}

export const RenderCategories=(props?:RenderCategoriesProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const [search,setSearch]=useState('');
    const [searchtedCats,setSearchedCats]=useState<SetupFormModel[]>([])

    useEffect(()=>{
        if(props?.categories){
            setSearchedCats(JSON.parse(JSON.stringify(props?.categories)))
            return;
        }
        else{
            set
        }
    },[props?.categories])
    return(
        <Quantom_Grid container>
            <Quantom_Grid container size={{xs:12}} sx={{marginBottom:"5px"}}>
                <Quantom_Input label="Category Search" value={search} onChange={(e)=>setSearch(e?.target?.value)}/>
            </Quantom_Grid>
            <Quantom_Grid container>
            {
                props?.categories?.map((item,index)=>{
                    return(
                        <Quantom_Grid 
                            onClick={()=>{props?.onSelected?.(item?.Code)}}
                            size={{xs:12}} 
                            sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,paddingLeft:'8px',borderBottom:`1px solid ${theme?.palette?.text?.primary}`,
                            paddingTop:'5px',paddingBottom:'5px',backgroundColor:(item.Code===props?.selectedCategory)?theme?.palette?.secondary?.main:undefined}} 
                                        item component={Paper} className="col-12">
                            {item?.Name}
                        </Quantom_Grid>
                    )
                })
            }
            </Quantom_Grid>
           
        </Quantom_Grid>
    )
}





