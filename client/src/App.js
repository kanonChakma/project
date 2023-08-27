import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from 'scenes/Dashboard';
import LayOut from 'scenes/Layout';
import Products from 'scenes/Products';
import { themeSettings } from 'theme';


const App = () => {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  
  return (
    <div className='app'>
      <BrowserRouter>
       <ThemeProvider theme={theme}>
         <CssBaseline/>
         <Routes>
          <Route element={<LayOut/>}>
            <Route path='/' element={<Navigate to="/dashboard" replace />}/>
            <Route path='/dashboard' element={<Dashboard/>} />  
            <Route path="/products" element={<Products />} />
          </Route>
         </Routes>
       </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App