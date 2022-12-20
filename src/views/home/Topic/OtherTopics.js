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
const OtherTopics = ({ userData }) => {
    const theme = useTheme();
    const userInfo = useSelector((state) => state.userInfo);
    const [view, setView] = useState(true);
    console.log(userData);
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
            <MainCard title="Other topics">
                <Grid container direction="column" spacing={3}>
                    {userData?.topics.slice(0, view ? 5 : userData.topics.length).map((topic) => {
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
                        {view ? 'View More' : 'View Less'}
                        <ChevronRightOutlinedIcon />
                    </Button>
                </CardActions>
            </MainCard>
        </>
    );
};

export default OtherTopics;
