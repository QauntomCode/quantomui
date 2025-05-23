/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";

import { VmSupplierModel } from "../model/VmSupplier";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import store, { full_component_state, get_form_state_without_selector, get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store";
import { POS_INVENTORY_ITEM_VIEW_TYPE, QuantomSwitch } from "../../../../../inventory/config/item/views/POS/POSInventoryIitemsView";
import { useEffect, useState } from "react";
import { CommonCodeName } from "../../../../../../database/db";
import { SupplierDeleteMethod, SupplierGetCodeNameMethod, SupplierGetOneMethod, SupplierSaveMethod } from "../impl/SuppierImpl";
import { HTTP_RESPONSE_TYPE } from "../../../../../../HTTP/QuantomHttpMethods";
import { add_helper_data_single_key } from "../../../../../../redux/reduxSlice";
import { Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { isNullOrEmpty } from "../../../../../../CommonMethods";
import { Paper, useTheme } from "@mui/material";
import { POSToolBarComp } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSToolBarComp";
import { POSActionButton1 } from "../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";


export const POSSupplierView=(props?:MenuComponentProps<VmSupplierModel>)=>{

    
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    

    const isList= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE)) ==='LIST'

    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VmSupplierModel>({
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


export const List=(props?:MenuComponentProps<VmSupplierModel>)=>{

    const[allCustomers,setAllCustomers]=useState<CommonCodeName[]>([]);
    const[customers,setCustomers]=useState<CommonCodeName[]>([]);

    const[search,setSearch]=useState('');
    
    useEffect(()=>{
        handleGetAllSuppliers();
    },[])

    useEffect(()=>{
        ApplyFilter();
    },[search])

    const handleGetAllSuppliers=async()=>{
     
     let res = await SupplierGetCodeNameMethod();
        setAllCustomers([...res??[]]);
    
        var topCust=  await JSON.parse(JSON.stringify(res));
        setCustomers(topCust?.slice(0,100));
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
                <div style={{display:'flex'}}>
                    <div>
                        <POSActionButton1 rightMargin="10px" onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_SUPPLIER_CODE',Data:''}})))
                                props?.setState?.({});
                            }} label="Add New" iconName="AddBoxOutlined"/>
                     </div>
                     <div style={{flex:1}}>
                        <Quantom_Input label="Search Supplier" value={search} onChange={((e)=>{setSearch(e.target.value)})} />
                     </div>
                </div>
            </div>
                 
            <Quantom_Grid   container spacing={1.5}>
                {
                    customers?.map((item,index)=>{
                        return(
                            <Quantom_Grid component={Paper} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`}} item size={{xs:12,sm:6,md:4,lg:3,xl:2}}>
                            <div onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:'SELECTED_SUPPLIER_CODE',Data:item?.Code}})))
                                props?.setState?.({});

                            }} style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                                <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                    
                                    <IconByName color={theme?.palette?.primary?.main} iconName="BallotOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px',fontWeight:650}}>
                                        {item?.Code}
                                    </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                  <IconByName color={theme?.palette?.primary?.main} iconName="AccountBoxOutlined" fontSize="20px"/>
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

const Form=(props?:MenuComponentProps<VmSupplierModel>)=>{
    const [resetAfterSave,setResetAfterSave]=useState(true);
    
    var suppCode= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",'SELECTED_SUPPLIER_CODE'));
    useEffect(()=>{
        // alert(custCode)
        handleGetOne();
    },[suppCode])

    const handleGetOne=async()=>{
        if(isNullOrEmpty(suppCode)){
            return;
        }

        
        try{
            ShowLoadingDialog();
              let res= await SupplierGetOneMethod(suppCode);
              HideLoadingDialog();
              if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                console.warn('this is response of supplier get one method',res?.Response)
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
           <div className="col-md-10">
             <POSToolBarComp 
                SaveAction={()=>(SupplierSaveMethod(props?.state))} 
                ResetAction={()=>{props?.setState?.({})}}
                NewAction={()=>{props?.setState?.({})}}
                DeleteAction={()=>SupplierDeleteMethod(props?.state)}
                ListAction={()=>{store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))}}
                SaveAfterAction={(obj)=>{
                     if(resetAfterSave){
                        props?.setState?.({})
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
                <Quantom_Input label="code" value={props?.state?.supplier?.SuppCode}/>
            </div>
         </div>

         <div className="row g-0" style={{marginTop:'8px'}}>
            <div className="col-md-8  offset-md-2">
                <Quantom_Input label="Name" value={props?.state?.supplier?.SuppName} onChange={(e)=>{props?.setState?.({...props?.state,supplier:{...props?.state?.supplier,SuppName:e.target.value}})}}/>
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