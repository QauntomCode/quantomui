import React from "react";
import { MenuComponentProps,setFormBasicKeys } from "../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper";
import { DepartmentsModel } from "../model/DepartmentsModel";
import { Quantom_Grid, Quantom_Input } from "../../../../../quantom_comps/base_comps";
import { GroupContainer } from "../../../../account/processing/voucher/view/VoucherView";
import { Checkbox } from "@mui/material"; 
import { SetupFormInsert,SetupFormDelete,SetupFormGetOne,GetSetupFormTypByMenuCode } from "../../../../inventory/config/unit/impl/setupFormImp";
import { DepartmentList } from "./DepartmentList";
import { SetupFormModel } from "../../../../inventory/config/unit/model/setupFormModel";


export const DesignationView = (props?:MenuComponentProps<SetupFormModel>) => {

    const [formCaption,setFormCaption]=React.useState('');

    React.useEffect(()=>{
      setFormBasicKeys<SetupFormModel>({
         SaveMethod:(payload)=>SetupFormInsert(payload,props?.MenuCode),
         DeleteMethod:(payload)=>SetupFormDelete(payload,props?.MenuCode),
         GetOneMethod:(payload)=>SetupFormGetOne(payload,props?.MenuCode),
         SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{}
      })
    },[props])

    React.useEffect(()=>{
      setTimeout(() => {
        props?.setListComponent?.((<DepartmentList {...props}/>))
      }, 500);
      
      setFormType();
    },[])

    const setFormType=async()=>{
      let info= await GetSetupFormTypByMenuCode(props?.MenuCode);
       setFormCaption(info?.Capation??"");
    }
  
  return (
    <>
      <GroupContainer Label={`${formCaption} Info`}>
        <Quantom_Grid container spacing={0.5}>
          <Quantom_Grid item size={{ xs: 4, md: 3, lg: 2 }}>
            <Quantom_Input
              disabled
              label="Code"
              value={props?.state?.Code ?? ""}
              onChange={(e)=>props?.setState?.({...props.state,Code:e.target.value})}
            />
          </Quantom_Grid>
          <Quantom_Grid item size={{ xs: 4, md: 3, lg: 2 }}>
            <Quantom_Input
              label="Name"
              value={props?.state?.Name ?? ""}
              onChange={(e)=> props?.setState?.({...props.state, Name:e.target.value})}
            />
          </Quantom_Grid>
          <Quantom_Grid item size={{ xs: 4, md: 3, lg: 2 }}>
            <Checkbox
              checked={props?.state?.Active ?? false}
              onChange={(e) => props?.setState?.({ ...props.state, Active: e.target.checked })}
              color="primary"
              aria-label="Active"
              sx={{
                color: '#1976d2',
                transform: 'scale(0.90)',
                '&.Mui-checked': {
                  color: '#1976d2',
                },
              }}
            />
          </Quantom_Grid>
        </Quantom_Grid>
      </GroupContainer>
    </>
  );
};
