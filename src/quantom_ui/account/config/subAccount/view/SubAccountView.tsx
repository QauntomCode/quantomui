/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { SubAccountModel } from '../model/SubAccountModel'
import { MenuComponentProps } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV } from '../../../../../quantom_comps/Quantom_Lov'
import { GetAllMainAccounts } from '../../mainAccount/impl/MainAccountImpl'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { SubAccountDelete, SubAccountGetOne, SubAccountInsert } from '../impl/subAccountImpl'
import { SubAccountList } from './SubAccountList'
import { GroupContainer } from '../../../processing/voucher/view/VoucherView'

export const SubAccountView = (props?:MenuComponentProps<SubAccountModel>) => {

    const handleMainAccounts=async():Promise<CommonCodeName[]>=>{
         let res= await GetAllMainAccounts();
         let mAccounts=
         res?.map((item,index)=>{
            let obj:CommonCodeName={Code:item?.Code,Name:item?.Name};
            return obj;
         });
         return Promise.resolve([...mAccounts]);
    }

    React.useEffect(()=>{
     props?.setSaveMethod?.((payload)=>SubAccountInsert(payload))
     props?.setDeleteMethod?.((payload)=>SubAccountDelete(payload))
     props?.setListComponent?.((<SubAccountList {...props}/>))
     props?.setGetOneMethod?.((payload)=>SubAccountGetOne(payload))
    },[])

    
  return (
    <>
     <GroupContainer Label='Sub Account Detail'>
      <Quantom_Grid container>
        <Quantom_LOV onChange={(selected)=>{
                props?.setState?.({...props?.state,mainAccount:{Code:selected?.Code,Name:selected?.Name},MainCode:selected?.Code})
                console.log('state of sub account is ',props?.state)
        }} selected={{Code:props?.state?.mainAccount?.Code,Name:props?.state?.mainAccount?.Name}} FillDtaMethod={handleMainAccounts} label='Main Account'></Quantom_LOV>
      </Quantom_Grid>
      <Quantom_Grid container spacing={.5}>
         <Quantom_Grid item xs={4} md={3} lg={2}>
            <Quantom_Input disabled label='Code' value={props?.state?.Code} />
         </Quantom_Grid>
         <Quantom_Grid item xs={8} md={9} lg={10}>
            <Quantom_Input label='Name' value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e?.target?.value})}}/>
         </Quantom_Grid>
      </Quantom_Grid>
      </GroupContainer>
    </>
  )
}



