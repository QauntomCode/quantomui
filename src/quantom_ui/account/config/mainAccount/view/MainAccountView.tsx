/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { MainAccountModel } from '../model/MainAccountModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { GetAllMainAccounts } from '../impl/MainAccountImpl';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry,ClientSideRowModelModule } from 'ag-grid-community'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps';
import { Paper } from '@mui/material';
import ViewButtonIcon from '@mui/icons-material/VisibilityTwoTone';
import dayjs from 'dayjs';

export const MainAccountView = (props?:MenuComponentProps<MainAccountModel>) => {
    const[accounts,setAccounts]=React.useState<MainAccountModel[]>([])
    React.useEffect(()=>{
         handleGetAllMAccounts();
    },[]);
    const handleGetAllMAccounts= async()=>{
        let mainAcc= await GetAllMainAccounts();
        setAccounts(mainAcc)
    }

    const defaultColDef: ColDef = {
        flex: 1,
    };

  return (
      
    <>
      <QUANTOM_Table height='400px' columns={[{field:"Code",width:350},{field:'Name'}]} data={accounts}/>
    </>
  )
}


export interface QuantomGridProps<T>{
   data?:T[];
   columns?:QuantomGridColumns[];
   valueFormatter?: (params:any)=>void;
   height?:string;
   onViewButtonClick?:(lineData?:any)=>void;
}

export interface QuantomGridColumns{
    field?:string;
    caption?:string;
    width?:number;
    header?:string;
    dataType?:'string'|'date'|'number'
    valueFormatter?: (params:any)=>any;
}

export const  QUANTOM_Table=<T,>(props?:QuantomGridProps<T>)=>
{
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const [colDefs,setColDefs]=React.useState<ColDef<T>[]>([])
    React.useEffect(()=>{
        handleColumns()  ;
    },[]);

    const handleColumns=()=>{
        let cols=
        props?.columns?.map((item,index)=>{
           let obj:any= 
                    { 
                        field:item?.field,
                        maxWidth:item?.width,
                        cellStyle:{fontSize:'11px',fontFamily:'roboto'},
                        headerName:item?.header,
                        
                    };

            if(item?.valueFormatter){
                obj.valueFormatter=item?.valueFormatter
            }
           if(item?.dataType==='date'){
               obj.valueFormatter= (params:any) => {
                const rawValue = params.value;
                return rawValue ? dayjs(rawValue).format('DD-MMM-YYYY') : '';
               }
           }
           return obj;
        });

        cols?.unshift({
            field: "actions",
            headerName: "",
            width:'25px',
            cellRenderer: ViewButton1,
          },)
        setColDefs([...cols??[]]);
    }

    const defaultColDef: ColDef = {
        // flex: 1,
        filter:true,
        floatingFilter:true,
    };

    const ViewButton1=(nProps?:any)=>{
        return(
            <div onClick={()=>{
                // alert('called')
                props?.onViewButtonClick?.(nProps?.data)
                // console.log(props.data)
            }} style={{display:'flex',justifyContent:'center'}}>
                <ViewButtonIcon fontSize='small'/>
            </div>
        )
    }
    return(
    <Quantom_Grid  container component={Paper}>
    <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ width: '100%',height:props?.height,backgroundColor:'transparent' }
    
    } // the Data Grid will fill the size of the parent container
    >
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={props?.data}
                    columnDefs={colDefs}
                    rowHeight={24}
                />
        </div>

        </Quantom_Grid>
    )
}




