/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Quantom_Grid, Quantom_Input, Quantom_Input1 } from './base_comps'
import {  Box, Dialog, DialogContent,DialogTitle,Grid, Paper, useTheme } from '@mui/material'
import { IconByName } from './AppContainer/Helpers/TabHelper/AppContainerTabHelper';
import { ListCompButton } from '../quantom_ui/account/report/Ledger/view/LedgerView';
import store, { full_component_state, get_helperData_by_key, useQuantomFonts } from '../redux/store';
import { BorderBottom, LocationDisabled } from '@mui/icons-material';
import { add_helper_data_single_key } from '../redux/reduxSlice';
import { useSelector } from 'react-redux';
import { isNullOrEmpty } from '../CommonMethods';
import { useIsMobile } from '../quantom_ui/sale/processing/sale/view/POSSale/POSSaleViewWithEmpty';
import { POSActionButton1 } from './AppContainer/POSHelpers/POSActionButton1';
import { QuantomDialog } from '../quantom_ui/sale/processing/sale/view/POSSaleView';



export interface CommonCodeName{
   Code?:string;
   Name?:string;
}

export interface Quantom_LOV_PROPS{
  getData?:(search?:string)=>Promise<CommonCodeName[]>
  label?:string;
  data?:CommonCodeName[];
  selected?:CommonCodeName;
  onChange?:(obj?:CommonCodeName)=>void;
  FillDtaMethod?:()=>Promise<CommonCodeName[]>
  selectedIndex?:number;
  ref?: React.Ref<any>;
  RefreshFillDtaMethod?:number;
}

