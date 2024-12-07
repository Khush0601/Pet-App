import React, { useContext } from 'react'
import style from './Order.module.css'
import { Divider } from '@mui/material'
import { UserContext } from '../../App'
import { useFetchHooks } from '../../Components/Hooks/useFetchHooks'
import Card from '../../Components/Card/Card'
import BackButton from '../../Components/BackButton/BackButton'
const Order = () => {
    const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
    let fetchOrderDetails=useFetchHooks(`https://pet-addoption.onrender.com/petApp/api/v1/order/orderList/${userFullDetails?.id}`)
    console.log(fetchOrderDetails?.response)
  return (
    <div className={style['order-container']}>
      <div style={{display:'flex'}}>
      <BackButton/>
      <h3>Order</h3>
      </div>
      <Divider/>  
      {
        fetchOrderDetails?.response?.length>0 && <>
        {
     fetchOrderDetails?.response?.map((orderEl,orderIndex)=>{
        return <div className={style['order-card']} key={orderIndex}> 
        <p>Transaction Id:<b>{orderEl?.transitionId}</b></p>
       <Card key={orderIndex} el={orderEl?.orderDetails} i={orderIndex}/>
        </div>
     })   
     }
        </>
      }

      {
        fetchOrderDetails?.response?.message && <h2>{fetchOrderDetails?.response?.message}</h2>
      }
    
    </div>
  )
}

export default Order