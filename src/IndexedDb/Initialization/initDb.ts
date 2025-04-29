const DB_NAME = "OFFLINE_DB";
export const CUSTOMER_STORE="CUSTOMER_STORE";
export const ACTION_NAVIGATION_STORE="ACTION_NAVIGATION_STORE"

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CUSTOMER_STORE)) {
        db.createObjectStore(CUSTOMER_STORE, { keyPath: "CustCode" });
      }
      if (!db.objectStoreNames.contains(ACTION_NAVIGATION_STORE)) {
        db.createObjectStore(ACTION_NAVIGATION_STORE, { keyPath: "MenuCode" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};