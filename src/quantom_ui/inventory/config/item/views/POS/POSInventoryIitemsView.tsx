/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useSelector } from "react-redux";
import { IconByName, MenuComponentProps, QuantomConfirmationDialog, QuantomErrorDialog, setFormBasicKeys } from "../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { VMInventoryItemsModel } from "../../model/VMInventory_itemsModel";
import store, { full_component_state, get_form_state_without_selector, get_helperData_by_key, useQuantomFonts } from "../../../../../../redux/store";
import React, { useEffect } from "react";
import { Quantom_Grid, Quantom_Input } from "../../../../../../quantom_comps/base_comps";
import { Box,Paper, Snackbar, useTheme } from "@mui/material";
import { Quantom_LOV } from "../../../../../../quantom_comps/Quantom_Lov";
import { CommonCodeName } from "../../../../../../database/db";
import { GetSetupFormTypByMenuCode, SetupFromGetAll } from "../../../unit/impl/setupFormImp";
import { safeParseToNumber } from "../../../../../../CommonMethods";
import { GetItemsByCategory, InventoryItemsGetOne, InventoryItemsInsert } from "../../impl/InventoryitemsImpl";
import { HTTP_RESPONSE_TYPE, HttpResponse } from "../../../../../../HTTP/QuantomHttpMethods";
import { SetupFormModel } from "../../../unit/model/setupFormModel";
import { add_helper_data, add_helper_data_single_key } from "../../../../../../redux/reduxSlice";
import { InventoryItemsModel } from "../../model/InventoryItemsModel";
import { BorderBottom, BorderLeft } from "@mui/icons-material";

export const POSInventoryItemsView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{
    // const theme= useTheme();
    // const fonts= useQuantomFonts();
    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const ViewType:string=useSelector((state?:any)=> get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_VIEW_TYPE))??"LIST"

    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGROY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<VMInventoryItemsModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true}
         })

         handleCategories();
        }
    },[fullState?.IsFirstUseEffectCall])

     return(
        <>
        {ViewType==='LIST'?(<PosInventoryItemsListView {...props}/>):(<POSInentoryItemsView {...props}/>)}

        </>  
     )
}


export const POSInentoryItemsView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>
{
    const [refresCategoreis,setRefreshCategories]=React.useState(0);
    

    const handleCategories=async()=>{
        let categories= await SetupFromGetAll('003-002','');
        store.dispatch(add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEMS_CATEGROY_VALUE_KEY,Data:categories}}));
        return Promise.resolve(categories)
    }

    const itemCode:string=useSelector((state?:any)=> get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEM_SET_ITEM_CODE))as string;
    React.useEffect(()=>{
         handleGetOne();
    },[itemCode])

    const handleGetOne=async()=>{
        if(itemCode){
            let res= await InventoryItemsGetOne(itemCode);
            if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
                 props?.setState?.(res?.Response)
            }
            else{
                alert(res?.ErrorMessage)
            }
        }
    }


    return(
        <>
        <div className="row g-1" style={{marginTop:'10px'}}>
           <div className="col-md-2 col-lg-2 col-xl-2 col-12">
              
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Save" buttonType="SAVE" responseClick={async()=>{
                      const newState= await get_form_state_without_selector<VMInventoryItemsModel>(props?.UniqueId);
                      let res= await  InventoryItemsInsert(newState);
                      return Promise.resolve(res);
                      
                    }} iconName="SaveOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Reset" buttonType='RESET' onClick={()=>{props?.setState?.({})}} iconName="CancelPresentationOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="Delete" buttonType='DELETE' onClick={()=>{alert('save button pressed')}} iconName="DeleteOutlined"/>
           </div>
           <div className="col-sm-3 col-md-2 col-3">
                <POSActionButton label="List" onClick={()=>{
                    store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'LIST'}})))
                }} iconName="FeaturedPlayListOutlined"/>
           </div>
        </div>

        <div className="row" style={{marginTop:'25px'}}>

          <div className="col-md-2" />
          <div className="col-md-2">
             <Paper style={{width:'100%',height:'100%'}}>
                 Image
             </Paper>
          </div>
          <div className="col-md-6">
               <div className="row">
                   <div className=" col-md-6">
                        <Quantom_Input label="Item Code" onChange={(e)=>{
                        props?.setState?.({...props?.state,item:{...props?.state?.item,ManualCode:e.target.value}})
                        }} value={props?.state?.item?.ManualCode} size='small'/>
                    </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <div className="col-md-12">
                            <Quantom_Input label="Item Name" onChange={(e)=>{
                            props?.setState?.({...props?.state,item:{...props?.state?.item,ItemName:e.target.value}})
                            }} value={props?.state?.item?.ItemName} size='medium'/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'8px'}}>
                        <Quantom_LOV label="Category" RefreshFillDtaMethod={refresCategoreis} 
                                    FillDtaMethod={handleCategories}
                                    onChange={(code)=>{
                                          props?.setState?.({...props?.state,item:{...props?.state?.item,CatCode:code?.Code,category:{Code:code?.Code,Name:code?.Name}}})
                                    }} 
                                    selected={{Code:props?.state?.item?.CatCode,Name:props?.state?.item?.category?.Name}} />
                    </div>
          </div>
          
        </div>

         <div className="row" >
            <div className="col-md-2" />
              <div className="col-md-8 col-12" style={{marginTop:'16px'}}>
                  <div className="row g-1">
                     <div className="col-4">
                        <Quantom_Input label="Sale Price" onChange={(e)=>{
                        props?.setState?.({...props?.state,item:{...props?.state?.item,SalePrice:safeParseToNumber( e.target.value)}})
                        }} value={props?.state?.item?.SalePrice} size='small'/>
                     </div>
                     <div className="col-4">
                        <Quantom_Input label='Purchase price'  value={props?.state?.item?.PurchasePrice} onChange={(e)=>{
                             props?.setState?.({...props?.state,item:{...props?.state?.item,PurchasePrice:safeParseToNumber(e.target.value)}})
                        }}/>
                     </div>
                     <div className="col-4">
                        <Quantom_Input label='Opening Stock'  value={props?.state?.OpeningQty} onChange={(e)=>{
                            props?.setState?.({...props?.state,OpeningQty:safeParseToNumber(e.target.value)})
                        }}/>
                     </div>
                  </div>
                  
            </div>
         </div>

         
        </>
    )
}
export const POS_INVENTORY_ITEM_MENU_CODE="POS_INVENTORY_ITEM_MENU_CODE";
export const POS_INVENTORY_ITEM_VIEW_TYPE="POS_INVENTORY_ITEM_VIEW_TYPE";
export const POS_INVENTORY_ITEM_SET_ITEM_CODE="POS_INVENTORY_SET_ITEM_CODE";





