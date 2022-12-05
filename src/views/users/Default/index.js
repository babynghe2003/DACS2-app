import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
import User1 from 'assets/images/users/avt.png';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { AllUserAPI } from 'api/DashBoardAPI';
import { useEffect, useState } from 'react';
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
                console.log(res.data.data);
            } else {
                console.log('Error' + res);
            }
        };
        getUsers();
    }, []);
    return (
        <>
            <MainCard content={true} darkTitle={false} title="Users">
                <CardContent>
                    <Grid container spacing={gridSpacing} direction="column">
                        {usersData?.map((user) => {
                            return (
                                <>
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="flex-start" spacing={gridSpacing}>
                                                    <Grid item xs={1}>
                                                        <Avatar src={User1} aria-haspopup="true" color="inherit" />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography
                                                            component={Link}
                                                            to={'/users/user?id=' + user.id}
                                                            variant="subtitle2"
                                                            sx={{ color: 'Highlight', textDecoration: 'none' }}
                                                        >
                                                            @{user.username} &nbsp;
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle2" sx={{ textDecoration: 'none' }}>
                                                            {user.topics.length} topics
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: 1.5 }} />
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
