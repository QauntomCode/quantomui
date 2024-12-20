import { Box } from "@mui/material";
import * as React from 'react';

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }


  export const CustomTabPanel=(props: TabPanelProps)=> {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }


 export  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }