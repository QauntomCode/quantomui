import { BorderBottom, Height, Margin, Padding } from '@mui/icons-material';
import { Box, Button, ButtonProps, FilledInput, FormControl, Grid2, InputAdornment, InputLabel, OutlinedInput, TextField, TextFieldProps, useTheme } from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// import Grid2 from '@mui/material/Unstable_Grid2';
import { Variant } from '@testing-library/react';
import React from 'react';
import { useQuantomFonts } from '../redux/store';
import SearchIcon from '@mui/icons-material/Search';
import { IconByName } from './AppContainer/Helpers/TabHelper/AppContainerTabHelper';
import { ListCompButton } from '../quantom_ui/account/report/Ledger/view/LedgerView';



export const Quantom_Grid=Grid2;
export const Quantom_Paper=Paper;

interface Quantom_Container_Props{
    children?:any
}
export const Quantom_Container= (props?:Quantom_Container_Props)=>{
    return(
       <Quantom_Grid>
          {
            props?.children
          }
       </Quantom_Grid>
    )
}


 const Quantom_Input_Old=(props: {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: Variant;
  willHandleTabOnEnter?:boolean;
  willDisableBorder?:boolean;
  willDisablePaper?:boolean;

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

  const handleKeyDown = (event:any) => {
    
      if (event.keyCode === 13 && !props?.willHandleTabOnEnter) {
       const focusableElements:any = Array.from(document.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])'));
        const currentIndex = focusableElements.indexOf(event.target);

        if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
          // Focus on the next element in the tab order
          focusableElements[currentIndex + 1]?.focus();
        }
      }
      
    

    else{
      // alert(event.key)
      props?.onKeyDown?.(event);
    }
  };


  const theme= useTheme();
  const font= useQuantomFonts();
  return(
    <TextField
          component={ props?.willDisablePaper? undefined:Paper}
          
          fullWidth
          disabled={props?.disabled}
          sx={
            { marginTop:'10px','& .MuiInputLabel-root': {
            fontSize: font.H3FontSize,
            fontWeight:'700',
            fontFamily:font.HeaderFont,
            letterSpacing:1.1,
            color:theme?.palette?.secondary?.contrastText,
            
          }, 
          '& .MuiInputBase-input': {
            fontFamily:'Ubuntu',
            fontWeight:'700',       
            fontSize: '11px', // Change this value to adjust the input font size
            Height:'2px',
            // border:'none'
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border : props?.willDisableBorder?"none":undefined,
          },
         
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
          onKeyDown={handleKeyDown}

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







export const Quantom_Input1=(props: {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: Variant;
  willHandleTabOnEnter?:boolean;
  willDisableBorder?:boolean;
  willDisablePaper?:boolean;
  willHideLabel?:boolean;
  rightIcons?:RightSideIconsProps[]

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

  const handleKeyDown = (event:any) => {
    
      if (event.keyCode === 13 && !props?.willHandleTabOnEnter) {
       const focusableElements:any = Array.from(document.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])'));
        const currentIndex = focusableElements.indexOf(event.target);

        if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
          // Focus on the next element in the tab order
          focusableElements[currentIndex + 1]?.focus();
        }
      }
      
    

    else{
      // alert(event.key)
      props?.onKeyDown?.(event);
    }
  };


  const theme= useTheme();
  const font= useQuantomFonts();

  return(
    <Box fullWidth component={ props?.willDisablePaper? undefined:Paper} sx={{ mt:.5,width:'100%'}}>
    <FormControl   fullWidth variant="outlined">
    {props?.willHideLabel?(<></>):(
      <InputLabel shrink sx={{ 
        // fontSize: '20px',
                fontWeight:'bold',
                letterSpacing:1.2,
                fontFamily:font.HeaderFont,
                color:theme?.palette?.text.primary,
                opacity:0.6
                }}>{props?.label}</InputLabel>
    )}
    
    <OutlinedInput
          
          id={props?.id}
          fullWidth
          multiline={props?.multiline}
          maxRows={props?.maxRows}
          disabled={props?.disabled}
          type={props?.type}
          sx={{
                borderBottom:`1px solid ${theme.palette.secondary.contrastText}`,
                fontFamily:font.HeaderFont,
                fontSize:'14px',
                // fontWeight:'700',       
                // fontSize: '11px', // Change this value to adjust the input font size
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  // borderColor: 'red', // Change border color on focus
                  borderColor:theme?.palette?.primary?.light,
                  // color:'black'
                },
          // marginTop:'10px','& .MuiInputLabel-root': {
          //   fontSize: font.H3FontSize,
          //   fontWeight:'700',
          //   fontFamily:font.HeaderFont,
          //   letterSpacing:1.1,
          //   color:theme?.palette?.secondary?.contrastText,
            
          // }, 
          // '& .MuiInputBase-input': {
          //   fontFamily:'Ubuntu',
          //   fontWeight:'700',       
          //   fontSize: '11px', // Change this value to adjust the input font size
          //   Height:'2px',
          //   // border:'none'
          // },
          // "& .MuiOutlinedInput-notchedOutline": {
          //   border : props?.willDisableBorder?"none":undefined,
          // },
         
        }
      }

          label={props.label}
          // id="outlined-size-small"
          autoComplete='off'
          size= {props?.size?? "small"}
          value={getValue()}
          onChange={props?.onChange}
          inputRef={props?.inputRef}
          onKeyDown={handleKeyDown}
          // inputComponent={Paper}

          endAdornment={
               (props?.rightIcons?.length??0)>0?(
                <>
                  <RenderButtonIcons icons={props?.rightIcons} />
                </>
                  ):(<></>)
           }

        />
      

</FormControl>
</Box>
  )
}

interface RenderButtonIconsProps{
  icons?:RightSideIconsProps[]
}

const RenderButtonIcons=(props?:RenderButtonIconsProps)=>{

  return(
    <InputAdornment position="end">
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:'-10px'}}>
                {
                  props?.icons?.map((item,index)=>{
                    return(
                      <ListCompButton  marginTop='0px' ignoreFocus iconName={item?.IconName} onClick={item?.OnClick}/>
                    )
                  })
                }
{/*                
                <ListCompButton marginTop='0px' ignoreFocus iconName='NoteAddTwoTone'/>
                <ListCompButton marginTop='0px' ignoreFocus iconName='NoteAddTwoTone'/> */}

              </div>
            </InputAdornment>
  )
}

export interface RightSideIconsProps{
  IconName?:string;
  OnClick?:()=>void;
}


export  const Quantom_Input= Quantom_Input1;