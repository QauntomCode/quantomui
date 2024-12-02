import { cursorTo } from "readline";
// import { CommonCodeName } from "../quantom_comps/Quantom_Lov";


let request:IDBOpenDBRequest;
let db:IDBDatabase;
 export let DB_VERSIONS=2;


export interface user{
    id?:string;
    name?:string;
    email?:string;

}

export enum Stores {
    Users = 'users',
    InventoryItems='InventoryItems'
  }


export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // open the connection
      request = indexedDB.open('myDB');
  
      request.onupgradeneeded = () => {
        db = request.result;
  
        // if the data object store doesn't exist, create it
        if (!db.objectStoreNames.contains(Stores.Users)) {
          console.log('Creating users store');
          db.createObjectStore(Stores.Users, { keyPath: 'id' });
        }
        if(!db.objectStoreNames.contains(Stores.InventoryItems)){
          console.log('Creating Inventory Items Store');
          let objectStore= db.createObjectStore(Stores.InventoryItems,{keyPath:'Code'});
          objectStore.createIndex('Name', 'Name', { unique: false });
        }
        // no need to resolve here
      };
  
      request.onsuccess = () => {
        db = request.result;
        DB_VERSIONS= db.version;
        console.log('request.onsuccess - initDB',DB_VERSIONS);
        resolve(true);
      };
  
      request.onerror = () => {
        resolve(false);
      };
    });
  };


  export const addData = <T>(storeName: string, data: T): Promise<T|string|null> => {
    return new Promise((resolve) => {
      request = indexedDB.open('myDB', DB_VERSIONS);
  
      request.onsuccess = () => {
        console.log('request.onsuccess - addData', data);
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.add(data);
        resolve(data);
      };
  
      request.onerror = () => {
        const error = request.error?.message
        if (error) {
          resolve(error);
        } else {
          resolve('Unknown error');
        }
      };
    });
  };


  export const OpenDb= async():Promise<IDBOpenDBRequest>=>{
    
    return new 
    Promise((resolve)=>{
      let request=   indexedDB.open('myDB',DB_VERSIONS)
      resolve(request)
    });
  }

  // export const getStoreData = (storeName: Stores,search?:string): Promise<CommonCodeName[]> => {
  //   return new Promise((resolve) => {
  //     request = indexedDB.open('myDB');
  
  //     let list:CommonCodeName[]=[];
  //     request.onsuccess = () => {
  //       console.log('request.onsuccess - getAllData');
  //       db = request.result;
  //       const tx = db.transaction(storeName, 'readonly');
  //       const store = tx.objectStore(storeName);
        
  //       let count: number = 0;
  //       const limit: number = 200;

  //       let index= store.index('Name');
  //       let cursorRequest= index.openCursor();

  //           cursorRequest.onsuccess = function(event:any) {
  //                   let cursor = event.target.result;

                  
  //                   if (cursor) {
  //                     let name= cursor.value.Name.toLowerCase();
  //                     if (name.includes(search??"".toLowerCase())) {
  //                      let code= cursor.value.Code;
  //                      let name= cursor.value.Name;
  //                      list.push({
  //                         Code:code,
  //                         Name:name
  //                      });
  //                      count++;
  //                       cursor.continue();
  //                   } else {
  //                       console.log('No more entries!');
  //                   }
  //               };
        
  //       res.onsuccess = () => {
  //         resolve(res.result);
  //       };
  //     };
  //   };
  // });


  export interface CommonCodeName{
    Code?:string;
    Name?:string;
  }


  