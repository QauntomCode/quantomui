/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { Paper, useTheme } from "@mui/material";
import { CommonCodeName } from "../../../../../../../database/db";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../../../config/customer/model/CustomerModel";
import { CustomerGetOneMethod, GetAllCustomers } from "../../../../../config/customer/impl/CustomerImpl";
import { Quantom_Grid, Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { HideLoadingDialog, IconByName, ShowLoadingDialog } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { LocalDbFilterCustomers, LocalDbInsertCustomer } from "../../../../../../../IndexedDb/Initialization/Operation/CustomerData";
import { QuantomDialog } from "../../POSSaleView";

export interface POSCustomerCompProps{
    selectedCustomer?:CommonCodeName;
    onChange?:(selected?:CommonCodeName)=>void
 }
 export const POSCustomerComp=(props?:POSCustomerCompProps)=>{
   const theme= useTheme();
   const fonts = useQuantomFonts();
   const[open,setOpen]=useState(false);
   const [custDetail,setCustDetail]=useState<CustomerModel>()
   const[search,setSearch]=useState('')
   useEffect(()=>{
         handleSetSelectedCustomer();
   },[props?.selectedCustomer?.Code])

   const handleSetSelectedCustomer=async()=>{
       let res= await CustomerGetOneMethod(props?.selectedCustomer?.Code??"")
       setCustDetail(res?.Response?.customer)
   }
    
   return(
       <Quantom_Grid pl={1} sx={{backgroundColor:theme?.palette?.primary?.main,paddingTop:'8px',paddingBottom:'8px',color:theme?.palette?.primary?.contrastText}} display='flex' container component={Paper} size={{xs:12}} >
           <Quantom_Grid size={{xs:12,sm:12,md:12,lg:9}}>
               <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,justifyContent:'center'}}>
                   <div style={{display:'flex',flexDirection:'row'}}>
                        <div>
                           <POSActionButton1 onClick={async()=>{
                               try{
                                   ShowLoadingDialog();
                                   let res= await GetAllCustomers();
                                   for(let cust of res){
                                       LocalDbInsertCustomer(cust)
                                   }
                                   HideLoadingDialog();
                                   console.log('get all customers',res)
                               }
                               catch{
                                   HideLoadingDialog();
                               }
                                   //setCustComers([...res])
                               }
                           } textColor={theme?.palette?.secondary?.contrastText} backgroundColor={theme?.palette?.secondary?.main} label="Refresh" iconName="OnDeviceTraining" iconColor={theme?.palette?.primary?.main}/>
                       </div>
                       <div style={{marginLeft:'10px'}}>
                           <POSActionButton1 
                               onClick={()=>{setOpen(true)}}
                               textColor={theme?.palette?.secondary?.contrastText} 
                               backgroundColor={theme?.palette?.secondary?.main} 
                               label="Select" 
                               iconName="AccountBoxOutlined" 
                               iconColor={theme?.palette?.primary?.main}/>
                       </div>

                       {/* <IconButton onClick={()=>{
                            setOpen(true);
                       }} style={{backgroundColor:theme.palette.secondary.main}}>
                           <IconByName iconName="PersonOutlined" color={theme?.palette?.text?.secondary} fontSize="50px"></IconByName>
                       </IconButton> */}
                   </div>
                   <div style={{fontFamily:fonts?.HeaderFont,fontSize:'20px',fontWeight:700}}>
                       {props?.selectedCustomer?.Name}
                   </div>
               </div>
           </Quantom_Grid>
           <Quantom_Grid size={{xs:12,sm:12,md:12,lg:3}} style={{alignItems:'center',
               display:'flex',fontWeight:700,fontFamily:fonts.HeaderFont,fontSize:'30px',justifyContent:'center',}}>
               <IconByName iconName="CurrencyBitcoinSharp" color={theme?.palette?.secondary?.main} fontSize="35px"></IconByName>
                {custDetail?.Balance??0}
           </Quantom_Grid>
           
           <QuantomDialog headerExtension={<>
              <Quantom_Input label='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            </>} open={open}  onClosePress={()=>{setOpen(false)}} heading="Select Customer">
               <CustomerListComp search={search} onSelect={(cust)=>{
                   props?.onChange?.({Code:cust?.CustCode,Name:cust?.CustName})
                   setOpen(false);
               }}/>
           </QuantomDialog>

           {/* Selected Customer */}
        </Quantom_Grid>
   )
 }

 export interface CustomerListCompPorps{
    onSelect?:(selected?:CustomerModel)=>void
    search?:string;
 }
 export const  CustomerListComp=(props?:CustomerListCompPorps)=>{
   const [customers,setCustComers]=useState<CustomerModel[]>([]);
   

   useEffect(()=>{
       handleCustomers();
   },[props?.search])

   
   const handleCustomers=async()=>{
       let res= await LocalDbFilterCustomers(props?.search);
    //    alert('called ')
       console.log('get all customers',res)
       setCustComers([...res])
   }
   const theme= useTheme();
   const fonts= useQuantomFonts();
   return(

       <Quantom_Grid size={{xs:12}} container spacing={.5} component={Paper}>
           
           {/* <Quantom_Grid item> Item Code</Quantom_Grid> */}
           {
               customers?.map((item,index)=>{
                   
                   return(
                       <Quantom_Grid 
                          onClick={()=>{
                            props?.onSelect?.(item)
                          }}
                           sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'4px'}} 
                           size={{xs:12,sm:12,md:12,lg:12,xl:12}} component={Paper}>
                           <div style={{display:'flex',alignItems:'center'}}>
                               <IconByName color={theme?.palette?.primary?.main} fontSize="30px" iconName="PermIdentityOutlined"/>
                               <div style={{marginLeft:'5px'}}>
                                   <div style={{fontWeight:'bold',display:'flex'}}>
                                       <div style={{alignItems:'center',flex:1}}>
                                           <IconByName fontSize="15px" iconName="Grid3x3Outlined"/>
                                           {item?.CustCode}
                                       </div>
                                   </div>
                                   <div>{item?.CustName}</div>
                                   {item?.CellNo?
                                   (<>
                                       <div style={{alignItems:'center',flex:1}}>
                                           <IconByName fontSize="15px" iconName="PhoneAndroidOutlined"/>
                                           {item?.CellNo}
                                       </div>
                                   </>):(<></>)}
                                   
                                   {/* <div>{item?}</div> */}
                               </div>
                           </div>
                           {/* <div style={{display:'flex'}}>
                              <div style={{flex:1}}></div>
                              <div style={{flex:1}}>
                                  <button style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold',color:theme?.palette?.text?.secondary,backgroundColor:theme?.palette?.secondary?.main,fontFamily:fonts.HeaderFont,width:'100%',border:`.5px solid ${theme?.palette?.primary?.main}`,borderRadius:'5px'}}>
                                      <div style={{marginRight:'10px'}}>
                                           <IconByName iconName="FactCheckOutlined"/>
                                      </div>
                                      Select
                                  </button>
                              </div>
                           </div> */}
                       </Quantom_Grid>
                   )
               })
           }
       </Quantom_Grid>
   )
 }