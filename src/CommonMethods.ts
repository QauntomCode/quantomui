import dayjs from "dayjs";

export const HeaderHeight = "170px";

export const safeParseToNumber = (value: any): number => {
  console.warn(value);
  if (/^-?\d*\.?\d*$/.test(value)) {
    return value; // Return the value as-is if it’s valid but incomplete.
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) || parsed === 0 ? 0 : parsed;
};

export const safePreviewNumber = (value: any): number => {
  const parsed = parseFloat(value);
  let number = isNaN(parsed) || parsed === 0 ? 0 : parsed;
  let rounded = Number(number.toFixed(2)); // 3.14
  return rounded;
};

export const get_percent_of_obtain_am = (obtAm?: number, total?: number) => {
  if (!total || !obtAm) return 0; // avoid division by zero
  return (obtAm / total) * 100;
};

export const get_obtain_am_of_percent = (percent?: number, total?: number) => {
  if (!total || !percent) return 0;
  let amount = (percent * total) / 100;
  return amount;
  //(value.DisPer * (value.Amount-value.Scheme)) / 100
  // return Math.round((amount / total) * 100 * 100) / 100;
};

export function isNullOrEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === "";
}

export function safeParseToRequestDate(value: Date): string {
  let val = dayjs(value).toISOString();
  // let val= dayjs(value).format("ddd MMM DD YYYY HH:mm:ss [GMT] Z")
  // let cleanedDateString = val.replace(/\s{2,}/g, " ");
  // alert(cleanedDateString)
  return val;
}

export function IsValidDate(value?: Date): boolean {
  let val = dayjs(value).isValid();
  // let val= dayjs(value).format("ddd MMM DD YYYY HH:mm:ss [GMT] Z")
  // let cleanedDateString = val.replace(/\s{2,}/g, " ");
  // alert(cleanedDateString)
  return val;
}

export function getValueByPropertyName(obj: any, propertyPath: string): any {
  if (!obj || !propertyPath) return undefined;

  return propertyPath
    .split(".") // Split the path by dots for nested access
    .reduce((acc, key) => acc?.[key], obj); // Traverse the object
}

export const AsyncFindByIndex = async <T>(
  arr?: T[],
  method?: (t?: T) => boolean
): Promise<number> => {
  let obj = arr?.findIndex?.((t) => method?.(t));

  return Promise.resolve(obj !== 0 && !obj ? -1 : obj);
};

export const AsyncDeepCopy = async (data?: any): Promise<any> => {
  const deepCopy = JSON.parse(JSON.stringify(data));
  return Promise.resolve(deepCopy);
};

export const AsyncFindObject = async <T>(
  arr?: T[],
  method?: (t?: T) => boolean
): Promise<T> => {
  let obj: any = arr?.find?.((t) => method?.(t));
  if (!obj) {
    obj = {};
  }
  return Promise.resolve(obj);
};

export const FocusOnControlByControlId = (id?: string) => {
  if (id) {
    let element = document.getElementById(id);
    if (element) {
      // alert('element found')
      element?.focus();
    }
  }
};
