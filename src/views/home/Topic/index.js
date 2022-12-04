import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Avatar,
    Button,
    ButtonGroup,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Typography,
    CardHeader,
    InputLabel,
    FormControl,
    FormControlLabel,
    OutlinedInput,
    Tooltip
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AnimateButton from 'ui-component/extended/AnimateButton';

// api
import { AllTopicAPI, GetTopic, CommentAPI, VoteTopicAPI } from 'api/TopicApi';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';

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
        console.log('id' + id);
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
                console.log('Commmented');
                setLoading(true);
            }
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    const [topicCr, setTopicCr] = useState(null);
    const [bodyCr, setBodyCr] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        console.log('id = ' + getIDTopic());
        const getTopic = async () => {
            const res = await GetTopic(getIDTopic());
            if (res.status === 200) {
                setLoading(false);
                console.log(res.data);
                setTopicCr(res.data);
                setBodyCr(EditorState.createWithContent(convertFromRaw(res.data.topic.body)));
                console.log(convertToRaw(bodyCr.getCurrentContent()));
            }
        };
        getTopic();
    }, [isLoading]);

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
        const res = await VoteTopicAPI({
            topic_id: getIDTopic(),
            vote_action: 1
        });
        if (res.status == 200) {
            console.log('Commmented');
            setLoading(true);
        }
        console.log('like');
    };

    const handleDislikeTopic = async () => {
        const res = await VoteTopicAPI({
            topic_id: getIDTopic(),
            vote_action: 2
        });
        if (res.status == 200) {
            console.log('Commmented');
            setLoading(true);
        }
        console.log('like');
    };

    return (
        <>
            <MainCard content={true} darkTitle={false}>
                <CardHeader title={'Question'.toUpperCase()}></CardHeader>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={8}>
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
                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button size="large" onClick={handleAsk} variant="contained" color="secondary">
                                            Ask question
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{topicCr?.topic.create_at}</Typography>
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
                                                width: '1rem',
                                                height: '2rem'
                                            }}
                                            onClick={handleLikeTopic}
                                        >
                                            <ArrowDropUpRoundedIcon
                                                color="action"
                                                sx={{
                                                    cursor: 'pointer',
                                                    fontSize: '6rem'
                                                }}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {topicCr?.topic.likes}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Dislike" placement="left-start">
                                        <Button
                                            sx={{
                                                width: '1rem',
                                                height: '2rem'
                                            }}
                                            onClick={handleDislikeTopic}
                                        >
                                            <ArrowDropDownRoundedIcon
                                                color="action"
                                                sx={{
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
                            fontSize: '1.5rem',
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
                                                    <ArrowDropUpRoundedIcon
                                                        color="action"
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontSize: '4rem',
                                                            mb: -1
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.5rem'
                                                    }}
                                                >
                                                    {topicCr?.topic.likes}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Tooltip title="Dislike" placement="left-start">
                                                    <ArrowDropDownRoundedIcon
                                                        color="action"
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontSize: '4rem',
                                                            mt: -1
                                                        }}
                                                    />
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
                                                        fontSize: '1.2rem'
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
                            fontSize: '1.5rem',
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
        </>
    );
};

TopicCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TopicCard;
