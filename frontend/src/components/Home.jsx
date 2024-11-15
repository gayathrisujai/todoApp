import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Typography } from '@mui/material';
import axiosInstance from '../axiosinterceptor';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost:3000/home/')
            .then((res) => {
                setTodo(res.data);
            });
    }, []);

    const handleDelete = (id) => {
        axiosInstance.delete('http://localhost:3000/home/delete/' + id)
            .then(() => {
                alert('Data Deleted');
                window.location.reload();
            });
    };

    const navigate = useNavigate();

    function handleUpdate(list) {
        navigate('/add', { state: { list } });
    }

    const handleToggle = (id) => {
        const updatedTodo = todo.map((item) =>
            item._id === id ? { ...item, completed: !item.completed } : item
        );
        setTodo(updatedTodo);
    };

    const handleSave = async () => {
        await Promise.all(todo.map(item =>
            axiosInstance.put(`http://localhost:3000/home/update/${item._id}`, item)
        ));
        alert('Changes saved!');
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Todo Description</TableCell>
                            <TableCell align="right">Day</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todo.map((list) => (
                            <TableRow key={list._id}>
                                <TableCell component="th" scope="row">
                                    <Typography
                                        variant="body1"
                                        sx={{ textDecoration: list.completed ? 'line-through' : 'none' }}
                                    >
                                        {list.list}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{list.day}</TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={list.completed}
                                        onChange={() => handleToggle(list._id)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => handleDelete(list._id)} color='warning'>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
                Save Changes
            </Button>
        </>
    );
};

export default Home;
