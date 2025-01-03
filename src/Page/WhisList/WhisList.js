import React, { useContext, useState } from 'react'
import style from './WhisList.module.css'
import { UserContext } from '../../App'
import axios from 'axios'
import { Button, Divider } from '@mui/material'
import HeaderNavBar from '../HeaderNavBar/HeaderNavBar'
import BottomNavBar from '../BottomNavBar/BottomNavBar'
import Card from '../../Components/Card/Card'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router'

const WhisList = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  
  const[whishListData,setWhishListData]=useState([])
  const navigate=useNavigate()
 React.useEffect(()=>{
  const whishListUser=async()=>{
    try{
      const result=await axios.get(`https://pet-addoption.onrender.com/petApp/api/v1/user/wishlist/${userFullDetails?.id}`,
    )
      console.log(result)
      setWhishListData(result.data)
     }
    catch(e){
     console.log(e?.response?.data?.message)
    }
   }
   whishListUser()
 },[userFullDetails
])

const onRemoveClick=async(cardDetails)=>{
 try{
const remove=await axios.get(`https://pet-addoption.onrender.com/petApp/api/v1/user/wishlist/${userFullDetails?.id}/${cardDetails?._id}`)
setWhishListData(remove.data)
 }
 catch(e){
console.log(e)
 }
}
console.log(whishListData)

  return (
  <div className={style['whisList-cont']}>
  <div className={style['whishList-UpperNavBar']}> <HeaderNavBar/></div>
  <h3 className={style['whishList']}>WhisList</h3>
  <Divider/>
  <div className={style['whislist-mainPart']}>
   {
   whishListData.length===0?
   <div style={{textAlign:'center',marginTop:'50px'}}>
   <h2>Pet not in your whishlist</h2>
   <Button variant='contained' sx={{margin:1}} onClick={()=>navigate('/home')}>WishList</Button>
   </div>:
   whishListData.map((cardData,cardIndex)=>{
    return <div className={style['whislist-cards']}>
      <div className={style['remove-icon']} onClick={()=>onRemoveClick(cardData)}>
        <CloseIcon />
      </div>
      <Card  key={cardIndex} el={cardData} i={cardIndex}/>
      </div>
     })
   }
  </div>
   <div className={style['whishList-bottomNavBar']}><BottomNavBar/></div>
  </div>
   

  )
}

export default WhisList