import PropTypes from 'prop-types';
import { useEffect, useState, useLayoutEffect } from 'react';

// material-ui
import { Box, Button, CardContent, CardHeader, Divider, FormControl, Grid, OutlinedInput, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import AnimateButton from 'ui-component/extended/AnimateButton';

// api
import { CommentAPI, GetTopic, LikeTopic, DislikeTopic, LikeComment, DislikeComment } from 'api/TopicApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import SubCard from 'ui-component/cards/SubCard';
import OtherTopics from './OtherTopics';
import { gridSpacing } from 'store/constant';
// ==============================|| HOME DEFAULT - TOPIC CARD ||============================== //

const TopicCard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const customization = useSelector((state) => state.customization);

    const [commentContent, setCommentContent] = useState('');

    const getIDTopic = () => {
        const id = new URLSearchParams(location.search).get('id');
        return new URLSearchParams(location.search).get('id');
    };

    const handleAsk = () => {
        navigate('/home/createtopic');
    };

    const submitComment = async () => {
        try {
            const res = await CommentAPI({
                topic_id: topicCr.topic.id,
                content: commentContent
            });
            if (res.status == 200) {
                setLoading(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [topicCr, setTopicCr] = useState(null);
    const [bodyCr, setBodyCr] = useState(() => EditorState.createEmpty());

    useLayoutEffect(() => {
        const getTopic = async () => {
            const res = await GetTopic(getIDTopic());
            if (res.status === 200) {
                setLoading(false);
                setTopicCr(res.data);
                setBodyCr(EditorState.createWithContent(convertFromRaw(res.data.topic.body)));
                console.log(res.data);
            }
        };
        getTopic();
    }, [isLoading, new URLSearchParams(location.search).get('id')]);

    const toDayTime = (dt) => {
        var now = new Date();

        var d = Math.floor(now.getTime() - Date.parse(dt));
        if (d > 31536000000) return Math.floor(d / 31536000000) + ' years';
        if (d > 2592000000) return Math.floor(d / 2592000000) + ' months';
        if (d > 604800000) return Math.floor(d / 604800000) + ' weeks';
        if (d > 86400000) return Math.floor(d / 86400000) + ' days';
        if (d > 3600000) return Math.floor(d / 3600000) + ' hours';
        if (d > 0) return Math.floor(d / 1000) + ' second';
    };

    const handleLikeTopic = async () => {
        const res = await LikeTopic(topicCr.topic.id);
        if (res.status == 200) {
            setLoading(true);
        }
    };

    const handleDislikeTopic = async () => {
        const res = await DislikeTopic(topicCr.topic.id);
        if (res.status == 200) {
            setLoading(true);
        }
    };

    const handleLikeComment = async (id) => {
        const res = await LikeComment(id);
        if (res.status == 200) {
            setLoading(true);
        }
    };

    const handleDisLikeComment = async (id) => {
        const res = await DislikeComment(id);
        if (res.status == 200) {
            setLoading(true);
        }
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={12} md={8}>
                    <MainCard
                        content={true}
                        darkTitle={false}
                        sx={{
                            height: '100%'
                        }}
                    >
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <Typography
                                                sx={{
                                                    fontSize: '2rem',
                                                    fontWeight: '500',
                                                    my: 1
                                                }}
                                            >
                                                {topicCr?.topic.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button size="large" onClick={handleAsk} variant="contained" color="secondary">
                                                    Ask question
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Typography variant="subtitle2">At {topicCr?.topic.create_at} by</Typography>
                                        <Typography
                                            component={Link}
                                            to={'/users/user?id=' + topicCr?.topic.user.id}
                                            variant="subtitle2"
                                            sx={{ color: 'Highlight', textDecoration: 'none' }}
                                        >
                                            &nbsp;@{topicCr?.topic.user.username}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Grid container>
                                <Grid item xs={1}>
                                    <Grid container direction="column" alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Tooltip title="Like" placement="left-start">
                                                <Button
                                                    sx={{
                                                        width: '16px',
                                                        height: '2rem'
                                                    }}
                                                    onClick={handleLikeTopic}
                                                >
                                                    <ArrowDropUpRoundedIcon
                                                        color="action"
                                                        sx={{
                                                            color: topicCr?.topic.is_like == 1 ? 'Highlight' : 'action',
                                                            cursor: 'pointer',
                                                            fontSize: '6rem'
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                color={topicCr?.topic.likes >= 0 ? 'inherit' : 'red'}
                                                sx={{
                                                    fontSize: '24px'
                                                }}
                                            >
                                                {topicCr?.topic.likes}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Dislike" placement="left-start">
                                                <Button
                                                    sx={{
                                                        width: '16px',
                                                        height: '2rem'
                                                    }}
                                                    onClick={handleDislikeTopic}
                                                >
                                                    <ArrowDropDownRoundedIcon
                                                        color="action"
                                                        sx={{
                                                            color: topicCr?.topic.is_like == 2 ? 'Highlight' : 'action',
                                                            cursor: 'pointer',
                                                            fontSize: '6rem'
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11}>
                                    <Editor
                                        toolbarHidden
                                        editorState={bodyCr}
                                        readOnly={true}
                                        editorStyle={{
                                            padding: '15px',
                                            borderRadius: `${customization.borderRadius}px`,
                                            backgroundColor: theme.palette.background.default,
                                            lineHeight: '30px'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    my: 1
                                }}
                            >
                                Answers
                            </Typography>
                            {/* <div>{comment.content}</div> */}
                            {topicCr?.comments.map((comment) => {
                                return (
                                    <>
                                        <Grid container key={comment.id}>
                                            <Grid item xs={1}>
                                                <Grid container direction="column" alignItems="center" justifyContent="center">
                                                    <Grid item>
                                                        <Tooltip title="Like" placement="left-start">
                                                            <Button
                                                                onClick={(e) => handleLikeComment(comment.id)}
                                                                sx={{
                                                                    width: '16px',
                                                                    height: '2rem'
                                                                }}
                                                            >
                                                                <ArrowDropUpRoundedIcon
                                                                    color="action"
                                                                    sx={{
                                                                        color: comment.is_like == 1 ? 'Highlight' : 'action',
                                                                        cursor: 'pointer',
                                                                        fontSize: '4rem',
                                                                        mb: -1
                                                                    }}
                                                                />
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '24px'
                                                            }}
                                                        >
                                                            {comment?.likes}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Tooltip title="Dislike" placement="left-start">
                                                            <Button
                                                                onClick={(e) => handleDisLikeComment(comment.id)}
                                                                sx={{
                                                                    width: '16px',
                                                                    height: '2rem'
                                                                }}
                                                            >
                                                                <ArrowDropDownRoundedIcon
                                                                    color="action"
                                                                    sx={{
                                                                        color: comment.is_like == 2 ? 'Highlight' : 'action',
                                                                        cursor: 'pointer',
                                                                        fontSize: '4rem',
                                                                        mt: -1
                                                                    }}
                                                                />
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={11}>
                                                <Grid container direction="column" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontSize: '16px',
                                                                mt: 3
                                                            }}
                                                            color="inherit"
                                                        >
                                                            {comment.content}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item>
                                                        <Grid container alignItems="flex-end" justifyContent="flex-end">
                                                            <Grid item>
                                                                <Typography
                                                                    component={Link}
                                                                    to={'/users/default?id=' + comment.user.id}
                                                                    variant="subtitle2"
                                                                    sx={{ color: 'primary.main' }}
                                                                >
                                                                    @{comment.user.username} &nbsp;
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle2" sx={{ color: 'mode.dark' }}>
                                                                    {toDayTime(comment.create_at)} ago
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
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    my: 1
                                }}
                            >
                                Your Answers
                            </Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                        <OutlinedInput
                                            fullWidth
                                            type="text"
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            multiline={true}
                                            maxRows={8}
                                            label="Post your answer..."
                                        />
                                    </FormControl>
                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button size="large" variant="contained" color="secondary" onClick={submitComment}>
                                                Post your answer
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </MainCard>
                </Grid>
                <Grid item sm={12} md={4}>
                    <OtherTopics userData={topicCr?.topic.user} />
                </Grid>
            </Grid>
        </>
    );
};

TopicCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TopicCard;
