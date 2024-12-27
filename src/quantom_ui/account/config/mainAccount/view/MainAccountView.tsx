/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { MainAccountModel } from '../model/MainAccountModel'
import { IconByName, MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { GetAllMainAccounts } from '../impl/MainAccountImpl';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry,ClientSideRowModelModule } from 'ag-grid-community'
import { Quantom_Grid } from '../../../../../quantom_comps/base_comps';
import { Paper } from '@mui/material';
// import ViewButtonIcon from '@mui/icons-material/VisibilityTwoTone';
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
   detailColumns?:QuantomGridColumns[];
   valueFormatter?: (params:any)=>void;
   height?:string;
   onViewButtonClick?:(lineData?:any)=>void;
   viewButtonOverrideIcon?:string;
   getDetailRowData?:(params?:any)=>any;
   isRowMaster?:(data:any)=>boolean;
   headerHeight?:number;
   hideFloatingFilter?:boolean;
   viewButtonStatus?:'HIDE';
   onCellValueChanged?:(data?:any)=>void
}

export interface QuantomGridColumns{
    field?:string;
    caption?:string;
    width?:number;
    header?:string;
    dataType?:'string'|'date'|'number'|'time'|'boolean'
    valueFormatter?: (params:any)=>any;
    editable?:boolean;
    headerCheckboxSelection?:boolean;

}

export const  QUANTOM_Table=<T,>(props?:QuantomGridProps<T>)=>
{
  // alert(props?.headerHeight)
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
                        headerName:item?.caption,
                        editable:item?.editable,
                        headerCheckboxSelection:item?.headerCheckboxSelection
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
           if(item?.dataType==='time'){
             obj.valueFormatter= (params:any) => {
             const rawValue = params.value;
             return rawValue ? dayjs(rawValue).format('hh:mm:ss A') : '';
            }
          }
           
           return obj;
        });

        
        if(props?.viewButtonStatus!=='HIDE'){
        cols?.unshift({
            field: "actions",
            headerName: "",
            width:'25px',
            cellRenderer: ViewButton1,
          },)
        }
        
        setColDefs([...cols??[]]);
    }

    const defaultColDef: ColDef = {
        // flex: 1,
        filter:true,
        floatingFilter:props?.hideFloatingFilter?false:true,
    };

    const ViewButton1=(nProps?:any)=>{
        return(
            <div onClick={()=>{
                // alert('called')
                props?.onViewButtonClick?.(nProps?.data)
                // console.log(props.data)
            }} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {/* <ViewButtonIcon fontSize='small'/> */}
                <IconByName iconName= {props?.viewButtonOverrideIcon?props?.viewButtonOverrideIcon:'VisibilityTwoTone'} fontSize='20px'/>
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
                    onCellValueChanged={props?.onCellValueChanged}
                    defaultColDef={defaultColDef}
                    rowData={props?.data}
                    columnDefs={colDefs}
                    rowHeight={24}
                    headerHeight={(props?.headerHeight!==undefined)?(props?.headerHeight): 20}
                />
        </div>

        </Quantom_Grid>
    )
}





export const  QUANTOM_MasterDetailTable=<T,>(props?:QuantomGridProps<T>)=>
    {
        ModuleRegistry.registerModules([ClientSideRowModelModule]);
        const [colDefs,setColDefs]=React.useState<ColDef<T>[]>([])
        const [detailColDefs,setDetailColDefs]=React.useState<ColDef<T>[]>([])

        React.useEffect(()=>{
            handleColumns()  ;
            handleDetailColumns();
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
               if(item?.dataType==='time'){
                obj.valueFormatter= (params:any) => {
                 const rawValue = params.value;
                 return rawValue ? dayjs(rawValue).format('hh:mm:ss A') : '';
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

        const handleDetailColumns=()=>{
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
            setDetailColDefs([...cols??[]]);
        }
    
        const defaultColDef: ColDef = {
            // flex: 1,
            filter:true,
            floatingFilter:true,
        };
    
        const ViewButton1=(nProps?:any)=>{
            return(
                <div onClick={()=>{
                    props?.onViewButtonClick?.(nProps?.data)
                }} style={{display:'flex',justifyContent:'center'}}>
                    <IconByName iconName={props?.viewButtonOverrideIcon?props?.viewButtonOverrideIcon :'VisibilityTwoTone'} fontSize='10px'/>
                </div>
            )
        }

        const detailCellRendererParams = {
            detailGridOptions: {
              columnDefs: detailColDefs,
              defaultColDef: {
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
              },
            },
            getDetailRowData: (params:any) => {
              params.successCallback(props?.getDetailRowData);
            },
          };
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
                        masterDetail={true}
                        detailCellRenderer={detailCellRendererParams}
                        isRowMaster={props?.isRowMaster}
                    />
            </div>
    
            </Quantom_Grid>
        )
    }





    export const QUANTOM_MasterDetailGrid1=()=>{

        const masterColumnDefs:any = [
            { field: "locName", headerName: "Location Name", flex: 1 },
            { field: "FormName", headerName: "Form Name", flex: 1 },
            { field: "TransNo", headerName: "Transaction No", flex: 1 },
            { field: "VDate", headerName: "Voucher Date", flex: 1 },
            { field: "Debit", headerName: "Debit", type: "number", flex: 1 },
            { field: "Credit", headerName: "Credit", type: "number", flex: 1 },
            { field: "Balance", headerName: "Balance", type: "number", flex: 1 },
          ];
        
          const detailColumnDefs = [
            { field: "ItemCode", headerName: "Item Code", flex: 1 },
            { field: "ItemName", headerName: "Item Name", flex: 2 },
            { field: "Qty", headerName: "Quantity", type: "number", flex: 1 },
            { field: "Price", headerName: "Price", type: "number", flex: 1 },
            { field: "Amount", headerName: "Amount", type: "number", flex: 1 },
          ];
        
           const isMaster = (data?:any) => data?.InvoiceDetail && data.InvoiceDetail.length > 0;
        
          const detailCellRendererParams = {
            detailGridOptions: {
              columnDefs: detailColumnDefs,
              defaultColDef: {
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
              },
            },
            getDetailRowData: (params?:any) => {
              params.successCallback(params.data.InvoiceDetail);
            },
          };
        
          return (
            <div
              className="ag-theme-quartz"
              style={{ height: "500px", width: "100%" }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={masterColumnDefs}
                defaultColDef={{
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                }}
                masterDetail={true}
                isRowMaster={isMaster}
                detailCellRendererParams={detailCellRendererParams}
            />
            </div>
          );
    }



    const rowData = [
        {
          locName: "Raja Road",
          FormName: "Sale",
          TransNo: "000592-001-11-24",
          VDate: "2024-11-18T00:00:00",
          Debit: 10250.0,
          Credit: 0.0,
          Balance: 10250.0,
          InvoiceDetail: [
            {
              ItemCode: "00002-001",
              ItemName: "Pvc -Imp -10\" -Laminated -V -388",
              Qty: 20.0,
              Price: 400.0,
              Amount: 8000.0,
            },
            {
              ItemCode: "00168-001",
              ItemName: "Pvc Gola -Imp -Normal -388",
              Qty: 15.0,
              Price: 150.0,
              Amount: 2250.0,
            },
          ],
        },
        {
          locName: "Raja Road",
          FormName: "Sale",
          TransNo: "000592-001-11-24",
          VDate: "2024-11-18T00:00:00",
          Debit: 0.0,
          Credit: 10250.0,
          Balance: 0.0,
          InvoiceDetail: null,
        },
      ];