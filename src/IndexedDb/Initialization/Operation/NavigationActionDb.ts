import { stringify } from "querystring";
import { CommonCodeName } from "../../../database/db";
import { ACTION_NAVIGATION_STORE, openDB } from "../initDb";
import { isNullOrEmpty } from "../../../CommonMethods";
import { NavigationActionInfo } from "../../../quantom_ui/management/Common/NavigationModels/NavigationAction"; //"../../../quantom_ui/management/Common/NavigationModels/NavigationActionInfo";

export const DbInsertNavigationAction = async (nav?: NavigationActionInfo) => {
  var db = await openDB();
  const tx = db.transaction(ACTION_NAVIGATION_STORE, "readwrite");
  var store = tx.objectStore(ACTION_NAVIGATION_STORE);
  store.add(nav);
  return tx.commit;
};

export const DBGetSingleNavigationAction = async (
  menuCode: string
): Promise<NavigationActionInfo> => {
  const db = await openDB();
  // alert(menuCode)
  return new Promise((resolve, reject) => {
    const tx = db.transaction(ACTION_NAVIGATION_STORE, "readonly");
    const store = tx.objectStore(ACTION_NAVIGATION_STORE);
    const request = store.get(menuCode);
    // console.log('result is',request)
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const DbGetAllNavigation = async (): Promise<NavigationActionInfo[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(ACTION_NAVIGATION_STORE, "readonly");
    const store = tx.objectStore(ACTION_NAVIGATION_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const DBClearAllNavigationAction = async (
  nav?: NavigationActionInfo
) => {
  var db = await openDB();
  const tx = db.transaction(ACTION_NAVIGATION_STORE, "readwrite");
  var store = tx.objectStore(ACTION_NAVIGATION_STORE);
  store?.clear();
  return tx.commit;
};