export const Quantom_LOV = (props?:Quantom_LOV_PROPS) => {
  
    // const methodFilterId= React.useRef<number>(1)

    const [search,setSearch]=React.useState('')
    const [open,setOpen]=React.useState(false);
    const [values,setValues]=React.useState<CommonCodeName[]>([])
    const [allValues,setAllValues]=React.useState<CommonCodeName[]>([])

    const [focusedIndex,setFocusedIndex]=React.useState(-1)
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const searchRef= useRef<HTMLInputElement>(null);
    const gridRowsRef= useRef<any[]>([]);

    const inputRef = useRef<any>(null);

    useImperativeHandle(props?.ref, () => inputRef.current);

    React.useEffect(()=>{
      loadAllValues();
    },[])

    React.useEffect(()=>{
      //  alert('fill refresh method value is'+ props?.RefreshFillDtaMethod)
        if(props?.RefreshFillDtaMethod && (props?.RefreshFillDtaMethod??0)>0){
           loadAllValues();
        }
    },[props?.RefreshFillDtaMethod])


    async function loadAllValues(){
      let vals= await props?.FillDtaMethod?.();
      console.warn('all values are',vals)
      setAllValues([...vals??[]]);
      if(!props?.selected && props?.selectedIndex!==undefined){
        let nVal= vals?.[props?.selectedIndex??0];
        props?.onChange?.(nVal);
      }
    // }
  }


    React.useEffect(()=>{
      if(open){
        setTimeout(() => {
          console.log('input detail of data',searchRef?.current)
          searchRef?.current?.focus();
        }, (100));
        setFocusedIndex(-1)
      }
    },[open])

    React.useEffect(()=>{
      if(search && !open){
        setOpen(true);
      }
      handleValues();
    },[search])

    let METHOD_FILTER_ID=0;
    const handleValues=async()=>{
     
       METHOD_FILTER_ID= METHOD_FILTER_ID+1;
       let nId= METHOD_FILTER_ID;
       let res= await FilterData(100,nId);
      //  console.log('all daa is',props?.data)
      //  console.log('filtered data is',res)
      //  setValues([...res])
    }

    const FilterData=async(limit:number,queryId?:number)=>{
     
      let tValus=[...allValues];
      if(search==='')
      {
        let nVals= tValus?.splice(0,limit);
        setValues([...nVals])
      }
      let res:any[]= [];
      let upperSearch= search?.toUpperCase();
      for(let i=0;i<(tValus?.length??0);i++){
         if(queryId!== METHOD_FILTER_ID){
            console.log('out with id is changed')
            return;
            //return Promise.resolve([]);
         }
         if(res.length>=limit){
           console.log("out with break limit is exceed")
          break;
         }
         let isOk= tValus[i]?.Code?.toUpperCase()?.includes(upperSearch) || allValues[i]?.Name?.toUpperCase()?.includes(upperSearch);
         if(isOk){
          res?.push({...tValus[i]})
         }
      }

        setValues([...res])
      //return Promise.resolve([...res??[]]);
    }

    const handleKeyEvent = (event:React.KeyboardEvent<HTMLDivElement>,selected?:CommonCodeName) => {
      if (event.key === 'ArrowDown') {
       handleGridFocusedIndex('down')
      } else if (event.key === 'ArrowUp') {
        handleGridFocusedIndex('up')
      }
      else if (event.key==='Enter'){
        handleSelection(selected)
      }
    };

    const handleGridFocusedIndex=(type:'up'|'down',index?:number )=>{
      if(index!==undefined){
        setFocusedIndex(index);
        gridRowsRef?.current?.[focusedIndex]?.focus();
        return;
      }
      if(type==='up'){
        gridRowsRef?.current?.[focusedIndex-1]?.focus();
        setFocusedIndex(focusedIndex-1)
      }
      if(type==='down'){
        gridRowsRef?.current?.[focusedIndex+1]?.focus();
        setFocusedIndex(focusedIndex+1)
      }
    }
   const  handleSelection=(item?:CommonCodeName)=>{
         props?.onChange?.(item);
         setOpen(false);
   }

   const theme= useTheme();
   const fonts= useQuantomFonts();

   React.useEffect(()=>{
      const rect= inputRef?.current?.getBoundingClientRect();
      setPosition({ top: rect?.bottom, left: rect?.left });
   },[open])

  return (
    <>
    <Box display='flex'>
     <Quantom_Input1 
          value={props?.selected?.Name} 
          fullWidth
          inputRef={inputRef}
          onChange={(e)=>{
              // const sText=e?.target?.value;
              var oldText= props?.selected?.Name;
              let result=  e?.target?.value?.substring(oldText?.length??0);
              // console.log('result is',result);
              // let text= sText?.[(sText?.length??0)-1];
              setSearch(result)
            //setSearch(e.target.value)
          }} 
          label={props?.label} 
          rightIcons={[
            {IconName:'NoteAddTwoTone',OnClick:()=>{alert('add button pressed')}},
            {IconName:'RestorePageTwoTone',OnClick:()=>{alert('refresh button pressed')}},
            {IconName:'DriveFileMoveTwoTone',OnClick:()=>{alert('drive button pressed')}}
          ]}
        
      />
         {/* <ListCompButton iconName='NoteAddTwoTone'/>
         <ListCompButton iconName='RestorePageTwoTone'/>
         <ListCompButton iconName='DriveFileMoveTwoTone'/> */}

     
     </Box>



      <Dialog 
        fullWidth
        open={open}
        PaperProps={{
          style: {
            position: "absolute",
            top: position.top,
            left: position.left,
            margin: 0,
          },
        }}
        >
          <DialogContent>
         
          <Quantom_Input 
             label='Search' 
             inputRef={searchRef} 
             value={search} 
             willHandleTabOnEnter={true}
             onChange={(event)=>{
               
               setSearch(event?.target?.value)
              }
            }
             onKeyDown={(e)=>{
                if(e.key==='ArrowDown'){
                  handleGridFocusedIndex('down',0);
                }
                if(e.key==='Enter'){
                  let item:CommonCodeName={};
                  if(values && values.length>0)
                  {
                    item=values?.[0];
                    handleSelection(item)
                  }
                }
                if(e.key==='Escape'){
                   setOpen(false)
                }             
             }} />
            {  values?.map((item,index)=>{
              return(
                <div 
                      onKeyDown={(e)=>{
                        handleKeyEvent(e,item)
                      }}
                       
                      style={{outline:focusedIndex===index?`2px solid ${theme.palette.primary.main}`:'none'}} 
                      key={item?.Code} ref={(el)=>{gridRowsRef.current[index]=el}}  
                      onClick={()=>{setFocusedIndex(index) ;handleSelection(item) }}
                      onDoubleClick={()=>{handleSelection(item) }
                } tabIndex={-1} >
                    <Quantom_Grid  container component={Paper} spacing={1} 
                      sx={{fontFamily:fonts.HeaderFont,fontSize:'14px',marginBottom:'2px',paddingTop:'4px',paddingBottom:'4px',borderBottom:`1px solid ${theme.palette.primary.main}`
                    }}>
                        <Quantom_Grid item sx={{fontWeight:'bold',width:'70px'}}  siz={{md:3}}>{item.Code}</Quantom_Grid>
                        <Quantom_Grid item  siz={{md:9}}>{item.Name}</Quantom_Grid>
                    </Quantom_Grid>
                </div>
              )
            })
              
            }
          </DialogContent>

      </Dialog>
    </>
  )

  
}





