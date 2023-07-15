import { Box } from '@mui/material'
import NavBar from 'components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
       <NavBar/>
       <Outlet/>
      </Box>
    </Box>
  )
}

export default LayOut
