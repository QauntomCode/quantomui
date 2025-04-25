/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react"
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper"
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps"
import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material"
import {  DBGetSingleNavigationAction } from "../../../../../IndexedDb/Initialization/Operation/NavigationActionDb"
import { AddHPD, useGetHelperData } from "../../../../sale/reports/Appointments/CustomerAppointmentReports"
import { QuantomDialog } from "../../../../sale/processing/sale/view/POSSaleView"
import BasicTabs, { BasicTabProps } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/BasicTabs"
import { FilterEntities, FilterEntityQuery, QuantoFilterDetail, QuantomFilter } from "../../../Common/QuantomFilter/QuantomFilter";
import {NavigationActionInfo } from "../../../Common/NavigationModels/NavigationAction";

import { CommonCodeName } from "../../../../../database/db"
import {  GetHPD_WithOutStore, useQuantomFonts } from "../../../../../redux/store"
import { HTTP_RESPONSE_TYPE, HttpResponse, QuantomPOST } from "../../../../../HTTP/QuantomHttpMethods"
import { QuantomSwitch } from "../../../../inventory/config/item/views/POS/POSInventoryIitemsView"
import { QUANTOM_Date } from "../../../../../quantom_comps/BaseComps/Quantom_Date"
import dayjs from "dayjs"
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov"
import { QuantomBasiSelect } from "../../../../Purchase/Processing/Purchase/view/POSPurchaseView"
import { GetUserActivityLog } from "../impl/ActivityLogImpl"
import { ACCOUNT_VOUCHER_INSERT_URL } from "../../../../account/account_urls"
import { Config_TransLogDTO } from "../model/TransLog"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



const ACTIVITY_LOG_REPORT_DATA="ACTIVITY_LOG_REPORT_DATA"
const colWid={plusSign:.5,userName:1,action:1,formName:1.5,date:1,time:1,transNo:1.5,bpName:3.5,remarks:3,amount:1,reviewStatus:1.5}

const ActivityLogView=(props?:MenuComponentProps<any>)=>{
    const fonts= useQuantomFonts();
    const theme= useTheme();
    React.useEffect(()=>{
        setFormBasicKeys<any>({
           settings:{willShowLocations:false,WillHideUserLog:true,wWillHideToolbar:true},
           uniqueKey:props?.UniqueId??"",
           baseProps:props??{}
        })
      },[props])

      let data= useGetHelperData<Config_TransLogDTO[]>(props,ACTIVITY_LOG_REPORT_DATA);
      const headerStyle={fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:500,letterSpacing:1.2}
      const bodyStyle={fontFamily:fonts.RegularFont,fontSize:fonts.H4FontSize,}

    
    return(
        <>
         <Quantom_Grid mt={1.5} container spacing={1}>
            <Quantom_Grid  size={{xs:3}}>
                <QuantomReportBase OnLoadData={async(filter)=>{
                    let res= await GetUserActivityLog(filter);
                    AddHPD(props,ACTIVITY_LOG_REPORT_DATA,res?.Response??[]);
                }} baseProps={props} />
                {/* <ReportFilter baseProps={props}/> */}
            </Quantom_Grid>
            <Quantom_Grid   size={{xs:9}}>

                {
                    data?.map((item,index)=>{
                        return(
                            <RenderActivityLogSingleRecord {...item}/>
                        )
                    })
                }

                {/* <Quantom_Grid component={Paper}  size={{xs:12}}>
                    <div style={{display:'flex',width:'100%'}}>
                        <div style={{...headerStyle,flex:colWid.plusSign}}></div>
                          <div style={{...headerStyle,flex:colWid.userName}}>UserName</div>
                          
                          <div style={{...headerStyle,flex:colWid.action}}>Action</div>
                          <div style={{...headerStyle,flex:colWid.formName}}>FormName</div>
                          <div style={{...headerStyle,flex:colWid.date}}>Date</div>
                          <div style={{...headerStyle,flex:colWid.time}}>Time</div>
                          <div style={{...headerStyle,flex:colWid.transNo}}>TransNo</div>
                          <div style={{...headerStyle,flex:colWid.bpName}}>BP Name</div>
                          <div style={{...headerStyle,flex:colWid.remarks}}>Remarks</div>
                          <div style={{...headerStyle,flex:colWid.amount}}>Amount</div>
                          <div style={{...headerStyle,flex:colWid.reviewStatus}}>Review Status</div>
                    </div>
                </Quantom_Grid>
                <Divider/>
                <Quantom_Grid container size={{xs:12}}>
                  {
                    data?.map((item,index)=>{
                        return(
                            <Quantom_Grid   size={{xs:12}}>
                                <div style={{display:'flex',width:'100%',borderBottom:`1px solid ${theme?.palette?.text?.primary}`}}>
                                    <div style={{...bodyStyle,flex:colWid.plusSign}}></div>
                                    <div style={{...bodyStyle,flex:colWid.userName}}>{item?.UserName}</div>
                                    <div style={{...bodyStyle,flex:colWid.action}}>{item?.TransState}</div>
                                    <div style={{...bodyStyle,flex:colWid.formName}}>{item?.FormName}</div>
                                    <div style={{...bodyStyle,flex:colWid.date}}>{dayjs(item?.TransTime)?.format('DD/MMM/YYYY')}</div>
                                    <div style={{...bodyStyle,flex:colWid.time}}>{dayjs(item?.TransTime)?.format('HH:MM:ss')}</div>
                                    <div style={{...bodyStyle,flex:colWid.transNo}}>{item?.TransNo}</div>
                                    <div style={{...bodyStyle,flex:colWid.bpName}}>{item?.BpName}</div>
                                    <div style={{...bodyStyle,flex:colWid.remarks}}>{item?.Remarks}</div>
                                    <div style={{...bodyStyle,flex:colWid.amount}}>{item?.Amount}</div>
                                    <div style={{...bodyStyle,flex:colWid.reviewStatus}}>{item?.LogReviewStatus}</div>
                                </div>
                             </Quantom_Grid>
                        )
                    })
                  }
                </Quantom_Grid> */}
               
            </Quantom_Grid>
         </Quantom_Grid>

        </>
    )
}


