/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { Quantom_Grid } from "../../../../../../../quantom_comps/base_comps";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { IconByName, MenuComponentProps } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { ShowSingleSelectedItemDialog } from "./ShowSingleSelectedItemDialog";
import { VmSale } from "../../../model/VmSaleModel";
import { QuantomSize } from "./PosItemRenders";

interface SoldItemsRendererProps{
    baseProps?:MenuComponentProps<VmSale>
    itemGridSize?:QuantomSize;
    onDeleteItem?:(workingItem?:CommonInvDetailModel)=>void;
    onEditItem?:(workingItem?:CommonInvDetailModel)=>void;
  
  }
  
  export const SoldItemsRenderer=(props?: SoldItemsRendererProps)=>{
  
      const [showDialog,setShowDialog]=useState(false);
      const[selecteditem,setSelectedItem]=useState<CommonInvDetailModel>();
      const soldItems= props?.baseProps?.state?.SaleDetails;
      const fonts= useQuantomFonts();
      const theme= useTheme();
      const headerFont={fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,fontWeight:800,color:theme?.palette?.primary?.contrastText};
      const bodyFont={fontFamily:fonts.HeaderFont,fontSize:'12px'};
      
      return(
          <>
          <ShowSingleSelectedItemDialog item={selecteditem} open={showDialog} onClose={(type,item)=>{
              setShowDialog(false);
              if(type==='APPLIED'){
                  props?.onEditItem?.(item);
              }
          }}></ShowSingleSelectedItemDialog>
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
                              <div onClick={()=>{setShowDialog(true);setSelectedItem(item)}}>
                                  <IconByName fontSize="22px"  iconName="EditCalendarOutlined"/>
                              </div>
                              <div onClick={()=>{props?.onDeleteItem?.(item)}}>
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
          </>
      )
  }
  