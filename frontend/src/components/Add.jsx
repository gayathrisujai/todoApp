import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

const Add = () => {
  const [form, setForm] = useState({
    Id: '',
    list: '',
    day: ''

   
  })

    let fetchValue = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const location=useLocation()//
    const navigate=useNavigate();
    let sentData = () => {
        if(location.state!=null){
            axiosInstance.put('http://localhost:3000/home/edit/'+location.state.course._id,form).then((res)=>{
              alert("Submitted");
              navigate('/home');
            })
            .catch((error)=>{
              console.log(error);
            })
        }else{
          axiosInstance.post('http://localhost:3000/home/addnew',form).then((res)=>{
            alert('added successfully');
            navigate('/home');
          })
          .catch((error)=>{
            console.log(error);
          })
    }
  };
    useEffect(()=>{
      if (location.state!=null) {
        setForm({...form,
          Id:location.state.list.Id,
          list:location.state.list.list,
          day:location.state.list.day
          
        })
      }
    },[])

    return (

        <Box sx={{ padding: '2% 5% 2% 5%', backgroundColor: 'rgba(255, 255, 255, 0.888)', margin: '2px 450px 2px 450px' }}>
            <h2>New List</h2><br />

            <TextField id="outlined-basic"
                value={form.Id} 
                label="Id"
                variant="outlined"
                name="Id"
                onChange={fetchValue} /><br /><br />

            <TextField id="outlined-basic"
                // onChange={ }
                value={form.list}
                label="list"
                variant="outlined"
                name="list"
                onChange={fetchValue} /><br /><br />

            <TextField id="outlined-basic"
                // onChange={ }
                value={form.day}
                label="day"
                variant="outlined"
                name="day"
                onChange={fetchValue} /><br /><br />
           
            <Button onClick={sentData} variant="contained">SUBMIT</Button>
        </Box>
    )
}

export default Add