const RenderActivityLogSingleRecord=(props?:Config_TransLogDTO)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const [showDetail,setShowDetail]= useState(false);
    return(
        <>
        <Quantom_Grid container pt={1} pl={1} pr={1} mb={.5}  sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`}} size={{xs:12}} component={Paper}>
            <Quantom_Grid  pb={.5} container sx={{borderBottom:`1px solid ${theme?.palette?.text?.disabled}`}} size={{xs:12}}>
                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName iconName="AccountCircleOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize}}>{props?.UserName}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName iconName="DynamicFormOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize}}>{props?.TransState}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName iconName="EventNoteOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize}}>{dayjs(props?.TransTime).format("DD/MMM/YYYY")}</div>
                    </div>
                </Quantom_Grid>

                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName iconName="AccessTimeOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize}}>{dayjs(props?.TransTime).format("hh:mm:ss")}</div>
                    </div>
                </Quantom_Grid>

                <Quantom_Grid size={{xs:4}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName iconName="DesktopWindowsOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize}}>{props?.FormName}</div>
                    </div>
                </Quantom_Grid>
            </Quantom_Grid>
            <Quantom_Grid sx={{borderBottom:`1px solid ${theme?.palette?.text?.disabled}`}}  ml={3} mr={3}  container size={{xs:12}}>
                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div onClick={()=>{setShowDetail(!showDetail)}}>
                            <IconByName iconName={showDetail?'IndeterminateCheckBoxOutlined':'AddBoxOutlined'}  fontSize="30px"  />
                        </div>
                        <div>
                            <IconByName color={theme.palette.text.disabled} iconName="ReceiptOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>{props?.TransNo}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:4}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName color={theme.palette.text.disabled} iconName="FolderSharedOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>{props?.BpName}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:3}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName color={theme.palette.text.disabled} iconName="NewspaperOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>{props?.Remarks}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:1}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName color={theme.palette.text.disabled} iconName="LocalAtmOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>{props?.Amount}</div>
                    </div>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:2}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div>
                            <IconByName color={theme.palette.text.disabled} iconName="LabelImportantOutlined" fontSize="20px"  />
                        </div>
                        <div style={{marginLeft:'5px',fontFamily:fonts?.HeaderFont,letterSpacing:1.5,fontSize:fonts.H4FontSize,color:theme.palette.text.disabled}}>{props?.LogReviewStatus}</div>
                    </div>
                </Quantom_Grid>
            </Quantom_Grid>

            {
               showDetail&& props?.InventoryDetail?(
                <Quantom_Grid mt={1} size={{xs:12}} container pl={6} pr={6}>
                     <Quantom_Grid mb={1.5} sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,letterSpacing:1.5,fontWeight:600,
                        borderBottom:`3px solid ${theme?.palette?.text?.disabled}`
                     }} container size={{xs:12}}>
                         <Quantom_Grid  size={{xs:3}}>Item Name</Quantom_Grid>
                         <Quantom_Grid size={{xs:1.5}}>Unit Name</Quantom_Grid>
                         <Quantom_Grid size={{xs:1}}>Qty</Quantom_Grid>
                         <Quantom_Grid size={{xs:1}}>Price</Quantom_Grid>
                         <Quantom_Grid size={{xs:1}}>Dis</Quantom_Grid>
                         <Quantom_Grid size={{xs:2}}>Amount</Quantom_Grid>
                         <Quantom_Grid size={{xs:1}}>PackSize</Quantom_Grid>
                         <Quantom_Grid size={{xs:1}}>PriceUnit</Quantom_Grid>
                     </Quantom_Grid>
                     {
                        props?.InventoryDetail?.map((item,index)=>{
                            return(
                            <Quantom_Grid sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,letterSpacing:1.5,
                                borderBottom:`.5px solid ${theme?.palette?.text?.disabled}`
                            }} container size={{xs:12}}>
                                <Quantom_Grid  size={{xs:3}}>{item?.ItemName}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1.5}}>{item?.UnitName}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1}}>{item?.Qty}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1}}>{item?.Price}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1}}>{item?.DisAmount}</Quantom_Grid>
                                <Quantom_Grid size={{xs:2}}>{item?.Amount}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1}}>={item?.PackSize}</Quantom_Grid>
                                <Quantom_Grid size={{xs:1}}>{item?.PriceUnitRate}</Quantom_Grid>
                            </Quantom_Grid>
                            )
                        })
                     }
                </Quantom_Grid>
               ):(<></>)
            }
            
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
    OnLoadData?:(filter?:QuantomFilter)=>void;
    
}


export const QuantomReportBase=(props?:QuantomFilterProps)=>{



    useEffect(()=>{
        handleLoadNavigationAction();
    },[props?.baseProps?.MenuCode])


    const handleLoadNavigationAction=async()=>{
      let res= await  DBGetSingleNavigationAction(props?.baseProps?.MenuCode??"");

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
    const reportTemplates= useGetHelperData<NavigationActionInfo>(props?.baseProps,NAVIGATION_KEY)?.EnabledFilters?.ReportTemplatList
    ?.map((item,index)=>{
        let obj:CommonCodeName={Code:item,Name:item};
        return obj  ;
    });

    useEffect(()=>{
        if(!applied_filter?.SelectedReportTemplate){
            AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,SelectedReportTemplate:reportTemplates?.[0]?.Code})
        }
    },[applied_filter?.SelectedReportTemplate ,reportTemplates])

    


    // const GetReportTemplates=():Promise<CommonCodeName[]>=>{

    //     let obj:CommonCodeName[]= [{Code:"Code",Name:"Code"}]

    //     return Promise.resolve(obj);
    // }

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
                <Box onClick={()=>{
                    props?.OnLoadData?.(applied_filter)
                }} fullWidth component={Paper}>
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

        <Quantom_Grid size={{xs:12}} mt={1} container component={Paper}>
            <QuantomBasiSelect editValue={applied_filter?.SelectedReportTemplate} onChange={(obj)=>{
                AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,SelectedReportTemplate:obj?.Code})
            }} list={reportTemplates}  label="Template"/>
          {/* <Quantom_LOV1 uniqueKeyNo={props?.baseProps?.UniqueId??""} label="Templates" FillDtaMethod={GetReportTemplates}/> */}
        </Quantom_Grid>

        <RenderDateFilter {...props}/>

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
             //headerExtension={<><RenderDateFilter {...props}/></>}
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


export const RenderDateFilter=(props?:QuantomFilterProps)=>{

    const isDateEnabled= useGetHelperData<NavigationActionInfo>(props?.baseProps,NAVIGATION_KEY)?.EnabledFilters?.WillEnableFormDate??false;
    const applied_filter= useGetHelperData<QuantomFilter>(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY);

    React.useEffect(()=>{
        if(!applied_filter?.FromDate){
            AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,FromDate:new Date()})
        }
    },[applied_filter?.FromDate])

    React.useEffect(()=>{
        if(!applied_filter?.ToDate){
            AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,ToDate:new Date()})
        }
    },[applied_filter?.ToDate])

    return(
        <>
            {isDateEnabled?(
                <Quantom_Grid mt={1} spacing={1} container size={{xs:12}}>
                    <Quantom_Grid size={{xs:6}}>
                        <QUANTOM_Date label='From Date' value={dayjs(applied_filter?.FromDate)} onChange={(date)=>{
                            AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,FromDate:date?.toDate()})
                        }}/>
                    </Quantom_Grid>
                    <Quantom_Grid size={{xs:6}}>
                        <QUANTOM_Date label='To Date' value={dayjs(applied_filter?.ToDate)} onChange={(date)=>{
                                AddHPD(props?.baseProps,QUANTOM_APPLIED_FILTER_OBJECT_DATA_KEY,{...applied_filter,ToDate:date?.toDate()})
                            }}/>
                    </Quantom_Grid>
                </Quantom_Grid>
            ):(<></>)}
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