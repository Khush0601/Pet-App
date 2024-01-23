import React, { useContext, useState } from 'react'
import style from './UserProfile.module.css'
import { Avatar, Box, Button, Divider, IconButton, Input, Modal, Typography } from '@mui/material'
import { UserContext } from '../../App'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const stylee = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UserProfile = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  console.log(userFullDetails)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[userEdit,setUserEdit]=useState(
   {
    name:"",
    image:[''],
   }
    )
    const onEdit=(e,type)=>{
     if(type==='name')
      setUserEdit((p)=>{
       return {...p,name:e.target.value}
      })
     else{
      setUserEdit((p)=>{
        return {...p,image:[e.target.value]}
      })
    }
  }
  const navigate=useNavigate()
  const onEditFormSubmit=async(e)=>{
   e.preventDefault()
   if(userEdit?.name==='' && userEdit?.image[0]===''){
    return
   }
   try{
  if(userEdit?.name!=='' && userEdit?.image[0]!==''){
    const editResult=await axios.post(`https://pet-addoption.onrender.com/petApp/api/v1/userDetails/userUpdate/${userFullDetails?.id}`,
    userEdit
    )
    console.log(editResult)
    setUserFullDetails(editResult.data)
  }
  else if(userEdit?.name!=='' && userEdit?.image[0]===''){
    const editResult=await axios.post(`https://pet-addoption.onrender.com/petApp/api/v1/userDetails/userUpdate/${userFullDetails?.id}`,
    {
      name:userEdit?.name
    }
    )
    console.log(editResult)
    setUserFullDetails(editResult.data)
  }
  else if(userEdit?.name==='' && userEdit?.image[0]!==''){
    const editResult=await axios.post(`https://pet-addoption.onrender.com/petApp/api/v1/userDetails/userUpdate/${userFullDetails?.id}`,
    {
      image:userEdit?.image
    }
    )
    console.log(editResult)
    setUserFullDetails(editResult.data)
  }
   }
   catch(e){
    console.log(e)
   }
   handleClose()
  }

  const viewOrder=()=>{
    navigate('/order')
  }

    console.log(userEdit)

  return (
    <div className={style['userProfile-container']}>
      <div className={style['userProfile-icon']}>
        <div className={style['back']}><ArrowBackIcon onClick={()=>navigate(-1)}/></div>
        <h3>UserProfile</h3>
        <Divider/>
        <div className={style['icon']}><Avatar sx={{width:70,height:70}} alt={userFullDetails?.name} src={userFullDetails?.image[0]} /></div>
      </div>
      <form >
       <div className={style['input']} >
       <label>Name:</label>
       <input type='text' value={userFullDetails?.name} placeholder='type name' disabled/>
       </div>
       <div className={style['input']}>
        <label>age:</label>
       <input type='text' placeholder='type age' value={userFullDetails?.age} disabled />
       </div>
       <div className={style['input']}>
       <label>sex:</label>
       <input type='text' placeholder='type sex' value={userFullDetails?.sex} disabled />
       </div >
      <div className={style['edit']}> 
      <IconButton  color='primary' size="large" onClick={handleOpen}>
       <EditIcon fontSize="inherit" />
        </IconButton>

      </div>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={stylee}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
       Edit your details
      </Typography>
     <form onSubmit={onEditFormSubmit}>
      <Input sx={{marginBottom:2}} type='text' placeholder='type name' onChange={(e)=>onEdit(e,'name')} />
      <Input  sx={{marginBottom:2}} type='text' placeholder='type image url' onChange={(e)=>onEdit(e,'image')}/>
      <Button variant="contained" type='submit' disabled={userEdit?.name==='' &&  userEdit?.image[0]===''}>save</Button>
    </form>
    </Box>
      </Modal>
      <Button variant="contained" onClick={viewOrder}>view order</Button>
    </div>
  )
}

export default UserProfile