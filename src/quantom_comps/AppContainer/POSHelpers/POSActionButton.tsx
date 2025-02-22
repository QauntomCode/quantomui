import { Box, Paper, useTheme } from "@mui/material";
import { useQuantomFonts } from "../../../redux/store";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../HTTP/QuantomHttpMethods";
import React, { useEffect, useState } from "react";
import { Toast } from "../../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView";
import { HideLoadingDialog, IconByName, QuantomConfirmationDialog, ShowLoadingDialog } from "../Helpers/TabHelper/AppContainerTabHelper";
import { ShowQuantomError } from "../Helpers/TabHelper/QuantomError";

export interface POSActionButtonProps{
    label?:string;
    iconName?:string;
    iconColor?:string;
    onClick?:()=>void;
    buttonType?:'SAVE'|'RESET'|'DELETE'|'LIST'
    responseClick?:()=>Promise<HttpResponse<any>>
    responseAfterMethod?:(state?:any)=>void;
    backgroundColor?:string;
    rightMargin?:string;
    textColor?:string; 
    isIconOnly?:boolean;
  }
  export const POSActionButton=(props?:POSActionButtonProps)=>{
      const fonts= useQuantomFonts();
      const theme= useTheme();
      const[openConfirmation,setOPenConfirmation]=React.useState(false);
      const [errorMessage,setErrorMessage]=React.useState('');
      const [openEerrorMessage,setOpenErrorMessage]=React.useState(false);
      const [toastMessage,setToastMessage]=React.useState('');
      const[openToast,setOpenToast]=React.useState(false);
      const[iconColor,setIconColor]=useState<string>();
      const [isFocused, setIsFocused] = useState(false);
      const[isClicked,setIsClicked]=useState(false);
      const handleFocus = () => {
        setIsFocused(true);
      };
    
      const handleBlur = () => {
        setIsFocused(false);
      };
      useEffect(()=>{
          let color= theme?.palette?.primary?.main;
          if(props?.buttonType==='DELETE' || props?.buttonType==='RESET'){
              color= theme?.palette?.error?.main;
          }
          if(props?.buttonType==='SAVE'){
              color= theme?.palette?.success?.main;
          }
          setIconColor(theme?.palette?.primary?.main)
      },[theme])
  

      const handleKeyDown = (event?:any) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default scrolling on Space key
          handleClick();
        }
      };


      const handleClick=async()=>{
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 150);
              try {
                  if(props?.buttonType==='DELETE' || props?.buttonType==='RESET'){
                      setOPenConfirmation(true);
                      return;
                  }
                  if(props?.responseClick){
                  
                      if(props?.buttonType==='SAVE'){
                          ShowLoadingDialog();
                      }
                      let res= await props?.responseClick?.()
                      if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                          if(props.buttonType==='SAVE'){
                              setOpenToast(true);
                              setToastMessage('Record Saved Successfully...');
                              props?.responseAfterMethod?.(res?.Response)
                          }
                          HideLoadingDialog();
                          // success message
                      }
                      else if(res.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
                          HideLoadingDialog();
                          ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:"Error"});
                         
                      }
                      }
                      else{
                          props?.onClick?.()
                      }
              
              }
              catch{
              HideLoadingDialog();
              }
          }
      return(
         
          <div style={{width:'60px',marginRight: (props?.rightMargin)?props?.rightMargin:'8px'}}>
               
           <Toast  message={toastMessage} open={openToast} oncClose={()=>{setOpenToast(false)}} />
           <Box 
                // role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                component={Paper} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{borderBottom:`1px solid ${theme.palette.primary.main}`, backgroundColor: isFocused?theme?.palette?.primary.light:undefined,
                transition: 'opacity 0.5s, transform 0.5s',
                transform: isClicked ? "scale(0.95)" : "scale(1)",
                 '&:hover': {
                    backgroundColor:theme?.palette?.primary.light,
                },}} className="pos_action_button">
          {(props?.buttonType=== 'DELETE' ||props?.buttonType==='RESET')?(
                  <QuantomConfirmationDialog OnYesPress={async()=>{
                      if(props?.buttonType==='DELETE'){
                          setOPenConfirmation(false);
                          let res= await props?.responseClick?.();
                          if(res?.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                              setOpenToast(true);
                              setToastMessage('Record Deleted Successfully...')
                          }
                          else{
                              ShowQuantomError({MessageBody:res?.ErrorMessage,MessageHeader:"Error"});
                          }
                      }
                      if(props?.buttonType==='RESET'){
                          props?.onClick?.();
                          setOPenConfirmation(false);
                      }
                  }} 
                  OnNoPress={()=>{
                      setOPenConfirmation(false);
                  }}
                  open={openConfirmation} MessageHeader="Are You Sure Delete !"/>  
              ):(<></>)} 
          
                <Box 
                    onClick={handleClick}    
                    style={{     justifyContent:'center',display:'flex',flexDirection:'column',alignItems:'center',width:'60px',height:'70px',
                                border:'none',color:theme?.palette?.text?.primary,
                                fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:'12px'}}>
                                    
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <IconByName iconName={props?.iconName} fontSize="30px" color={iconColor}/>
                         {/* <POSSoftwareReportIcon color='primary' sx={{fontSize:'60px'}}></POSSoftwareReportIcon> */}
  
                      </div>
                      <div style={{letterSpacing:1.2}}>
                          {props?.label?.toLocaleUpperCase()}
                      </div>
                     
                </Box>
          
             
          </Box>
          </div>
      )
  }