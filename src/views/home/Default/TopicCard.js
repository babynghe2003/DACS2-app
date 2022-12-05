import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import { Button, ButtonGroup, CardActions, CardContent, CardHeader, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// assets
import { MoreVertOutlined } from '@mui/icons-material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MuiTypography from '@mui/material/Typography';
import AnimateButton from 'ui-component/extended/AnimateButton';
// api
import { AllTopicAPI, DeleteTopic, MyTopicAPI } from 'api/TopicApi';
import { useNavigate } from 'react-router-dom';

// ==============================|| HOME DEFAULT - TOPIC CARD ||============================== //

const TopicCard = ({ isLoading }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const userInfo = useSelector((state) => state.userInfo);
    const [moreAction, setMoreAction] = useState(null);

    const [filter, setFilter] = useState(1);
    const [islod, setLod] = useState(true);

    const handleChangeFilter = (id) => {
        setFilter(id);
    };

    const handleAsk = () => {
        navigate('/home/createtopic');
    };

    const handleClickTopic = (event, id) => {
        setMoreAction({ id: id, tar: event.currentTarget });
    };

    const deleteTopic = async (id) => {
        const res = await DeleteTopic(id);
        if (res.status == 200) {
            setLod(true);
        }
    };

    const handleCloseTopic = () => {
        setMoreAction(null);
    };

    const handleActionTopic = (event, action = 0, id = '') => {
        switch (action) {
            case 1:
                navigate('/home/edit-topic?id=' + id);
                break;
            case 2:
                deleteTopic(id);
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }

        setMoreAction(null);
    };
    const [topics, setTopic] = useState([]);

    useEffect(() => {
        const getTopics = async () => {
            if (filter == 3) {
                const res = await MyTopicAPI();
                if (res.status === 200) setTopic(res.data.data);
                console.log(res);
            } else {
                const res = await AllTopicAPI();
                if (res.status === 200) setTopic(res.data.data);
                console.log(res);
            }
        };
        console.log('getReport');
        getTopics();
        setLod(false);
    }, [filter, islod]);

    const demotext = (topic) => {
        const value = topic.body.blocks
            .map((block) => (!block.text.trim() && '\n') || block.text)
            .join('\n')
            .slice(0, 100);
        return value;
    };

    const getdate = (dt) => {
        var now = new Date();

        var d = Math.floor(now.getTime() - Date.parse(dt));
        return d;
    };

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

    const [view, setView] = useState(true);

    return (
        <>
            <MainCard content={true} darkTitle={false}>
                <CardHeader title={'Questions'.toUpperCase()}></CardHeader>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between" spacing={1}>
                                <Grid item>
                                    <ButtonGroup variant="contained" color="inherit">
                                        <Button
                                            onClick={(e) => handleChangeFilter(1)}
                                            sx={{
                                                backgroundColor: filter == 1 ? theme.palette.grey[500] : theme.palette.grey[200]
                                            }}
                                        >
                                            Lastest
                                        </Button>
                                        <Button
                                            onClick={(e) => handleChangeFilter(2)}
                                            sx={{
                                                backgroundColor: filter == 2 ? theme.palette.grey[500] : theme.palette.grey[200]
                                            }}
                                        >
                                            Most Popular
                                        </Button>
                                        <Button
                                            onClick={(e) => handleChangeFilter(3)}
                                            sx={{
                                                backgroundColor: filter == 3 ? theme.palette.grey[500] : theme.palette.grey[200]
                                            }}
                                        >
                                            Me
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item>
                                    <AnimateButton>
                                        <Button size="large" onClick={handleAsk} variant="contained" color="secondary">
                                            Ask question
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            {topics.length == 0 ? (
                                <Grid item>
                                    <MuiTypography
                                        sx={{
                                            textAlign: 'center',
                                            color: theme.palette.grey[500]
                                        }}
                                        variant="h3"
                                        gutterBottom
                                    >
                                        No topic founded, let create one....
                                    </MuiTypography>
                                </Grid>
                            ) : (
                                ''
                            )}
                            {topics
                                ?.sort((a, b) => {
                                    if (filter == 2) {
                                        return b.likes + b.answers - (a.likes + a.answers);
                                    } else return getdate(a.create_at) - getdate(b.create_at);
                                })
                                .slice(0, view ? 10 : topics.length)
                                .map((topic) => {
                                    return (
                                        <>
                                            <Grid container spacing={2} key={topic.id}>
                                                <Grid item xs={2}>
                                                    <Grid container direction="column" alignItems="flex-end" justifyContent="center">
                                                        <Grid item>
                                                            <Typography
                                                                variant="h5"
                                                                color={topic.likes >= 0 ? 'inherit' : 'red'}
                                                                sx={{
                                                                    m: 1,
                                                                    fontWeight: 100
                                                                }}
                                                            >
                                                                {topic.likes} votes
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography
                                                                variant="h5"
                                                                color="inherit"
                                                                sx={{
                                                                    m: 1,
                                                                    fontWeight: 100
                                                                }}
                                                            >
                                                                {topic.answers} answers
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Grid container direction="column" justifyContent="space-between">
                                                        <Grid
                                                            item
                                                            sx={{
                                                                mb: 1
                                                            }}
                                                        >
                                                            <Grid container justifyContent="space-between" direction="row">
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
                                                                    <MoreVertOutlined
                                                                        fontSize="small"
                                                                        sx={[
                                                                            {
                                                                                '&:hover': {
                                                                                    color: 'red',
                                                                                    backgroundColor: theme.palette.primary[500]
                                                                                }
                                                                            },
                                                                            {
                                                                                color: theme.palette.primary[200],
                                                                                cursor: 'pointer'
                                                                            }
                                                                        ]}
                                                                        aria-controls="topic-menu"
                                                                        aria-haspopup="true"
                                                                        onClick={(e) => handleClickTopic(e, topic.id)}
                                                                    />
                                                                    <Menu
                                                                        id="topic-menu"
                                                                        anchorEl={moreAction?.tar}
                                                                        keepMounted
                                                                        open={Boolean(
                                                                            moreAction && moreAction?.tar && topic.id == moreAction?.id
                                                                        )}
                                                                        onClose={handleCloseTopic}
                                                                        variant="selectedMenu"
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right'
                                                                        }}
                                                                        transformOrigin={{
                                                                            vertical: 'top',
                                                                            horizontal: 'right'
                                                                        }}
                                                                    >
                                                                        {topic.author_id == userInfo.id ? (
                                                                            <>
                                                                                <MenuItem
                                                                                    onClick={(e) => handleActionTopic(e, 1, topic.id)}
                                                                                >
                                                                                    {' '}
                                                                                    Edit
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    onClick={(e) => handleActionTopic(e, 2, topic.id)}
                                                                                >
                                                                                    {' '}
                                                                                    Delete
                                                                                </MenuItem>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <MenuItem
                                                                                    onClick={(e) => handleActionTopic(e, 3, topic.id)}
                                                                                >
                                                                                    {' '}
                                                                                    Report
                                                                                </MenuItem>
                                                                                <MenuItem
                                                                                    onClick={(e) => handleActionTopic(e, 4, topic.id)}
                                                                                >
                                                                                    {' '}
                                                                                    Block
                                                                                </MenuItem>
                                                                            </>
                                                                        )}
                                                                    </Menu>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item>
                                                                <Typography variant="body1" color="inherit">
                                                                    {demotext(topic)}...
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid
                                                                container
                                                                alignItems="flex-end"
                                                                justifySelf="flex-end"
                                                                justifyContent="flex-end"
                                                            >
                                                                <Grid item>
                                                                    <Typography
                                                                        component={Link}
                                                                        to={'/users/user?id=' + topic.author_id}
                                                                        variant="subtitle2"
                                                                        sx={{ color: 'primary.main' }}
                                                                    >
                                                                        @{topic.author} &nbsp;
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" sx={{ color: 'mode.dark' }}>
                                                                        {toDayTime(topic.create_at)} ago
                                                                    </Typography>
                                                                </Grid>
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
                    </Grid>
                </CardContent>
                <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                    <Button size="small" disableElevation onClick={(e) => setView(!view)}>
                        {view ? 'View All' : 'View Less'}
                        <ChevronRightOutlinedIcon />
                    </Button>
                </CardActions>
            </MainCard>
        </>
    );
};

TopicCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TopicCard;
