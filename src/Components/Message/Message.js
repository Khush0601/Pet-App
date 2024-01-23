import React from 'react'
import style from './Message.module.css'

const Message = () => {
  return (
    <div className={style['msg-container']}>
        <div className={style['msg-box']} >
          <h3>write your Query here and let us know:</h3>
          <form>
            <input type='text' placeholder='type...' />
            
          </form>
        </div>
    </div>
  )
}

export default Message