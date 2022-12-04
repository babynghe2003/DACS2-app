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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
// material-ui
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProfileAPI } from 'api/UserApi';
import { AllUserAPI } from 'api/DashBoardAPI';
import MainCard from 'ui-component/cards/MainCard';

const UsersPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const userInfo = useSelector((state) => state.userInfo);
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await AllUserAPI();
            if (res.status == 200) {
                setUsersData(res.data.data);
                console.log('OK');
            } else {
                console.log('Error' + res);
            }
        };
        getUsers();
    }, []);
    return (
        <>
            <MainCard content={true} darkTitle={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        {usersData?.map((user) => {
                            return (
                                <>
                                    <Grid item xs={12}>
                                        {user.username}
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default UsersPage;
