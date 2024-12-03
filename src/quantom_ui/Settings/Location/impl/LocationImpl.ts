import { QuantomGET } from "../../../../HTTP/QuantomHttpMethods";
import { SETTING_LOCATION_GET_ALL_LOCATIONS_BY_USER_URL } from "../../SettingRoutes";
import { LocationModel } from "../Model/LocationModel";

export const GetLocationsByUserId= async():Promise<LocationModel[]>=>{
    //TODO: get locations by user id
     let res= await QuantomGET<LocationModel[]>(SETTING_LOCATION_GET_ALL_LOCATIONS_BY_USER_URL,true)
     return res?.Response??[];
}