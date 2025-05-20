import { AccountSettings } from "./SettingMethods";

export interface SettingsModel
{
    Code?:string;
    Name?:string;
    DefaultValue?:string;
    isHaveDefault?:boolean;
    LocCode?:string;
    accSetting?:AccountSettings
}