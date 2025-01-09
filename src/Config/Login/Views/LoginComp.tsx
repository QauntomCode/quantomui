/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Quantom_Button, Quantom_Input } from '../../../quantom_comps/base_comps'
import { UserModel as user } from '../../User/model/user'
import { GetAllCompaniesByUser, setLogedInUserCompany, UserLoginMethod } from '../Controller/loginContrller'
import { HTTP_RESPONSE_TYPE } from '../../../HTTP/QuantomHttpMethods'
import { useNavigate } from 'react-router-dom'

export const LoginComp = () => {
    const [user,setUser]=React.useState<user>({})
    const navigate= useNavigate()
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div>
            <Quantom_Input label='USER NAME' value={user?.Name} onChange={(e)=>{
                setUser({...user,Name:e?.target?.value})
            }}/>
            <Quantom_Input label='PASSWORD' value={user?.Password}
                onChange={(e)=>{setUser({...user,Password:e.target.value})}}/>
            
            <Quantom_Button text='Login' onClick={ async()=>{
                let res= await UserLoginMethod(user);
                if(res.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS){
                    console.log('current user is',res);
                    let comps= await GetAllCompaniesByUser();
                    if(comps.ResStatus=== HTTP_RESPONSE_TYPE.SUCCESS && (comps?.Response?.length??0)===1){
                        setLogedInUserCompany(comps?.Response?.[0])
                        navigate('/Home')
                    }
                }
            }} baseProps={{size:'small',sx:{marginTop:'10px'}}} />
        </div>
    </div>
  )
}