export const PosInventoryItemsListView=(props?:MenuComponentProps<VMInventoryItemsModel>)=>{

     const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGROY_VALUE_KEY)) as SetupFormModel[];
     const fonts= useQuantomFonts();
     const theme= useTheme();
     const [category,setCategory]= React.useState('')
     const [allitems,setAllitems]=React.useState<InventoryItemsModel[]>([])
     const [items,setItems]=React.useState<InventoryItemsModel[]>([])
     const [search,setSearch]=React.useState('');

     const [searchCategory,setSearchCategory]=React.useState('');
      React.useEffect(()=>{
        if(category){
            handleLoadItems()
        }
      },[category])


      React.useEffect(()=>{
        if(search){
            handleSearch();
        }
        else{
            setItems([...allitems])
        }
      },[search])
    

      const handleSearch=()=>{
         let searcheditems= allitems?.filter(x=>
                    x.ItemName?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()) 
                    || x?.SearchKey?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
                    ||x?.category?.Name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
                )

        setItems([...searcheditems])
      }

      const handleLoadItems=async()=>{
           let res= await GetItemsByCategory(category);
           setItems([...res])
           setAllitems([...res])
      }

    return(
    <> 
      <div className="row g-2" style={{marginTop:'8px'}}>
         <div className="col-md-4 col-lg-3">
            
             
              <Quantom_Grid container  sx={{marginBottom:"5px"}}>
                 <Quantom_Input label='Search Category' value={searchCategory} onChange={(e)=>{
                    setSearchCategory(e.target.value)
                 }}/>
              </Quantom_Grid>    
              <Quantom_Grid container  
                sx={{fontFamily:fonts.HeaderFont,color:theme.palette.text.primary,backgroundColor:theme.palette.primary.main,justifyContent:'center'}}>All Categories</Quantom_Grid>

            {
               
                categories?.map((item,index)=>{
                    return(
                        <div onClick={()=>{
                            setCategory(item?.Code??"")
                        }}>
                        <Quantom_Grid contain component={Paper} 
                            sx={{fontFamily:fonts.HeaderFont,fontWeight:500,fontSize:fonts.H4FontSize,borderBottom:`1px solid ${theme.palette.primary.contrastText}`,
                                paddingTop:'8px',paddingBottom:'8px',alingItems:'center',paddingLeft:'15px'}}>{item?.Name}</Quantom_Grid>
                        </div>
                    )
                })
            }
         </div>
         <div className="col-md-8 col-lg-9">
            <Box sx={{height:'100%',width:'100%'}}>
                  <Quantom_Grid container spacing={.5} sx={{paddingLeft:'10px',paddingtRigth:'10px'}} >
                  <Quantom_Grid item size={{xs:12,sm:12,md:4,lg:3,xl:3}} sx={{marginTop:'5px'}}>
                        <POSActionButton onClick={()=>{
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                             store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_SET_ITEM_CODE,Data:''}})))
                             props?.setState?.({});
                        }} label="AddNew" iconName="AddBoxOutlined"/>
                     </Quantom_Grid>
                     <Quantom_Grid item size={{xs:6,sm:6,md:4,lg:7.5,xl:7.5}}>
                         <Quantom_Input value={search} onChange={(e)=>{setSearch(e.target.value)}} label='Search' />
                     </Quantom_Grid>
                     <Quantom_Grid item size={{xs:6,sm:6,md:4,lg:1.5,xl:1.5}} sx={{marginTop:'5px'}}>
                        <POSActionButton label="Search"/>
                     </Quantom_Grid>
                     {/* <Quantom_Grid item size={{xs:2}} sx={{marginTop:'5px'}}>
                        <POSActionButton label="Add New"/>
                     </Quantom_Grid> */}
                  </Quantom_Grid>
                  <Quantom_Grid container spacing={1} padding={'10px'}>
                  {/* <Quantom_Grid size={{xs:12}} sx={{fontFamily:fonts.HeaderFont,color:theme.palette.text.primary,backgroundColor:theme.palette.primary.main,justifyContent:'center'}}>
                    All Items</Quantom_Grid> */}
                 {items?.map((item,index)=>{
                    return(
                        <Quantom_Grid component={Paper} sx={{}} item size={{xs:12,sm:6,md:4,lg:3,xl:2.4}}>
                            <div onClick={()=>{
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_VIEW_TYPE,Data:'FORM'}})))
                                store.dispatch((add_helper_data_single_key({UniqueId:props?.UniqueId??"",data:{keyNo:POS_INVENTORY_ITEM_SET_ITEM_CODE,Data:item?.ItemCode}})))
                                props?.setState?.({});

                            }} style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'5px', display:'flex',flexDirection:'column' }}>
                                <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                    
                                    <IconByName iconName="BallotOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px'}}>
                                        {item?.SearchKey??item.ManualCode}
                                    </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                  <IconByName iconName="InventoryOutlined" fontSize="20px"/>
                                  <div style={{marginLeft:'5px'}}>
                                    {item?.ItemName}
                                  </div>
                                </div>
                                <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                    <IconByName iconName="DnsOutlined" fontSize="20px"/>
                                    <div style={{marginLeft:'5px'}}>
                                    {item?.category?.Name}
                                  </div>
                                </div>
                            </div>
                        </Quantom_Grid>
                    )
                 })}
                 </Quantom_Grid>
            </Box>
         </div>
      </div>
    </>
  )
}


