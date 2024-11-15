import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';


const Login = () => {
    const [user,setUser]=useState({
        username: "",
        password: ""
    })

    let updateUser=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    let sendData=()=>{
        
        axiosInstance.post("http://localhost:3000/user/login",user)
        .then((res)=>{
            console.log(res)
            alert(res.data.message)
            if(res.data.usertoken)
            {
                localStorage.setItem("token",res.data.usertoken);
                navigate('/home');
            }
        })
    }

    const navigate= useNavigate();
  return (
    <>
    <h4>LOGIN</h4>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
        <TextField id="outlined-basic" label="Email" variant="outlined" name='username' value={user.username} onChange={updateUser} /><br /><br />
        <TextField type='password' id="outlined-basic" label="Password" variant="outlined" name='password' value={user.password} onChange={updateUser}/><br /><br />
        <Button variant="contained" onClick={sendData}>Login</Button>

    </Box>
    </>
  )
}

export default Login