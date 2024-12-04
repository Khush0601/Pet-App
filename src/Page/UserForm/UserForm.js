import React, { useContext, useState } from 'react'
import style from './UserForm.module.css'
import { UserContext } from '../../App'
import { Alert, Button, Divider } from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const UserForm = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  const[userForm,setUserForm]=useState(
    {
      name:"",
      gender:"",
      age:"",
      id:"",
      image:[''],
    }
  )
  React.useEffect(()=>{
   setUserForm((p)=>{
    return{...p,id:user?.localId}
   })
  },[user?.localId])

  const onUserFormUpdate=(e,type)=>{
    if(type==='image'){
    setUserForm((p)=>{
    return{...p,image:[e.target.value]}
    })
    }
    else{
      setUserForm((p)=>{
        return{...p,[type]:e.target.value}
      })
    }
  }
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
  const navigate=useNavigate()
  const onSubmit=async(e)=>{
   e.preventDefault()
   try{
   const userFormData=await axios.post('https://pet-addoption.onrender.com/petApp/api/v1/userDetails',
   userForm
  )
  setUserFullDetails(userFormData.data)
  setSuccess('Details filled successfully')
  setTimeout(()=>{
   setSuccess('')
   setError('')
   navigate('/logIn')
  },[1000*2])
  
   }
   catch(e){
    setError(e.message)
    setSuccess('')
    setTimeout(()=>{
     setError('')
    },[1000*2])
   }
  }
  console.log(user?.localId)
  console.log(userForm)
  return (
    <div className={style['form-container']}>
      <>
      {
        error && <Alert variant="filled" severity="error">
        {error}
      </Alert>
      }
      {
        success && <Alert variant="filled" severity="success">
        {success}
       </Alert>
      }
      </>
      <h3>User Details...</h3>
      <Divider/>
     <form onSubmit={onSubmit}>
        <div className={style['input-container']}>
            <label>name:</label>
            <input type='text' placeholder='type name' value={userForm.name} onChange={(e)=>onUserFormUpdate(e,'name')}/>
        </div>
        <div className={style['input-container']}>
            <label>sex:</label>
            <input type='text' placeholder='type gender' value={userForm.gender} onChange={(e)=>onUserFormUpdate(e,'gender')}/>
        </div>
        <div className={style['input-container']}>
            <label>age:</label>
            <input type='text' placeholder='type age' value={userForm.age} onChange={(e)=>onUserFormUpdate(e,'age')}/>
        </div>
        <div className={style['input-container']}>
            <label>Image:</label>
            <input type='text' placeholder='Enter Image URL' value={userForm.image[0]} onChange={(e)=>onUserFormUpdate(e,'image')}/>
        </div>
        <div className={style['input-container']}>
            <label>Id:</label>
            <input type='text' placeholder='id' value={userForm.id}  disabled/>
        </div>
      
       <Button type='submit' variant='contained' fullWidth  >Submit</Button>
     
     </form>
    </div>
  )
}

export default UserForm