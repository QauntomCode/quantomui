

export const safeParseToNumber=(value: any): number=> {
      if (/^-?\d*\.?\d*$/.test(value)) {
        return value; // Return the value as-is if it’s valid but incomplete.
    }
    const parsed = parseFloat(value);
    return isNaN(parsed)||parsed===0 ? 0 : parsed;
}