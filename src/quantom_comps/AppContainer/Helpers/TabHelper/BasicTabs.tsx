import { Box, colors, IconButton, Paper, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { a11yProps, CustomTabPanel } from "./TabPanelprops";
import CloseIcon from "@mui/icons-material/Close";
import store, { get_selected_menu_index, remove_menu, useQuantomFonts } from "../../../../redux/store";

import { useTheme } from "@mui/material/styles";
import { QuantomColors } from "../../../QuantomTheme";
import { useSelector } from "react-redux";
import { set_selected_menu_index } from "../../../../redux/reduxSlice";
import { Opacity } from "@mui/icons-material";


export default function BasicTabs(props?: BasicTabPropsInfo) {
  
  // const [value, setValue] = React.useState(0);
  const [hoveredTab, setHoveredTab] = React.useState(-1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // setValue(newValue);
    // alert(newValue)
    // set_selected_menu_index(newValue)
  };

    const tabHeight="40px"
  const th= useTheme();
  const fonts= useQuantomFonts();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props?.selectedTabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          //  sx={{ minHeight: tabHeight, // Overall tabs height
          //   '& .MuiTab-root': {
          //     minHeight: tabHeight,
          //     paddingTop: 0,
          //     paddingBottom: 0,
          //   }, }}
        >
          {props?.tabs?.map((item, index) => {
            function handleTabClose(index: number): void {
              if(index!==0){
                props?.OnRemoveClick?.(index)
              }
             // remove_menu(index)
            }

            return (
              <Tab
              key={index}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    // minHeight:tabHeight
                  }}
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(-1)}
                >
                  {item?.Caption}
                  {hoveredTab === index && props?.willShowRemoveButton && index !== 0 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // prevents triggering tab change
                        handleTabClose(index);
                      }}
                      sx={{
                        padding: 0,
                        ml: 0.5,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              }
              {...a11yProps(index)}
              onClick={() => props?.onTabClick?.(index)}
              sx={{
                border: "1px solid black",
                fontSize: "12px",
                // fontWeight: "bold",
                fontFamily: fonts?.HeaderFont,
                letterSpacing: 1,
                backgroundColor: index === props?.selectedTabIndex
                  ? th.palette?.secondary?.main
                  : th?.palette?.primary.main,
                color: th?.palette?.primary?.contrastText,
                minWidth: 100, // Optional: ensures some responsive behavior
              }}
            />
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
          <Box Component={{Paper}}>
          <CustomTabPanel value={props?.selectedTabIndex} index={index}>
            {item?.Component}
          </CustomTabPanel>
          </Box>
        );
      })}
    </Box>
  );
}

export interface BasicTabPropsInfo {
  tabs: BasicTabProps[];
  onTabClick?:(index?:number)=>void;
  selectedTabIndex:number;
  willShowRemoveButton?:boolean
  OnRemoveClick?:(index?:number)=>void
}

export interface BasicTabProps {
  Component?: React.ReactNode;
  Caption?: string;
}
