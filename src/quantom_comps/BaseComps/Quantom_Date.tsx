import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { Variant } from '@testing-library/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import { DateTimePicker, DesktopDatePicker, PickerValidDate } from '@mui/x-date-pickers';
import { Quantom_Input } from '../base_comps';
import { Paper, TextField } from '@mui/material';
import { Component } from 'ag-grid-community';

export const QUANTOM_Date =<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>
                            (props: DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>)=>{
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
   
      <DatePicker
        label={props?.label}
        value={props?.value}
        sx={intputSx}
        
        onChange={props?.onChange}
        // slotProps={{textField:{size:'samll',Component:Paper}}}
         slotProps={{ textField: { size: 'small',component:Paper,InputLabelProps:{shrink:true}/*sx:{intputSx},InputLabelProps:{shrink:true}*/ } }}
        
       />
   
  </LocalizationProvider>
  );
};


const intputSx={ marginTop:'10px','& .MuiInputLabel-root': {
    fontSize: '16px',
    fontWeight:'900',
    fontFamily:'Oswald'
  }, '& .MuiInputBase-input': {
    fontFamily:'Ubuntu',
    fontSize: '12px', // Change this value to adjust the input font size
  }}