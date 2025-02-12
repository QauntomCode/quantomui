import { useTheme } from "@mui/material";
import { HttpResponse } from "../../../HTTP/QuantomHttpMethods";
import { POSActionButton } from "./POSActionButton";


interface POSToolBarCompProps<T,>{
    NewAction?:()=>void;
    ListAction?:()=>void;

    ResetAction?:()=>void;

    SaveAction?:()=>Promise<HttpResponse<T>>;
    DeleteAction?:()=>Promise<HttpResponse<T>>;

    SaveAfterAction?:(data?:any)=>void
    PrintAction?:()=>void;
}


export const POSToolBarComp=<T,>(props?:POSToolBarCompProps<T>)=>{
    const theme =useTheme();
    return(
        <div style={{display:'flex',paddingBottom:'4px',marginBottom:'4px',}}>

                        <POSActionButton
                            onClick={()=>
                                        props?.NewAction?.()
                            } 
                            label="New"  iconName="FeedOutlined" 
                                
                        /> 
                        <POSActionButton 
                            responseAfterMethod={props?.SaveAfterAction} 
                            label="Save" buttonType="SAVE"  iconName="SaveOutlined" 
                            responseClick={props?.SaveAction}
                        />
                        <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.ResetAction?.()}} iconName="CancelPresentationOutlined"/>
                        <POSActionButton label="Delete" buttonType='DELETE'  iconName="DeleteOutlined" responseClick={props?.DeleteAction}/>
                        <POSActionButton label="List" onClick={props?.ListAction} iconName="FeaturedPlayListOutlined"/>
                        
                        <POSActionButton 
                            onClick={props?.PrintAction}
                            label="PRINT"  iconName="LocalPrintshopOutlined" 
                            
                        /> 
                        
            </div>
    )
}