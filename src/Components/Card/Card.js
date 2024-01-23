import React from 'react'
import style from './Card.module.css'
import { Avatar, Button } from '@mui/material'
import ImageNotFound from "../../Page/Image/imageNotFound.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import {useNavigate} from 'react-router-dom'
const Card = ({el,i}) => {
  const navigate=useNavigate()
  const onSeeMoreClick=(el)=>{
   let id=el._id
   navigate(`/petDetails/${id}`)
   console.log(el)
  }
  return (
    <div className={style['card-container']} >
    <div className={style['card-header']}>
    {
        el?.owner?.image?<Avatar alt={el?.owner?.name} src={el?.owner?.image} />:<Avatar>{el?.owner?.name[0]}</Avatar>
    }
    <div className={style['card-header-label']}>
      <h4>{el?.owner?.name}</h4>
      <p>{new Date(el?.createdAt).getFullYear()}</p>
    </div>
    </div>
    <div className={style['card-pic']}><img src={el?.image?.length>0? el?.image[0]:ImageNotFound} alt='pet' width={260} height={150}/></div>
    <div className={style['card-pet-name']}>{el?.name}</div>
    <div className={style['card-footer']}>
    <Button disabled><FavoriteBorderIcon/></Button>
    <Button disabled><MapsUgcOutlinedIcon/></Button>
    <Button  onClick={()=>onSeeMoreClick(el)} >See More...</Button>
    </div>
    </div>

  )
}

export default Card