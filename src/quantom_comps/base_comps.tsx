import { Height, Margin, Padding } from '@mui/icons-material';
import { Button, ButtonProps, TextField, TextFieldProps, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import Grid2 from '@mui/material/Unstable_Grid2';
import { Variant } from '@testing-library/react';
import React from 'react';
import { useQuantomFonts } from '../redux/store';



export const Quantom_Grid=Grid2;
export const Quantom_Paper=Paper;

interface Quantom_Container_Props{
    children?:any
}
export const Quantom_Container= (props?:Quantom_Container_Props)=>{
    return(
       <Grid>
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

  const theme= useTheme();
  const font= useQuantomFonts();
  return(
    <TextField
          component={Paper}
          fullWidth
          disabled={props?.disabled}
          sx={
            { marginTop:'10px','& .MuiInputLabel-root': {
            fontSize: font.H3FontSize,
            fontWeight:'700',
            fontFamily:font.HeaderFont,
            letterSpacing:1.1,
            color:theme?.palette?.secondary?.contrastText
          }, 
          '& .MuiInputBase-input': {
            fontFamily:'Ubuntu',
            fontWeight:'700',       
            fontSize: '11px', // Change this value to adjust the input font size
            Height:'2px',
            
          }
         
        }}
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




