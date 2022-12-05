import { useEffect, useState } from 'react';

import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Box, Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetTopic, UpdateTopic } from 'api/TopicApi';
import { useSelector } from 'react-redux';

import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const CreateTopic = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const getIDTopic = () => {
        const id = new URLSearchParams(location.search).get('id');
        console.log('id' + id);
        return new URLSearchParams(location.search).get('id');
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
            }
        };
        getTopic();
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    title: topicCr?.topic.title,
                    body: bodyCr
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(200).required('Title is required')
                })}
                enableReinitialize={true}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(topicCr.id);
                        const res = await UpdateTopic(topicCr.topic.id, {
                            tittle: values.title,
                            body: convertToRaw(values.body.getCurrentContent())
                        });
                        if (res.status == 200) {
                            alert('Updated!!');
                            navigate('/dashboard/default');
                        } else {
                        }
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (error) {
                        console.error(error);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ values, touched, dirty, errors, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue, isSubmitting }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <div
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                border: '1px solid black',
                                borderColor: theme.palette.grey[400],
                                borderRadius: `${customization.borderRadius}px`,
                                padding: '10px'
                            }}
                        >
                            <Box sx={{ my: 1 }}>
                                <Typography variant="subtitle1">Title</Typography>
                            </Box>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput type="text" value={values.title} name="title" onChange={handleChange} inputProps={{}} />
                            </FormControl>
                        </div>

                        <Box sx={{ my: 1 }}>
                            <Typography variant="subtitle1">What are the details of your problem? </Typography>
                        </Box>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                            <div
                                style={{
                                    border: '1px solid black',
                                    borderColor: theme.palette.grey[400],
                                    borderRadius: `${customization.borderRadius}px`,
                                    backgroundColor: theme.palette.background.paper,
                                    padding: '2px'
                                }}
                            >
                                <Editor
                                    editorState={values.body}
                                    toolbarStyle={{
                                        borderRadius: `${customization.borderRadius}px`
                                    }}
                                    editorStyle={{
                                        padding: '15px',
                                        borderRadius: `${customization.borderRadius}px`,
                                        backgroundColor: theme.palette.background.paper,
                                        minHeight: '300px'
                                    }}
                                    onBlur={handleBlur}
                                    onEditorStateChange={(value) => setFieldValue('body', value)}
                                />
                            </div>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Update Topic
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default CreateTopic;
