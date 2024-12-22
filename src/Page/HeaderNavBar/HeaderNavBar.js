import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import style from './HeaderNavBar.module.css'
import PetsIcon from '@mui/icons-material/Pets';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router';

const HeaderNavBar = () => {
  const navigate=useNavigate()
  return (
    <div className={style['header-nav']}>
        <Box className={style['header-nav-box']} sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"white",color:"black"}}>
        <Toolbar >
        <IconButton className={style['header-nav-icon']} 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
           
          >
            <PetsIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Adopt Me
          </Typography>
          <Button color="inherit" onClick={()=>navigate('/whishList')} ><FavoriteIcon/></Button>
        
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default HeaderNavBar