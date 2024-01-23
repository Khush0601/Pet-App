import React, { useContext } from 'react'
import style from './AppFirst.module.css'
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Button, IconButton, Stack, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserContext } from '../../App';
import Image from '../Image/pet-img.jpg'


const AppFirstPage = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
   const navigate=useNavigate()
    const onSignUpClick=()=>{
    navigate('/signUp')
    }
    const onLogIn=()=>{
        navigate('/logIn')
    }
    const onContinueClick=()=>{
        navigate('/home')
    }
  return (
  <div className={style['appfirstPage']}>
   <div className={style['appHeader']}>
   
    <Box className={style['appIcon']}>
      <IconButton sx={ {color:'blue',borderRadius:"50%",border:"2px solid black",padding:2}} ><PetsIcon/></IconButton>
        <Typography variant='h5'>Adopt Me</Typography>
      </Box>
    <Box className={style['appPetpic']}>
    
      <img className={style['Petsfirstpic']} src={Image} alt='pet-pic' width={100} height={100}/>
   
    </Box>
   </div>
   <div className={style['appFooter']}>
   <div className={style['continueContainer']}>
   <div className={style['continue']}>
     <div onClick={onContinueClick}><ArrowForwardIcon/></div>
     </div>
   </div>
    <Box  className={style['appFooterFirstPart']} >
     <Typography sx={{fontSize:20,fontWeight:"bold",margin:1}}>Easy To Adopt</Typography>
     <Typography sx={{fontSize:15}} >Our perfect companions have  <br/>  fewer than four feet.</Typography>
    </Box>
    {
      !user && <Stack className={style['appFooterRegisterPart']}
      direction="row" spacing={2}>
       <Button variant="contained"onClick={onSignUpClick} >Sign Up</Button>
       <Button variant="contained" onClick={onLogIn} >
        Log In
       </Button>
       
     </Stack>

    }
   </div>
  

  </div>
  )
}

export default AppFirstPage