/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { MenuComponentProps, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid } from "../../../../../../quantom_comps/base_comps"
import dayjs from "dayjs"
import store, { form_state_selector,  get_helperData_by_key,  useQuantomFonts } from "../../../../../../redux/store"
import { Box, Dialog } from "@mui/material"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import { CommonInvDetailModel } from "../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import {  add_helper_data_single_key } from "../../../../../../redux/reduxSlice"
import { useSelector } from "react-redux"
import { VmSaleOrderModel } from "../../../saleOrder/model/VmSaleOrderModel"
import { SetupFormGetAllBulk } from "../../../../../inventory/config/unit/impl/setupFormImp"
import { RenderAllItemsRestaurantHelper } from "./Helpers/RenderAllItemsRestaurantHelper"
import { RenderAllCategoriesRestaurantHelper } from "./Helpers/RenderAllCategoriesRestaurantHelper"
import { RenderSoldItemsCompRestaurantHelper } from "./Helpers/RenderSoldItemsCompRestaurantHelper"

export const RestaurantSaleView=(props?:MenuComponentProps<VmSaleOrderModel>)=>{
    
   
    
    React.useEffect(()=>{
        setFormBasicKeys<VmSaleOrderModel>({
                 SetBasicKeys:()=>({keyNoPropName:"Sale.BillNo",keyDatePropsName:""}),
                 uniqueKey:props?.UniqueId??"",
                 baseProps:props??{},
                 settings:{firstControlId:"inventory_items_item_name",WillHideUserLog:true,wWillHideToolbar:true},
              })
    },[props?.fullState?.IsFirstUseEffectCall]);

    React.useEffect(()=>{
        if(props?.fullState?.IsFirstUseEffectCall){
            handleLoadAllCategories();
        }
    },[props?.fullState?.IsFirstUseEffectCall])

    const handleLoadAllCategories=async ()=>{
        let catsData= await SetupFormGetAllBulk(['Category']);
        let data= catsData.find(x=>x.Type?.toUpperCase()==="CATEGORY")?.Data;
        store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_ALL_CATEGORIES_KEY,Data:data}})))
    }
    return(
        <>
         <ItemsPopupComp UniqueId={props?.UniqueId??""}/>
         <Quantom_Grid container spacing={.5}>
            {/* <div style={{marginBottom:'5px'}}> */}
            <HeaderContainer/>
            </Quantom_Grid>
            <div style={{marginTop:'5px'}}>
                <Quantom_Grid container spacing={.5}>
                    <Quantom_Grid size={{xs:2}}>
                        <RenderAllCategoriesRestaurantHelper UniqueId={props?.UniqueId}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:4}}>
                        <RenderAllItemsRestaurantHelper UniqueId={props?.UniqueId}/>

                    </Quantom_Grid>
                    <Quantom_Grid  size={{xs:6}}>
                        <RenderSoldItemsCompRestaurantHelper  UniqueId={props?.UniqueId}/>
                    </Quantom_Grid>
                </Quantom_Grid>
            </div>
            
        </>
    )
}


export const ItemsPopupComp=(props?:SaleCompHelperProps)=>{

    const state= useSelector((state?:any)=>form_state_selector<VmSaleOrderModel>(state,props?.UniqueId??""));

    const selectedTable= state?.ResturantTable?.[0];
    const willShowModel= useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY)) as boolean;

    React.useEffect(()=>{
        if(selectedTable && selectedTable?.TableNo){
             store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY,Data:true}}))
        }
    },[selectedTable?.TableNo])

    return(

        <Dialog
        fullWidth
        maxWidth={'large'}
        // maxWidth={maxWidth}
        open={willShowModel??false}
        // onClose={handleClose}
      >
    <Box>
        <div style={{display:'flex'}}>
            <div style={{width:'170px'}}>
                <RenderAllCategoriesRestaurantHelper UniqueId={props?.UniqueId}/>
            </div>
            <div style={{flex:1}}>
                <RenderAllItemsRestaurantHelper UniqueId={props?.UniqueId} />
            </div>
            <div style={{flex:1}}>
                <RenderSoldItemsCompRestaurantHelper willShowHeader UniqueId={props?.UniqueId}/>
            </div>
        </div>
        </Box>
    </Dialog>
    )
}

export interface SaleCompHelperProps{
    UniqueId?:string;
}


 interface SaleHeaderContainerCompProps extends SaleCompHelperProps{

}

