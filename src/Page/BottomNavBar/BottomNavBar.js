import React, { useContext } from 'react'
import style from './BottomNavBar.module.css'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { UserContext } from '../../App';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
 

const BottomNavBar = () => {
  const {user,setUser}=useContext(UserContext)
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate=useNavigate()
 const onLogOut=()=>{
  localStorage.removeItem('user')
  setUser(undefined)
  alert('logout successfully')
  
 }
 
  return (
    <div  className={style['navBar-container']}>
       <BottomNavigation sx={{ width: 400 }} value={value} onChange={handleChange} >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon onClick={()=>navigate('/home')} />}
       
      />
      <BottomNavigationAction
        label="Favorite"
        value="favorite"
        icon={<FavoriteIcon onClick={()=>navigate('/whishList')} />}
      />
      <BottomNavigationAction
        label="Profile"
        value="userAccount"
        icon={<AccountCircleIcon   onClick={()=>navigate('/userProfile')}/>}
      />
      {/* <BottomNavigationAction label="Log Out" value="logOut"  icon={<LogoutIcon onClick={onLogOut} />} /> */}
      {user ? (
          <BottomNavigationAction
            label="Log Out"
            value="logOut"
            icon={<LogoutIcon onClick={onLogOut} />}
          />
        ) : (
          <BottomNavigationAction
            label="Log In"
            value="logIn"
            icon={<LoginIcon onClick={() => navigate('/logIn')} />}
          />
        )}
    </BottomNavigation>
    </div>
  )
}

export default BottomNavBar