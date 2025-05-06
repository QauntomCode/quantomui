/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { get_helperData_by_key, useQuantomFonts } from "../../../../../../../redux/store";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { APP_TYPE, GetAPPType, IconByName, MenuComponentProps } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { ShowSingleSelectedItemDialog } from "./ShowSingleSelectedItemDialog";
import { VmSale } from "../../../model/VmSaleModel";
import { QuantomSize } from "./PosItemRenders";
import { handleAddItem, POS_SALE_LOCID_KEY } from "../../POSSaleView";
import { useSelector } from "react-redux";
import { INVENTORY_PERFORMED_ACTION } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { SalePrintAableTotalValue, SalePrintNumbers } from "../POSSaleView1";
import dayjs from "dayjs";



interface SoldItemsRendererProps{
    baseProps?:MenuComponentProps<VmSale>
    itemGridSize?:QuantomSize;
    onDeleteItem?:(workingItem?:CommonInvDetailModel)=>void;
    onEditItem?:(workingItem?:CommonInvDetailModel)=>void;
    onPaymentClick?:()=>void;
    onListClick?:()=>void;
  
  }
  
  export const SoldItemsRenderer=(props?: SoldItemsRendererProps)=>{
  
      const [showDialog,setShowDialog]=useState(false);
      const[selectedItem,setSelectedItem]=useState<CommonInvDetailModel>();
      const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.baseProps?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
      
    const handleEditItem=(item?:CommonInvDetailModel)=>{
        setSelectedItem(item);
        setShowDialog(true);
    }
    const handleDeleteItem=(item?:CommonInvDetailModel)=>{
        handleAddItem(props?.baseProps?.state?.SaleServices??[],locId,props?.baseProps,item,INVENTORY_PERFORMED_ACTION.DELETE)
    }
      return(
          <>
          <ShowSingleSelectedItemDialog item={selectedItem} open={showDialog} onClose={(type,item)=>{
              setShowDialog(false);
              if(type==='APPLIED'){
                  props?.onEditItem?.(item);
                  handleAddItem(props?.baseProps?.state?.SaleServices??[],locId,props?.baseProps,item,INVENTORY_PERFORMED_ACTION.EDIT)
              }
          }}></ShowSingleSelectedItemDialog>
         

            <SoldItemCardView onPaymentClick={props?.onPaymentClick} onListClick={props?.onListClick} onDeleteClick={handleDeleteItem} onEditClick={handleEditItem} baseProps={props} showDialog={showDialog} setShowDialog={(val)=>{setShowDialog(val??false)}}
                selectedItem={selectedItem} setSelectedItem={(item)=>{setSelectedItem(item)}}/>
          </>
      )
  }

   interface ChildProps {
     baseProps?:SoldItemsRendererProps
     showDialog?:boolean;
     setShowDialog?:(val?:boolean)=>void;
     selectedItem?:CommonInvDetailModel
     setSelectedItem?:(val?:CommonInvDetailModel)=>void;
     onEditClick?:(item?:CommonInvDetailModel)=>void;
     onDeleteClick?:(item?:CommonInvDetailModel)=>void;
     onPaymentClick?:()=>void;
     onListClick?:()=>void;
   }

   export const SoldItemCardView=(props?:ChildProps)=>{
    const [totals,setTotals]=useState<SalePrintNumbers>()
    const fonts= useQuantomFonts();
    const theme= useTheme();
    
    const bodyFont={fontFamily:fonts.HeaderFont,fontSize:'12px'};
    const soldItems= props?.baseProps?.baseProps?.state?.SaleDetails;

    useEffect(()=>{
        handleTotalValue();
    },[props?.baseProps?.baseProps?.state])

    const handleTotalValue=async()=>{
        let res = await SalePrintAableTotalValue(props?.baseProps?.baseProps?.state)
        setTotals(res);
    }
    const locId= useSelector((state?:any)=>(get_helperData_by_key(state,props?.baseProps?.baseProps?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
    const headerFont={fontFamily:fonts.HeaderFont,fontSize:'14px',fontWeight:600,p:1,pl:2};
    const appType=GetAPPType();

    const getStatus=(itemCode?:string):'COMPLETED'|'PENDING'=>{
        var selected= props?.baseProps?.baseProps?.state?.SaleServices?.find(x=>x.ItemCode===itemCode);
        if(selected)
        {
            return selected?.Status?.toUpperCase()==='COMPLETED'?'COMPLETED':'PENDING';
        }
        return 'PENDING'
  }
  
    const changeStatus=(itemCode?:string,status?:'COMPLETED'|'PENDING')=>{
      let services=[...props?.baseProps?.baseProps?.state?.SaleServices??[]];
      let selected= services?.find(x=>x.ItemCode===itemCode);
      if(selected== null){
         services.push({ItemCode:itemCode,Status:status})
      }
      else{
         let index= services.indexOf(selected);
          services[index]={...services[index],Status:status};
      }
      props?.baseProps?.baseProps?.setState?.({...props?.baseProps?.baseProps?.state,SaleServices:[...services]})
    }
    return(
        <Quantom_Grid container size={{xs:12}} spacing={1}>
            <Quantom_Grid pt={1} pb={1} component={Paper} sx={{backgroundColor:theme?.palette?.primary?.main}} container size={{xs:12}}>
                <Quantom_Grid  size={{xs:12,md:12,lg:8,xl:8}} flexDirection='column'justifyContent='center' alignItems='center'>
                    <Quantom_Grid display='flex' alignItems='center' justifyContent='center' size={{xs:12}}>
                        <POSActionButton1 
                            onClick={()=>{props?.onPaymentClick?.()}}
                            label="Payment" 
                            rightMargin="12px"
                            backgroundColor={theme?.palette?.secondary?.main} 
                            iconColor={theme?.palette?.secondary?.contrastText} 
                            textColor={theme?.palette?.secondary?.contrastText} 
                            iconName="AddCardOutlined"/>

                        <POSActionButton1 
                            onClick={()=>{props?.onListClick?.()}}
                            label="Bill List" 
                            textColor={theme?.palette?.secondary?.contrastText} 
                            backgroundColor={theme?.palette?.secondary?.main} 
                            iconColor={theme?.palette?.secondary?.contrastText} 
                            iconName="BallotOutlined"/>
                    </Quantom_Grid>
                    <Quantom_Grid display='flex' justifyContent='center' alignItems='center' size={{xs:12}} style={{...headerFont,fontSize:'20px', color:theme.palette.primary.contrastText}}>
                         Total Amount
                    </Quantom_Grid>
                </Quantom_Grid>
                <Quantom_Grid size={{xs:12,sm:12,lg:4,xl:4}} 
                sx={{...headerFont,fontSize:'35px',fontWeight:800,color:theme.palette.primary.contrastText}} 
                display='flex' justifyContent='center' alignItems='center'> {totals?.NetTotal??0}</Quantom_Grid>

                
            </Quantom_Grid>
            {
                soldItems?.map((item,index)=>{
                    return(
                        <RenderSingleItemInventoryIOForMobile item={item} changeStatus={changeStatus} getStatus={getStatus}  onEditClick={props?.onEditClick} onDeleteClick={props?.onDeleteClick}/>
                    )
                })
            }
        </Quantom_Grid>
    )
   }


   export interface RenderSingleItemForMobile{
    item?:CommonInvDetailModel,
    changeStatus?:(itemCode?:string,status?:'COMPLETED'|'PENDING')=>void;
    getStatus?:(itemCode?:string)=>string;
    onEditClick?:(item?:CommonInvDetailModel)=>void;
    onDeleteClick?:(item?:CommonInvDetailModel)=>void;
    isReport?:boolean;
   }

   export const RenderSingleItemInventoryIOForMobile=({item,changeStatus,getStatus,onEditClick,onDeleteClick,isReport}:RenderSingleItemForMobile)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    const headerFont={fontFamily:fonts.HeaderFont,fontSize:'14px',fontWeight:600,p:1,pl:2};
    const appType= GetAPPType();


    
    return(
        <>
                            <Quantom_Grid mt={.5} borderBottom={`1px solid ${theme?.palette?.primary?.main}`} container component={Paper} size={{xs:12,md:12,lg:12,xl:6}} >
                                
                                <Quantom_Grid container borderBottom={`1px solid black`} display='flex'  alignItems='center'  size={{xs:12}} sx={{...headerFont}}>
                                    <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="LocalMallOutlined"/>
                                    {item?.ItemName}
                                </Quantom_Grid>
                                
                           
                                <Quantom_Grid container sx={{pl:2}} size={{xs:12}} borderBottom='1px solid black'>
                                    <Quantom_Grid size={{xs:5}} alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                        <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="WidgetsOutlined"/>
                                        {isReport?(item?.UnitName):item?.TransUnitName}
                                    </Quantom_Grid>
                                    <Quantom_Grid size={{xs:3}} alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                        <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="ShoppingCartOutlined"/>
                                        {item?.TransQty?.toFixed(2)}
                                    </Quantom_Grid>
                                    <Quantom_Grid size={{xs:4}} alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                        <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="LocalAtmOutlined"/>
                                        {item?.TransPrice?.toFixed(2)}
                                    </Quantom_Grid>
                                </Quantom_Grid>

                                 {
                                    appType===APP_TYPE.DENTAL_APP?(
                                        <Quantom_Grid container  sx={{display:"flex",  fontFamily:fonts.HeaderFont,  fontWeight:600,
                                            fontSize:fonts.H4FontSize, }} size={{xs:12}} pl={2} borderBottom={`1px solid ${theme.palette.secondary.main}`}>
                                             <div style={{ 
                                                        flex:1,
                                                        display:'flex', 
                                                        alignItems:'center', 
                                                      
                                                       }}>
                                                    <IconByName iconName="Schedule" fontSize="18px" color={theme?.palette?.primary?.main}/>
                                                     {dayjs(new Date()).format('DD MMM YYYY')}
                                             </div>
                                             <div style={{display:'flex'}}>
                                                <button onClick={()=>{
                                                    changeStatus?.(item?.ItemCode,'PENDING')
                                                }} style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',border:`1px solid ${theme?.palette?.primary?.main}`,
                                                            backgroundColor:getStatus?.(item?.ItemCode)!=="COMPLETED"?theme.palette.primary.main:theme.palette.text.disabled,
                                                            color:getStatus?.(item?.ItemCode)!=="COMPLETED"?theme.palette.primary.contrastText:undefined,
                                                    }}>Pending</button>
                                                <button onClick={()=>{
                                                    changeStatus?.(item?.ItemCode,'COMPLETED')
                                                }} style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px',border:`1px solid ${theme?.palette?.primary?.main}`,
                                                            backgroundColor:getStatus?.(item?.ItemCode)==="COMPLETED"?theme.palette.primary.main:theme.palette.text.disabled,
                                                            color:getStatus?.(item?.ItemCode)==="COMPLETED"?theme.palette.primary.contrastText:undefined,}}>Completed</button>
                                             </div>


                                            
                                        </Quantom_Grid>)
                                        :(<></>)
                                 }    


                                <Quantom_Grid container sx={{p:1,pl:2}} size={{xs:12}} borderBottom='1px solid black'>

                                    {
                                        !isReport?(<>
                                         <Quantom_Grid alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                            <IconButton onClick={()=>onDeleteClick?.(item)} style={{padding:'5px',paddingLeft:'20px',paddingRight:'20px',backgroundColor:theme?.palette?.secondary?.main,borderRadius:'5px'}} >
                                                <IconByName  fontSize="20px" color={theme?.palette?.secondary?.contrastText} iconName="DeleteOutlineOutlined"/>
                                            </IconButton>
                                            </Quantom_Grid>
                                            <Quantom_Grid alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize,ml:.5}}>
                                                <IconButton onClick={()=>onEditClick?.(item)} style={{padding:'5px',paddingLeft:'20px',paddingRight:'20px',backgroundColor:theme?.palette?.secondary?.main,borderRadius:'5px'}} >
                                                        <IconByName  fontSize="20px" color={theme?.palette?.secondary?.contrastText} iconName="EditCalendarOutlined"/>
                                                </IconButton>
                                            </Quantom_Grid>
                                        </>):(
                                            <Quantom_Grid display="flex" flex={1} justifyContent='end' sx={{fontFamily:fonts.HeaderFont,fontWeight:800,fontSize:'25px',ml:.5}}>
                                                {item?.Amount?.toFixed(0)}
                                            </Quantom_Grid>
                                        )
                                    }
                                   

                                    
                                   
                                </Quantom_Grid>

                              

                            </Quantom_Grid>
                        </>
    )
   }

  export const SoldItemGridView=(props?:ChildProps)=>
  {
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const headerFont={fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:800,color:theme?.palette?.primary?.contrastText};
    const bodyFont={fontFamily:fonts.HeaderFont,fontSize:'12px'};
    const soldItems= props?.baseProps?.baseProps?.state?.SaleDetails;
    return(
        <Quantom_Grid container sx={{}} spacing={1}>
        <TableContainer component={Paper} >
        <Table size="small" aria-label="a dense table">
            <TableHead style={{backgroundColor:theme?.palette?.primary?.main}}  component={Paper}>
                <TableRow>
                    <TableCell sx={{...headerFont,width:'10px'}}>
                        <IconByName iconName="DynamicFormOutlined" color={theme.palette.primary.contrastText}/>
                    </TableCell>
                    <TableCell sx={{...headerFont,width:'10px'}}>
                        <IconByName iconName="Grid3x3Outlined"  color={theme.palette.primary.contrastText}/>
                    </TableCell>
                    <TableCell sx={{...headerFont,width:'auto'}}>
                        {/* <IconByName iconName="ShoppingBagOutlined"/> */}
                        ITEM
                    </TableCell>
                    <TableCell sx={{...headerFont,width:'25px'}}>
                        {/* <IconByName iconName="ShoppingCartOutlined" color={theme.palette.primary.main}/> */}
                        QTY
                    </TableCell>
                    <TableCell sx={{...headerFont,width:'15px'}}>
                        {/* <IconByName iconName="PriceChangeOutlined" color={theme.palette.primary.main}/> */}
                        RATE
                    </TableCell>
                    <TableCell sx={{...headerFont,width:'15px'}}>AMOUNT</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {soldItems?.map((item, index) => (
                <TableRow key={index} sx={{padding:0,lineHeight:'10px'}}>
                <TableCell sx={{...bodyFont,wdith:'10px'}}>
                    <div style={{display:'flex'}}>
                        <div onClick={()=>{props?.setShowDialog?.(true);props?.setSelectedItem?.(item)}}>
                            <IconByName fontSize="22px"  iconName="EditCalendarOutlined"/>
                        </div>
                        <div onClick={()=>{props?.baseProps?.onDeleteItem?.(item)}}>
                            <IconByName fontSize="22px"  iconName="DeleteOutlineOutlined"/>
                        </div>
                    </div>

                </TableCell>
                <TableCell sx={{...bodyFont,wdith:'10px'}}>{item?.CustomSortNo}</TableCell>
                <TableCell sx={{...bodyFont,width:'auto'}}>{item?.ItemName}</TableCell>
                <TableCell sx={{...bodyFont,width:'25px'}}>{item?.TransQty}</TableCell>
                <TableCell sx={{...bodyFont,width:'15px'}}>{item?.TransPrice}</TableCell>
                <TableCell sx={{...bodyFont,width:'15px'}}>{item?.Amount}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Quantom_Grid>
    )
  }
  