/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import { _BLUE_COLOR, _BORDER_PROPS, _GRAY_COLOR, _GREEN_COLOR, _LIGHT_LEMON_GREEN, _MOSS_GREEN, _ORANGE_COLOR, _YELLOW_COLOR, SaleCompHelperProps } from "../RestaurantSaleView";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';


interface SaleHeaderContainerCompProps extends SaleCompHelperProps{

}

export const RenderHeaderContainerRestaurantHelper=(props?:SaleHeaderContainerCompProps)=>{
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