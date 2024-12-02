/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { RegisterAccountModel } from '../model/registerAccountModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { RegisterAccountDelete, RegisterAccountGetOne, RegisterAccountInsert } from '../impl/registerAccountIml'
import { RegisterAccountList } from './RegisterAccountList'
import { SubSubAccountGetAll, SubSubAccountGetOne } from '../../subSubAccount/impl/subSubAccountImpl'

export const RegisterAccountView = (props?:MenuComponentProps<RegisterAccountModel>) => {

    const handleSubAccounts=async():Promise<CommonCodeName[]>=>{
         let res= await SubSubAccountGetAll();
         let mAccounts=
         res?.map((item,index)=>{
            let obj:CommonCodeName={Code:item?.Code,Name:item?.Name};
            return obj;
         });
         return Promise.resolve([...mAccounts]);
    }

    React.useEffect(()=>{
     props?.setSaveMethod?.((payload)=>RegisterAccountInsert(payload))
     props?.setDeleteMethod?.((payload)=>RegisterAccountDelete(payload))
     props?.setListComponent?.((<RegisterAccountList {...props}/>))
     props?.setGetOneMethod?.((payload)=>RegisterAccountGetOne(payload))
    },[])

    
  return (
    <>
      <Quantom_Grid container>
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid item xs={4} md={3} lg={2}>
               <Quantom_Input disabled label='Main Code' value={props?.state?.subSubAccount?.subAccount?.mainAccount?.Code} />
            </Quantom_Grid>
            <Quantom_Grid item xs={8} md={9} lg={10}>
               <Quantom_Input disabled label='Main Name' value={props?.state?.subSubAccount?.subAccount?.mainAccount?.Name} />
            </Quantom_Grid>
         </Quantom_Grid>
         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid item xs={4} md={3} lg={2}>
               <Quantom_Input disabled label='Sub Code' value={props?.state?.subSubAccount?.subAccount?.Code} />
            </Quantom_Grid>
            <Quantom_Grid item xs={8} md={9} lg={10}>
               <Quantom_Input disabled label='Sub Name' value={props?.state?.subSubAccount?.subAccount?.Name} />
            </Quantom_Grid>
         </Quantom_Grid>

         <Quantom_Grid container spacing={.5}>
            <Quantom_Grid item xs={4} md={3} lg={2}>
               <Quantom_Input disabled label='Sub Sub Code' value={props?.state?.SubSubCode} />
            </Quantom_Grid>
            <Quantom_Grid item xs={8} md={9} lg={10}>
            <Quantom_LOV onChange={async(selected)=>{
                let res= await SubSubAccountGetOne(selected?.Code);
                props?.setState?.({...props?.state,subSubAccount:{...res?.Response},SubSubCode:selected?.Code})
                console.log('state of sub account is ',props?.state)}} 
                selected={{Code:props?.state?.subSubAccount?.Code,Name:props?.state?.subSubAccount?.Name}} 
                FillDtaMethod={handleSubAccounts} label='Sub Sub Account' />
            </Quantom_Grid>
         </Quantom_Grid>
        
            
         {/* </Quantom_LOV> */}
      </Quantom_Grid>
      <Quantom_Grid container spacing={.5}>
         <Quantom_Grid item xs={4} md={3} lg={2}>
            <Quantom_Input disabled label='Code' value={props?.state?.Code} />
         </Quantom_Grid>
         <Quantom_Grid item xs={8} md={9} lg={10}>
            <Quantom_Input label='Name' value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e?.target?.value})}}/>
         </Quantom_Grid>
      </Quantom_Grid>
    </>
  )
}