export interface Quantom_LOV_V1Props {
  uniqueKeyNo:string;
  keyNo?:string;
  label?:string;
  selected?:CommonCodeName;
  onChange?:(obj?:CommonCodeName)=>void;
  FillDtaMethod?:()=>Promise<CommonCodeName[]>
  selectedIndex?:number;
  ref?: React.Ref<any>;
  id?:string  ;
  willHideLabel?:boolean;
  size?:'medium'|'small'
  refreshMethod?:string;

  mobileSelectionButtonWidth?:string;
  mobileSelectionButtonIcon?:string;
}
export const Quantom_LOV1 = (props?:Quantom_LOV_V1Props) => {
  
  // const methodFilterId= React.useRef<number>(1)

  const [search,setSearch]=React.useState('')
  const [open,setOpen]=React.useState(false);
  const [values,setValues]=React.useState<CommonCodeName[]>([])
  // const [allValues,setAllValues]=React.useState<CommonCodeName[]>([])
  const allValues= useSelector((state?:any)=>(get_helperData_by_key(state,props?.uniqueKeyNo??"",props?.keyNo??"")))??[] as CommonCodeName[];
  const [focusedIndex,setFocusedIndex]=React.useState(-1)
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const searchRef= useRef<HTMLInputElement>(null);
  const gridRowsRef= useRef<any[]>([]);

  const inputRef = useRef<any>(null);

  const fullState= useSelector((state?:any)=>(full_component_state(state,props?.uniqueKeyNo??"")));
  useImperativeHandle(props?.ref, () => inputRef.current);

  const isMobile= useIsMobile();

  useEffect(()=>{
     if(props?.refreshMethod){
        handleLoadInitialData();
     }
  },[props?.refreshMethod])

  React.useEffect(()=>{
         loadAllValues();
  },[props?.FillDtaMethod,allValues])

  React.useEffect(()=>{
    if(fullState?.IsFirstUseEffectCall)
    {
      handleLoadInitialData();
    }
  },[fullState?.IsFirstUseEffectCall])

  useEffect(()=>{
       if(isMobile && (!allValues || allValues?.length<1) && !fullState?.IsFirstUseEffectCall){
        handleLoadInitialData();
       }
  },[isMobile && fullState?.IsFirstUseEffectCall])

  const handleLoadInitialData=async()=>{
    // alert('method called')
     console.log('refresh method called');
    let vals= await props?.FillDtaMethod?.();
    console.log('refreshed data is',values);
    
    // console.warn('all values are',vals)
    // alert('unique key no is'+props?.uniqueKeyNo+"KeyNo is"+props?.keyNo)
    store.dispatch((add_helper_data_single_key({UniqueId:props?.uniqueKeyNo,data:{keyNo:props?.keyNo,Data:vals}})))
  }

  async function loadAllValues(){
    // alert('load all values are called')
    
    let vals= [...allValues]

    if(vals && vals.length>0){
         setValues( await JSON.parse(JSON.stringify(vals)))
    
    // setAllValues([...vals??[]]);
    if(!props?.selected && props?.selectedIndex!==undefined){
      let nVal= vals?.[props?.selectedIndex??0];
      props?.onChange?.(nVal);
    }
  }
}


  React.useEffect(()=>{
    if(open){
      setTimeout(() => {
        console.log('input detail of data',searchRef?.current)
        searchRef?.current?.focus();
      }, (100));
      setFocusedIndex(-1)
    }
  },[open])

  React.useEffect(()=>{
    if(search && !open){
      setOpen(true);
    }
    handleValues();
  },[search])

  let METHOD_FILTER_ID=0;
  const handleValues=async()=>{
   
     METHOD_FILTER_ID= METHOD_FILTER_ID+1;
     let nId= METHOD_FILTER_ID;
     let res= await FilterData(100,nId);
    //  console.log('all daa is',props?.data)
    //  console.log('filtered data is',res)
    //  setValues([...res])
  }

  const FilterData=async(limit:number,queryId?:number)=>{
   
    let tValus=[...allValues];
    console.log('total values are ',tValus)
    if(isNullOrEmpty(search))
    {
      let nVals= tValus?.splice(0,limit);
      setValues([...nVals])
      return;
    }
    let res:any[]= [];
    let upperSearch= search?.toUpperCase();
    var searchArray = upperSearch.split(/(\s+)/);
    for(let i=0;i<(tValus?.length??0);i++){
       if(queryId!== METHOD_FILTER_ID){
          console.log('out with id is changed')
          return;
          //return Promise.resolve([]);
       }
       if(res.length>=limit){
         console.log("out with break limit is exceed")
        break;
       }
       let isOk=true;
      //  let loopOkRes=false;
       for(let s of searchArray){
          if(!isOk){
            break;
          }
          isOk = tValus[i]?.Code?.toUpperCase()?.includes(s) || allValues[i]?.Name?.toUpperCase()?.includes(s);

       }
       //let isOk= tValus[i]?.Code?.toUpperCase()?.includes(upperSearch) || allValues[i]?.Name?.toUpperCase()?.includes(upperSearch);
       if(isOk){
        res?.push({...tValus[i]})
       }
    }

      setValues([...res])
    //return Promise.resolve([...res??[]]);
  }

  const handleKeyEvent = (event:React.KeyboardEvent<HTMLDivElement>,selected?:CommonCodeName) => {
    if (event.key === 'ArrowDown') {
     handleGridFocusedIndex('down')
    } else if (event.key === 'ArrowUp') {
      handleGridFocusedIndex('up')
    }
    else if (event.key==='Enter'){
      handleSelection(selected)
    }
  };

  const handleGridFocusedIndex=(type:'up'|'down',index?:number )=>{
    if(index!==undefined){
      setFocusedIndex(index);
      gridRowsRef?.current?.[focusedIndex]?.focus();
      return;
    }
    if(type==='up'){
      gridRowsRef?.current?.[focusedIndex-1]?.focus();
      setFocusedIndex(focusedIndex-1)
    }
    if(type==='down'){
      gridRowsRef?.current?.[focusedIndex+1]?.focus();
      setFocusedIndex(focusedIndex+1)
    }
  }
 const  handleSelection=(item?:CommonCodeName)=>{
       props?.onChange?.(item);
       setOpen(false);
 }

 const theme= useTheme();
 const fonts= useQuantomFonts();

 React.useEffect(()=>{
    const rect= inputRef?.current?.getBoundingClientRect();
    setPosition({ top: rect?.bottom, left: rect?.left });
 },[open])

return (
    !isMobile?(
      <>
      <Box display='flex'>
       <Quantom_Input1 
            size={props?.size}
            value={props?.selected?.Name} 
            fullWidth
            willHideLabel={props?.willHideLabel}
            id={props?.id??""}
            inputRef={inputRef}
            onChange={(e)=>{
                var oldText= props?.selected?.Name;
                let result=  e?.target?.value?.substring(oldText?.length??0);
                setSearch(result)
            }} 
            label={props?.label} 
            rightIcons={[
              {IconName:'NoteAddTwoTone',OnClick:()=>{alert('add button pressed')}},
              {IconName:'RestorePageTwoTone',OnClick:()=>{handleLoadInitialData()}},
              {IconName:'DriveFileMoveTwoTone',OnClick:()=>{alert('drive button pressed')}}
            ]}
          
        />   
       </Box>
    
        <Dialog 
          fullWidth
          open={open}
          PaperProps={{
            style: {
              position: "absolute",
              top: position?.top,
              left: position?.left,
              margin: 0,
            },
          }}
          >
            <DialogTitle sx={{padding:0,display:'flex'}}>
              <div style={{width:'100%'}}>
              <Quantom_Grid pb={.5} container mt={1} mb={1} display='flex' borderBottom={`3px solid ${theme?.palette?.text?.disabled}`} size={{xs:12}}>
                 
                 <Quantom_Grid pl={2.5} size={{xs:12}} flex={1} mr={2}>
                    <Quantom_Input 
                        label='Search' 
                        inputRef={searchRef} 
                        value={search} 
                        willHandleTabOnEnter={true}
                        onChange={(event)=>{
                          
                          setSearch(event?.target?.value)
                          }
                        }
                        onKeyDown={(e)=>{
                            if(e.key==='ArrowDown'){
                              handleGridFocusedIndex('down',0);
                            }
                            if(e.key==='Enter'){
                              let item:CommonCodeName={};
                              if(values && values.length>0)
                              {
                                item=values?.[0];
                                handleSelection(item)
                              }
                            }
                            if(e.key==='Escape'){
                              setOpen(false)
                            }             
                        }} />
                 </Quantom_Grid>
                 <Quantom_Grid>
                    <div style={{flex:0,paddingRight:'25px'}} onClick={()=>{
                          setOpen(false)
                    }}>
                        <IconByName color={theme.palette.error.main} iconName='CancelPresentation' ></IconByName>
                    </div>
                 </Quantom_Grid>
              </Quantom_Grid>
          </div>
            </DialogTitle>
            <DialogContent>
           
            
            
              {  values?.map((item,index)=>{
                return(
                  <div 
                        onKeyDown={(e)=>{
                          handleKeyEvent(e,item)
                        }}
                        
                        style={{outline:focusedIndex===index?`2px solid ${theme.palette.primary.main}`:'none',}} 
                        key={item?.Code} ref={(el)=>{gridRowsRef.current[index]=el}}  
                        onClick={()=>{ setFocusedIndex(index);handleSelection(item) }}
                        onDoubleClick={()=>{handleSelection(item) }
                  } tabIndex={-1} >
                      <Quantom_Grid pl={1} pr={1} pb={.5} pt={.5} mb={1} mt={.5}  component={Paper}  container  spacing={1} 
                        sx={{fontFamily:fonts.HeaderFont,fontSize:fonts?.H4FontSize,borderBottom:`2px solid ${theme?.palette?.text?.disabled}`,
                            backgroundColor:theme?.palette?.background?.default,
                      }}>
                        <Quantom_Grid size={{xs:12}} sx={{color:theme?.palette?.text?.disabled,display:'flex',alignItems:'center',
                          borderBottom:`1px dotted ${theme?.palette?.text?.disabled}`
                          }}>
                          <IconByName iconName='Tag'fontSize='16px'/>
                          {item?.Code}
                        </Quantom_Grid>

                        <Quantom_Grid size={{xs:12}} sx={{color:theme?.palette?.text?.primary,display:'flex',alignItems:'center'}}>
                          <IconByName iconName='ArticleOutlined'fontSize='16px'/>
                          {item?.Name}
                        </Quantom_Grid>
                          {/* <Quantom_Grid item sx={{width:'120px'}}  siz={{md:3}}>{item.Code}</Quantom_Grid>
                          <Quantom_Grid item  siz={{md:9}}>{item.Name}</Quantom_Grid> */}
                      </Quantom_Grid>
                  </div>
                )
              })
                
              }
            </DialogContent>
    
        </Dialog>
      </>
    ):(
    <Quantom_Grid container mt={1} mb={1}>
       <QuantomLovMobileV1 
          width={props?.mobileSelectionButtonWidth} 
          IconName={props?.mobileSelectionButtonIcon}
          label={props?.label} selectedValue={props?.selected} onChange={(selected)=>{props?.onChange?.({...selected})}} 
        RenderAbleValues={values} search={search} onSearchChange={(s)=>{setSearch(s??"")}}/>
    </Quantom_Grid>)
  
 
)


}

















