import User1 from 'assets/images/users/avt.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

//api
import { AllUserAPI } from 'api/DashBoardAPI';
// ==============================|| HOME DEFAULT - USER CARD ||============================== //

const UserCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const [view, setView] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await AllUserAPI();
            if (res.status == 200) {
                setUsersData(res.data.data);
                console.log('OK');
            } else {
                console.log('Error' + res);
            }
        };
        getUsers();
    }, []);

    return (
        <>
            <MainCard content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4">{'Users'.toUpperCase()}</Typography>
                                </Grid>
                                <Grid item>
                                    <MoreHorizOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                            color: theme.palette.primary[200],
                                            cursor: 'pointer'
                                        }}
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
                            {usersData?.slice(0, view ? 5 : usersData.length).map((user) => {
                                return (
                                    <>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography
                                                            component={Link}
                                                            to={'/users/user?id=' + user.id}
                                                            variant="subtitle2"
                                                            sx={{ color: 'Highlight', textDecoration: 'none' }}
                                                        >
                                                            @{user.username} &nbsp;
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar src={User1} aria-haspopup="true" color="inherit" />
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

UserCard.propTypes = {
    isLoading: PropTypes.bool
};

export default UserCard;
