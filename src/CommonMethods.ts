import dayjs from "dayjs";

export const HeaderHeight='170px'

export const safeParseToNumber=(value: any): number=> {
      if (/^-?\d*\.?\d*$/.test(value)) {
        return value; // Return the value as-is if it’s valid but incomplete.
    }
    const parsed = parseFloat(value);
    return isNaN(parsed)||parsed===0 ? 0 : parsed;
}
export function isNullOrEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === "";
}


export function safeParseToRequestDate(value: Date):string {
  let val= dayjs(value).toISOString();
  // let val= dayjs(value).format("ddd MMM DD YYYY HH:mm:ss [GMT] Z")
  // let cleanedDateString = val.replace(/\s{2,}/g, " ");
  // alert(cleanedDateString)
  return val;
}

export function getValueByPropertyName(obj: any, propertyPath: string): any {
  if (!obj || !propertyPath) return undefined;

  return propertyPath
      .split('.') // Split the path by dots for nested access
      .reduce((acc, key) => acc?.[key], obj); // Traverse the object
}

export const AsyncFindByIndex=async<T>(arr?:T[],method?:(t?:T)=>boolean):Promise<number>=>{
     let obj=  arr?.findIndex?.((t)=>method?.(t))
     
     return Promise.resolve((obj!==0 && !obj)?-1:obj);
}

export const AsyncDeepCopy=async(data?:any):Promise<any>=>{
  const deepCopy = JSON.parse(JSON.stringify(data));
  return Promise.resolve(deepCopy);
}


export const AsyncFindObject=async<T>(arr?:T[],method?:(t?:T)=>boolean):Promise<T>=>{
  let obj:any=  arr?.find?.((t)=>method?.(t))
  if(!obj){
    obj={}
  }
  return Promise.resolve(obj);
  

}

export const FocusOnControlByControlId=(id?:string)=>{
  if(id){
        let element= document.getElementById(id);
        if(element){
          // alert('element found')
          element?.focus();
        }
  }
}