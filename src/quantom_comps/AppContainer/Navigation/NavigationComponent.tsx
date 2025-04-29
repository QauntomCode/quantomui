/* eslint-disable react/jsx-pascal-case */

import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';
import { AppContainerTabHelper, generateGUID, IconByName } from '../Helpers/TabHelper/AppContainerTabHelper';
import QuantomTheme from '../../QuantomTheme';
import { Quantom_Grid } from '../../base_comps';
import React from 'react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, useTheme } from '@mui/material';
import { BorderBottom, ExpandLess, ExpandMore, Height, StarBorder } from '@mui/icons-material';
import store, { useQuantomFonts } from '../../../redux/store';
import { open_new_menu } from '../../../redux/reduxSlice';




interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const theme= useTheme();
  const fonts= useQuantomFonts();
  return (

        <>
          <div style={{display:'flex'}}>
             <div style={{width:'200px',height:'calc(100vh)',borderRight:`1px solid ${theme.palette.secondary.main}`,borderLeft:`.5px solid ${theme.palette.secondary.main}`}}>
              <Box style={{width:'100%',height:'100%'}}>
                  <Box component={Paper} display='flex' justifyContent='center' alignItems='center' sx={{fontFamily:fonts?.HeaderFont,
                     fontSize:fonts.H4FontSize,
                     backgroundColor:theme.palette.secondary.dark,

                     color:theme.palette.primary.contrastText,
                     fontWeight:800,letterSpacing:1.5,lineHeight:'3rem',borderBottom:`1px solid ${theme?.palette?.secondary?.main}`}}>
                     QUANTOM CODE
                  </Box>
                  <NestedList />
              </Box>
             </div>
             <div style={{flex:1}}>
                <AppContainerTabHelper/>
             </div>
          </div>
        </>
        
        
        
  );
}








export const NestedList=()=> {
  // const [open, setOpen] = React.useState(true);
  const [modules,setModules]=React.useState<Modules[]>([...MainModulesList])
  const [sModuleState,setSMouleState]=React.useState<SubModule[]>([...subModulesList])
  const [menuState,setMenuState]=React.useState<QuantomMenu[]>([...mainMenusList])

  const handleClick = (type:'module'|'subModule',index:number,moduelCode:string) => {
      if(type==='module'){
         let allmds=[...modules];
         let obj= allmds[index]
         obj.IsOpen=!obj?.IsOpen;
         setModules([...allmds])
      }
      if(type==='subModule'){
        let allmds=[...subModulesList];
        let selectedModulecodes= allmds.filter(x=>x.ModuleCode===moduelCode)
        let obj= selectedModulecodes?.[index]
        if(obj){
        obj.IsOpen=!obj?.IsOpen;
        setSMouleState([...allmds])
        }
     }
  };

  const fonts= useQuantomFonts();
  const theme= useTheme()
  return (
    <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

      {modules?.map((md,mdIndex)=>{
        return(
          <Box component={Paper} sx={{
            fontSize:fonts.RegularFontSize,letterSpacing:1.5,fontFamily:fonts?.HeaderFont,fontWeight:700,
            borderBottom:`1px solid ${theme.palette.secondary.main}`}}>
            <ListItemButton  onClick={()=>(handleClick('module',mdIndex,md?.ModuleCode??""))}>
                <div style={{display:'flex',flex:1,alignItems:'center'}}>
                  <div style={{flex:1}}>
                      <Box>{md?.ModuleName}</Box>
                  </div>
                  <div>
                    <ExpandCollapseIconComp isOPen={md?.IsOpen}/>
                  </div>
                </div>
            </ListItemButton>
            
              <Collapse in={md?.IsOpen??false} timeout="auto" unmountOnExit>
              {
                sModuleState?.filter(x=>x.ModuleCode===md.ModuleCode)?.map((subModule,subIndex)=>{
                  return(
                    <Box component={Paper} sx={{
                      pl:2,
                      fontSize:fonts.RegularFontSize,letterSpacing:1.5,fontFamily:fonts?.HeaderFont,fontWeight:600,
                       color:theme?.palette?.secondary?.contrastText,
                      borderBottom:`1px solid ${theme.palette.secondary.main}`,borderTop:subIndex===0?`1px solid ${theme.palette.secondary.main}`:undefined}}>
                      <List component="div" disablePadding>
                         <ListItemButton  onClick={()=>{handleClick('subModule',subIndex,md?.ModuleCode??"")}}>
                            <div style={{display:'flex',flex:1,alignItems:'center'}}>
                              <div style={{flex:1}}>
                                  <Box>{subModule.SubModuleName}</Box>
                              </div>
                              <div>
                                <ExpandCollapseIconComp isOPen={md?.IsOpen}/>
                              </div>
                            </div>
                        </ListItemButton>
                      </List>

                        <Collapse in={subModule?.IsOpen??false} timeout="auto" unmountOnExit>
                        {
                          menuState?.filter(x=>x.ModuleCode===md.ModuleCode && x.SubModuleCode===subModule?.SubModuleCode)?.map((menu,menIndex)=>{
                           

                            return(
                              <Box component={Paper} sx={{
                                pl:2,
                                fontSize:fonts.RegularFont,letterSpacing:1.5,fontFamily:fonts?.HeaderFont,fontWeight:500,
                                color:theme?.palette?.secondary?.contrastText,
                                borderBottom:`1px solid ${theme.palette.secondary.main}`,borderTop:menIndex===0?`1px solid ${theme.palette.secondary.main}`:undefined }}>
                                <List component="div" disablePadding>
                                   <ListItemButton onClick={async()=>{
                                    let res= await generateGUID();
                                    store.dispatch(open_new_menu({
                                      MenuCode:menu?.MenuCode,
                                      MenuCaption:menu?.MenuName,
                                      UniqueKeyNo:res
                                    }))
                                   }} >
                                      <div style={{display:'flex',flex:1,alignItems:'center'}}>
                                        <div style={{flex:1}}>
                                            <Box>{menu?.MenuName}</Box>
                                        </div>
                                      </div>
                                  </ListItemButton>
                                </List>
                                </Box>
                            )
                          })
                        }
                        </Collapse>
                        </Box>
                  )
                })
              }
              </Collapse>

              
            </Box>
        )
      })}

      </List>
    </>
    
  );
}