export const POS_INVENTORY_ITEMS_CATEGROY_VALUE_KEY="POS_INVENTORY_ITEMS_CATEGROY_VALUE_KEY"

interface POSActionButtonProps{
  label?:string;
  iconName?:string;
  onClick?:()=>void;
  buttonType?:'SAVE'|'RESET'|'DELETE'|'LIST'
  responseClick?:()=>Promise<HttpResponse<any>>
}
export const POSActionButton=(props?:POSActionButtonProps)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const[openConfirmation,setOPenConfirmation]=React.useState(false);
    const [errorMessage,setErrorMessage]=React.useState('');
    const [openEerrorMessage,setOpenErrorMessage]=React.useState(false);
    const [toastMessage,setToastMessage]=React.useState('');
    const[openToast,setOpenToast]=React.useState(false);
    return(
        <>
         <Toast  message={toastMessage} open={openToast} oncClose={()=>{setOpenToast(false)}}/>
        <QuantomErrorDialog Open={openEerrorMessage} MessageHeader="Error" MessageBody={errorMessage} onClosePress={()=>{setOpenErrorMessage(false)}} />
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
                            setOpenErrorMessage(true);
                            setErrorMessage(res?.ErrorMessage??"");
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
        <button onClick={async()=>{

                if(props?.buttonType==='DELETE' || props?.buttonType==='RESET'){
                    setOPenConfirmation(true);
                    return;
                }
                if(props?.responseClick){
                let res= await props?.responseClick?.()
                if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                    if(props.buttonType==='SAVE'){
                        setOpenToast(true);
                        setToastMessage('Record Saved Successfully...')
                    }
                    // success message
                }
                else if(res.ResStatus=== HTTP_RESPONSE_TYPE.ERROR){
                    setOpenErrorMessage(true);
                    setErrorMessage(res?.ErrorMessage??"");
                }
                }
                else{
                    props?.onClick?.()
                }
            }
        }    
         style={{display:'flex',justifyContent:'center',alignItems:'center',lineHeight:'35px',backgroundColor:theme?.palette?.background.paper,zIndex:999,width:'100%',border:`1px solid ${theme.palette.primary.main}`,
                     borderRadius:'5px',fontFamily:fonts.HeaderFont,fontWeight:'bold',fontSize:'16px',color:theme.palette.text.primary,opacity:.8}}>
                    <div style={{display:'flex',justifyContent:'center',marginRight:'10px'}}>
                        <IconByName iconName={props?.iconName}/>
                    </div>
                {props?.label}
                
              </button>
        </>
    )
}


export interface ToastProps{
    open?:boolean;
    oncClose?:()=>void;
    message?:string;
}
export const Toast=(props?:ToastProps)=>{

    

    return(
        <Box sx={{ width: 500 }}>
      {/* {buttons} */}
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={props?.open}
        onClose={props?.oncClose}
        message={props?.message}
        key={'top'+'right'}
      />
    </Box>

    )
}