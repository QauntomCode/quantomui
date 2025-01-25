/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { VmCustomerModel } from "../model/VmCustomerModel";
import store, { full_component_state, get_current_user_locations, get_form_state_without_selector, get_helperData_by_key, useQuantomFonts } from "../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE, POSActionButton, QuantomSwitch } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { add_helper_data_single_key } from "../../../../../redux/reduxSlice";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { Paper } from "@mui/material";
import { isNullOrEmpty } from "../../../../../CommonMethods";
import { HTTP_RESPONSE_TYPE } from "../../../../../HTTP/QuantomHttpMethods";
import { CustomerDeleteMethod, CustomerGetOneMethod, CustomerSaveMethod, CustomersGetCodeNameMethod } from "../impl/CustomerImpl";
import { CommonCodeName } from "../../../../../database/db";
import { CustomerLocationModel } from "../model/CustomerLocationModel";
import { json } from "node:stream/consumers";


export const POSCustomerSetup=(props?:MenuComponentProps<VmCustomerModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    

    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmCustomerModel>({
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


export const List=(props?:MenuComponentProps<VmCustomerModel>)=>{

    const[allCustomers,setAllCustomers]=useState<CommonCodeName[]>([]);
    const[customers,setCustomers]=useState<CommonCodeName[]>([]);

    const[search,setSearch]=useState('');
    
    useEffect(()=>{
        handleGetAllCustomers();
    },[])

    useEffect(()=>{
        ApplyFilter();
    },[search])

    const handleGetAllCustomers=async()=>{
     
     let res = await CustomersGetCodeNameMethod();
     if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
        setAllCustomers([...res?.Response??[]]);
    
        var topCust=  await JSON.parse(JSON.stringify(res?.Response));
        setCustomers(topCust?.slice(0,100));
     }
    }

    
    const ApplyFilter=()=>{

        var filtered:CommonCodeName[]=[];
        let count= 0;
        const lowSearch=search?.toLocaleLowerCase();
        for(const record of allCustomers){
          if(count>99){
            break;
          }
          if(record?.Name?.toLowerCase()?.includes?.(lowSearch) || record?.Code?.toLocaleLowerCase()?.includes(lowSearch))
          {
            filtered.push({...record})
            count++;
          }
        } 
        setCustomers([...filtered??[]])
        //   let custs= allCustomers?.filter(x=>x.Name?.toLocaleLowerCase()===search.toLocaleLowerCase() || x?.Code?.toLocaleLowerCase()===search?.toLocaleLowerCase());
        //   var topCusts= [...custs?.slice(0,100)??[]];
        //   setCustomers(topCusts)
    }
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
        <>
            <div className="row" style={{marginTop:'16px',marginBottom:'5px'}}>
                 <div className="col-md-2">
                 <POSActionButton onClick={()=>{
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_CUSTOMER_CODE',Data:''}})))
                             props?.setState?.({});
                        }} label="AddNew" iconName="AddBoxOutlined"/>
                 </div>
                 <div className="col-md-10">
                    <Quantom_Input label="Search Category" value={search} onChange={((e)=>{setSearch(e.target.value)})} />
                </div>
            </div>
            <Quantom_Grid   container spacing={1.5}>
                {
                    customers?.map((item,index)=>{
                        return(
                            <Quantom_Grid component={Paper} sx={{}} item size={{xs:12,sm:6,md:4,lg:3,xl:2}}>
                            <div onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_CUSTOMER_CODE',Data:item?.Code}})))
                                props?.setState?.({});

                            }} style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                                <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                    
                                    <IconByName iconName="BallotOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px'}}>
                                        {item?.Code}
                                    </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                  <IconByName iconName="AccountBoxOutlined" fontSize="20px"/>
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

const Form=(props?:MenuComponentProps<VmCustomerModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
    
    var custCode= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",'SELECTED_CUSTOMER_CODE'));
    useEffect(()=>{
        // alert(custCode)
        handleGetOne();
    },[custCode])

    const handleGetOne=async()=>{
        if(isNullOrEmpty(custCode)){
            return;
        }

        try{
            ShowLoadingDialog();
              let res= await CustomerGetOneMethod(custCode);
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
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE" responseClick={async()=>{
                      const newState= await get_form_state_without_selector<VmCustomerModel>(props?.UniqueId);
                      let res= await  CustomerSaveMethod(newState) //SetupFormInsert(newState,menuCode);
                      if(res?.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                           if(resetAfterSave){
                             props?.setState?.({});
                           }
                      }
                      return Promise.resolve(res);
                      
                    }} iconName="SaveOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.setState?.({})}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" buttonType='DELETE' responseClick={()=>CustomerDeleteMethod(props?.state)} iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{
                    store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                }} iconName="FeaturedPlayListOutlined"/>
           </div>
        </div>
        
         <div className="row g-0" style={{marginTop:'16px'}}>
            <div className="col-md-3  offset-md-2">
                <Quantom_Input label="code" value={props?.state?.customer?.CustCode}/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <Quantom_Input label="Name" value={props?.state?.customer?.CustName} onChange={(e)=>{props?.setState?.({...props?.state,customer:{...props?.state?.customer,CustName:e.target.value}})}}/>
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