interface ExpandCollapseIconProps{
  isOPen?:boolean
}
export const ExpandCollapseIconComp=(props?:ExpandCollapseIconProps)=>{
 

  
    return   props?.isOPen ? (<ExpandLess  sx={{fontSize:'18px'}}/>) : (<ExpandMore  sx={{fontSize:'18px'}}/>)
  
}

export const MainModulesList:Modules[]=[
  {
    ModuleCode:'001',
    ModuleName:'Account',
    SortNumber:1,
    IsOpen:false
  },
  {
    ModuleCode:'003',
    ModuleName:'Inventory',
    SortNumber:1,
    IsOpen:false
  },
  {
    ModuleCode:'005',
    ModuleName:'Sale',
    SortNumber:1,
    IsOpen:false
  },
  {
    ModuleCode:'007',
    ModuleName:'Purchase',
    SortNumber:1,
    IsOpen:false
  },
  {
    ModuleCode:'013',
    ModuleName:'Payments',
    SortNumber:1,
    IsOpen:false
  },
  {
    ModuleCode:'014',
    ModuleName:'Payroll',
    SortNumber:1,
    IsOpen:false
  }
]

export const subModulesList:SubModule[]=[
  {
    SubModuleCode:'01',
    SubModuleName:'Config',
    ModuleCode:'001',
    SortNumber:1
  },
  {
    SubModuleCode:'02',
    SubModuleName:'Processing',
    ModuleCode:'001',
    SortNumber:1
  },
  {
    SubModuleCode:'03',
    SubModuleName:'Reports',
    ModuleCode:'001',
    SortNumber:1
  },
  {
    SubModuleCode:'01',
    SubModuleName:'Config',
    ModuleCode:'003',
    SortNumber:1
  },
  {
    SubModuleCode:'02',
    SubModuleName:'Processing',
    ModuleCode:'003',
    SortNumber:1
  },
  {
    SubModuleCode:'03',
    SubModuleName:'Reports',
    ModuleCode:'003',
    SortNumber:1
  },
  {
    SubModuleCode:'01',
    SubModuleName:'Config',
    ModuleCode:'005',
    SortNumber:1
  },
  {
    SubModuleCode:'02',
    SubModuleName:'Processing',
    ModuleCode:'005',
    SortNumber:1
  },
  {
    SubModuleCode:'01',
    SubModuleName:'Config',
    ModuleCode:'007',
    SortNumber:1
  },
  {
    SubModuleCode:'02',
    SubModuleName:'Processing',
    ModuleCode:'007',
    SortNumber:1
  },
  {
    SubModuleCode:'02',
    SubModuleName:'Processing',
    ModuleCode:'013',
    SortNumber:1
  },

  {
    SubModuleCode:'01',
    SubModuleName:'Config',
    ModuleCode:'014',
    SortNumber:1
  },
]
export const mainMenusList:QuantomMenu[]=[
  {
    MenuCode:'001-001',
    MenuName:'Main Account',
    ModuleCode:'001',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'001-002',
    MenuName:'Sub Account',
    ModuleCode:'001',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'001-003',
    MenuName:'Sub Sub Account',
    ModuleCode:'001',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'001-004',
    MenuName:'Register Account',
    ModuleCode:'001',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'001-006',
    MenuName:'Opening Balance',
    ModuleCode:'001',
    SubModuleCode:'02',
    SortNumber:1
  },
  {
    MenuCode:'001-009',
    MenuName:'Petty Cash',
    ModuleCode:'001',
    SubModuleCode:'02',
    SortNumber:1
  },
  {
    MenuCode:'001-008',
    MenuName:'Voucher',
    ModuleCode:'001',
    SubModuleCode:'02',
    SortNumber:1
  },
  {
    MenuCode:'002-001',
    MenuName:'General Ledger',
    ModuleCode:'001',
    SubModuleCode:'03',
    SortNumber:1
  },
  {
    MenuCode:'001-010',
    MenuName:'Detail Ledger',
    ModuleCode:'001',
    SubModuleCode:'03',
    SortNumber:1
  },
  {
    MenuCode:'003-001',
    MenuName:'Unit',
    ModuleCode:'003',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'003-002',
    MenuName:'Category',
    ModuleCode:'003',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'003-003',
    MenuName:'Brand',
    ModuleCode:'003',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'003-030',
    MenuName:'Price Group',
    ModuleCode:'003',
    SubModuleCode:'01',
    SortNumber:1
  },
  {
    MenuCode:'003-004',
    MenuName:'Inventory Items',
    ModuleCode:'003',
    SubModuleCode:'01',
    SortNumber:0
  },
  {
    MenuCode:'005-007',
    MenuName:'Sale',
    ModuleCode:'005',
    SubModuleCode:'02',
    SortNumber:0
  },
  {
    MenuCode:'005-007_01',
    MenuName:'Restaurant Sale',
    ModuleCode:'005',
    SubModuleCode:'02',
    SortNumber:0
  },
  {
    MenuCode:'007-003',
    MenuName:'Purchase',
    ModuleCode:'007',
    SubModuleCode:'02',
    SortNumber:0
  },
  {
    MenuCode:'013-003',
    MenuName:'Supplier Payments',
    ModuleCode:'013',
    SubModuleCode:'02',
    SortNumber:0
  },
  {
    MenuCode:'013-004',
    MenuName:'Customer Receipts',
    ModuleCode:'013',
    SubModuleCode:'02',
    SortNumber:0
  },
  {
    MenuCode:'014-001',
    MenuName:'Employee Profile',
    ModuleCode:'014',
    SubModuleCode:'01',
    SortNumber:0
  }

]



export interface QuantomMenu{
   MenuCode?:string;
   MenuName?:string;
   ModuleCode?:string;
   SubModuleCode?:string;
   SortNumber?:number;
}


export interface Modules{
   ModuleCode?:string;
   ModuleName?:string;
   ModuleIcon?:string;
   SortNumber?:number;
   IsOpen?:boolean;
}

export interface SubModule{
    SubModuleCode?:string;
    SubModuleName?:string;
    SubModuleIcon?:string;
    ModuleCode?:string;
    SortNumber?:number;
    IsOpen?:boolean;
}

