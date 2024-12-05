/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useImperativeHandle, useRef } from 'react'
import { Quantom_Grid, Quantom_Input } from './base_comps'
import {  Dialog, DialogContent,Grid, Paper } from '@mui/material'



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
      // handleValues();
      async function loadAllValues(){
        // if(!allValues || allValues?.length<1){
          // alert('not found data')
          let vals= await props?.FillDtaMethod?.();
          //let nVals= vals?.splice(0,limit)
          console.log('all values are',vals)
          setAllValues([...vals??[]]);
          if(!props?.selected && props?.selectedIndex!==undefined){
            let nVal= vals?.[props?.selectedIndex??0];
            props?.onChange?.(nVal);
          }
        // }
      }
      loadAllValues();
    },[])



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
        // alert('serarc is empty '+allValues?.length)
        //return(Promise.resolve([...nVals??[]]))
      }
      // let res=  allValues?.filter?.((x)=>{
      //   if(queryId!==METHOD_FILTER_ID)
      //   {
      //      return false;
      //   }
      //      x.Name?.toLowerCase().includes(search?.toLowerCase())
      // });

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


   React.useEffect(()=>{
      const rect= inputRef?.current?.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
   },[open])

  return (
    <>
     <Quantom_Input 
          value={props?.selected?.Name} 
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
          label={props?.label} fullWidth
        
      />



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
                       
                      style={{outline:focusedIndex===index?'2px solid blue':'none'}} 
                      key={item?.Code} ref={(el)=>{gridRowsRef.current[index]=el}}  
                      onClick={()=>{setFocusedIndex(index) ; }}
                      onDoubleClick={()=>{handleSelection(item) }
                } tabIndex={-1} >
                    <Quantom_Grid  container component={Paper} spacing={1} sx={{fontFamily:'roboto',fontSize:'13px',marginBottom:.5,paddingTop:'2px',paddingBottom:'2px'
                    }}>
                        <Quantom_Grid item lg={4}>{item.Code}</Quantom_Grid>
                        <Quantom_Grid item  lg={8}>{item.Name}</Quantom_Grid>
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