export interface QuantomLovMobileProps{
  selectedValue?:CommonCodeName;
  onChange?:(selected?:CommonCodeName)=>void
  RenderAbleValues?:CommonCodeName[];
  search?:string;
  onSearchChange?:(text?:string)=>void;
  label?:string;
  width?:string ;
  IconName?:string;

}
export const QuantomLovMobileV1=(props?:QuantomLovMobileProps)=>{
 const theme= useTheme();
 const fonts = useQuantomFonts();
 const[open,setOpen]=useState(false);
//  const [custDetail,setCustDetail]=useState<CommonCodeName[]>()
//  const[search,setSearch]=useState('')
//  useEffect(()=>{
//        handleSetSelectedCustomer();
//  },[props?.selectedCustomer?.Code])

//  const handleSetSelectedCustomer=async()=>{
//      let res= await CustomerGetOneMethod(props?.selectedCustomer?.Code??"")
//      setCustDetail(res?.Response?.customer)
//  }
  
 return(
     <Quantom_Grid pl={1} sx={{backgroundColor:theme?.palette?.primary?.main,paddingTop:'8px',paddingBottom:'8px',color:theme?.palette?.primary?.contrastText}} display='flex' container component={Paper} size={{xs:12}} >
         <Quantom_Grid size={{xs:12,sm:12,md:12,lg:9}}>
             <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:1,justifyContent:'center'}}>
                 <div style={{display:'flex',flexDirection:'row'}}>
                      {/* <div>
                         <POSActionButton1 onClick={async()=>{
                             try{
                                 ShowLoadingDialog();
                                 let res= await GetAllCustomers();
                                 for(let cust of res){
                                     LocalDbInsertCustomer(cust)
                                 }
                                 HideLoadingDialog();
                                 console.log('get all customers',res)
                             }
                             catch{
                                 HideLoadingDialog();
                             }
                                 //setCustComers([...res])
                             }
                         } textColor={theme?.palette?.secondary?.contrastText} backgroundColor={theme?.palette?.secondary?.main} label="Refresh" iconName="OnDeviceTraining" iconColor={theme?.palette?.primary?.main}/>
                     </div> */}
                     <div >
                         <POSActionButton1 
                             onClick={()=>{setOpen(true)}}
                             textColor={theme?.palette?.secondary?.contrastText} 
                             backgroundColor={theme?.palette?.secondary?.main} 
                             label={`Select ${props?.label}`} 
                             iconName={props?.IconName??"AccountBoxOutlined" } 
                             width={props?.width??'250px'} 
                             iconColor={theme?.palette?.primary?.main}/>
                     </div>
                 </div>
                 <div style={{display:'flex',justifyContent:'center',textAlign:'center' ,fontFamily:fonts?.HeaderFont,fontSize:fonts.H4FontSize}}>
                     {props?.selectedValue?.Name}
                 </div>
             </div>
         </Quantom_Grid>
         {/* <Quantom_Grid size={{xs:12,sm:12,md:12,lg:3}} style={{alignItems:'center',
             display:'flex',fontWeight:700,fontFamily:fonts.HeaderFont,fontSize:'30px',justifyContent:'center',}}>
             <IconByName iconName="CurrencyBitcoinSharp" color={theme?.palette?.secondary?.main} fontSize="35px"></IconByName>
              {custDetail?.Balance??0}
         </Quantom_Grid> */}
         
         <QuantomDialog headerExtension={<>
            <Quantom_Input label='Search' value={props?.search} onChange={(e)=>{props?.onSearchChange?.(e.target.value)}}/>
          </>} open={open}  onClosePress={()=>{setOpen(false)}} heading={props?.label??""}>
             <CustomerListComp iconName={props?.IconName} search={props?.search} renderAbleValue={props?.RenderAbleValues} onSelect={(cust)=>{
                 props?.onChange?.({Code:cust?.Code,Name:cust?.Name})
                 setOpen(false);
             }}/>
         </QuantomDialog>

         {/* Selected Customer */}
      </Quantom_Grid>
 )
}

