/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode } from 'react'
import { MenuComponentProps } from '../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
// import { QuantomReportModel } from '../Domains/Response/QuantomReportModel'
import { QuantomReportModelContainer } from '../Domains/QuantomReportModelContainer'
import { Quantom_Button, Quantom_Grid, Quantom_Input } from '../../quantom_comps/base_comps'
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FillReportFilterByReportName, GetQuantomReport, GetQuantomReportDBContext } from '../Infrastructure/QuantomReportImp'
import { HTTP_RESPONSE_TYPE } from '../../HTTP/QuantomHttpMethods'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Quantom_LOV } from '../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../database/db'
import { QuantomReportLine } from '../Domains/Response/HelperDomains/QuantomReportLine'
import { QuantomReportElement } from '../Domains/Response/HelperDomains/QuantomReportElement'
import { safeParseToNumber } from '../../CommonMethods'
import { QuantomReportMeta } from '../Domains/Response/HelperDomains/QuantomReportMeta'
import { useTheme } from '@mui/material/styles';
import { useHoverStyle, useQuantomFonts } from '../../redux/store'
import CancelIcon from '@mui/icons-material/Cancel';
import { QuantomReportModel } from '../Domains/Response/QuantomReportModel'
import { QuantomReportSingleFilter } from '../Domains/Query/QuantomReportSingleFilter'

export const QuantomReportView = (props?:MenuComponentProps<QuantomReportModelContainer>) => {


  React.useEffect(()=>{
    getReportContext();
  },[]);

  React.useEffect(()=>{
      props?.setState?.({...props?.state,Paging:{CurrentPage:1,RowsPerPage:DEFAULT_ROWS_PER_PAGE,TotalPages:Math.ceil((props?.state?.Response?.Lines?.length??0)/DEFAULT_ROWS_PER_PAGE)}})
  //  }
  },[props?.state?.Response])
  
  React.useEffect(()=>{
     if(!props?.state?.IsLoaded)
     {
       handleLoadData();
     }
  },[props?.state?.SelectedFormatId])

  const getReportContext=async()=>{
     let res= await GetQuantomReportDBContext({MenuCode:props?.MenuCode});
     console.log('report context data is',res)
     if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
        props?.setState?.({...props?.setState,DbContext:{...res?.Response}});
     }
     if(!props?.state?.SelectedFormatId){
        props?.setState?.({...props?.state,SelectedFormatId:res?.Response?.FormatContext?.[0]?.Format?.ID})  
     }
  }
  const handleLoadData=async()=>{
    
  
      let data= await LoadReportData();
       
      props?.setState?.({...props?.state,Response:{...data},Paging:{...props?.state?.Paging,RowsPerPage:-1},IsLoaded:true})

  }
  return (
    <Quantom_Grid container>
      <Quantom_Grid container spacing={1}>
          <Quantom_Grid item xs={4} lg={2} xl={2} md={2.5}>
              <QuantomReportViewFilterHeader {...props} />
          </Quantom_Grid>
          <Quantom_Grid item xs={8} lg={10} xl={10} md={9.5}>
              <RenderReportTable {...props} />
              <QuantomReportPagingView {...props}/>
          </Quantom_Grid>
       </Quantom_Grid>

       <QuantomReportViewFilterDialog {...props}/>
    </Quantom_Grid>
  )
}


export const QuantomReportViewFilterHeader=(props?:MenuComponentProps<QuantomReportModelContainer>)=>{

   const [reportFormats,setReportFormats]=React.useState<CommonCodeName[]>([])
   const [selected,setSelected]=React.useState<CommonCodeName>({});
   React.useEffect(()=>{
     handleFormats();
   },[props?.state?.DbContext])

   React.useEffect(()=>{
    const selected= reportFormats?.find(x=>x.Code===props?.state?.SelectedFormatId);
     setSelected(selected??{});
   },[props?.state?.SelectedFormatId])

   const handleFormats=async()=>{
     
     let formats= await convertToFormat();
      setReportFormats([...formats])
   }

   const  convertToFormat=async():Promise<CommonCodeName[]>=>{

    let formats=
          props?.state?.DbContext?.FormatContext
              ?.map((item,index)=>{
                        let obj:CommonCodeName={
                                    Code:item?.Format?.ID,
                                    Name:item?.Format?.FormatName
                        };
                        return obj ;
                    })??[];

        console.log('report formats are',formats);
        console.log('DB Contexts are',props?.state?.DbContext);

        return Promise.resolve(formats)

   }
    
    
    
  return(
    <Quantom_Grid container>
      <Quantom_Grid container  spacing={.5}>
        <Quantom_Grid item  xs={4}>
          <HeaderButton onClick={()=>{
            props?.setState?.({...props?.state,WillShowFilterModal:true})
          }}>
              <FilterAltIcon  fontSize='large' color='secondary'/>
          </HeaderButton>
        </Quantom_Grid>
        <Quantom_Grid item  xs={4}>
          <HeaderButton onClick={async()=>{
            //  alert('testing')
             let data= await LoadReportData(props)
             props?.setState?.({...props?.state,Response:data});
          }}>
            <FolderIcon  fontSize='medium' color='secondary' />
          </HeaderButton>
        </Quantom_Grid>
        <Quantom_Grid item  xs={4}>
          <HeaderButton>
              <LocalPrintshopIcon  fontSize='large' color='secondary'/>
          </HeaderButton>
        </Quantom_Grid>
      </Quantom_Grid>
      <Quantom_Grid container sx={{marginTop:'5px'}}>
        <Quantom_LOV selected={selected} label='All Formats' data={reportFormats} onChange={(item)=>{
           console.log('selected item is',item)
           props?.setState?.({...props?.state,DbContext:props?.state?.DbContext,SelectedFormatId:item?.Code})
        }}/>
      </Quantom_Grid>
      <Quantom_Grid container sx={{maxHeight:'700x',marginTop:'10px',fontSize:'12px',fontWeight:'bold'}} component={Paper} >
        Applied Filter Detail
      </Quantom_Grid>
    </Quantom_Grid>
  )
}

