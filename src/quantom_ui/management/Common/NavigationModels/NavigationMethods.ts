import { HTTP_RESPONSE_TYPE, QuantomPOST } from "../../../../HTTP/QuantomHttpMethods";
import { DBClearAllNavigationAction, DbInsertNavigationAction } from "../../../../IndexedDb/Initialization/Operation/NavigationActionDb";
import { NavigationActionInfo } from "./NavigationActionInfo";

const GET_ALL_NAVIGATION_URL = "Config/TransLog/ConfigTransNavigationActions";

export const SetNavigationIntoDB=async()=>{
   let res= await get_all_navigation_data();
   if(res.ResStatus===HTTP_RESPONSE_TYPE.SUCCESS){
         //await DBClearAllNavigationAction();
         
         for(let obj of res?.Response??[]){
             DbInsertNavigationAction(obj);
         }
   }
}


export const get_all_navigation_data= async()=>{
    
     let data= await QuantomPOST<NavigationActionInfo[]>(GET_ALL_NAVIGATION_URL,true,{MenuCode:""})
     return Promise.resolve(data);

}