/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { get_helperData_by_key, useQuantomFonts } from "../../../../../../../redux/store";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { IconByName, MenuComponentProps } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { ShowSingleSelectedItemDialog } from "./ShowSingleSelectedItemDialog";
import { VmSale } from "../../../model/VmSaleModel";
import { QuantomSize } from "./PosItemRenders";
import { CommonInvDetailComp } from "../../../../../../inventory/CommonComp/CommonInvDetail/Comp/CommonInvDetailComp";
import { handleAddItem, POS_SALE_LOCID_KEY } from "../../POSSaleView";
import { useSelector } from "react-redux";
import { INVENTORY_PERFORMED_ACTION } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailActionQueryModel";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { POSActionButton } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton";
import { totalmem } from "os";
import { SalePrintAableTotalValue, SalePrintNumbers } from "../POSSaleView1";

interface SoldItemsRendererProps{
    baseProps?:MenuComponentProps<VmSale>
    itemGridSize?:QuantomSize;
    onDeleteItem?:(workingItem?:CommonInvDetailModel)=>void;
    onEditItem?:(workingItem?:CommonInvDetailModel)=>void;
    onPaymentClik?:()=>void;
    onListClick?:()=>void;
  
  }
  
  export const SoldItemsRenderer=(props?: SoldItemsRendererProps)=>{
  
      const [showDialog,setShowDialog]=useState(false);
      const[selecteditem,setSelectedItem]=useState<CommonInvDetailModel>();
      const locid= useSelector((state?:any)=>(get_helperData_by_key(state,props?.baseProps?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;
      
    const handleEditItem=(item?:CommonInvDetailModel)=>{
        setSelectedItem(item);
        setShowDialog(true);
    }
    const hadnleDeleteItem=(item?:CommonInvDetailModel)=>{
        handleAddItem(locid,props?.baseProps,item,INVENTORY_PERFORMED_ACTION.DELETE)
    }
      return(
          <>
          <ShowSingleSelectedItemDialog item={selecteditem} open={showDialog} onClose={(type,item)=>{
              setShowDialog(false);
              if(type==='APPLIED'){
                  props?.onEditItem?.(item);
                  handleAddItem(locid,props?.baseProps,item,INVENTORY_PERFORMED_ACTION.EDIT)
              }
          }}></ShowSingleSelectedItemDialog>
         

            <SoldItemCardView onPaymentClick={props?.onPaymentClik} onListClick={props?.onListClick} onDeleteclick={hadnleDeleteItem} onEditClick={handleEditItem} baseProps={props} showDialog={showDialog} setShowDialog={(val)=>{setShowDialog(val??false)}}
                selectedItem={selecteditem} setSelectedItem={(item)=>{setSelectedItem(item)}}/>
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
     onDeleteclick?:(item?:CommonInvDetailModel)=>void;
     onPaymentClick?:()=>void;
     onListClick?:()=>void;
   }

   export const SoldItemCardView=(props?:ChildProps)=>{
    const [totals,setTotals]=useState<SalePrintNumbers>()
    const fonts= useQuantomFonts();
    const theme= useTheme();
    const headerFont={fontFamily:fonts.HeaderFont,fontSize:'14px',fontWeight:600,p:1,pl:2};
    const bodyFont={fontFamily:fonts.HeaderFont,fontSize:'12px'};
    const soldItems= props?.baseProps?.baseProps?.state?.SaleDetails;

    useEffect(()=>{
        handleTotalvalue();
    },[props?.baseProps?.baseProps?.state])

    const handleTotalvalue=async()=>{
        let res = await SalePrintAableTotalValue(props?.baseProps?.baseProps?.state)
        setTotals(res);
    }
    const locid= useSelector((state?:any)=>(get_helperData_by_key(state,props?.baseProps?.baseProps?.UniqueId??"",POS_SALE_LOCID_KEY))) as string;


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
                        <>
                            <Quantom_Grid mt={.5} borderBottom={`1px solid ${theme?.palette?.primary?.main}`} container component={Paper} size={{xs:12,md:12,lg:12,xl:6}} >
                                
                                <Quantom_Grid container borderBottom={`1px solid black`} display='flex'  alignItems='center'  size={{xs:12}} sx={{...headerFont}}>
                                    <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="LocalMallOutlined"/>
                                    {item?.ItemName}
                                </Quantom_Grid>
                                
                           
                                <Quantom_Grid container sx={{pl:2}} size={{xs:12}} borderBottom='1px solid black'>
                                    <Quantom_Grid size={{xs:5}} alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                        <IconByName  fontSize="20px" color={theme?.palette?.primary?.main} iconName="WidgetsOutlined"/>
                                        {item?.TransUnitName}
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


                                <Quantom_Grid container sx={{p:1,pl:2}} size={{xs:12}} borderBottom='1px solid black'>
                                    <Quantom_Grid alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize}}>
                                        <IconButton onClick={()=>props?.onDeleteclick?.(item)} style={{padding:'5px',paddingLeft:'20px',paddingRight:'20px',backgroundColor:theme?.palette?.secondary?.main,borderRadius:'5px'}} >
                                            <IconByName  fontSize="20px" color={theme?.palette?.secondary?.contrastText} iconName="DeleteOutlineOutlined"/>
                                        </IconButton>
                                    </Quantom_Grid>
                                    <Quantom_Grid alignItems='center' sx={{fontFamily:fonts.HeaderFont,fontWeight:600,fontSize:fonts.H4FontSize,ml:.5}}>
                                        <IconButton onClick={()=>props?.onEditClick?.(item)} style={{padding:'5px',paddingLeft:'20px',paddingRight:'20px',backgroundColor:theme?.palette?.secondary?.main,borderRadius:'5px'}} >
                                                <IconByName  fontSize="20px" color={theme?.palette?.secondary?.contrastText} iconName="EditCalendarOutlined"/>
                                        </IconButton>
                                    </Quantom_Grid>

                                    <Quantom_Grid display="flex" flex={1} justifyContent='end' sx={{fontFamily:fonts.HeaderFont,fontWeight:800,fontSize:'25px',ml:.5}}>
                                        {item?.Amount?.toFixed(0)}
                                    </Quantom_Grid>
                                   
                                </Quantom_Grid>

                              

                            </Quantom_Grid>
                        </>
                    )
                })
            }
        </Quantom_Grid>
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
        <Quantom_Grid container sx={{height:'100%'}} spacing={1}>
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
  