import { useEffect, useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Box, Button, FormControl, OutlinedInput, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import AnimateButton from 'ui-component/extended/AnimateButton';

// third party
import { updateProfile, updatePassword } from 'api/UserApi';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ userData }) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();

    const isOwn = () => {
        return userInfo.id == userData.id ? true : false;
    };
    console.log(isOwn());

    return (
        <>
            <Formik
                initialValues={{
                    username: userData.username,
                    email: userData.email,
                    address: userData.address,
                    number: userData.number
                }}
                enableReinitialize={true}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const res = await updateProfile({
                            username: values.username,
                            email: values.email,
                            address: values.address,
                            number: values.number
                        });
                        if (res.status == 200) {
                            alert('Updated!!');
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
                                <Typography variant="subtitle1">Username</Typography>
                            </Box>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput
                                    readOnly={!isOwn()}
                                    type="text"
                                    value={values.username}
                                    name="username"
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                            </FormControl>
                            <Box sx={{ my: 1 }}>
                                <Typography variant="subtitle1">Email</Typography>
                            </Box>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput
                                    readOnly={!isOwn()}
                                    type="text"
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                            </FormControl>
                            <Box sx={{ my: 1 }}>
                                <Typography variant="subtitle1">Phone number</Typography>
                            </Box>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput
                                    readOnly={!isOwn()}
                                    type="text"
                                    value={values.number}
                                    name="phone"
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                            </FormControl>
                            <Box sx={{ my: 1 }}>
                                <Typography variant="subtitle1">Address</Typography>
                            </Box>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <OutlinedInput
                                    readOnly={!isOwn()}
                                    type="text"
                                    value={values.address}
                                    name="address"
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                            </FormControl>
                        </div>

                        {isOwn() ? (
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
                                        Save
                                    </Button>
                                </AnimateButton>
                            </Box>
                        ) : (
                            ''
                        )}
                    </form>
                )}
            </Formik>
            {isOwn() ? (
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        if (values.newPassword != values.confirmPassword) {
                            alert('Password not match');
                        } else {
                            try {
                                const res = await updatePassword({
                                    old_password: values.oldPassword,
                                    new_password: values.newPassword
                                });
                                if (res.status == 200) {
                                    alert('Updated!!');
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
                        }
                    }}
                >
                    {({
                        values,
                        touched,
                        dirty,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setFieldValue,
                        isSubmitting
                    }) => (
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
                                    <Typography variant="subtitle1">Old Password</Typography>
                                </Box>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <OutlinedInput
                                        type="password"
                                        value={values.oldPassword}
                                        name="oldPassword"
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="subtitle1">New Password</Typography>
                                </Box>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <OutlinedInput
                                        type="password"
                                        value={values.newPassword}
                                        name="newPassword"
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>
                                <Box sx={{ my: 1 }}>
                                    <Typography variant="subtitle1">Confirm Password</Typography>
                                </Box>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <OutlinedInput
                                        type="password"
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </FormControl>
                            </div>
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
                                        Save
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            ) : (
                ''
            )}
        </>
    );
};

export default EditProfile;
