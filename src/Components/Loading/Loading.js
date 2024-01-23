import React from 'react'
import style  from './Loading.module.css'
import CircularProgress from '@mui/material/CircularProgress';
const Loading = () => {
  return (
    <div className={style['loading-continer']} > <CircularProgress /></div>
  )
}

export default Loading