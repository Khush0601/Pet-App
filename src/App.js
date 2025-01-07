import React, { createContext, useEffect, useState } from 'react'
import AppFirstPage from './Page/AppfirstPage/AppFirstPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './Page/SignUp/SignUp'
import LogIn from './Page/LogIn/LogIn'
import Home from './Page/Home/Home'
import UserProfile from './Page/UserProfile/UserProfile'
import WhisList from './Page/WhisList/WhisList'
import PrivateRoutes from './Page/PrivateRoutes/PrivateRoutes'
import PetDetails from './Components/PetDetails/PetDetails'
import Message from './Components/Message/Message'
import Call from './Components/Call/Call'
import UserForm from './Page/UserForm/UserForm'
import axios from 'axios'
import Payment from './Page/Payment/Payment'
import Order from './Page/Order/Order'
import PaymentSuccess from './Page/PaymentSuccess/PaymentSuccess'

export const UserContext=createContext()
 const App = () => {
  const [user,setUser]=useState(undefined)
  const [userFullDetails,setUserFullDetails]=useState(undefined)

 useEffect(()=>{
  let userData=JSON.parse(localStorage.getItem('user'));
  if(userData){
    setUser(userData)
  }
  },[])
 
 React.useEffect(()=>{
  const fetchResponse=async()=>{
    if(!user?.localId){
      return
    }
    try{
   let result= await axios.get(`https://pet-addoption.onrender.com/petApp/api/v1/user/${user?.localId}`)
   setUserFullDetails(result.data)
    }
    catch(e){
      console.log(e)
    }}
   fetchResponse()
 },[user?.localId])
 
  let userContextData={
    user:user,
    setUser:setUser,
    userFullDetails:userFullDetails,
    setUserFullDetails:setUserFullDetails,

  }
  console.log(userFullDetails)
  return (
   <UserContext.Provider value={userContextData}>
     <BrowserRouter>
    <Routes>
      <Route index element={<Navigate to='/landingPage'/>}/>
      <Route path='/landingPage' element={<AppFirstPage/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/userProfile' element={<PrivateRoutes><UserProfile/></PrivateRoutes>}/>
      <Route path='/whishList' element={<PrivateRoutes><WhisList/></PrivateRoutes>}/>
      <Route path='/petDetails/:id' element={<PetDetails/>}/>
      <Route path='/message' element={<Message/>}/>
      <Route path='/call' element={<Call/>}/>
      <Route path='/userForm' element={<UserForm/>}/>
      <Route path='/payment/:petId' element={<PrivateRoutes><Payment/></PrivateRoutes>}/>
      <Route path="/home/payment/scccess/:paymentId" element={<PaymentSuccess/>}/>
      <Route path='/order' element={<Order/>}/>
    </Routes>
    </BrowserRouter>
   </UserContext.Provider>
   
 
 
   
  )
}

export default App