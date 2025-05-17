
import { HideLoadingDialog, IconByName, QuantomConfirmationDialog, ShowLoadingDialog } from "../Helpers/TabHelper/AppContainerTabHelper";
import { ShowQuantomError } from "../Helpers/TabHelper/QuantomError";
import { HTTP_RESPONSE_TYPE } from "../../../HTTP/QuantomHttpMethods";
import { Toast } from "../../../quantom_ui/inventory/config/item/views/POS/POSInventoryIitemsView";
import { Box, Paper, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuantomFonts } from "../../../redux/store";
import { POSActionButtonProps } from "./POSActionButton";




export const POSActionButton1=(props?:POSActionButtonProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const[openConfirmation,setOPenConfirmation]=React.useState(false);
    const [errorMessage,setErrorMessage]=React.useState('');
    const [openEerrorMessage,setOpenErrorMessage]=React.useState(false);
    const [toastMessage,setToastMessage]=React.useState('');
    const[openToast,setOpenToast]=React.useState(false);
    const[iconColor,setIconColor]=useState<string>();

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

    const getWidth=()=>{
        let width=props?.isIconOnly?'70px':'130px';
        if(props?.width){
            width=props?.width;
        }

        return width;
    }
    return(
       
        <div onKeyDown={(e)=>{
            if (e.key === 'Enter') {
                props?.onClick?.()
            }
        }}  className="focused-element" tabIndex={0} style={{width:getWidth(),marginRight:props?.rightMargin,transition: 'background-color 0.3s ease'}}>
             
         <Toast  message={toastMessage} open={openToast} oncClose={()=>{setOpenToast(false)}}/>
         <Box component={Paper} sx={{backgroundColor:props?.backgroundColor??undefined,borderBottom:`1px solid ${theme.palette.primary.main}`, '&:hover': {
                    backgroundColor:theme?.palette?.primary.light,
                }}}>
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
        onClick={async()=>{
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
        }    
         style={{     justifyContent:'center',display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'40px',
                     border:'none',color:theme?.palette?.text?.primary,
                    fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:'12px'}}>
                      
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5px'}}>
                        <IconByName iconName={props?.iconName} fontSize="30px" color={props?.iconColor?? iconColor}/>
                       {/* <POSSoftwareReportIcon color='primary' sx={{fontSize:'60px'}}></POSSoftwareReportIcon> */}

                    </div>
                    {props?.isIconOnly?(<></>):(
                            <div style={{letterSpacing:1.2,color:props?.textColor}}>
                                {props?.label?.toLocaleUpperCase()}
                            </div>
                        )
                    }
                   
                   
              </Box>
           
        </Box>
        </div>
    )
}