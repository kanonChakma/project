import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'components/NavBar'
import SideBar from 'components/SideBar'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Box display={isNoneMobile ? "flex": "block"} width="100%" height="100%">
      <SideBar
      isNoneMobile={isNoneMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
       <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
       <Outlet/>
      </Box>
    </Box>
  )
}

export default LayOut
