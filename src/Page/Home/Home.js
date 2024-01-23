import React, { useContext, useRef, useState } from 'react'
import style from './Home.module.css'
import BottomNavBar from '../BottomNavBar/BottomNavBar'
import HeaderNavBar from '../HeaderNavBar/HeaderNavBar'
import SearchIcon from '@mui/icons-material/Search';
import { useFetchHooks } from '../../Components/Hooks/useFetchHooks';
import Error from '../../Components/Error/Error';
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';
import axios from 'axios';
import { Box, Button, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../../App';
const stylee = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const {user,setUser,userFullDetails,setUserFullDetails}=useContext(UserContext)
  console.log(userFullDetails?.userType)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[postPetDetails,setPostPetDetails]=useState(
    {
      animaltype: "",
      name:"",
      id: `${Math.floor(Math.random()*1000)}`+`${new Date().getTime()}`+`${Math.floor(Math.random()*1000)}`,
       sex:"male",
       age:"1",
        weight:"2",
      description: "",
     shortdescription: "",
      price: "",
      location: "",
      longitude: "",
      lattitude: "",
      createdBy: "",
      owner: {
        id: "",
        name: "",
        age: "",
        email: "",
        phone: "",
        image:""
      },
      image: [
    
      ]
    }
  )
  const handleChange = (event) => {
    setPostPetDetails((p)=>{
     return{...p,sex:event.target.value}
    });
  };
  const list=[];
  for(let i=1;i<=100;i++){
    list.push(`${i}`)
  }
  const ageChange=(e)=>{
    setPostPetDetails((p)=>{
    return {...p,age:e.target.value}
    })
  }
  const weightChange=(e)=>{
    setPostPetDetails((p)=>{
     return {...p,weight:e.target.value}
    })
  }
  const onInputChange=(e,type)=>{
  setPostPetDetails((p)=>{
    if(type==='description'){
   return{...p,[type]:e.target.value, shortdescription:postPetDetails.description.substring(0,40)}
    }
    else{
      return{...p,[type]:e.target.value}
    }
  })
  }
  React.useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
       setPostPetDetails((p)=>{
        return {...p,lattitude:`${latitude}`,longitude:`${longitude}`}
       })
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },[])
  React.useEffect(()=>{
  setPostPetDetails((p)=>{
   return {...p,createdBy:userFullDetails?.name, owner: {
    id: userFullDetails?.id,
    name:userFullDetails?.name,
    age: userFullDetails?.age,
    email: userFullDetails?.email??'agent@gmail.com',
    phone: userFullDetails?.phone??'1234567896',
    image:userFullDetails?.image[0],
  },}
  })
  },[userFullDetails])

  const [fetchSearchResult,setFetchSearchResult]=useState([])
  const inputRef=useRef()
  const onSearch=async(e)=>{
    e.preventDefault()
    if(inputRef.current.value===''){
      return
    }
    try{
    const searchResult=await axios.get(`https://pet-addoption.onrender.com/petApp/api/v1/pet/search?name=${inputRef.current.value.toLowerCase()}`)
    setFetchSearchResult(searchResult?.data)
    }
    catch(e){
     console.log(e)
    }
   }
 
  let fetchResult=useFetchHooks('https://pet-addoption.onrender.com/petApp/api/v1/pet')
  console.log(fetchResult?.response)
  React.useEffect(()=>{
  if(fetchResult?.response?.length>0){
    setFetchSearchResult(fetchResult?.response)
  }
  },[fetchResult])
 const onReset=()=>{
  setFetchSearchResult(fetchResult?.response)
 }
 const [inputImage,setInputImage]=useState('')
 const onImageChange=(e)=>{
 setInputImage(e.target.value)
 }
 const onAddImage=()=>{
  if(!inputImage){
    alert('it must not be empty')
    return
  }
  setPostPetDetails((p)=>{
   return{...p,image:[...p.image,inputImage]}
  })
  setInputImage('')
 }
 const onAddingNewPet=async(e)=>{
  e.preventDefault()
  try{
  const newPet=await axios.post('https://pet-addoption.onrender.com/petApp/api/v1/pet',
  postPetDetails
  )
  console.log(newPet.data)
  setFetchSearchResult((p)=>{
  return [...p,newPet.data]
  })
  handleClose()
  }
  catch(e){
    console.log(e)
  }
 }
 console.log(postPetDetails)
  return (
    <div className={style['home-container']}>
      <div className={style['home-header']}>
     <HeaderNavBar/>
      </div>
      <div className={style['home-mainPart']}>
        <div className={style['search-box-container']}>
          <form onSubmit={onSearch}>
            <div className={style['search-input']}><input  ref={inputRef} type='text' placeholder='Search...' /></div>
            <button className={style['search-icon']} type='submit'><SearchIcon/></button>
          </form>
         </div>
         <div className={style['home-cardPart']}>
          {
            fetchSearchResult?.length===0 && <div className={style['reset']}>
              <h2>No Pet Found </h2>
              <Button color='primary' onClick={onReset}>Get All Pet</Button>
              </div>
          }
             {
              fetchResult?.error && <Error error={fetchResult.error}/>
             }
             {
              fetchResult?.loading && <Loading/>
             }
             {
             fetchSearchResult?.length>0 && <>
              {
                fetchSearchResult?.map((card,cardIndex)=>{
                  return <Card  key={cardIndex} el={card} i={cardIndex}/>
                })
              }
              </>
             }
             </div>  
             {
              userFullDetails?.userType==='admin' && 
              <div className={style['plus-icon']}>
              <IconButton  size="large" color='primary' onClick={handleOpen}>
               <ControlPointIcon sx={{fontSize:50}}  color='primary' />
              </IconButton>
             </div>
             }
             <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <form onSubmit={onAddingNewPet}>
       <Box sx={stylee}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
       Add new pet
      </Typography>
      <TextField id="standard-basic" label="animaltype" value={postPetDetails?.animaltype} variant="standard" size='small' onChange={(e)=>onInputChange(e,'animaltype')} />
      <TextField id="standard-basic" label="name" value={postPetDetails?.name} variant="standard" size='small' onChange={(e)=>onInputChange(e,'name')}/>
      <div style={{marginTop:7,marginBottom:8,display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
        <div> <InputLabel  id="demo-simple-select-label">Sex</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postPetDetails?.sex}
          label="sex"
          onChange={handleChange}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'others'}>Others</MenuItem>
        </Select></div>
       <div>
       <InputLabel  id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postPetDetails?.age}
          label="age"
          onChange={ageChange}
        >
        {
          list.map((el,i)=>{
            return  <MenuItem key={i} value={el}>{el}</MenuItem>
          })
        }
        </Select>
       </div>
       <div>
       <InputLabel  id="demo-simple-select-label">Weight</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postPetDetails?.weight}
          label="weight"
          onChange={weightChange}
        >
        {
          list.map((el,i)=>{
            return  <MenuItem key={i} value={el}>{el}</MenuItem>
          })
        }
        </Select>
       </div>
        </div>
       <div className={style['text-area']}>
       <textarea style={{width:'100%',minHeight:100,}} value={postPetDetails?.description} placeholder='enter desc' onChange={(e)=>onInputChange(e,'description')}>
        </textarea>
       </div>
       <TextField id="standard-basic" label="price" value={postPetDetails?.price} variant="standard" size='small' onChange={(e)=>onInputChange(e,'price')}/>
       <TextField id="standard-basic" label="location" value={postPetDetails?.location} variant="standard" size='small' onChange={(e)=>onInputChange(e,'location')}/>
      <div>
      <TextField id="standard-basic" label="enter image Url" value={inputImage} variant="standard" size='small' onChange={onImageChange}/>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={onAddImage}>
  <AddIcon/>
</IconButton>
      </div>

    <div style={{display:'flex',justifyContent:"space-between"}}>
     <Button variant='contained' onClick={handleClose} >cancel</Button>   
     <Button variant='contained' type='submit' >Submit</Button>
    </div>
    
      
    </Box>
       </form>
      </Modal>
        <div className={style['home-navBar']}><BottomNavBar/></div>
      </div>
    </div>
  )
}

export default Home