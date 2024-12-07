import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Alert, Button, TextField } from '@mui/material'
import { TextFieldPasswordIcon } from '../CommonComponents/CommonComponent'
import axios from 'axios'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
const LogIn = () => {
const {user,setUser}=useContext(UserContext)
  const [loginUser,setLogInUser]=useState(
    {
      email:"",
      password:"",
    }
  )
  const onInputUpdate=(e,type)=>{
    setLogInUser((p)=>{
      return{...p,[type]:e.target.value}
    })
  }
  const autoLogOut=()=>{
    setTimeout(()=>{
     localStorage.removeItem('user')
     setUser(undefined)
    },1000*60*100)
  }
  const navigate=useNavigate()
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')

  const loginUsers=async(e)=>{
    e.preventDefault()
    try{
    const result=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsjRyK8_iYY5Gm03z8tJxtF1RamUX15YY',
    {
     email:loginUser.email,
     password:loginUser.password, 
    })
    console.log(result)
    localStorage.setItem('user',JSON.stringify(result.data))
    setUser(result.data)
    setSuccess('login Success')
    autoLogOut()
    setTimeout(()=>{
     setSuccess('')
     setError('')
     navigate('/home')
    },[1000*2])
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

  // React.useEffect(()=>{
  // if(user){
  //   navigate(-1)
  // }
  // },[user])
  console.log(loginUser)
  return (
    <div className={style['login-container']}>
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
      <h4>Login Your Account</h4>
      <form onSubmit={loginUsers} >
      <div className={style['input-container']}>
     <TextField fullWidth label="Email" id="email" value={loginUser.email} onChange={(e)=>onInputUpdate(e,'email')} />
     </div>
     <div className={style['input-container']}>
      <TextFieldPasswordIcon label={'Password'} id={'password'} value={loginUser.password}  htmlFor={'password'} onChange={(e)=>onInputUpdate(e,'password')} />
     </div>
     
     <div className={style['input-container']}>
     <Button variant="contained" type='submit'>LogIn</Button>
     </div>
      </form>
    </div>
  )
}

export default LogIn