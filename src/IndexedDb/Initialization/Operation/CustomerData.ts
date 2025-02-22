import { stringify } from "querystring";
import { CommonCodeName } from "../../../database/db";
import { CustomerModel } from "../../../quantom_ui/sale/config/customer/model/CustomerModel";
import { CUSTOMER_STORE, openDB } from "../initDb";
import { isNullOrEmpty } from "../../../CommonMethods";

export const LocalDbInsertCustomer=async(customer?:CustomerModel)=>{
    var db=await openDB();
    const tx= db.transaction(CUSTOMER_STORE,"readwrite");
    var store= tx.objectStore(CUSTOMER_STORE);
    store.add(customer);
    return tx.commit;
}

export const LocalDbGetAllCustomers=async():Promise<CustomerModel[]>=>{
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CUSTOMER_STORE, "readonly");
      const store = tx.objectStore(CUSTOMER_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
}




export const LocalDbFilterCustomers=async(query?:string):Promise<CustomerModel[]>=>{
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOMER_STORE, "readonly");
        const store = tx.objectStore(CUSTOMER_STORE);
    
        // Try to search by 'Code' index first
        // let index = store.index("CustCode");
        let request = store.openCursor()//index.openCursor(IDBKeyRange.only(query));
    
        let results: CustomerModel[] = [];
        
        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
              if (checkMatch(cursor.value,query) && results.length < 200) {
                results.push(cursor.value);
              }
              cursor.continue();
            } else {
              resolve(results);
            }
          };
          request.onerror = () => reject(request.error);
        });
    
}

const checkMatch = (value: CustomerModel,searchText?:string) => 
{    
    if(isNullOrEmpty(searchText)){
        return true;
    }
    return value?.CustCode?.toLowerCase().includes(searchText?.toLowerCase()??"") || value?.CustName?.toLowerCase().includes(searchText?.toLowerCase()??"");
}