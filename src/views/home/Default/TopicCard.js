import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, CardHeader, Link } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { MoreVertOutlined } from '@mui/icons-material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AnimateButton from 'ui-component/extended/AnimateButton';

// api
import { AllTopicAPI } from 'api/TopicApi';

// ==============================|| HOME DEFAULT - TOPIC CARD ||============================== //

const TopicCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const [moreAction, setMoreAction] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickTopic = (event, id) => {
        setMoreAction({ id: id, tar: event.currentTarget });
    };
    const handleCloseTopic = (event) => {
        setMoreAction(null);
    };
    const [topics, setTopic] = useState([]);

    useEffect(() => {
        const getTopics = async () => {
            const res = await AllTopicAPI();
            if (res.status === 200) console.log(res.data);
            setTopic(res.data.data);
        };
        console.log('getReport');
        getTopics();
        toDayTime();
    }, []);

    const demotext = (topic) => {
        const value = topic.body.blocks
            .map((block) => (!block.text.trim() && '\n') || block.text)
            .join('\n')
            .slice(0, 100);
        return value;
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
        console.log(d);
    };

    return (
        <>
            <MainCard content={true} darkTitle={false}>
                <CardHeader
                    title={'Popular Topics'.toUpperCase()}
                    action={
                        <AnimateButton>
                            <Button size="large" type="submit" variant="contained" color="secondary">
                                Ask question
                            </Button>
                        </AnimateButton>
                    }
                ></CardHeader>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="flex-end">
                                <Grid item>
                                    <MoreHorizOutlinedIcon
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
                                        aria-controls="menu-popular-card"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        id="menu-popular-card"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
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
                                        <MenuItem onClick={handleClose}> Today</MenuItem>
                                        <MenuItem onClick={handleClose}> This Month</MenuItem>
                                        <MenuItem onClick={handleClose}> This Year </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {topics?.map((topic) => {
                                return (
                                    <>
                                        <Grid container spacing={2} key={topic.id}>
                                            <Grid item xs="2">
                                                <Grid container direction="column" alignItems="flex-end" justifyContent="center">
                                                    <Grid item>
                                                        <Typography
                                                            variant="h5"
                                                            color="inherit"
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
                                            <Grid item xs="10">
                                                <Grid container direction="column" justifyContent="space-between">
                                                    <Grid
                                                        item
                                                        sx={{
                                                            mb: 1
                                                        }}
                                                    >
                                                        <Grid container justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography
                                                                    variant="h3"
                                                                    sx={{
                                                                        color: theme.palette.secondary.dark
                                                                    }}
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
                                                                    <MenuItem onClick={handleCloseTopic}> Report</MenuItem>
                                                                    <MenuItem onClick={handleCloseTopic}> Block</MenuItem>
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
                                                                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
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
                    <Button size="small" disableElevation>
                        View All
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
