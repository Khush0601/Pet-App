import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchHooks } from '../Hooks/useFetchHooks'
import style from './PetDetails.module.css'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Alert, Avatar, IconButton } from '@mui/material'
import { PetCardDesign } from '../../Page/CommonComponents/CommonComponent'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import ImageNotFound from '../../Page/Image/imageNotFound.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../App'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PetDetails = () => {
   const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
    const params=useParams()
    console.log(params)
    const getSubString=(value)=>{
      if(!value){
         return 'No Description'
      }
      const leftSubString=value.replace( /(<([^>]+)>)/ig,'');
      let result=leftSubString.split(' ').splice(0,15)
      return `${result.join(' ')}...`
    }
    
    const[fullModeView,setFullModeView]=useState(false)
    const onFullViewMode=()=>{
      setFullModeView(true)
    }
    const onLessView=()=>{
      setFullModeView(false)
    }
   
    const [error,setError]=useState('')
  const [success,setSuccess]=useState('')
   const navigate=useNavigate()
    let fetchResult=useFetchHooks(`https://pet-addoption.onrender.com/petApp/api/v1/pet/${params.id}`)
    console.log(fetchResult?.response)

    const onWhishListClick=async()=>{
      try{
      const result=await axios.post(`https://pet-addoption.onrender.com/petApp/api/v1/user/wishlist/${userFullDetails?.id}`,
      {
      '_id':fetchResult?.response?._id
      })
      console.log(result)
      setSuccess('Whislisted')
      setTimeout(()=>{
      setSuccess('')
      setError('')
  
      },[1000*2])

      }
      catch(e){
        
         setError(e?.response?.data?.message??'something went wrong')
         setSuccess('')
         setTimeout(()=>{
          setError('')
         },[1000*2])
      }
     }
     console.log(userFullDetails)
 if(fetchResult?.loading){
    return <div className={style['loading']}><Loading/></div>
 }
 if(fetchResult.error){
    return <Error error={fetchResult?.error}/>
 }
 if(fetchResult?.response){
    return (
        <div className={style['petDetails-container']}>
          <div className={style['alert']}><>
              {
                    error && <Alert variant="filled" severity="error">
                    {error}
                    </Alert>
                 }
                 {
                  success && <Alert variant="filled" severity="success">
                  {success}
                  </Alert>
                  }
                </></div>
         <div className={style['back-button']}><ArrowBackIcon color="primary" onClick={()=>navigate(-1)}/></div>
           <div className={style['pet-pic']}>
             <img src={fetchResult?.response?.image?.length?fetchResult?.response?.image[0]:ImageNotFound}
              alt={fetchResult?.response?.animaltype} width={319} height={250}/>
           </div>
           <div className={style['pet-desc']}>
            <div className={style['pet-name']}>
               <div className={style['pet-name-section']}>
                 <div className={style['pet-name-first']}>{fetchResult?.response?.name}</div>
                 <div className={style['pet-location']} >
                   <span><LocationOnIcon/></span>
                    <p>{fetchResult?.response?.location}</p>
                 </div>
                 <div className={style['pet-price']}> ${fetchResult?.response?.price}</div>

               </div>
               <div className={style['pet-whishlist-Part']}>
              
               <IconButton aria-label="whislist" className={style['whislist-icon']} sx={{color:"red"}}>
                   <FavoriteBorderIcon onClick={onWhishListClick}/>
                </IconButton>   
               </div>
          </div>
            <div className={style['pet-description']}>
                <PetCardDesign  backgroundColor={'lightGreen'} heading={fetchResult?.response?.sex} desc={"sex"}/>
                <PetCardDesign  backgroundColor={'Pink'} heading={fetchResult?.response?.age} desc={"Age"}/>
                <PetCardDesign  backgroundColor={'lightBlue'} heading={fetchResult?.response?.weight} desc={"weight"}/>
            </div>
            <div className={style['pet-ownerDetails']}>
                <div className={style['pet-ownerDetails-firstPart']}>
               <div className={style['pet-ownerIconPart']}>
                 <div  className={style['pet-ownerPic']}>
                {
        fetchResult?.response?.image?<Avatar alt={fetchResult?.response?.owner?.name} src={fetchResult?.response?.owner?.image}/>:
        <Avatar>{fetchResult?.response?.owner?.name[0]}</Avatar>
                }
                </div>
                <div  className={style['pet-ownerName']}>
                   <h4>{fetchResult?.response?.owner?.name}</h4>  
                   <p>{fetchResult?.response?.owner?.phone}</p>
                </div >
                </div>
               <div className={style['pet-contact-details']}>
                   <div className={style['pet-Msg']}><MapsUgcOutlinedIcon onClick={()=>navigate('/message')}/></div>
                   {/* <div className={style['pet-call']}><AddIcCallOutlinedIcon onClick={()=>navigate('/call')}/></div> */}
               </div>
               </div>
                <div className={style['pet-pet-desc']}>
                <div>
                    {
                     !fullModeView?<>
                     {getSubString(fetchResult?.response?.description)}
                    <span onClick={onFullViewMode}style={{color:"blue"}}>See more</span>
                     </>:
                     <>
                      {fetchResult?.response?.description}
                        <span onClick={onLessView}style={{color:"blue"}}>See Less</span>
                     
                     </>
                    }
                  </div> 
                  
                </div>
                <div className={style['pet-button']} onClick={()=>navigate(`/payment/${fetchResult?.response?._id}`,{state:fetchResult?.response})}>
                 Adopt Me
                </div>

            </div>
           </div>

        </div>
    )
 }
}

export default PetDetails