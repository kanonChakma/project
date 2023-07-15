import { AppBar, Toolbar, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

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
      <Toolbar>
      
      </Toolbar>
    </AppBar>
  )
}

export default NavBar