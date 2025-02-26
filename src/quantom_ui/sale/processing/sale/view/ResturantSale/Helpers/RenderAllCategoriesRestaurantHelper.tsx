/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import store, { get_helperData_by_key, useQuantomFonts } from "../../../../../../../redux/store";
import { _BORDER_PROPS, _ORANGE_COLOR, _RESTAURANT_SALE_ALL_CATEGORIES_KEY, _RESTAURANT_SALE_SELECTED_CATEGORY_KEY, SaleCompHelperProps } from "../RestaurantSaleView";
import { CommonCodeName } from "../../../../../../../database/db";
import { Quantom_Grid, Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import CategoryIcon from '@mui/icons-material/ArticleTwoTone';
import { add_helper_data_single_key } from "../../../../../../../redux/reduxSlice";
import { useEffect, useState } from "react";
import { SetupFormGetAllBulk } from "../../../../../../inventory/config/unit/impl/setupFormImp";
import { Paper, useTheme } from "@mui/material";
import { APP_TYPE, GetAPPType, IconByName } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { isNullOrEmpty } from "../../../../../../../CommonMethods";
import { SetupFormModel } from "../../../../../../inventory/config/unit/model/setupFormModel";

export const RenderAllCategoriesRestaurantHelper=(props?:SaleCompHelperProps)=>{

    const[search,setSearch]=useState('')
    const[cats,setCats]=useState<SetupFormModel[]>([])
    const[allCats,setAllCats]=useState<SetupFormModel[]>([])
    useEffect(()=>{
        handleLoadAllCategories();
    },[])
    const[selected,setSelected]=useState<SetupFormModel>()

    const fonts= useQuantomFonts();
    //const allCats= useSelector((state?:any)=>(get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_ALL_CATEGORIES_KEY))) as CommonCodeName[];

    // useEffect(()=>{
    //     handleSearch();
    // },[allCats])
    
    useEffect(()=>{
        console.log("inside state all categories are",allCats)
        handleSearch();
    },[search,allCats])

    const handleSearch=()=>{

        if(search==='')
            {
                var copy= (JSON.parse(JSON?.stringify?.(allCats)) as SetupFormModel[])?.slice(0,200);
                setCats(copy);
                return;
            }
        else
        {

            let res:SetupFormModel[]=[]

            for(let cat of allCats){
                if(res?.length>200){
                    continue;
                }
                if(isNullOrEmpty(search)){

                    res?.push(cat);
                }

                let isFound= cat?.Name?.toLowerCase()?.includes(search?.toLowerCase());
                if(isFound){
                    res?.push(cat)
                }
            }
            setCats(res)
        }
    }
    const theme= useTheme();
    const handleLoadAllCategories=async ()=>{
        let catsData= await SetupFormGetAllBulk(['Category']);
        setAllCats(catsData.find(x=>x.Type?.toUpperCase()==="Category".toUpperCase())?.Data ??[]);
        // setAllCats([...data??[]]);
        console.log("all categories data is overall",catsData)
        // console.log("all categories data is",data)
        // store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_ALL_CATEGORIES_KEY,Data:data}})));
        // setSelected(data?.[0])
    }
   
    console.warn('all categories are',cats)
    const appType= GetAPPType();
    return(
        <Quantom_Grid  container size={{xs:12}}>
             <Quantom_Grid size={{xs:12}} component={Paper} style={{

                borderBottom:`1px solid ${theme?.palette?.primary?.main}`,
                display:'flex',width:'100%',backgroundColor:theme?.palette?.secondary?.main,fontFamily:fonts.RegularFont,justifyContent:'center',
                alignItems:'center',fontSize:fonts.H4FontSize,fontWeight:'bold'}}>
                 <CategoryIcon style={{color:theme?.palette?.secondary.contrastText}} fontSize="medium"></CategoryIcon>
                 <div style={{color:theme.palette.secondary.contrastText}}>{appType===APP_TYPE.DENTAL_APP?"Services":"Categories"}</div>
             </Quantom_Grid>
             <Quantom_Grid size={{xs:12}}>
                <Quantom_Input label="Search"  value={search} onChange={(e)=>{setSearch(e?.target?.value)}}/>
             </Quantom_Grid>
             {
            
                cats?.map((item,index)=>{
                    return(
                        <Quantom_Grid display='flex' alignItems='center'  pt={.5} pb={.5} pl={1} component={Paper} size={{xs:12}}
                           onClick={()=>{
                             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:_RESTAURANT_SALE_SELECTED_CATEGORY_KEY,Data:item?.Code}}));
                             setSelected(item)
                           }} 
                            style={{display:'flex',borderBottom:`1px solid ${theme?.palette?.primary?.contrastText}`,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:450,
                            backgroundColor: selected?.Code===item?.Code? theme?.palette?.secondary?.main: theme?.palette?.primary?.main}}>
                            <IconByName  color={theme.palette.primary.contrastText} iconName="ClassOutlined" fontSize="20px"/>
                            <div style={{marginLeft:'8px',color:theme.palette.primary.contrastText}}>
                            {item?.Name}
                            </div>
                        </Quantom_Grid>
                    )
                })
             }
        </Quantom_Grid>
    )
}