export interface HeaderButtonProps{
  onClick?:()=>void;
  children?:ReactNode;
}
const HeaderButton=(props?:HeaderButtonProps)=>{
  const theme= useTheme();
  return(
    <Box onClick={props?.onClick} component={Paper} sx={{":hover":{
       backgroundColor:theme?.palette?.primary?.main
    }}} style={{height:'35px',width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
        {
          props?.children
        }
    </Box>
  )
}



export const RenderReportTable=(props?:MenuComponentProps<QuantomReportModelContainer>)=>{

  const [selectedLines,setSelectedLines]=React.useState<QuantomReportLine[]>([]);
  React.useEffect(()=>{
    setRenderAbleRows();
  },[props?.state?.Paging?.CurrentPage,props?.state?.Paging?.RowsPerPage])

  const setRenderAbleRows=()=>{
      let totalLength= props?.state?.Response?.Lines?.length;
      if(totalLength===0){
        setSelectedLines([]);
        return;
      }
      let startIndex=0;
      let endIndex=props?.state?.Paging?.RowsPerPage??DEFAULT_ROWS_PER_PAGE;
      if(props?.state?.Paging?.CurrentPage){
          let preRecords= ((props?.state?.Paging?.CurrentPage??1)-1)*(props?.state?.Paging?.RowsPerPage??DEFAULT_ROWS_PER_PAGE);
          console.log('pres records are',preRecords)
          startIndex=preRecords;
          endIndex= startIndex+(props?.state?.Paging?.RowsPerPage??DEFAULT_ROWS_PER_PAGE)-1;
      };

      let data=[...props?.state?.Response?.Lines??[]];
      console.log('start index is',startIndex);
      console.log('end index is',endIndex)
      let selected= data.splice(startIndex,props?.state?.Paging?.RowsPerPage??0);
      console.log('selected data is',selected)
      setSelectedLines([...selected])
  }
  return(
    <Quantom_Grid container>
       {
        
          selectedLines?.map((item,index)=>{
          return(
            <RenderReportTableSingleLine reportContext={props} line={item}/>
          )
        })
       }
    </Quantom_Grid>
  )

}


export interface RenderReportTableSingleLineProps{
  reportContext?:MenuComponentProps<QuantomReportModelContainer>;
  line?:QuantomReportLine
}
export const RenderReportTableSingleLine=(props?:RenderReportTableSingleLineProps)=>{
   return(
       <Quantom_Grid  component={Paper} container sx={{marginTop:'3px',paddingTop:'4px',paddingBottom:'4px'}}>
          {
            props?.line?.Elements?.map((item,index)=>{
              return(
                <RenderReportSingleLineElement reportContext={props?.reportContext} element={item} />
              )
            })
          }
          
       </Quantom_Grid>
   )
}


export interface RenderReportSingleLineElementProps{
  reportContext?:MenuComponentProps<QuantomReportModelContainer>;
  element?:QuantomReportElement
}
export const RenderReportSingleLineElement=(props?:RenderReportSingleLineElementProps)=>{

   const[elementMeta,setElementMeta]=React.useState<QuantomReportMeta>();
   React.useEffect(()=>{
    const elProps= props?.reportContext?.state?.Response?.Meta?.find(x=>x.FieldName===props?.element?.FieldName);
     setElementMeta(elProps)
   },[])
  
   const  getValue=()=>{
     return props?.element?.FieldValue;
   }
  return(
      <Quantom_Grid item sx={{width:elementMeta?.Width,marginLeft:'17px',fontFamily:'roboto',fontSize:'13px',fontWeight:'400'}}>
           {getValue()}
      </Quantom_Grid>
  )
}


export const QuantomReportPagingView=(props?:MenuComponentProps<QuantomReportModelContainer>)=>{

  // React.useEffect(()=>{

  // },[props?.state?.Paging?.CurrentPage ,props?.state?.Paging?.RowsPerPage])
  
  return(
    <Quantom_Grid container spacing={1}>
         <Quantom_Grid item>
            <Quantom_Input  label='CURRENT' value={props?.state?.Paging?.CurrentPage} onChange={(e)=>{
                props?.setState?.({...props?.state,Paging:{...props?.state?.Paging,CurrentPage:safeParseToNumber(e.target.value)}})
            }}></Quantom_Input>
        </Quantom_Grid>
        <Quantom_Grid item>
            <Quantom_Input label='TOTAL' disabled value={props?.state?.Paging?.TotalPages}></Quantom_Input>
        </Quantom_Grid>
        <Quantom_Grid item>
            <Quantom_Input label='ITEMS PER PAGE' value={props?.state?.Paging?.RowsPerPage} onChange={(e)=>{
                  let total= Math.ceil((props?.state?.Response?.Lines?.length??0)/safeParseToNumber(e.target.value))
                props?.setState?.({...props?.state,Paging:{...props?.state?.Paging,RowsPerPage:safeParseToNumber(e.target.value),TotalPages:total}})
            }}></Quantom_Input>
        </Quantom_Grid>

    </Quantom_Grid>
  )
}

export  const DEFAULT_ROWS_PER_PAGE=30



export const QuantomReportViewFilterDialog=(props?:MenuComponentProps<QuantomReportModelContainer>)=>{
  const[selectedFilterName,setSelectedFilterName]=React.useState<string>();
  const[reportFilters,setReportFilters]=React.useState<CommonCodeName[]>([]);
  // const[appliedFilters,setAppliedFilters ]=React.useState<CommonCodeName[]>([]);



  const fontInfo= useQuantomFonts();
  const theme= useTheme();
  const hoverStyle= useHoverStyle(theme);

  const handleReportFilter=async(filterName?:string)=>{
      console.log('inside handle report filter method',filterName)
      let httpContext= await FillReportFilterByReportName({FilterName:filterName});
      let data= httpContext?.Response;
      setReportFilters([...data?.Filters??[]])
  }


  return(
    
    <Dialog fullWidth open={props?.state?.WillShowFilterModal??false}>
       <DialogTitle>
           <Quantom_Grid container display={'flex'} spacing={.5} justifyContent={'center'} alignItems={'center'}>
               <Quantom_Grid item flex={1} display={'flex'}>
                    <Quantom_Grid sx={{fontFamily:fontInfo?.HeaderFont,fontWeight:'bold'}}>
                      Filters Detail
                    </Quantom_Grid>
                    <Quantom_Grid sx={{fontFamily:fontInfo?.HeaderFont,fontWeight:'bold',marginLeft:'20px'}}>
                       <Quantom_Button text='Apply Filter And Load Data' baseProps={{sx:{fontFamily:fontInfo.HeaderFont,fontSize:fontInfo.RegularFont}}} ></Quantom_Button>
                    </Quantom_Grid>
               </Quantom_Grid>
               <Quantom_Grid item>
                    <IconButton onClick={()=>{
                       props?.setState?.({...props?.state,WillShowFilterModal:false});
                    }}>
                        <CancelIcon  fontSize='large'/>
                    </IconButton>
               </Quantom_Grid>
           </Quantom_Grid>
       </DialogTitle>
       <DialogContent>
         <Quantom_Grid container>
          <Quantom_Grid item xs={3}>
            <Quantom_Grid container sx={{fontFamily:fontInfo?.HeaderFont,fontSize:fontInfo?.H3FontSize,fontWeight:'bold'}} component={Paper}>
            {
                props?.state?.Response?.ReportFilters?.Filters?.map((item,index)=>{
                  return(
                    <Box  onClick={()=>{
                       console.log('selected filter inside method is ',item?.FilterName)
                       setSelectedFilterName(item?.FilterName);
                       handleReportFilter(item?.FilterName);
                    }} sx={{borderBottom:'.5px solid black',width:'100%',":hover":hoverStyle}}>{item?.FilterCaption}</Box>
                  )
                })
              }
            </Quantom_Grid>
          </Quantom_Grid>
         
         <Quantom_Grid item xs={9}>
            <Quantom_Grid container>
               <Quantom_Grid item xs={6}>
                  {
                    reportFilters?.map((item,index)=>{
                   
                       return(
                         <Quantom_Grid style={{marginBottom:'5px',paddingTop:'4px',paddingBottom:'4px',fontFamily:fontInfo?.RegularFont,fontSize:fontInfo.RegularFont,fontWeight:500}} component={Paper} container>
                            {item?.Name}
                         </Quantom_Grid>
                       )
                    })
                  }
               </Quantom_Grid>
               <Quantom_Grid item xs={6}></Quantom_Grid>
            </Quantom_Grid>
         </Quantom_Grid>
         </Quantom_Grid>
       </DialogContent>
    </Dialog>
  )
}


export const LoadReportData=async(props?:MenuComponentProps<QuantomReportModelContainer>):Promise<QuantomReportModel>=>{

  if(!props?.state?.SelectedFormatId){
    props?.setState?.({...props?.state,Response:{}});
    return {};
   }
  const data= await GetQuantomReport({FormateCode:props?.state?.SelectedFormatId});
  //console.log('response data of report is ',data)
  return data;
  
}