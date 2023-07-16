import {
  DarkModeOutlined, LightModeOutlined, Menu as MenuIcon,
  Search,
  SettingsOutlined
} from "@mui/icons-material";
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import FlexBetween from './FlexBetween';


const NavBar = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  
  return (
    <AppBar 
    sx={{
      position: "static",
      background: "none",
      boxShadow: "none"
    }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}}>
        
        <FlexBetween onClick={() => console.log('open/close slidebar')}>
           <IconButton>
             <MenuIcon/>
           </IconButton>
           
           <FlexBetween
             backgroundColor = {theme.palette.background.alt}
             borderRadius="9px"
             gap="3rem"
             padding="0.1rem 1.5rem"
           >
              <InputBase placeholder='Search..'/>
              <IconButton>
               <Search/>
              </IconButton>
           </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {
              theme.palette.mode === "dark"?(
                <DarkModeOutlined sx={{fontSize: "25px"}}/>
              ):(
                <LightModeOutlined sx={{fontSize: "25px"}}/>
              )
            }
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{fontSize: "25px"}}/>
          </IconButton>
         
        </FlexBetween>
      
        </Toolbar>
    </AppBar>
  )
}

export default NavBar