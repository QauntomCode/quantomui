/* eslint-disable react/jsx-pascal-case */
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { add_helper_data_single_key } from "../../../../../../../redux/reduxSlice";
import store, { form_state_selector, useQuantomFonts } from "../../../../../../../redux/store";
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { _BLUE_COLOR, _BORDER_PROPS, _GREEN_COLOR, _LIGHT_PINK_COLOR, _ORANGE_COLOR, _RESTAURANT_SALE_OPEN_ITEM_INFO_KEY, _RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY, _YELLOW_COLOR, SaleCompHelperProps } from "../RestaurantSaleView";
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useSelector } from "react-redux";
import { VmSaleOrderModel } from "../../../../saleOrder/model/VmSaleOrderModel";


interface RenderSoldItemsProps extends SaleCompHelperProps{
    willShowHeader?:boolean;
  }
  export const RenderSoldItemsCompRestaurantHelper=(props?:RenderSoldItemsProps)=>{
      const totalAmount= 9000
      const fonts= useQuantomFonts()
      const handleCloseButtonClicked=()=>{
          store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY,Data:false}}))
      }


      const state= useSelector((state:any)=>form_state_selector<VmSaleOrderModel>(state,props?.UniqueId??""))
      const soldItems= state?.SaleOrderDetails??[]
  
  
      const handleSelectedItemClick=(item?:CommonInvDetailModel)=>{
           store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{keyNo:_RESTAURANT_SALE_OPEN_ITEM_INFO_KEY,Data:item}}))
      }
  
      return(
       <div style={{border:_BORDER_PROPS}}>
           
                  <div style={{width:'100%',lineHeight:'30px',display:'flex',justifyContent:'center',borderBottom:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontWeight:fonts.RegularFontSize}}>
                                  <div style={{display:'flex',justifyContent:'center',flex:1,backgroundColor:_ORANGE_COLOR}}>
                                      Ordered Items
                                  </div>
                                  {props?.willShowHeader? 
                                   (
                                  <div onClick={handleCloseButtonClicked} style={{paddingLeft:'5px',paddingRight:'5px',display:'flex',justifyContent:'center',alignItems:"center",borderLeft:_BORDER_PROPS,backgroundColor:_BLUE_COLOR}}>
                                      <DisabledByDefaultTwoToneIcon fontSize='medium' />
                                      close
                                  </div>
                                  ):(<></>)
                              }
                                  
                  </div>
           
        <Quantom_Grid spacing={.5} container sx={{flex:1,marginLeft:'5px',marginRight:'5px',marginTop:'5px'}}>
          {[{ItemCode:'add_new_item',ItemName:""},...soldItems]?.map((item,index)=>{
               const isAddNewItem=item.ItemCode==='add_new_item'
              return(
               <Quantom_Grid size={{xs:6,sm:6,md:4,lg:3}} >
                  
                  <div  onClick={()=>{handleSelectedItemClick(item)}} style={{border:_BORDER_PROPS,height:isAddNewItem?'118px':'80px',backgroundColor:_YELLOW_COLOR,
                      fontFamily:fonts.RegularFont,fontSize:fonts.H4FontSize,display:'flex',
                      alignItems:'center',
                      justifyContent:'center'}}>
                      {isAddNewItem?(
                          <>
                            <AddCircleTwoToneIcon fontSize="large"/>
                          </>
                      ): (item?.ItemName)
                  }
                  </div>
                  {(!isAddNewItem)?
                   (<>
                      <div  style={{display:'flex',border:_BORDER_PROPS,backgroundColor:_GREEN_COLOR,lineHeight:'15px'}}>
                      <div style={{flex:1,borderRight:_BORDER_PROPS,fontFamily:'monospace',fontSize:fonts.H4FontSize}}>
                          {item.Price}
                      </div>
                      <div style={{flex:1,fontFamily:'monospace',fontSize:fonts.H4FontSize}}>
                          {item?.Qty}
                      </div>
                      </div>
                      <div style={{display:'flex',border:_BORDER_PROPS,backgroundColor:_BLUE_COLOR,fontFamily:'monospace',fontSize:fonts.H4FontSize,lineHeight:'15px'}}>
                          {item?.Amount}
                      </div>
                  </>
                  ):(<></>)
              }
               </Quantom_Grid>
              )
          })}
        </Quantom_Grid>
        <div style={{display:'flex',flexDirection:'row',lineHeight:'50px',borderTop:_BORDER_PROPS,marginTop:'5px'}}>
            <div style={{flex:1,fontFamily:fonts.HeaderFont,fontSize:'16px',fontWeight:'bold',backgroundColor:_LIGHT_PINK_COLOR}}>Total : {totalAmount} </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontFamily:fonts.HeaderFont,fontSize:fonts.RegularFont,borderLeft:_BORDER_PROPS,backgroundColor:_BLUE_COLOR,}}>
                 <CheckCircleTwoToneIcon fontSize="medium"/>
                 Order Now
            </div>
  
        </div>
        </div>
      )
  }
  

  