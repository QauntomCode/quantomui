/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { IconByName, MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { GetStockReport, StockDetailReportModel } from "../impl/stockReportImpl";
import { full_component_state, useQuantomFonts } from "../../../../../redux/store";
import { useEffect, useState } from "react";
import { POSActionButton } from "../../../config/item/views/POS/POSInventoryIitemsView";
import { Paper, useTheme } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";
import { Quantom_Grid } from "../../../../../quantom_comps/base_comps";
import { isNullOrEmpty } from "../../../../../CommonMethods";

export const POSStockDetailReportView=(props?:MenuComponentProps<StockDetailReportModel>)=>{

    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const[stockData,setStockData]= useState<StockDetailReportModel[]>([])
    const[cats,setCats]=useState<string[]>([]);

   
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<StockDetailReportModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true},
           
         })

        }
    },[fullState?.IsFirstUseEffectCall])



    useEffect(()=>{
      handleLoadCats();
    },[stockData])

    const handleLoadCats=()=>{
      if(!stockData || stockData.length<1){
         setCats([])
        return ;
      }
      
      let catList= new Set<string>();
      for(let st of stockData){
          catList.add(st?.CatName??"");
      }
       const array= Array.from<string>(catList) ;
       setCats([...array])
    }

    const fonts= useQuantomFonts();
    const theme= useTheme();

   const getItem=(catName?:string)=>{
     if(isNullOrEmpty(catName)){
      return "N/A"
     }
     return catName;
   }

    
    return(
        <>
        <div className="row g-1">
          <div className="col-md-4">
            <Quantom_LOV1 label="Location" uniqueKeyNo={props?.UniqueId??""} keyNo="STOCK_REPORT_LOCATION DATA"/>
          </div> 
          <div className="col-md-4">
            <Quantom_LOV1 label="Category" uniqueKeyNo={props?.UniqueId??""} keyNo="STOCK_REPORT_CATEGORY_DATA"/>
          </div>   
          <div className="col-md-2">
            <POSActionButton iconName="ScreenSearchDesktop" label="Search" onClick={async()=>{
                let res =await GetStockReport('','','','',true);
                setStockData([...res])
            }}/>
          </div>
          <div className="col-md-2">
            <POSActionButton iconName="LocalPrintshopOutlined" label="Print" onClick={async()=>{
                // let res =await GetStockReport('','','','',true);
                // setStockData([...res])
            }}/>
          </div>
        </div>

        <Quantom_Grid  spacing={1} container component={Paper} sx={{padding:'8px',marginTop:'8px',fontFamily:fonts.HeaderFont,fontSize:fonts.H3FontSize,fontWeight:500}} size={{xs:12}}>
          {
            cats?.map?.((item,index)=>{
              return(
                 <Quantom_Grid item size={{xs:12,sm:12,md:12,lg:12}}  sx={{padding:"5px",backgroundColor:theme.palette.background.default,marginTop:'5px'}}>
                   <div style={{display:'flex',alignItems:'center',width:'100%',borderBottom:`1px solid ${theme?.palette?.primary?.main}`}}>
                      <IconByName iconName="AccountTreeOutlined" color={theme?.palette?.primary?.main}/>
                      <div style={{marginLeft:'10px'}}>
                        {getItem(item)}
                      </div>
                   </div>

                   {
                      stockData?.filter(x=>x.CatName??""===item??"").map((item,index)=>{
                        //  if(index>6){
                        //   return <></>
                        //  }
                        return(
                           <Quantom_Grid container sx={{marginTop:'5px',fontSize:'15px',marginLeft:'25px',fontWeight:400,borderBottom:`.5px solid ${theme.palette.text.disabled}`}} >
                             <Quantom_Grid item size ={{xs:5,sm:4,md:3,lg:2,xl:2}}>
                              <div style={{display:'flex',alignItems:'center'}}>
                                <IconByName iconName="ClassOutlined" color={theme?.palette?.secondary.main}/>
                                <div style={{marginLeft:'7px'}}>{item?.ItemCode}</div>
                              </div>
                            </Quantom_Grid>
                             <Quantom_Grid item size ={{xs:7,sm:8,md:6,lg:4,xl:3}}>
                             <div style={{display:'flex',alignItems:'center'}}>
                                <IconByName iconName="LocalMallOutlined" color={theme?.palette?.secondary.main}/>
                                <div style={{marginLeft:'7px'}}>{item?.ItemName}</div>
                              </div>
                             </Quantom_Grid>

                             <Quantom_Grid  size={{xs:12,md:3,lg:6,xl:7}}>
                               <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'start',marginRight:'20px',marginTop:'2px'}}>
                                    <IconByName iconName="Inventory2Outlined" color={theme.palette.secondary.main}/>
                                   <div style={{color:theme?.palette?.text?.disabled,fontSize:'18px',fontWeight:450,marginLeft:'5px'}}> {item?.StockQty}</div>
                               </div>
                               
                             </Quantom_Grid>
                           </Quantom_Grid>
                        )
                      })
                   }
                 </Quantom_Grid>
              )
            })
          }
        </Quantom_Grid>

{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table" size="small">
        <TableHead>
          <TableRow>
            <TableCell >Category</TableCell>
            <TableCell >Item Code</TableCell>
            <TableCell >Item Name</TableCell>
            <TableCell >Qty</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {stockData?.map((row) => (
            <TableRow
              key={row.ItemCode}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell > {row.CatName}</TableCell>
              <TableCell > {row.ItemCode}</TableCell>

              <TableCell >{row.ItemName}</TableCell>
              <TableCell >{row.StockQty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
          
        </>
    )
}