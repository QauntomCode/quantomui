/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { RegisterAccountModel } from '../model/registerAccountModel'
import { MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV, Quantom_LOV1 } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { RegisterAccountDelete, RegisterAccountGetOne, RegisterAccountInsert } from '../impl/registerAccountIml'
import { RegisterAccountList } from './RegisterAccountList'
import { SubSubAccountGetAll, SubSubAccountGetOne } from '../../subSubAccount/impl/subSubAccountImpl'
import { GroupContainer } from '../../../processing/voucher/view/VoucherView'

export const RegisterAccountView = (props?:MenuComponentProps<RegisterAccountModel>) => {

   //  const handleSubAccounts=async():Promise<CommonCodeName[]>=>{
   //       let res= await SubSubAccountGetAll();
   //       let mAccounts=
   //       res?.map((item,index)=>{
   //          let obj:CommonCodeName={Code:item?.Code,Name:item?.Name};
   //          return obj;
   //       });
   //       return Promise.resolve([...mAccounts]);
   //  }

    React.useEffect(()=>{
      setFormBasicKeys<RegisterAccountModel>({
         SaveMethod:(payload)=>RegisterAccountInsert(payload),
         DeleteMethod:(payload)=>RegisterAccountDelete(payload),
         GetOneMethod:(payload)=>RegisterAccountGetOne(payload),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{},
         SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
      })
    },[props])

    React.useEffect(()=>{

      setTimeout(() => {
         props?.setListComponent?.((<RegisterAccountList {...props}/>))
      }, (500));
    },[])

    
  return (
    <>
         <Quantom_Grid mt={2} container >
         
            <Quantom_Grid  size={{xs:12,sm:12,md:8,lg:6}} >
               <Quantom_Input disabled label='Main Name' value={props?.state?.subSubAccount?.subAccount?.mainAccount?.Name} />
            </Quantom_Grid>
         </Quantom_Grid>
         <Quantom_Grid mt={1} container spacing={.5}>
            {/* <Quantom_Grid item size={{xs:4,md:3,lg:2}} >
               <Quantom_Input disabled label='Sub Code' value={props?.state?.subSubAccount?.subAccount?.Code} />
            </Quantom_Grid> */}
            <Quantom_Grid size={{xs:12,sm:12,md:8,lg:6}}>
               <Quantom_Input disabled label='Sub Name' value={props?.state?.subSubAccount?.subAccount?.Name} />
            </Quantom_Grid>
         </Quantom_Grid>

         <Quantom_Grid mt={1} container spacing={.5}>
            <Quantom_Grid size={{xs:12,sm:12,md:8,lg:6}}>
               <Quantom_LOV1 onChange={async (selected) => {
                 let res = await SubSubAccountGetOne(selected?.Code)
                 props?.setState?.({ ...props?.state, subSubAccount: { ...res?.Response }, SubSubCode: selected?.Code })
                 console.log('state of sub account is ', props?.state)
              } }
              selected={{ Code: props?.state?.subSubAccount?.Code, Name: props?.state?.subSubAccount?.Name }}
              FillDtaMethod={SubSubAccountGetAll} label='Sub Sub Account' uniqueKeyNo={props?.UniqueId??""} keyNo='SUB_SUB_ACCOUNT_GL' />
            </Quantom_Grid>
         </Quantom_Grid>
            

      <Quantom_Grid mt={1} container spacing={.5}>
         <Quantom_Grid  size={{xs:12,md:3,lg:2}}>
            <Quantom_Input size='medium' disabled label='Code' value={props?.state?.Code} />
         </Quantom_Grid>
         <Quantom_Grid item size={{xs:12,md:5,lg:4}}>
            <Quantom_Input size='medium' label='Name' value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e?.target?.value})}}/>
         </Quantom_Grid>
      </Quantom_Grid>
    </>
  )
}



