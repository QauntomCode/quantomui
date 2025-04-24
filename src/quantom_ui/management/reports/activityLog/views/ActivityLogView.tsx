/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps"
import { Box, Paper, useTheme } from "@mui/material"
import {  DBGetSingleNavigationAction } from "../../../../../IndexedDb/Initialization/Operation/NavigationActionDb"
import { AddHPD, useGetHelperData } from "../../../../sale/reports/Appointments/CustomerAppointmentReports"
import { QuantomDialog } from "../../../../sale/processing/sale/view/POSSaleView"
import BasicTabs, { BasicTabProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/BasicTabs"
import { FilterEntities, FilterEntityQuery, QuantoFilterDetail, QuantomFilter } from "../../../Common/QuantomFilter/QuantomFilter";
import {NavigationActionInfo } from "../../../Common/NavigationModels/NavigationAction";

import { CommonCodeName } from "../../../../../database/db"
import {  GetHPD_WithOutStore, useQuantomFonts } from "../../../../../redux/store"
import { QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods"
import { QuantomSwitch } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView"
// import { NavigationActionInfo } from "../../../Common/NavigationModels/NavigationAction"





const ActivityLogView=(props?:MenuComponentProps<any>)=>{
    React.useEffect(()=>{
        setFormBasicKeys<any>({
           settings:{willShowLocations:false,WillHideUserLog:true,wWillHideToolbar:true},
           uniqueKey:props?.UniqueId??"",
           baseProps:props??{}
        })
      },[props])
    return(
        <>
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid  size={{xs:3,md:4,lg:2.5,xl:2.5,}}>
                <QuantomReportBase baseProps={props} />
                {/* <ReportFilter baseProps={props}/> */}
            </Quantom_Grid>
            <Quantom_Grid size={{xs:9,md:8,lg:8.5,}}>Second</Quantom_Grid>
         </Quantom_Grid>

        </>
    )
}


export default ActivityLogView


const SHOW_FILTER_DIALOG_KEY="SHOW_FILTER_DIALOG_KEY";
const NAVIGATION_KEY="NAVIGATION_ACTION"
const SELECTED_FILTER_TAB_INDEX="SELECTED_FILTER_TAB_INDEX"
const QUANTOM_ALL_FILTER_OBJECT_DATA_KEY="QUANTOM_ALL_FILTER_OBJECT_DATA_KEY"
const QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY="QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY"


interface QuantomFilterProps{
    baseProps?:MenuComponentProps<any>
}


export const QuantomReportBase=(props?:QuantomFilterProps)=>{



    useEffect(()=>{
        handleLoadNavigationAction();
    },[props?.baseProps?.MenuCode])


    const handleLoadNavigationAction=async()=>{
      let res= await  DBGetSingleNavigationAction(props?.baseProps?.MenuCode??"")
      AddHPD<any>(props?.baseProps,NAVIGATION_KEY,res);
    }

    return(
        <Quantom_Grid size={{xs:12}}>
            <ReportFilter {...props}/>
        </Quantom_Grid>
    )
}

export const ReportFilter=(props?:QuantomFilterProps)=>{


    const applied_filter= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY);
    

    const theme= useTheme();

    return(
        <>
         <Quantom_Grid spacing={.5} container sx={{lineHeight:'80px'}}>
            <Quantom_Grid size={{xs:4}}>
                <Box onClick={()=>{AddHPD<boolean>(props?.baseProps,SHOW_FILTER_DIALOG_KEY,true)}} fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="FilterAltOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
            <Quantom_Grid size={{xs:4}}>
                <Box fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="FolderOpenOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
            <Quantom_Grid size={{xs:4}}>
                <Box fullWidth component={Paper}>
                    <div style={{flex:1,justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <IconByName color={theme?.palette?.primary?.main} iconName="LocalPrintshopOutlined" fontSize="40px"/>
                    </div>
                </Box>
            </Quantom_Grid>
         </Quantom_Grid>

         <Quantom_Grid  container >
            
            {
                applied_filter?.FilterDetail?.map((item,index)=>{
                    return(
                        <Quantom_Grid size={{xs:12}} mt={.5}  container>
                            <RenderAppliedFilter baseProps={props?.baseProps} filterType={item?.FitlerType}/>
                        </Quantom_Grid>
                    )
                })
            }
            
         </Quantom_Grid>

         <QuantomReportFilterDialog {...props}/>
        </>
    )
}



export const RemoveSelectedItem=(filterType?:FilterEntities,det?:QuantoFilterDetail,item?:CommonCodeName):QuantoFilterDetail=>{
    if(det?.FitlerType===filterType){
          let keys= det?.Keys?.filter(x=>x.Code!==item?.Code);
          det={...det,Keys:[...keys??[]]}

          return det;
    }
    else{
     return det??{};
    }
}

export interface SingleFilterCompProps extends QuantomFilterProps{
    filterType?:FilterEntities
  }

  export interface renderAppliedFilterProps{
    baseProps?:MenuComponentProps<any>
    filterType?:FilterEntities
  }
export const RenderAppliedFilter=(props?:renderAppliedFilterProps)=>{
 
     const [isExpanded,setIsExpanded]= useState(false);
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const filterName= FilterEntities[props?.filterType?? FilterEntities.LOCS]
    return(
        <Quantom_Grid component={Paper} pt={1} pb={1} pl={1} size={{xs:12}} sx={{borderBottom:`1px solid ${theme.palette.primary}`,fontFamily:fonts.HeaderFont,fontWeight:'bold',fontSize:fonts.H3FontSize}}>
            <Quantom_Grid size={{xs:12}} sx={{display:'flex',alignItems:'center'}}>
              <div style={{flex:1}}>
                {filterName}
              </div>
              <div onClick={()=>{setIsExpanded(!isExpanded)}} style={{marginRight:'10px'}}>
                <IconByName color={theme.palette.primary?.main} iconName= {isExpanded ?"IndeterminateCheckBoxOutlined":"LocalHospitalOutlined"}/>
              </div>
            </Quantom_Grid>
            <Quantom_Grid>
                {isExpanded?(<RenderAppliedFilterDetail {...props}></RenderAppliedFilterDetail>):(<></>)}
            </Quantom_Grid>
        </Quantom_Grid>
    )
}

export const RenderAppliedFilterDetail=(props?:renderAppliedFilterProps)=>{
   
    const all_applied_filters= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY);
    const applied_filter= all_applied_filters?.FilterDetail?.find(x=>x.FitlerType===props?.filterType);
    const fonts= useQuantomFonts();
    const theme= useTheme();
    return(
         <Quantom_Grid mt={1.5} container size={{xs:12}} sx={{fontFamily:fonts.RegularFont,fontSize:fonts.H4FontSize}}>
             {
                applied_filter?.Keys?.map((item,index)=>{
                    return (
                        <Quantom_Grid mr={1} size={{xs:12}} sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,display:'flex'}} >
                            <div style={{flex:1}}>
                                {item?.Name}
                            </div>
                            <div onClick={()=>{
                                   let nDetail= all_applied_filters?.FilterDetail?.map((det,index)=>{
                                    return RemoveSelectedItem(props?.filterType,det,item);
                                });

                                AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,FilterDetail:[...nDetail??[]]})
                            }}>
                                <IconByName iconName="CancelOutlined" fontSize="15px" color={theme.palette.error.main}/>
                            </div>
                            
                        </Quantom_Grid>
                    )
                })
             }
         </Quantom_Grid>
    )
}

