/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { SubSubAccountModel } from '../model/subSubAccountModel'
import { MenuComponentProps, setFormBasicKeys } from '../../../../../quantom_comps/AppContainer/Helpers/TabHelper/AppContainerTabHelper'
import { Quantom_LOV, Quantom_LOV1 } from '../../../../../quantom_comps/Quantom_Lov'
import { CommonCodeName } from '../../../../../database/db'
import { Quantom_Grid, Quantom_Input } from '../../../../../quantom_comps/base_comps'
import { SubSubAccountDelete,SubSubAccountGetOne, SubSubAccountInsert } from '../impl/subSubAccountImpl'
import { SubSubAccountList } from './SubSubAccountList'
import { SubAccountGetAll, SubAccountGetOne } from '../../subAccount/impl/subAccountImpl'
import { GroupContainer } from '../../../processing/voucher/view/VoucherView'

export const SubSubAccountView = (props?:MenuComponentProps<SubSubAccountModel>) => {

   //  const handleSubAccounts=async():Promise<CommonCodeName[]>=>{
   //       let res= await SubAccountGetAll();
   //       let mAccounts=
   //       res?.map((item,index)=>{
   //          let obj:CommonCodeName={Code:item?.Code,Name:item?.Name};
   //          return obj;
   //       });
   //       return Promise.resolve([...mAccounts]);
   //  }

    React.useEffect(()=>{
      setFormBasicKeys<SubSubAccountModel>({
         SaveMethod:(payload)=>SubSubAccountInsert(payload),
         DeleteMethod:(payload)=>SubSubAccountDelete(payload),
         GetOneMethod:(payload)=>SubSubAccountGetOne(payload),
         uniqueKey:props?.UniqueId??"",
         baseProps:props??{},
         SetBasicKeys:()=>({keyNoPropName:"Code",keyDatePropsName:""}),
      })
    },[props])

    React.useEffect(()=>{
      setTimeout(() => {
         props?.setListComponent?.((<SubSubAccountList {...props}/>))
      }, (500));
      
    },[])

    
  return (
    <>
      
         <Quantom_Grid container mt={1.5}  spacing={.5}>
               {/* <Quantom_Grid item  size={{md:2}}>
                  <Quantom_Input disabled label='Main Code' value={props?.state?.subAccount?.mainAccount?.Code} />
               </Quantom_Grid>  */}
               <Quantom_Grid item size={{xs:12,sm:12,md:8,lg:6,xl:6}}>
                  <Quantom_Input disabled label='Main Name' value={props?.state?.subAccount?.mainAccount?.Name} />
               </Quantom_Grid>
         </Quantom_Grid>

         <Quantom_Grid container mt={1} spacing={.5}>
               {/* <Quantom_Grid item size={{md:2}}>
                  <Quantom_Input disabled label='Sub Code' value={props?.state?.subAccount?.Code} />
               </Quantom_Grid>  */}
               <Quantom_Grid item size={{xs:12,sm:12,md:8,lg:6,xl:6}}>
                     <Quantom_LOV1 onChange={async (selected) => {
                 let res = await SubAccountGetOne(selected?.Code)
                 props?.setState?.({ ...props?.state, subAccount: { ...res?.Response }, SubCode: selected?.Code })
                 console.log('state of sub account is ', props?.state)
              } } selected={{ Code: props?.state?.subAccount?.Code, Name: props?.state?.subAccount?.Name }} FillDtaMethod={SubAccountGetAll} 
               label='Sub Account'  keyNo='SUB_ACCOUNT_LIST' uniqueKeyNo={props?.UniqueId??""}/>
               </Quantom_Grid>
         </Quantom_Grid>
         <Quantom_Grid container mt={1}  spacing={.5}>
               <Quantom_Grid item size={{xs:12,sm:12,md:3,lg:2,xl:2}}>
                  <Quantom_Input size='medium' disabled label='Code' value={props?.state?.Code} />
               </Quantom_Grid>
               <Quantom_Grid item size={{xs:12,sm:12,md:5,lg:4,xl:4}}>
                  <Quantom_Input size='medium' label='Name' value={props?.state?.Name} onChange={(e)=>{props?.setState?.({...props?.state,Name:e?.target?.value})}}/>
               </Quantom_Grid>
         </Quantom_Grid>
          
    </>
  )
}



