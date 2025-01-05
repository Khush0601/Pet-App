import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Alert, Button } from '@mui/material'
import './PaymentSuccess.css'
const PaymentSuccess = () => {
    const params=useParams()
    //console.log(params.paymentId)
    const navigate=useNavigate()
    const [paymentStatus,setPaymentStatus]=useState('')
   
   React.useEffect(()=>{
    const updateOrder=async()=>{
    try{
    const updatedData=await axios.patch(`https://pet-addoption.onrender.com/petApp/api/v1/payment/onPaymentStatus`,{
        orderId:params.paymentId
    })
    setPaymentStatus(updatedData?.data)
    setTimeout(()=>{
      navigate('/home')
    },2000)
    console.log(updatedData)
    }
    catch(e){
    //console.log(e?.response?.statusText)
   
    }
    }
    updateOrder()
   },[])
   console.log(paymentStatus)
  return (
    <div className='payment-success-container'>
     {
      !paymentStatus?<div>Payment status is loading...</div>:<>{
      paymentStatus?.message==='order placed successfully'?<div className='success-result'>
      <Alert variant="filled" severity="success" className='alert'>
        {paymentStatus?.message}
      </Alert>
      </div>:
      <div className='failure-result'>
      <Alert variant="filled" severity="error" className='alert'>
        {paymentStatus?.message}
      </Alert>
     
      </div>
      
     }</>
     }
     <div className='button-cont'>
      <Button variant='contained' onClick={()=>navigate('/home')}> Go To Home</Button>
     </div>
    </div>
  )
}

export default PaymentSuccess

