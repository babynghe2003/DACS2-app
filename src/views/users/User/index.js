import React from 'react';
import User1 from 'assets/images/users/avt.png';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProfileAPI } from 'api/UserApi';

const UsersPage = () => {
    const theme = useTheme();
    const userInfo = useSelector((state) => state.userInfo);
    const getIDUser = () => {
        const id = new URLSearchParams(location.search).get('id');
        return id == '' ? userInfo.id : id;
    };
    const [userData, setUserData] = useState({});

    useEffect(() => {
        console.log('id= ' + getIDUser());
        const GetUser = async () => {
            const res = await getProfileAPI(getIDUser());
            if (res.status == 200) {
                setUserData(res.data);
            }
            console.log(res);
        };
        GetUser();
    }, []);
    return (
        <>
            <Avatar
                src={User1}
                sx={{
                    width: '200px',
                    height: '200px',
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer'
                }}
                aria-haspopup="true"
                color="inherit"
            />
            {userData.username}
            {userData.email}
            {userData.address}
            {userData.number}
        </>
    );
};

export default UsersPage;
