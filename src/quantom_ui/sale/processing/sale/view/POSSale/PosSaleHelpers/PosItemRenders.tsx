/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { Dialog, DialogContent, DialogTitle, Paper, useTheme } from "@mui/material";
import { POSActionButton1 } from "../../../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { Quantom_Grid, Quantom_Input } from "../../../../../../../quantom_comps/base_comps";
import { GetItemsByCategory } from "../../../../../../inventory/config/item/impl/InventoryitemsImpl";
import { InventoryItemsModel } from "../../../../../../inventory/config/item/model/InventoryItemsModel";
import { IconByName } from "../../../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { useQuantomFonts } from "../../../../../../../redux/store";
import { useEffect, useState } from "react";
import { POSRenderItemUnitsWithPrice } from "./PosRenderItemUnitWithPrice";
import { CommonInvDetailModel } from "../../../../../../inventory/CommonComp/CommonInvDetail/Model/CommonInvDetailModel";

export interface POSItemsRendererViewProps{
    uniqueId?:string;
    selectedCat?:string;
    size?:QuantomSize
    onItemSelection?:(selectedDetail?:CommonInvDetailModel)=>void;
    ItemLoadType?:'CATEGORY_WISE'|'ALL_ITEMS'
    onCartClick?:()=>void;
    onCancelClick?:()=>void;
  }
  
  export interface QuantomSize{
      md?:number;
      xs?:number;
      lg?:number;
      xl?:number;
  }
  
  export const PosItemsRenderer=(props?:POSItemsRendererViewProps)=>{
  
      //const categories= useSelector((state?:any)=>get_helperData_by_key(state,props?.UniqueId??"",POS_INVENTORY_ITEMS_CATEGORY_VALUE_KEY)) as SetupFormModel[];
      const fonts= useQuantomFonts();
      const theme= useTheme();
      const [allItems,setAllItems]=useState<InventoryItemsModel[]>([])
      const [items,setItems]=useState<InventoryItemsModel[]>([])
      const [itemSearch,setItemSearch]=useState('');
      const[selectedItem,setSelectedItem]= useState<CommonInvDetailModel>();
      const[showUnit,setShowUnit]=useState(false);
    //   const[showQtySelector,setShowQtySelector]=useState(false);
      

  
       useEffect(()=>{
         if(props?.selectedCat && props?.ItemLoadType==='CATEGORY_WISE'){
             handleLoadItems()
         }
       },[props?.selectedCat])
  
       useEffect(()=>{
          if(props?.ItemLoadType==='ALL_ITEMS'){
              handleLoadItems();
          }
       },[])
  
  
        useEffect(()=>{
         if(itemSearch){
             handleSearch();
         }
         else{
             setItems([...allItems])
         }
       },[itemSearch])
     
  
       const handleSearch=()=>{
         const search= itemSearch?.toLocaleLowerCase();
          let searchedItems= allItems?.filter(x=>
                     x.ItemName?.toLocaleLowerCase()?.includes(search) 
                     || x?.SearchKey?.toLocaleLowerCase()?.includes(search)
                     ||x?.category?.Name?.toLocaleLowerCase()?.includes(search)
                 )
  
         setItems([...searchedItems])
       }
  
       const handleLoadItems=async()=>{
            let res:InventoryItemsModel[]=[];
            if(props?.ItemLoadType==='CATEGORY_WISE')
            {
              res=  await GetItemsByCategory(props?.selectedCat??"0");
            }
            else{
              res = await GetItemsByCategory("")
            }
            setItems([...res])
            setAllItems([...res])
       }
  
     return(
     <> 
          <POSRenderItemUnitsWithPrice OnSelect={(price,item)=>{
              props?.onItemSelection?.(price);
              setSelectedItem({});
              //setSelectedItem({...selectedItem,TransUnitCode:price?.UnitCode,TransUnitName:item?.UnitName,Price:price?.Price})
            //   setShowQtySelector(true);
              setShowUnit(false);
          }} open={showUnit} lineObj={{ItemCode:selectedItem?.ItemCode}} onClose={()=>{setShowUnit(false)}}/>
          {/* <POSQtySelector  onSelect={(obj)=>{

          }} open={showQtySelector??false} onClose={()=>{setShowQtySelector(false)}} lineObj={selectedItem} /> */}

          <Quantom_Grid container component={Paper}>
                   <Quantom_Grid display='flex' size={{xs:12}} container spacing={.5} sx={{paddingLeft:'2px',paddingRight:'2px'}} >
                      <Quantom_Grid sx={{flex:1}}>
                          <Quantom_Input value={itemSearch} onChange={(e)=>{setItemSearch(e.target.value)}} label='Search' />
                      </Quantom_Grid>
                      <POSActionButton1 isIconOnly iconName="ScreenSearchDesktopOutlined" iconColor={theme?.palette?.primary?.main} rightMargin="2px" label="Search"/>
                      <POSActionButton1 onClick={props?.onCartClick} backgroundColor={theme?.palette?.secondary?.main} isIconOnly iconName="ShoppingCartCheckout" iconColor={theme?.palette?.secondary?.contrastText} label="Search"/>
                      <POSActionButton1 onClick={props?.onCancelClick} backgroundColor={theme?.palette?.error?.main} isIconOnly iconName="CancelPresentationOutlined" iconColor={theme?.palette?.error?.contrastText} label="Search"/>
                   </Quantom_Grid>
                   <Quantom_Grid size={{xs:12}} container spacing={.5} padding={'2px'}>
                   
                  {items?.map((item,index)=>{
                      if(index>99){
                          return(<></>)
                      }
                     return(
                         <Quantom_Grid container  onClick={()=>{
                            setSelectedItem({ItemCode:item?.ItemCode,ItemName:item?.ItemName});
                            setShowUnit(true);
                          // alert('this is my Report')
                         }} component={Paper}   size={{xs:12,sm:12,md:12,lg:12,xl:12,...props?.size}} sx={{borderBottom:`1px solid ${theme?.palette.primary.main}`}}>
                             <div onClick={()=>{}} 
                                 style={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize, display:'flex',alignItems:'center' }}>
                                  <div style={{marginLeft:'8px'}}>
                                       <IconByName fontSize="30px" color={theme.palette.primary.main} iconName="LocalMallOutlined"/>
                                  </div>
                                  <div style={{flex:1,marginLeft:'10px'}}>
                                      <div  style={{flex:1,color:theme.palette.text.primary,display:'flex',alignItems:'center'}}>
                                          {/* <IconByName iconName="Grid3x3Outlined" fontSize="20px"/> */}
                                          <div style={{marginLeft:'5px',fontWeight:'bold'}}>
                                              {item.ItemCode}
                                          </div>
                                      </div>
                                      <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                          {/* <IconByName iconName="InventoryOutlined" fontSize="20px"/> */}
                                          <div style={{marginLeft:'5px'}}>
                                          {item?.ItemName}
                                          </div>
                                      </div>
                                 </div>
                                 {/* <div  style={{flex:1,fontSize:'14px',display:'flex',alignItems:'center'}}>
                                     <IconByName iconName="DnsOutlined" fontSize="20px"/>
                                     <div style={{marginLeft:'5px'}}>
                                     {item?.category?.Name}
                                   </div>
                                 </div> */}
                             </div>
                         </Quantom_Grid>
                     )
                  })}
                  </Quantom_Grid>
             </Quantom_Grid>
     </>
   )
  }


  interface POSQtySelectorProps{
        open:boolean;
        lineObj?:CommonInvDetailModel;
        onSelect?:(lineOjb:CommonInvDetailModel)=>void;
        onClose?:()=>void;
  }
  export const POSQtySelector=(props?:POSQtySelectorProps)=>{
    const theme= useTheme();
    const fonts= useQuantomFonts();
    return(
    <Dialog fullWidth  open={props?.open??false}>
            <DialogTitle component={Paper} sx={{backgroundColor:theme.palette.primary.main,display:'flex',alignItems:'center',padding:'2px',margin:'0',borderBottom:`1px solid ${theme.palette.text.primary}`}}>
                <div style={{flex:1,fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,color:theme.palette.text.secondary}}>Update Qty</div>
                <div onClick={()=>{props?.onClose?.()}}>
                    <IconByName iconName="CancelPresentation" color={theme.palette.error.dark}></IconByName>
                </div>
            </DialogTitle>
            <DialogContent>
                <Quantom_Grid mt={1} siz={{xs:12}} container spacing={1.5} sx={{fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,}}>
                     <div style={{display:'flex',alignItems:'center'}}>
                        <IconByName iconName="LocalMallOutlined" fontSize="20px" color={theme?.palette?.primary?.main}/>
                        <div style={{fontSize:fonts.H4FontSize,fontWeight:'bold',marginLeft:'5px'}}>{props?.lineObj?.ItemName}</div> 
                          
                     </div>
                </Quantom_Grid>
            </DialogContent>
        </Dialog>
    )

  }
  