/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { HideLoadingDialog, IconByName, MenuComponentProps, setFormBasicKeys, ShowLoadingDialog } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { GetStockReport, StockDetailReportModel } from "../impl/stockReportImpl";
import { full_component_state, get_current_user_locations, get_current_user_locations_with_out_selector, get_form_full_state_without_selector, useQuantomFonts } from "../../../../../redux/store";
import { useEffect, useState } from "react";
import { Paper, useTheme } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Quantom_LOV1 } from "../../../../../quantom_comps/Quantom_Lov";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { isNullOrEmpty } from "../../../../../CommonMethods";
import { getSetupDataWithSetupType } from "../../../config/item/views/Inventory_ItemsView";
import { SetupFromGetAll } from "../../../config/unit/impl/setupFormImp";
import { CommonCodeName } from "../../../../../database/db";
import { POSActionButton1 } from "../../../../../quantom_comps/AppContainer/POSHelpers/POSActionButton1";
import { FilterHandler } from "../../../../sale/processing/sale/view/POSSale/POSSaleViewWithEmpty";


export const POSStockDetailReportView=(props?:MenuComponentProps<StockDetailReportModel>)=>{

    const fullState= useSelector((state?:any)=>(full_component_state(state,props?.UniqueId??"")));
    const[allStockData,setAllStockData]= useState<StockDetailReportModel[]>([])
    const[stockData,setStockData]= useState<StockDetailReportModel[]>([])
    const[searchText,setSearchText]=useState('');

    const[cats,setCats]=useState<string[]>([]);
    const[filterCat,setFilterCat]=useState<CommonCodeName>()
    const[filterLoc,setFilterLoc]=useState<CommonCodeName>();
    
    const userLoc= useSelector((state?:any)=>{get_current_user_locations(state)});
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
      handleLoadStock();
    },[])

    useEffect(()=>{
          handleSearch();
    },[searchText,allStockData])

    useEffect(()=>{
      handleLoadCats();
    },[stockData])

    const handleSearch=()=>{
        let found:StockDetailReportModel[]=[];
        console.log('search method called')
        for(let st of allStockData){
          if(found.length>100){
            continue;
          }
           if(isNullOrEmpty(searchText)){
            found.push({...st})
           }
            if(st?.CatName?.toLocaleLowerCase()?.includes(searchText?.toLowerCase()) || st?.ItemName?.toLocaleLowerCase()?.includes(searchText?.toLowerCase())){
              found.push({...st});
            }
        }

        setStockData(found);
    }
    const handleLoadCats=()=>{
      console.log('all cats are',cats)
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

   const handleLoadStock=
    async()=>{
      try{
        ShowLoadingDialog();
          const cat= filterCat && filterCat.Code ?filterCat.Code:''
          const loc= filterLoc && filterLoc.Code ?filterLoc.Code:''
    
          let res =await GetStockReport(loc,cat,'','',true);
          setAllStockData([...res])
        HideLoadingDialog();
      }
      catch{
        HideLoadingDialog();
      }
      finally{
        HideLoadingDialog();
      }
     
    }
   

    
    return(
        <>
         
          <Quantom_Grid spacing={1} container size={{xs:12}}>
          
            <FilterHandler OkAndAplyFilter={()=>{handleLoadStock()}}>
                <Quantom_Grid item size={{md:4}}>
                    <Quantom_LOV1 selected={filterLoc} onChange={(sel)=>(setFilterLoc(sel))} label="Location" uniqueKeyNo={props?.UniqueId??""} 
                      FillDtaMethod={async()=>{
                        let locs = await get_current_user_locations_with_out_selector()??[];
                          var codeName= locs?.map((item,index)=>{
                              let obj:CommonCodeName={Code:item?.LocId,Name:item?.LocName}
                              return obj;
                          })

                          return Promise.resolve(codeName)

                      }
                    }
                    keyNo="STOCK_REPORT_LOCATION DATA"/>
                </Quantom_Grid>
                <Quantom_Grid item size={{md:4}}>
                <Quantom_LOV1 label="Category" selected={filterCat} onChange={(cat)=>{
                        setFilterCat({...cat})
                      }} uniqueKeyNo={props?.UniqueId??""} FillDtaMethod={()=>SetupFromGetAll('003-002','')} 
                    keyNo="STOCK_REPORT_CATEGORY_DATA"/>

                </Quantom_Grid>
                          
                        
                
            </FilterHandler>
          
                  <POSActionButton1 iconName="ScreenSearchDesktop" label="Search" onClick={handleLoadStock}/>
                  <POSActionButton1 iconName="LocalPrintshopOutlined" label="Print" onClick={async()=>{}}/>
                
          
        </Quantom_Grid>
        <Quantom_Grid container size={{xs:12}}>
           <Quantom_Input value={searchText} onChange={(e)=>{
              setSearchText(e?.target?.value);
           }}  label="Search" size='medium'/>
        </Quantom_Grid>
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
                             {/* <Quantom_Grid item size ={{xs:5,sm:4,md:3,lg:2,xl:2}}>
                              <div style={{display:'flex',alignItems:'center'}}>
                                <IconByName iconName="ClassOutlined" color={theme?.palette?.primary.main}/>
                                <div style={{marginLeft:'7px'}}>{item?.ItemCode}</div>
                              </div>
                            </Quantom_Grid> */}
                             <Quantom_Grid item size ={{xs:8,sm:8,md:6,lg:4,xl:3}}>
                              <div style={{display:'flex',alignItems:'center'}}>
                                <IconByName iconName="LocalMallOutlined" color={theme?.palette?.primary.main}/>
                                <div style={{marginLeft:'7px',fontWeight:'bold',fontSize:fonts.H4FontSize}}>{item?.ItemName}</div>
                              </div>
                             </Quantom_Grid>

                             <Quantom_Grid pr={2} display='flex' justifyContent='end' size={{xs:4,sm:4,lg:6,xl:7}}>
                               {/* <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'start',marginRight:'20px',marginTop:'2px'}}> */}
                                    {/* <IconByName iconName="Inventory2Outlined" color={theme.palette.primary.main}/> */}
                                   {item?.StockQty}
                               
                               
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