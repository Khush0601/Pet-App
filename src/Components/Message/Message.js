
import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import style from './Message.module.css';
import { useNavigate } from 'react-router';
import BackButton from '../BackButton/BackButton';


const Message = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query.trim() === '') {
      alert('Please enter your response before submitting');
      return;
    }
     setOpen(true);
    setQuery('');
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={style['msg-container']}>
     <div style={{display:'flex'}}>
     <BackButton/>
     <h2 style={{marginBottom:'10px'}}>Query Form</h2>
     </div>
      <div className={style['msg-box']}>
      
        <h3>Write your query here and let us know:</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type..."
            value={query}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
         <Alert onClose={handleClose} severity="success"  sx={{ width: '100%', backgroundColor: '#006400', color: '#fff' }}>
            Your response has been recorded.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Message;
