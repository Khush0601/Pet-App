import React, { useContext, useRef, useState } from 'react'
import style from './Payment.module.css'
import { Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from '@mui/material'
import { useFetchHooks } from '../../Components/Hooks/useFetchHooks'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import ImageNotFound from '../Image/imageNotFound.png'
import BackButton from '../../Components/BackButton/BackButton'
const Payment = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  const data=useLocation();
  let petDetails=data?.state
  console.log(petDetails)
  const params=useParams()
  console.log(params?.petId)
 
  const handlePayment=async()=>{
    try{
        const paymentDetails=await axios.post('http://localhost:4040/petApp/api/v1/payment/onPayment',{
         productId:petDetails?._id,
         userId:userFullDetails?._id,
       
   })
       //console.log('paymentDetails',paymentDetails)
       const cashfree = window.Cashfree({
         mode: "sandbox"
     });
     const checkoutOptions = {
       paymentSessionId: paymentDetails.data.payment_session_id ,
       redirectTarget: '_self',
     };
     cashfree.checkout(checkoutOptions);
       }
       catch(e){
        //console.log(e)
       
       }
     }
 console.log(userFullDetails,'user')
  return (
    <div className={style['pay-container']}>
    <div style={{display:'flex'}}>
    <BackButton/>
    <h3>Payment</h3>
    </div>
     <Divider/>
     <div>
     <Card
      sx={{
        maxWidth: 345,
        margin: "16px auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="180"
        image={petDetails?.image?.length?petDetails?.image[0]:ImageNotFound}
        alt={petDetails?.name}
        sx={{ borderRadius: "8px 8px 0 0" }}
      />
      
      {/* Card Content */}
      <CardContent>
        {/* Name */}
        <Typography variant="h6" gutterBottom>
          {petDetails?.name}
        </Typography>
        
        {/* Price */}
        <Typography variant="subtitle1" color="text.secondary">
          ₹{petDetails?.price}
        </Typography>
        
        {/* Location */}
        <Typography variant="body2" color="text.secondary">
          Location: {petDetails?.location}
        </Typography>
        
        {/* Short Description */}
        <Typography variant="body2" sx={{ marginTop: "8px" }}>
          {petDetails?.shortdescription?petDetails?.shortdescription?.substring(0,50)?.concat('...'):'N/A'}
        </Typography>
        
        {/* Gender */}
        <Typography
          variant="body2"
          color="primary"
          sx={{ fontWeight: "bold", marginTop: "8px" }}
        >
          Gender: {petDetails?.sex}
        </Typography>
      </CardContent>
      
      {/* Card Actions */}
      <CardActions>
        <Button size="small" variant="contained" color="success" onClick={handlePayment}>
         Proceed Payment
        </Button>
        
      </CardActions>
    </Card>

     
    
     </div>
    </div>
  )
}

export default Payment