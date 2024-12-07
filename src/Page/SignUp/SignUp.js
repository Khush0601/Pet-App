import React, { useContext, useState } from 'react'
import style from './SignUp.module.css'
import { Alert, Button, TextField } from '@mui/material'
import { TextFieldPasswordIcon } from '../CommonComponents/CommonComponent'
import axios from 'axios'
import{ useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const SignUp = () => {
  const {user,setUser}=useContext(UserContext)
const navigate=useNavigate()
  const [registerUser,setRegisterUser]=useState(
   { email:"",
    password:"",
    confirmPassword:""
  }
  )
  const onInputUpdate=(e,type)=>{
   setRegisterUser((p)=>{
    return{...p,[type]:e.target.value}
   })
  }
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
  
  const registerUsers=async(e)=>{
    e.preventDefault()
    if(!registerUser?.email || !registerUser?.password || !registerUser?.confirmPassword ){
     setError('required field cannot be empty')
     setSuccess('')
     setTimeout(() => {
      setError("");
  }, 2000);
  return;
  }

  if (registerUser.password !== registerUser.confirmPassword) {
    setError("Password and confirm password should  match");
    setSuccess("");
    setTimeout(() => {
        setError("");
    }, 2000);
    return;
}
   try{
    const result=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsjRyK8_iYY5Gm03z8tJxtF1RamUX15YY',
    {
     email:registerUser.email,
     password:registerUser.password,
    })
    console.log(result)
    setUser(result.data)
    setSuccess('register Success')
    setError('')
    setTimeout(()=>{
    setSuccess('')
    navigate('/userForm')
    },[1000])
    }
    catch(e){
   console.log(e)
   setError(e.message)
   setSuccess('')
   setTimeout(()=>{
    setError('')
   },[1000*2])
    }
  }
  console.log(registerUser)
  return (
    <div className={style['signUp-container']} >
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
      <h4>Register Your Account</h4>
     <form onSubmit={registerUsers}>
     <div className={style['input-container']}>
     <TextField fullWidth label="Email" id="email" value={registerUser.email} onChange={(e)=>onInputUpdate(e,'email')} />
     </div>
     <div className={style['input-container']}>
      <TextFieldPasswordIcon label={'Password'} id={'password'}  value={registerUser.password} htmlFor={'password'} onChange={(e)=>onInputUpdate(e,'password')}/>
     </div>
     <div className={style['input-container']}>
     <TextFieldPasswordIcon label={'Confirm password'} id={'confirmPassword'} value={registerUser.confirmPassword} htmlFor={'confirmPassword'} onChange={(e)=>onInputUpdate(e,'confirmPassword')}/>
     </div>
     <div className={style['input-container']}>
     <Button variant="contained" type='submit'>SignUp</Button>
     </div>
    </form>
    </div>
  )
}

export default SignUp