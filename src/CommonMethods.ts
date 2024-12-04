import dayjs from "dayjs";


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