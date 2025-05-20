

import {  openDB, SETTINGS_STORE } from "../initDb";
import { SettingsModel } from "../../../quantom_ui/Settings/Settings/SettingsModel";
import { AccountSettings } from "../../../quantom_ui/Settings/Settings/SettingMethods";

export const DbInsertSettings = async (nav?: SettingsModel):Promise<boolean> => {
  var db = await openDB();
  const tx = db.transaction(SETTINGS_STORE, "readwrite");
  var store = tx.objectStore(SETTINGS_STORE);
  store.add(nav);
  tx.commit();

  return Promise.resolve(true);
};

export const DBGetAllSettings = async (
): Promise<SettingsModel[]> => {
  const db = await openDB();
  // alert(menuCode)
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SETTINGS_STORE, "readonly");
    const store = tx.objectStore(SETTINGS_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};


export const DBGetSingleSetting= async(setting?: AccountSettings):Promise<SettingsModel>=>{
  let res= await DBGetAllSettings();
  let current= res?.find(x=>x.accSetting===setting);
  return Promise.resolve(current??{});
  
}
