import React, { useState, useEffect } from 'react';

import { EditorState, convertToRaw, convertFromRaw, ContentBlock } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useSelector } from 'react-redux';

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

const CreateTopic = (props) => {
    const theme = useTheme();
    const [body, setBody] = useState('');
    const [values, setValues] = useState({ tittle: '', body: '' });
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        // console.log(theme);
        // console.log(editorState.getCurrentContent());
        console.log(convertToRaw(editorState.getCurrentContent()));
    }, [editorState]);

    const handleChange = (key, e) => {
        switch (key) {
            case 'tittle':
                setValues({ ...values, tittle: e });
                break;
            case 'body':
                setValues({ ...values, body: e });
                break;
            default:
                break;
        }
    };
    const handleSubmit = (e) => {
        console.log('submit');
    };

    return (
        <>
            <div>CreateTopic</div>
            <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="tittle-field">Tittle</InputLabel>
                    <OutlinedInput
                        id="tittle-field"
                        type="text"
                        value={values.tittle}
                        name="tittle"
                        onChange={(e) => handleChange('tittle', e.target.value)}
                        label="Tittle"
                        inputProps={{}}
                    />
                </FormControl>
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
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            toolbarStyle={{
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            editorStyle={{
                                padding: '15px',
                                borderRadius: `${customization.borderRadius}px`,
                                backgroundColor: theme.palette.background.paper,
                                minHeight: '300px'
                            }}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button size="large" type="submit" variant="contained" color="secondary">
                            Review your question
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default CreateTopic;
