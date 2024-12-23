import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
const PaymentSuccess = () => {
    const params=useParams()
    //console.log(params.paymentId)
    const navigate=useNavigate()
    const [paymentStatus,setPaymentStatus]=useState('')
   
   React.useEffect(()=>{
    const updateOrder=async()=>{
    try{
    const updatedData=await axios.patch(`http://localhost:4040/petApp/api/v1/payment/onPaymentStatus`,{
        orderId:params.paymentId
    })
    setPaymentStatus(updatedData?.data)
    setTimeout(()=>{
      navigate('/home')
    },2000)
    //console.log(updatedData)
    }
    catch(e){
    //console.log(e?.response?.statusText)
   
    }
    }
    updateOrder()
   },[])
   //console.log(paymentStatus)
  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess

