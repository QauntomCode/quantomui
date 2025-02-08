/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog, ToolBarButton } from "../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { INVENTORY_CATEGORY_MENU_CODE, SetupFormDelete, SetupFormGetOne, SetupFormInsert, SetupFromGetAll } from "../unit/impl/setupFormImp";
import { SetupFormModel, VMSetupForm } from "../unit/model/setupFormModel";
import { useSelector } from "react-redux";
import store, { full_component_state, get_form_state_without_selector, get_helperData_by_key, useQuantomFonts } from "../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton, POSActionButton1, QuantomSwitch } from "../item/views/POS/POSInventoryIitemsView";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../HTTP/QuantomHttpMethods";
import { add_helper_data_single_key } from "../../../../redux/reduxSlice";
import { Quantom_Grid, Quantom_Input } from "../../../../quantom_comps/base_comps";
import { Paper, useTheme } from "@mui/material";
import { isNullOrEmpty } from "../../../../CommonMethods";
import { POSToolBarComp } from "../../../Purchase/Processing/Purchase/view/POSPurchaseView";

export const POS_SetupFormView=(props?:MenuComponentProps<SetupFormModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    

    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<SetupFormModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })
        }
    },[fullState?.IsFirstUseEffectCall])

    return(
        <>
        {
            isList?(<List {...props}></List>):(<Form {...props}></Form>)
        }
        </>
    )
}


export const List=(props?:MenuComponentProps<SetupFormModel>)=>{

    const[allCats,setAllCats]=useState<SetupFormModel[]>([]);
    
    useEffect(()=>{
        handleAllCategoris();
    },[])

    const handleAllCategoris=async()=>{
     
     let res = await SetupFromGetAll(INVENTORY_CATEGORY_MENU_CODE,'');
     setAllCats([...res])
    }
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
            <div className="row" style={{marginTop:'16px',marginBottom:'5px'}}>
                <div style={{display:'flex'}}>
                    <POSActionButton1 rightMargin="10px" onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_CAT_CODE',Data:''}})))
                                props?.setState?.({});
                            }} label="Add New" iconName="AddBoxOutlined"/>
                    
                    <div style={{flex:1}}>
                        <div className="row">
                            <div className="col-md-12">
                                <Quantom_Input label="Search Category" />
                            </div>
                        </div>
                    </div>
                    </div>
                
               
                
            </div>
            <Quantom_Grid   container spacing={1.5}>
                {
                    allCats?.map((item,index)=>{
                        return(
                            <Quantom_Grid component={Paper} sx={{borderBottom:`1px solid ${theme.palette.primary.main}`}} item size={{xs:12,sm:6,md:4,lg:3,xl:2}}>
                            <div onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_CAT_CODE',Data:item?.Code}})))
                                props?.setState?.({});

                            }} style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                                <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                    
                                    <IconByName color={theme?.palette?.primary.main} iconName="BallotOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px',fontWeight:'bold'}}>
                                        {item?.Code}
                                    </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                  <IconByName color={theme?.palette?.primary.main} iconName="InventoryOutlined" fontSize="20px"/>
                                  <div style={{marginLeft:'5px'}}>
                                    {item?.Name}
                                  </div>
                                </div>
                                
                            </div>
                        </Quantom_Grid>
                        )
                    })
                }
            </Quantom_Grid>
        </>
    )
}

const Form=(props?:MenuComponentProps<SetupFormModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
    const menuCode= INVENTORY_CATEGORY_MENU_CODE;
    var catCode= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",'SELECTED_CAT_CODE'));
    useEffect(()=>{
        handleGetOne();
    },[catCode])

    const handleSaveAction=async():Promise<HttpResponse<SetupFormModel>>=>{
        const newState= await get_form_state_without_selector<SetupFormModel>(props?.UniqueId);
        let res= await  SetupFormInsert(newState,menuCode);
        return res;
    }
    
    const handleGetOne=async()=>{
        if(isNullOrEmpty(catCode)){
            return;
        }

        try{
            ShowLoadingDialog();
              let res= await SetupFormGetOne(catCode,menuCode);
              HideLoadingDialog();
              if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                props?.setState?.(res?.Response)
              }
        }
        catch{
           HideLoadingDialog();
        }
    }

    

    return(
        <>
         <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-md-8">
            <POSToolBarComp
                ListAction={()=>{ store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))}}
                SaveAction={handleSaveAction}
                DeleteAction={()=>SetupFormDelete(props?.state,menuCode)}
                ResetAction={()=>{props?.setState?.({})}}
                NewAction={()=>{props?.setState?.({})}}
                SaveAfterAction={(obj:SetupFormModel)=>{
                    if(resetAfterSave){
                        props?.setState?.({});
                    }
                    else{
                        props?.setState?.({...obj});
                    }
                }}
            />
           </div>
        </div>
        
         <div className="row g-0" style={{marginTop:'16px'}}>
            <div className="col-md-3  offset-md-2">
                <Quantom_Input label="code" value={props?.state?.Code} disabled/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <Quantom_Input label="Name" value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e.target.value})}}/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <QuantomSwitch label="Reset After Save" value={resetAfterSave} onChange={(e)=>{setResetAfterSave(e??false)}}/>
            </div>
         </div>

        </>
    )
}