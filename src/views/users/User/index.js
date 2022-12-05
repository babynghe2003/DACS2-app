import { Avatar, Button, CardActions, Divider, Grid, Typography } from '@mui/material';
import User1 from 'assets/images/users/avt.png';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
// material-ui
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useTheme } from '@mui/material/styles';
import { getProfileAPI } from 'api/UserApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
const UsersPage = () => {
    const theme = useTheme();
    const userInfo = useSelector((state) => state.userInfo);
    const getIDUser = () => {
        const id = new URLSearchParams(location.search).get('id');
        return id == '' ? userInfo.id : id;
    };
    const [userData, setUserData] = useState({});
    const [view, setView] = useState(true);
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

    const toDayTime = (dt) => {
        var now = new Date();

        var d = Math.floor(now.getTime() - Date.parse(dt));
        if (d > 31536000000) return Math.floor(d / 31536000000) + ' years';
        if (d > 2592000000) return Math.floor(d / 2592000000) + ' months';
        if (d > 604800000) return Math.floor(d / 604800000) + ' weeks';
        if (d > 86400000) return Math.floor(d / 86400000) + ' days';
        if (d > 3600000) return Math.floor(d / 3600000) + ' hours';
        if (d > 60000) return Math.floor(d / 60000) + ' minutes';
        if (d > 0) return Math.floor(d / 1000) + ' seconds';
    };
    return (
        <>
            <MainCard
                title="Profile"
                sx={{
                    height: '100%'
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={2}>
                        <SubCard
                            sx={{
                                height: '100%'
                            }}
                        >
                            <Grid container direction="column" spacing={3}>
                                <Grid item xs={12}>
                                    <Avatar
                                        src={User1}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '100%',
                                            borderWidth: '3px'
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3" textAlign="center" color="inherit">
                                        Topics
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        textAlign="center"
                                        sx={{
                                            color: theme.palette.primary.dark,
                                            mt: 1
                                        }}
                                    >
                                        {userData.topics?.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard
                            sx={{
                                height: '100%'
                            }}
                        >
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <EditProfile userData={userData} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SubCard
                            title="Topics"
                            sx={{
                                height: '100%'
                            }}
                        >
                            <Grid container direction="column" spacing={3}>
                                {userData.topics?.slice(0, view ? 5 : userData.topics.length).map((topic) => {
                                    return (
                                        <>
                                            <Grid item>
                                                <Typography
                                                    variant="h3"
                                                    sx={{
                                                        color: theme.palette.secondary.dark,
                                                        textDecoration: 'none'
                                                    }}
                                                    component={Link}
                                                    to={`/home/topic?id=${topic.id}`}
                                                >
                                                    {topic.tittle}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" sx={{ color: 'mode.dark' }}>
                                                    {toDayTime(topic.create_at)} ago
                                                </Typography>
                                            </Grid>
                                            <Divider />
                                        </>
                                    );
                                })}
                            </Grid>
                            <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                                <Button size="small" disableElevation onClick={(e) => setView(!view)}>
                                    {view ? 'View All' : 'View Less'}
                                    <ChevronRightOutlinedIcon />
                                </Button>
                            </CardActions>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default UsersPage;
