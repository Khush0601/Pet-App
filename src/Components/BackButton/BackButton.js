import React from 'react'
import {useNavigate} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate=useNavigate()
  return (
    <div style={{marginRight:'5px'}}>
        <ArrowBackIcon onClick={()=>navigate(-1)} />
    </div>
  )
}

export default BackButton