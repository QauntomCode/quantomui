

export const safeParseToNumber=(value: any): number=> {
    // console.log('number before prase',value);
    // const parsed = parseFloat(value);

    // console.log('number after parsed',parsed)
    // return isNaN(parsed)||parsed===0 ? 0 : parsed;


      // Allow partial valid inputs like `123.`, `-`, and `.` to pass through.
      if (/^-?\d*\.?\d*$/.test(value)) {
        return value; // Return the value as-is if it’s valid but incomplete.
    }

    // Parse the value as a float if it's a complete number.
    const parsed = parseFloat(value);
    return isNaN(parsed)||parsed===0 ? 0 : parsed;
}