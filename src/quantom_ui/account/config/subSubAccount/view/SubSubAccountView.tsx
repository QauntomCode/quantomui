/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { SubSubAccountModel } from '../model/subSubAccountModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { SubSubAccountDelete,SubSubAccountGetOne, SubSubAccountInsert } from '../impl/subSubAccountImpl'
import { SubSubAccountList } from './SubSubAccountList'
import { SubAccountGetAll, SubAccountGetOne } from '../../subAccount/impl/subAccountImpl'

export const SubSubAccountView = (props?:MenuComponentProps<SubSubAccountModel>) => {

    const handleSubAccounts=async():Promise<CommonCodeName[]>=>{
         let res= await SubAccountGetAll();
         let mAccounts=
         res?.map((item,index)=>{
            let obj:CommonCodeName={Code:item?.Code,Name:item?.Name};
            return obj;
         });
         return Promise.resolve([...mAccounts]);
    }

    React.useEffect(()=>{
     props?.setSaveMethod?.((payload)=>SubSubAccountInsert(payload))
     props?.setDeleteMethod?.((payload)=>SubSubAccountDelete(payload))
     props?.setListComponent?.((<SubSubAccountList {...props}/>))
     props?.setGetOneMethod?.((payload)=>SubSubAccountGetOne(payload))
    },[])

    
  return (
    <>
      <Quantom_Grid container>
         <Quantom_Grid container>
            <Quantom_Input disabled label='Main Account' value={props?.state?.subAccount?.mainAccount?.Name} />
         </Quantom_Grid>
        <Quantom_LOV onChange={async(selected)=>{
                let res= await SubAccountGetOne(selected?.Code);
                props?.setState?.({...props?.state,subAccount:{...res?.Response},SubCode:selected?.Code})
                console.log('state of sub account is ',props?.state)
        }} selected={{Code:props?.state?.subAccount?.Code,Name:props?.state?.subAccount?.Name}} FillDtaMethod={handleSubAccounts} label='Sub Account'></Quantom_LOV>
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



