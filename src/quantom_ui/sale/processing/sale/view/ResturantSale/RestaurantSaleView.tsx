/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react"
import { MenuComponentProps, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Container, Quantom_Grid } from "../../../../../../quantom_comps/base_comps"
import { VmSale } from "../../model/VmSaleModel"
import dayjs from "dayjs"
import { useQuantomFonts } from "../../../../../../redux/store"
import { Box } from "@mui/material"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import { Sale_RestaurantTablesModel } from "../../../../config/Sale_ResturantTables/model/Sale_ResturantTablesModel"
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone';
export const RestaurantSaleView=(props?:MenuComponentProps<VmSale>)=>{
    
    // const [tables,setTables]=React.useState<Sale_RestaurantTablesModel[]>(tables)
   
    
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
        <Quantom_Container >
            <HeaderContainer/>
            <RenderTables />
        </Quantom_Container>
    )
}

export const RenderTables=()=>{

    const fonts= useQuantomFonts();
    
    return(
        <Quantom_Grid container style={{fontFamily:fonts.RegularFont,fontSize:'10px'}}>
             {
                tables.map((item,index)=>{
                    return(
                    <Box  display='flex' sx={{marginLeft:'8px',marginTop:'6px',flexDirection:'column'}}>
                    <div style={{display:'flex',lineHeight:'17px',border:_BORDER_PROPS}}>
                       <div style={{width:'50px',backgroundColor:_ORANGE_COLOR}}>
                          {item?.Name}
                       </div>
                       <div style={{borderLeft:_BORDER_PROPS,width:'50px',backgroundColor:_BLUE_COLOR}}>
                         {item?.OrderValue??0}
                       </div>
                       </div>
                       <div style={{paddingTop:'20px',paddingBottom:'20px',border:_BORDER_PROPS,backgroundColor:_GRAY_COLOR,justifyContent:'center',alignItems:'center',display:'grid'}}>
                         <TableRestaurantTwoToneIcon sx={{ fontSize:"50px"}}/>
                       </div>
                    </Box>
                    )
                })
             }
        </Quantom_Grid>
    )
}


export const HeaderContainer=()=>{
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

export const _MOSS_GREEN="#CDFFCC"
export const _YELLOW_COLOR="#FAFFCD"
export const _LIGHT_LEMON_GREEN="#E1F4A2"


export const _GRAY_COLOR="#CECECE"
export const _GREEN_COLOR="#A2FF69"
export const _BLUE_COLOR="#E3DFFF";
export const _ORANGE_COLOR="#FFCC67";
export const _BORDER_PROPS="2px solid rgb(116, 115, 114)"



export const tables:Sale_RestaurantTablesModel[]=[
    {
        Name:"R1-C1",
        OrderValue:500,
        TableStatus:'BOOKED',
    },
    {
        Name:"R2-C2",
        OrderValue:500
    },
    {
        Name:"R3-C3",
        OrderValue:500
    },
    {
        Name:"R4-C1",
        OrderValue:500
    },
    {
        Name:"R4-C2",
        OrderValue:500
    },
    {
        Name:"R4-C3",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500,
        TableStatus:'BOOKED',
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    },
    {
        Name:"R1-C1",
        OrderValue:500
    }
]