/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { MenuComponentProps, setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { GetStockReport, StockDetailReportModel } from "../impl/stockReportImpl";
import { full_component_state } from "../../../../../redux/store";
import { useEffect, useState } from "react";
import { POSActionButton } from "../../../config/item/views/POS/POSInventoryIitemsView";
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";

export const POSStockDetailReportView=(props?:MenuComponentProps<StockDetailReportModel>)=>{

    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const[stockData,setStockData]= useState<StockDetailReportModel[]>([])
    useEffect(()=>{
        if(fullState?.IsFirstUseEffectCall){
          setFormBasicKeys<StockDetailReportModel>({
            uniqueKey:props?.UniqueId??"",
            baseProps:props??{},
            settings:{WillHideUserLog:true,wWillHideToolbar:true},
           
         })

        }
    },[fullState?.IsFirstUseEffectCall])



    
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
         

<TableContainer component={Paper}>
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
    </TableContainer>
          
        </>
    )
}