export const QuantomReportFilterDialog=(props?:QuantomFilterProps)=>{
    const showFilterDialog= useGetHelperData<boolean>(props?.baseProps,SHOW_FILTER_DIALOG_KEY);
    const navigationData= useGetHelperData<NavigationActionInfo>(props?.baseProps,NAVIGATION_KEY);
    const tabIndex= useGetHelperData<number>(props?.baseProps,SELECTED_FILTER_TAB_INDEX)??0;
    const[bTabs,setBTabs]=useState<BasicTabProps[]>([])
    useEffect(()=>{
        handleFillBasicTabs();
    },[navigationData])

    const handleFillBasicTabs=()=>{
        let tabs=
         navigationData?.EnabledFilters?.EnabledFiltes?.map((item,index)=>{
            let cProps:SingleFilterCompProps={...props,filterType:item}
            const filterName: string = FilterEntities[item];
             let obj:BasicTabProps={
                Caption:filterName,

                Component:<SingleFilterDataComp {...cProps} />
             }
             return obj ;
         })??[];

         setBTabs(tabs)
    }
    // const bTabs:BasicTabProps[]=[{Caption:"First Tab",Component:<SingleFilterDataComp {...props}/>}]
    return (
        <>
          <QuantomDialog onClosePress={()=>{AddHPD<boolean>(props?.baseProps,SHOW_FILTER_DIALOG_KEY,false)}} heading="Filter Detail" open={showFilterDialog}
             headerExtension={<>Testing</>}
            >
            
             {/* Report Filter */}

             <Quantom_Grid container>
               <BasicTabs willShowRemoveButton={false}  onTabClick={(index)=>{
                  AddHPD<number>(props?.baseProps,SELECTED_FILTER_TAB_INDEX,index)
               }} selectedTabIndex={tabIndex}  tabs={bTabs}></BasicTabs>
             </Quantom_Grid>
          </QuantomDialog>
        </>
    )
}





