/* eslint-disable react/jsx-pascal-case */
import { Dialog, useTheme } from "@mui/material";
import store, { get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";
import React from "react";
import { FocusOnControlByControlId } from "../../../../CommonMethods";
import { Quantom_Grid } from "../../../base_comps";
import { GLOBAL_UNIQUE_KEY, IconByName } from "./AppContainerTabHelper";
import { add_helper_data_single_key } from "../../../../redux/reduxSlice";
import { extend } from "dayjs";
import { useSelector } from "react-redux";



 const ERROR_DIALOG_HELPER_KEY="ERROR_DIALOG_HELPER_KEY_STRING";
  
  
  
  export const QuantomErrorDialog=()=>{
    const theme=useTheme();
    const fonts= useQuantomFonts();
    const [isFocused,setIsFocused]=React.useState(false)
  
     
     let state= useSelector((state?:any)=>get_helperData_by_key(state,GLOBAL_UNIQUE_KEY,ERROR_DIALOG_HELPER_KEY)) as ErrorModel
    return(
      <Dialog fullWidth open={state?.Show??false}>
        <Quantom_Grid container>
          <div style={{width:'100%',backgroundColor:theme.palette.error.main,display:'flex',
            fontFamily:fonts?.HeaderFont, letterSpacing:1.5,fontWeight:600,fontSize:fonts.H3FontSize,flexDirection:"row",
            paddingLeft:'10px',justifyContent:'center',alignItems:'center'
          }}>
            <div style={{flex:1,height:'42px'}} >
              <div style={{marginRight:'10px', display:"flex" , alignItems:'center'}} >
                {/* {props?.Type==='INFO'?
                  (<IconByName iconName='LightbulbCircleTwoTone' color={theme?.palette?.text.secondary} fontSize='35'/>): */}
                  <IconByName iconName='ErrorTwoTone' color={theme.palette.text.primary} fontSize='35px'/>
                {/* } */}
                 {state?.MessageHeader}
              </div>
             
              
              </div>
            {/* <div onMouseEnter={()=>{setIsIconFocused(true)}} onMouseLeave={()=>{setIsIconFocused(false)}} style={{marginRight:'10px'}}   onClick={props?.onClosePress}>
              <IconByName iconName='HighlightOffTwoTone' color={isIconFocused?(theme?.palette?.secondary?.dark):(theme?.palette?.secondary?.light)} fontSize='22px'/>
            </div> */}
          </div>
          <div style={{paddingTop:'5px',paddingBottom:'5px',paddingLeft:'5px',fontFamily:fonts.RegularFont,letterSpacing:1.5,fontSize:fonts.RegularFontSize}}>
             {state?.MessageBody}
          </div>
  
          <div style={{display:'flex',marginBottom:'5px',width:'100%',justifyContent:'center',alignItems:'center',}}>
              <button type='button' id='quantom_alert_button_id' 
                onFocus={()=>(setIsFocused(true))} 
                onBlur={()=>{setIsFocused(false)}} 
                // tabIndex={0} 
                onClick={()=>HideQuantomError()} 
                onMouseEnter={()=>{setIsFocused(true)}}
                onMouseLeave={()=>{setIsFocused(false)}}
                style={{borderRadius:'5px',backgroundColor:isFocused?(theme?.palette?.secondary?.dark):(theme?.palette?.secondary?.light)}} >
                <div style={{display:'flex',justifyContent:'center'}}>
                 <IconByName fontSize='22px' iconName='HighlightOffTwoTone' />
                 <div style={{marginLeft:'20px', marginRight:'15px',fontWeight:'bold',fontFamily:fonts.HeaderFont,fontSize:fonts?.RegularFont}}>
                    Ok
                 </div>
                 </div>
              </button>
          </div>
          
          
         
        </Quantom_Grid>
      </Dialog>
    )
  }
  

  export interface QuantomErrorDialogProps{
    MessageHeader?:string;
    MessageBody?:string;
  }
  
  interface ErrorModel extends QuantomErrorDialogProps{
     Show?:boolean;
  }
  export const  ShowQuantomError=(error?:QuantomErrorDialogProps)=>{
      let md:ErrorModel={...error,Show:true};
      store.dispatch(add_helper_data_single_key({UniqueId:GLOBAL_UNIQUE_KEY,data:{keyNo:ERROR_DIALOG_HELPER_KEY,Data:{...md}}}))
  }

  export const HideQuantomError=(error?:QuantomErrorDialogProps)=>{
        let md:ErrorModel={...error,Show:false};
        store.dispatch(add_helper_data_single_key({UniqueId:GLOBAL_UNIQUE_KEY,data:{keyNo:ERROR_DIALOG_HELPER_KEY,Data:{...md}}}))
  }

