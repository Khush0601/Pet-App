import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { Navigate } from 'react-router'

const PrivateRoutes = ({children}) => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  console.log(userFullDetails)
 if(user){
  return   <>{ children }</>
  
  
 }
 else{
  return <Navigate  to="/logIn"/>
 }
}

export default PrivateRoutes