import React, { useContext, useRef, useState } from 'react'
import style from './Payment.module.css'
import { Button, Divider, TextField } from '@mui/material'
import { useFetchHooks } from '../../Components/Hooks/useFetchHooks'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
const Payment = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  let fetchResult=useFetchHooks('https://pet-addoption.onrender.com/petApp/api/v1/payment/paymentinfo')
  console.log(fetchResult?.response[0]?.paymentsOptions)
  const params=useParams()
  console.log(params?.petId)
  let fetchPetResult=useFetchHooks(`https://pet-addoption.onrender.com/petApp/api/v1/pet/${params.petId}`)
  console.log(fetchPetResult)
  const [payment,setPayment]=useState('')
  const onInputChange=(e)=>{
    setPayment(e.target.value)
  }
 const navigate=useNavigate()
  const onPayment=async(e)=>{
  e.preventDefault()
try{
const paymentResult=await axios.post('https://pet-addoption.onrender.com/petApp/api/v1/payment/paymentConfirmation',
{
  transitionId:payment,
     transtitionTime:`${new Date().getTime()}`,
     transitionBy:userFullDetails,
     orderDetails:fetchPetResult?.response
 }
)
console.log(paymentResult)
alert(paymentResult.data.message)
setTimeout(()=>{
navigate('/home')
},1000*2)
}
catch(e){
  console.log(e)
}
  }
  console.log(payment)
  return (
    <div className={style['pay-container']}>
     <h3>Payment</h3>
     <Divider/>
     <div className={style['payment-container']}>
      {
      fetchResult?.response[0]?.paymentsOptions?.map((el,i)=>{
        return <div className={style['payment-type']}>
          <div className={style['icon']} style={{backgroundColor:el.background,color:el.color}}>{el.name}</div>
          <h3>{el.number}</h3>
        </div>
     }) 
      }
     <form onSubmit={onPayment}>
     <div className={style['input']}>
     <TextField id="outlined-basic" label="Enter Transcation id" fullWidth variant="outlined" value={payment} onChange={onInputChange}/>
   </div>
   <Button variant="contained" type='submit' color="success">submit</Button>
     </form>
     </div>
    </div>
  )
}

export default Payment