export const SingleFilterDataComp=(props?:SingleFilterCompProps)=>{

    useEffect(()=>{
        handleLoadFilterKeys();
    },[props?.baseProps?.fullState?.MenuCode])
    const currentFilterKeys= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_ALL_FILTER_OBJECT_DATA_KEY)
                            ?.FilterDetail?.find(x=>x.FitlerType===props?.filterType)?.Keys??[];


    const filterData= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_ALL_FILTER_OBJECT_DATA_KEY)?.FilterDetail;
    
    useEffect(()=>{
        console.log('current filter keys are',filterData);
        console.log('current filter keys type is',props?.filterType);

    },[filterData])

    const applied_filter= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY)

    //const currentFilter=filter?.FilterDetail?.find(x=>x.FitlerType===props?.filterType);
    
    const handleLoadFilterKeys=async()=>{
         let filter= await GetHPD_WithOutStore<QuantomFilter>(props?.baseProps?.UniqueId,QUANTOM_ALL_FILTER_OBJECT_DATA_KEY);
         let currentFilter= filter?.FilterDetail?.find(x=>x.FitlerType===props?.filterType);
         if(!currentFilter){
            // alert('let keys this is')
            let keys= await getKeys();
            let obj:QuantoFilterDetail={FitlerType:props?.filterType,Keys:[...keys]}
            let nFilter={...filter,FilterDetail:[...filter?.FilterDetail??[],{...obj}]}
            // if()

            AddHPD(props?.baseProps,QUANTOM_ALL_FILTER_OBJECT_DATA_KEY,nFilter);
         }
    }


    const getKeys=async():Promise<CommonCodeName[]>=>{
            if(props?.filterType === FilterEntities.ITEM_ATTRIBUTES)
            {
                return[]
                //return new List<CommonCodeName>();
            }

            let q:FilterEntityQuery={
                filterEntities:props?.filterType,
                QFilter:applied_filter
            }
            let res= await QuantomPOST<CommonCodeName[]>('Config/TransLog/ConfigTransNavigationKeys',true,q);
            return res?.Response??[];
        
    }

    
    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
        <div>
             
            {
                currentFilterKeys?.map((item,index)=>{
                    const checked= applied_filter?.FilterDetail?.find(x=>x.FitlerType===props?.filterType)
                                        ?.Keys?.some(x=>x.Code===item?.Code)
                    return(

                        <Quantom_Grid pl={1} fontSize={fonts.H4FontSize}  fontWeight='bold' mt={.75} component={Paper} borderBottom={`1px solid ${theme?.palette?.primary?.main}`}  container size={{xs:12}}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <QuantomSwitch onChange={(val)=>{
                                   if(val){

                                    let nKeys=
                                       applied_filter?.FilterDetail?.map((obj,index)=>{
                                          if(obj.FitlerType===props?.filterType){
                                            return {...obj,Keys:[...obj?.Keys??[],{...item}]} ;
                                          }

                                          return obj;
                                       })??[]


                                       if(!nKeys ||nKeys.length<1 || !nKeys?.some?.(x=>x.FitlerType===props?.filterType)){
                                         nKeys=[...nKeys,{FitlerType:props?.filterType,Keys:[{...item}]}]
                                       }
                                    

                                       console.log('nkeys are',nKeys);
                                       console.log('nkeys selected item is',item)

                                       AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,FilterDetail:[...nKeys??[]]})
                                   }

                                   if(!val){
                                    let appFilterDetail=applied_filter?.FilterDetail?.find(x=>x.FitlerType===props?.filterType);
                                     if(appFilterDetail){
                                        //  alert('remove seleced detail called');
                                        appFilterDetail={FitlerType:props?.filterType,Keys:[]}
                                          
                                        let nDetail= applied_filter?.FilterDetail?.map((det,index)=>{
                                            return RemoveSelectedItem(props?.filterType,det,item);
                                        });

                                        console.log('new detail is',nDetail)

                                        AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,FilterDetail:[...nDetail??[]]})

                                    }
                                }


                                    //     let newDetail=
                                    //     applied_filter?.FilterDetail?.map((obj,d)=>{
                                    //         return (obj?.FitlerType!==props?.filterType)?obj:RemoveItemFilter(obj)
                                        
                                    //  }
                                //    }



                                }}
                                 value={checked} label=""/>
                                {item?.Name}
                            </div>
                        </Quantom_Grid>
                    )
                })
            }
        </div>
    )
}