import { Box, useMediaQuery } from '@mui/material'
import NavBar from 'components/NavBar'
import SideBar from 'components/SideBar'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetUserQuery } from 'state/api'

const LayOut = () => {
  const isNoneMobile = useMediaQuery('(min-width:600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log({data})
  return (
    <Box display={isNoneMobile ? "flex": "block"} width="100%" height="100%">
      <SideBar
      user={data || {}}
      isNoneMobile={isNoneMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
       <NavBar user={data || {}} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
       <Outlet/>
      </Box>
    </Box>
  )
}

export default LayOut
