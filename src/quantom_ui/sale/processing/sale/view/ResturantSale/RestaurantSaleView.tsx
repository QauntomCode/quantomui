/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { MenuComponentProps, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid } from "../../../../../../quantom_comps/base_comps"
import { VmSale } from "../../model/VmSaleModel"
import dayjs from "dayjs"
import store, { get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store"
import { Box, Dialog, Modal } from "@mui/material"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import { Sale_RestaurantTablesModel } from "../../../../config/Sale_ResturantTables/model/Sale_ResturantTablesModel"
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone';
import { CommonInvDetailModel } from "../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel"
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { CommonCodeName } from "../../../../../../database/db"
import { InventoryItemsModel } from "../../../../../inventory/config/item/model/InventoryItemsModel"
import CategoryIcon from '@mui/icons-material/ArticleTwoTone';
import ItemsIcon from '@mui/icons-material/VerticalSplitOutlined';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import { add_helper_data, add_helper_data_single_key } from "../../../../../../redux/reduxSlice"
import { useSelector } from "react-redux"

export const RestaurantSaleView=(props?:MenuComponentProps<VmSale>)=>{
    
   
    
    React.useEffect(()=>{
        setFormBasicKeys<VmSale>({
                //  SaveMethod:(payload)=>InventoryItemsInsert(payload),
                //  DeleteMethod:(payload)=>InventoryItemsDelete(payload),
                //  GetOneMethod:(payload)=>InventoryItemsGetOne(payload),
                 SetBasicKeys:()=>({keyNoPropName:"Sale.BillNo",keyDatePropsName:""}),
                 uniqueKey:props?.UniqueId??"",
                 baseProps:props??{},
                 settings:{firstControlId:"inventory_items_item_name",WillHideUserLog:true,wWillHideToolbar:true},
              })
    },[props?.fullState?.IsFirstUseEffectCall])
    return(
        <>
         <ItemsPopupComp UniqueId={props?.UniqueId??""}/>
        <Quantom_Grid container spacing={.5}>
            {/* <div style={{marginBottom:'5px'}}> */}
            <HeaderContainer/>
            {/* </div> */}
            <Quantom_Grid container>
                <Quantom_Grid size={{xs:6}}>
                    <RenderTables UniqueId={props?.UniqueId} />
                </Quantom_Grid>
                <Quantom_Grid  size={{xs:6}}>
                    <RenderSoldItemsComp/>
                </Quantom_Grid>
            </Quantom_Grid>
            
        </Quantom_Grid>
        </>
    )
}


export const ItemsPopupComp=(props?:SaleCompHelperProps)=>{
    const willShowModel= useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY)) as boolean;

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
                <RenderAllCategories/>
            </div>
            <div style={{flex:1}}>
                <RenderAllItems />
            </div>
            <div style={{flex:1}}>
                <RenderSoldItemsComp willShowHeader/>
            </div>
        </div>
        </Box>
    </Dialog>
    )
}

export interface SaleCompHelperProps{
    UniqueId?:string;
}
export interface TableCompProps extends SaleCompHelperProps{

}
export const RenderTables=(props?:TableCompProps)=>{

    const [preSelectedTable,setPreSelectedTable]=React.useState<string>('')
    const _SELECTED_TABLE_KEY="_SELECTED_SALE_TABLE"
    const fonts= useQuantomFonts();
    const handleOnTableClick=(item?:Sale_RestaurantTablesModel)=>{
        // alert('clicked item code is'+item?.Code)
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{
            keyNo:_SELECTED_TABLE_KEY,
            Data:item?.Code
         }}));
    }

  const selectedTable= useSelector((state:any)=>get_helperData_by_key(state,props?.UniqueId??"",_SELECTED_TABLE_KEY)) as string;
  
  React.useEffect(()=>{
    if(selectedTable  && preSelectedTable!== selectedTable){
        setPreSelectedTable(selectedTable);
        handleTableClicked(selectedTable);
        // alert(selectedTable)
    }
  },[selectedTable])

  const handleTableClicked=(selectedTable?:string)=>{

    store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{
        keyNo:_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY,
        Data:true
     }}));
   // restaurant_sale_open_items_model(props?.UniqueId,true)
 
    // store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId,data:{
    //     keyNo:_RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY,
    //     Data:"true"
    //  }}));

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
                       <div style={{paddingTop:'20px',paddingBottom:'20px',border: _BORDER_PROPS,backgroundColor: item?.TableStatus==='BOOKED'?_MOSS_GREEN: _GRAY_COLOR,justifyContent:'center',alignItems:'center',display:'grid'}}>
                         <TableRestaurantTwoToneIcon sx={{ fontSize:"50px"}}/>
                       </div>
                    </div>
                    )
                })
             }
        </Quantom_Grid>
    )
}

