import React, { useContext } from 'react'
import style from './Order.module.css'
import { Button, Divider } from '@mui/material'
import { UserContext } from '../../App'
import { useFetchHooks } from '../../Components/Hooks/useFetchHooks'
import Card from '../../Components/Card/Card'
import BackButton from '../../Components/BackButton/BackButton'
import Loading from '../../Components/Loading/Loading'
import { useNavigate } from 'react-router'
const Order = () => {
    const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
    let fetchOrderDetails=useFetchHooks(`https://pet-addoption.onrender.com/petApp/api/v1/order/orderList/${userFullDetails?._id}`)
    console.log(fetchOrderDetails?.response)
    const navigate=useNavigate()
  return (
    <div className={style['order-container']}>
      <div style={{display:'flex'}}>
      <BackButton/>
      <h3>Order</h3>
      </div>
      <Divider/>  
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      {
        fetchOrderDetails?.response?.length>0 && <>
        {
     fetchOrderDetails?.response?.map((orderEl,orderIndex)=>{
        return <div className={style['order-card']} key={orderIndex}> 
        <p>Transaction Id:<b>{orderEl?.transitionId}</b></p>
       <Card key={orderIndex} el={orderEl?.productId} i={orderIndex}/>
        </div>
     })   
     }
        </>
      }
      </div>
      {fetchOrderDetails.loading && <Loading/>}

      {
        fetchOrderDetails?.response?.message && 
       <div style={{textAlign:'center'}}>
       <h2 style={{textAlign:'center',marginTop:'250px'}}>{fetchOrderDetails?.response?.message}</h2>
       <Button variant='contained' sx={{marginTop:1}} onClick={()=>navigate('/home')}> order</Button>
       </div>
        
      }
    
    </div>
  )
}

export default Order