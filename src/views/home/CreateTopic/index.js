import React, { useState, useEffect } from 'react';

import { EditorState, convertToRaw, convertFromRaw, ContentBlock } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useSelector } from 'react-redux';
import { CreateTopicAPI } from 'api/TopicApi';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
    TextareaAutosize
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CreateTopic = (props) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    body: EditorState.createEmpty()
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(200).required('Title is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const res = await CreateTopicAPI({
                            title: values.title,
                            body: convertToRaw(values.body.getCurrentContent())
                        });
                        if (res.status == 201) {
                            alert('Da tao thanh cong mot topic!!');
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
                                <InputLabel htmlFor="title-field">Title</InputLabel>
                                <OutlinedInput
                                    id="title-field"
                                    type="text"
                                    value={values.title}
                                    name="title"
                                    onChange={handleChange}
                                    label="Title"
                                    inputProps={{}}
                                />
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
                                    Review your question
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
