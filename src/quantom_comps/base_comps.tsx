import { Button, ButtonProps, TextField, TextFieldProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Variant } from '@testing-library/react';
import React from 'react';

export const Quantom_Grid=Grid;
export const Quantom_Paper=Paper;

interface Quantom_Container_Props{
    children?:any
}
export const Quantom_Container= (props?:Quantom_Container_Props)=>{
    return(
       <Grid sx={{px:1}} >
          {
            props?.children
          }
       </Grid>
    )
}


export const Quantom_Input=(props: {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: Variant;
} & Omit<TextFieldProps, 'variant'>)=>{

  
  const getValue=()=>{
     if(props?.value){
        return props?.value;
     }
     else if(props?.value===0){
      return props?.value;
     }
     return "";

  }
  return(
    <TextField
          component={Paper}
          fullWidth
          disabled={props?.disabled}
          sx={
            { marginTop:'10px','& .MuiInputLabel-root': {
            fontSize: '16px',
            fontWeight:'900',
            fontFamily:'Oswald'
          }, '& .MuiInputBase-input': {
            fontFamily:'Ubuntu',
            fontSize: '12px', // Change this value to adjust the input font size
          }}}
          InputLabelProps={
              {
                shrink:true,
              }
          }
          label={props.label}
          id="outlined-size-small"
          autoComplete='off'
          
          // defaultValue="Small"
          size="small"
          value={getValue()}
          onChange={props?.onChange}
          inputRef={props?.inputRef}
          onKeyDown={props?.onKeyDown}
        />
  )
}


interface Quantom_ButtonProps{
  text?:string;
  onClick?:()=>void,
  baseProps?:ButtonProps
}
export const Quantom_Button=(props?:Quantom_ButtonProps)=>{

  return(
    <Button variant='outlined' fullWidth size='small'  onClick={props?.onClick} {...props?.baseProps}>{props?.text}</Button>
  )
}