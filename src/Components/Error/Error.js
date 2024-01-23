import React from 'react'
import style from './Error.module.css'
const Error = ({error}) => {
  return (
    <div className={style['error-container']}>{error}</div>
  )
}

export default Error