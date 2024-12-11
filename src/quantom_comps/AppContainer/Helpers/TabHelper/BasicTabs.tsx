import { Box, colors, IconButton, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { a11yProps, CustomTabPanel } from "./TabPanelprops";
import CloseIcon from "@mui/icons-material/Close";
import store, { get_selected_menu_index, remove_menu } from "../../../../redux/store";

import { useTheme } from "@mui/material/styles";
import { QuantomColors } from "../../../QuantomTheme";
import { useSelector } from "react-redux";
import { set_selected_menu_index } from "../../../../redux/reduxSlice";


export default function BasicTabs(props?: BasicTabPropsInfo) {
  const value=useSelector((state:any)=>get_selected_menu_index(state));
  // const [value, setValue] = React.useState(0);
  const [hoveredTab, setHoveredTab] = React.useState(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // setValue(newValue);
    alert(newValue)
    // set_selected_menu_index(newValue)
  };

  const tabHeight="20px"
  const th= useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ minHeight: tabHeight }}
        >
          {props?.tabs?.map((item, index) => {
            function handleTabClose(index: number): void {
             remove_menu(index)
            }

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  minHeight: tabHeight,
                }}
                onClick={()=>{
                  
                   store.dispatch( set_selected_menu_index(index))
                }}
                
                onMouseEnter={() => setHoveredTab(index)}
                onMouseLeave={() => setHoveredTab(-1)}
              >
                <Tab
                  label={item?.Caption}
                  {...a11yProps}
                  sx={{
                    borderLeft: "1px solid black",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    // backgroundColor:th?.palette?.primary?.main,
                    minHeight: tabHeight,
                    borderRight: /*index+1===props?.tabs?.length*/ true
                      ? "1px solid black"
                      : undefined,
                    // borderLeftWidth:'.5px',
                    borderTopLeftRadius: "10px",
                    transform: "none",
                    fontWeight: "bold",
                    fontSize: "8px",
                    // padding: "2px 4px",
                    paddingRight:'30px',
                    paddingLeft:'30px',

                    fontFamily: "Oswald",
                    letterSpacing: 1.2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor:index===(value??0)?th.palette?.primary?.main:th?.palette?.secondary?.light,
                    color:index===(value??0)?th?.palette?.primary?.contrastText:th?.palette?.secondary?.contrastText,
                  }}
                ></Tab>
                {hoveredTab === index && (
                  <IconButton
                    size="small"
                     onClick={(e) => {
                      e.preventDefault();
                      handleTabClose(index)
                     }}
                    sx={{
                      position: "absolute",
                      right: 2,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontWeight:'bold',
                      // color:'darkred',
                      // backgroundColor:'red'
                    }}
                  >
                    <CloseIcon fontSize="small"   />
                  </IconButton>
                )}
              </Box>
            );
          })}
          {/* <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel> */}

      {props?.tabs?.map((item, index) => {
        return (
          <>
          <CustomTabPanel value={value??0} index={index}>
            {item?.Component}
          </CustomTabPanel>
          </>
        );
      })}
    </Box>
  );
}

export interface BasicTabPropsInfo {
  tabs: BasicTabProps[];
}

export interface BasicTabProps {
  Component?: React.ReactNode;
  Caption?: string;
}