export const HeaderContainer=(props?:SaleHeaderContainerCompProps)=>{
    const [nowTime,setNowTime]=React.useState<Date>(new Date());
    const fonts= useQuantomFonts();
    useEffect(() => {
        const intervalId = setInterval(() => {
            setNowTime(new Date()); // Update the state with the current time
        }, 1000);
    
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      }, [])
    return(
        <div>
    <Quantom_Grid container display='flex' >
    <div style={{display:'flex'}}>
    <Box sx={{border:_BORDER_PROPS}}>
   
        <Quantom_Grid display='flex'  flexDirection='column' style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:500,
            paddingRight:_BORDER_PROPS
        }}>
            <div style={{borderBottom:_BORDER_PROPS,backgroundColor:_BLUE_COLOR,paddingLeft:'6px',paddingRight:'6px',paddingTop:'2px',paddingBottom:'2px' }}>{dayjs(nowTime).format('ddd , DD MMM YYYY')}</div>
            <div style={{backgroundColor:_ORANGE_COLOR,display:'flex',justifyContent:'center',paddingTop:'2px',paddingBottom:'2px'}}>{dayjs(nowTime).format('hh:mm:ss')}</div>
        </Quantom_Grid>
    </Box>
    <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_GREEN_COLOR,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
             <div style={{width:'100%',}}>
             <LocalMallIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',fontWeight:'bold'}}>
                Take Away
             </div>
             {/* Take Away */}
           
       </button>
    </div>
    <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_GREEN_COLOR,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
             <div style={{width:'100%',}}>
             <ContactPhoneIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',}}>
                Delivery
             </div>
             {/* Take Away */}
           
       </button>
    </div>
  </div>


  <div style={{display:'flex',flex:1}}></div>
  <div style={{display:'flex'}}> 
  <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_GRAY_COLOR,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center",width:'80px'}}>
             <div style={{width:'100%',}}>
                <AccountBoxTwoToneIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',width:'100%'}}>
                John
             </div>
       </button>
    </div>
    <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_YELLOW_COLOR,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
             <div style={{width:'100%',}}>
                <AccountBoxTwoToneIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',width:'100%'}}>
                Lock Now
             </div>
       </button>
    </div>
    <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_MOSS_GREEN,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
             <div style={{width:'100%',}}>
                <ListAltTwoToneIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',width:'100%'}}>
                Others
             </div>
       </button>
    </div>
    <div style={{marginLeft:'8px'}}>
      <button style={{height:'100%',border:_BORDER_PROPS,backgroundColor:_LIGHT_LEMON_GREEN,display:'flex',
            flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
             <div style={{width:'100%',}}>
                <ListAltTwoToneIcon fontSize="medium"/>
             </div>
             <div style={{fontFamily:fonts.RegularFont,fontSize:'10px',width:'100%'}}>
                Online
             </div>
       </button>
    </div>
  </div>
 </Quantom_Grid>
 </div>
    )
}




export const SelectedItemPopup=(props?:SaleCompHelperProps)=>{
      const selectedItem= useSelector((state:any)=>(get_helperData_by_key(state,_RESTAURANT_SALE_OPEN_ITEM_INFO_KEY,props?.UniqueId??""))) as CommonInvDetailModel
      const [isShowModel,setShowModel]=React.useState(false);
      React.useEffect(()=>{
          if(selectedItem?.ItemCode){
            setShowModel(true);
          }
      },[selectedItem?.ItemCode])

    
    return(
        <>
          <Dialog fullWidth maxWidth={'large'} open={isShowModel}>
              {selectedItem?.ItemCode}
              {selectedItem?.ItemName}
          </Dialog>
        </>
    )
}



export const _MOSS_GREEN="#CDFFCC"
export const _YELLOW_COLOR="#FAFFCD"
export const _LIGHT_LEMON_GREEN="#E1F4A2"
export const _LIGHT_PINK_COLOR='#FFCCC9'

export const _GRAY_COLOR="#CECECE"
export const _GREEN_COLOR="#A2FF69"
export const _BLUE_COLOR="#E3DFFF";
export const _ORANGE_COLOR="#FFCC67";
export const _BORDER_PROPS="2px solid rgb(116, 115, 114)"
export const _RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY="RESTAURANT_SALE_OPEN_ITEM_MODEL_KEY";
export const _RESTAURANT_SALE_OPEN_ITEM_INFO_KEY="RESTAURANT_SALE_OPEN_ITEM_INFO_KEY";
export const _RESTAURANT_SALE_ALL_CATEGORIES_KEY="_RESTAURANT_SALE_ALL_CATEGORIES_KEY";
export const _RESTAURANT_SALE_SELECTED_CATEGORY_KEY="_RESTAURANT_SALE_SELECTED_CATEGORY_KEY";







