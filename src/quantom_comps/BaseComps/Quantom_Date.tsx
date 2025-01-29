import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { Variant } from '@testing-library/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import { DesktopDatePicker, PickerValidDate } from '@mui/x-date-pickers';
import { Quantom_Input } from '../base_comps';
import { Paper, TextField, useTheme } from '@mui/material';
import { Component } from 'ag-grid-community';

import dayjs, { Dayjs } from 'dayjs';
import { useQuantomFonts } from '../../redux/store';

export const QUANTOM_Date =<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>
                            (props: DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>)=>{
  
  // React.useEffect(()=>{
  //       let date: any= dayjs(new Date());
  //       let context:any={}
  //      props?.onChange?.(date,context)
  // },[])

  const fonts = useQuantomFonts()
  const theme= useTheme();

  const inputSx={ marginTop:'5px','& .MuiInputLabel-root': {
    
    fontWeight:'bold',
    letterSpacing:1.2,
    fontFamily:fonts.HeaderFont,
    color:theme?.palette?.text.primary,
    opacity:0.6

  }, '& .MuiInputBase-input': {
    borderBottom:`1px solid ${theme.palette.secondary.contrastText}`,
    fontFamily:fonts.HeaderFont,
    fontSize:'14px',
    // fontWeight:'700',       
    // fontSize: '11px', // Change this value to adjust the input font size
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      // borderColor: 'red', // Change border color on focus
      borderColor:theme?.palette?.primary?.light,
      // color:'black'
    },
    // fontFamily:'Ubuntu',
    // fontWeight:500,
    //  fontSize: '14px', 
    // Change this value to adjust the input font size
  }}

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
   
      <DatePicker
        label={props?.label}
        value={props?.value}
        sx={inputSx}
        
        onChange={props?.onChange}
        // slotProps={{textField:{size:'samll',Component:Paper}}}
         slotProps={{ textField: { fullWidth:true, size: 'small',component:Paper,InputLabelProps:{shrink:true}/*sx:{intputSx},InputLabelProps:{shrink:true}*/ } }}
        
       />
   
  </LocalizationProvider>
  );
};


