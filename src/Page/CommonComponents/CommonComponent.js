import React from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './CommonComponents.module.css'

export const TextFieldPasswordIcon=({label,id,htmlFor,onChange,value})=>{
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    return(
    <div>
      <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined" onChange={onChange} value={value}>
          <InputLabel htmlFor={htmlFor} >{label}</InputLabel>
          <OutlinedInput
            id={id}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
    </div>
    )
}
export const PetCardDesign=({heading,desc,backgroundColor})=>{
   return (
    <div className={style['card']} style={{backgroundColor:backgroundColor}} >
       <h3>{heading}</h3>
       <p>{desc}</p>
    </div>
   )
}