export interface CustomerListCompPorps{
  onSelect?:(selected?:CommonCodeName)=>void
  search?:string;
  renderAbleValue?:CommonCodeName[]
  iconName?:string;
}
export const  CustomerListComp=(props?:CustomerListCompPorps)=>{
//  const [val,setCustComers]=useState<CustomerModel[]>([]);
 

//  useEffect(()=>{
//      handleCustomers();
//  },[props?.search])

 
//  const handleCustomers=async()=>{
//      let res= await LocalDbFilterCustomers(props?.search);
//   //    alert('called ')
//      console.log('get all customers',res)
//      setCustComers([...res])
//  }
 const theme= useTheme();
 const fonts= useQuantomFonts();
 return(

     <Quantom_Grid size={{xs:12}} container spacing={.5} component={Paper}>
         
         {/* <Quantom_Grid item> Item Code</Quantom_Grid> */}
         {
             props?.renderAbleValue?.map((item,index)=>{
                
                 return index>200?(<></>):(
                  
                     <Quantom_Grid 
                        onClick={()=>{
                          props?.onSelect?.(item)
                        }}
                         sx={{borderBottom:`1px solid ${theme?.palette?.primary?.main}`,fontFamily:fonts.HeaderFont,fontSize:fonts.H4FontSize,padding:'4px'}} 
                         size={{xs:12,sm:12,md:12,lg:12,xl:12}} component={Paper}>
                         <div style={{display:'flex',alignItems:'center'}}>
                             <IconByName color={theme?.palette?.primary?.main} fontSize="30px" iconName={props?.iconName??"PermIdentityOutlined"}/>
                             <div style={{marginLeft:'5px'}}>
                                 <div style={{fontWeight:'bold',display:'flex'}}>
                                     <div style={{alignItems:'center',flex:1}}>
                                         <IconByName fontSize="15px" iconName="Tag"/>
                                         {item?.Code}
                                     </div>
                                 </div>
                                 <div>{item?.Name}</div>
                                 {/* {item?.CellNo?
                                 (<>
                                     <div style={{alignItems:'center',flex:1}}>
                                         <IconByName fontSize="15px" iconName="PhoneAndroidOutlined"/>
                                         {item?.CellNo}
                                     </div>
                                 </>):(<></>)} */}
                                 
                                 {/* <div>{item?}</div> */}
                             </div>
                         </div>
                         {/* <div style={{display:'flex'}}>
                            <div style={{flex:1}}></div>
                            <div style={{flex:1}}>
                                <button style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold',color:theme?.palette?.text?.secondary,backgroundColor:theme?.palette?.secondary?.main,fontFamily:fonts.HeaderFont,width:'100%',border:`.5px solid ${theme?.palette?.primary?.main}`,borderRadius:'5px'}}>
                                    <div style={{marginRight:'10px'}}>
                                         <IconByName iconName="FactCheckOutlined"/>
                                    </div>
                                    Select
                                </button>
                            </div>
                         </div> */}
                     </Quantom_Grid>
                 )
             })
         }
     </Quantom_Grid>
 )
}