interface RenderSoldItemsProps extends SaleCompHelperProps{
  willShowHeader?:boolean;
}
export const RenderSoldItemsComp=(props?:RenderSoldItemsProps)=>{
    const totalAmount= 9000
    const fonts= useQuantomFonts()
    return(
     <div style={{border:_BORDER_PROPS}}>
         
                <div style={{width:'100%',lineHeight:'30px',display:'flex',justifyContent:'center',borderBottom:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontWeight:fonts.RegularFontSize}}>
                                <div style={{display:'flex',justifyContent:'center',flex:1,backgroundColor:_ORANGE_COLOR}}>
                                    Ordered Items
                                </div>
                                {props?.willShowHeader? 
                                 (
                                <div style={{paddingLeft:'5px',paddingRight:'5px',display:'flex',justifyContent:'center',alignItems:"center",borderLeft:_BORDER_PROPS,backgroundColor:_BLUE_COLOR}}>
                                    <DisabledByDefaultTwoToneIcon fontSize='medium' />
                                    close
                                </div>
                                ):(<></>)
                            }
                                
                </div>
         
      <Quantom_Grid spacing={.5} container sx={{flex:1,marginLeft:'5px',marginRight:'5px',marginTop:'5px'}}>
        {[{ItemCode:'add_new_item',ItemName:""},...SoldItems]?.map((item,index)=>{
             const isAddNewItem=item.ItemCode==='add_new_item'
            return(
             <Quantom_Grid size={{xs:6,sm:6,md:4,lg:3}} >
                
                <div style={{border:_BORDER_PROPS,height:isAddNewItem?'118px':'80px',backgroundColor:_YELLOW_COLOR,
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
    )
}

export const RenderAllCategories=(props?:SaleCompHelperProps)=>{
    const fonts= useQuantomFonts();
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
                AllCategories?.map((item,index)=>{
                    return(
                        <div style={{display:'flex',width:'100%',lineHeight:'30px',border:_BORDER_PROPS,justifyContent:"center",fontFamily:fonts.HeaderFont,}}>
                            {item?.Name}
                        </div>
                    )
                })
             }
        </Quantom_Grid>
    )
}

export const RenderAllItems=(props?:SaleCompHelperProps)=>{
    const fonts= useQuantomFonts();
    return(
        <div>
         <div style={{display:'flex',lineHeight:'30px',border:_BORDER_PROPS,width:'100%',fontFamily:fonts.HeaderFont,justifyContent:'center',alignItems:'center',
            fontSize:fonts.H4FontSize,
            backgroundColor:_LIGHT_PINK_COLOR
         }}>
            <ItemsIcon></ItemsIcon>
            All Items
            </div>
        <div style={{display:'flex',flexDirection:'column',width:'100%',border:_BORDER_PROPS,height:'100%'}}>
        <div style={{flex:1}}>
            
         <Quantom_Grid container spacing={.5} >
            
         {
            AllItems?.map((item,index)=>{
                return(
                    <Quantom_Grid  size={{md:4,sm:6,xs:12,lg:3}} sx={{border:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize}} >
                        <div style={{backgroundColor:_YELLOW_COLOR,height:'60px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            {item?.ItemName}
                        </div>
                        <div style={{borderTop:_BORDER_PROPS,display:'flex',backgroundColor:_GREEN_COLOR}}>
                            {item?.SalePrice}
                        </div> 
                    </Quantom_Grid>
                )
            })
         }
         
         </Quantom_Grid>
        </div>
         <div style={{display:'flex',lineHeight:'30px',marginTop:'5px',borderTop:_BORDER_PROPS,fontFamily:fonts.HeaderFont,fontSize:'13px'}}>
            <div style={{flex:1,borderRight:_BORDER_PROPS,justifyContent:'center',alignItems:'center',display:'flex'}}> Take Away</div>
            <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>Dine In</div>
         </div>
        </div>
        </div>
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
export const _RESTAURANT_SALE_OPEN_ITEMS_MODEL_KEY="RESTAURANT_SALE_OPEN_ITEM_MODEL_KEY"


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

export const SoldItems:CommonInvDetailModel[]=[
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
    {
        ItemCode:"0023",
        ItemName:"First Item",
        Qty:1,
        Price:500,
        Amount:500,
    },
]


export const AllCategories:CommonCodeName[]=[

    {
        Code:"001",
        Name:"Beverages"
    },
    {
        Code:"002",
        Name:"Biryani"
    },
    {
        Code:"003",
        Name:"Fries"
    },
    {
        Code:"003",
        Name:"Grills"
    },
    {
        Code:"003",
        Name:"Fruits"
    },
    {
        Code:"003",
        Name:"Rice"
    },
    {
        Code:"003",
        Name:"Handi"
    },
    {
        Code:"003",
        Name:"Bar-B-Q"
    },
]

export const AllItems:InventoryItemsModel[]=[
    {
        ItemCode:"001",
        ItemName:"First Item ",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Second Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Third Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Fourth Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Fifth Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Sixth Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
    {
        ItemCode:"001",
        ItemName:"Seventh Item",
        CatCode:'001',
        SalePrice:500,
        PurchasePrice:300,
    },
]