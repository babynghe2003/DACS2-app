import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import MaterialTable from 'material-table';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

//icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import { AllUserAPI, DeleteUser, UpdateUser } from 'api/DashBoardAPI';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //
const empList = [
    { id: 1, username: 'Neeraj', email: 'neeraj@gmail.com', number: 9876543210, address: 'Bangalore' },
    { id: 2, username: 'Raj', email: 'raj@gmail.com', number: 9812345678, address: 'Chennai' },
    { id: 3, username: 'David', email: 'david342@gmail.com', number: 7896536289, address: 'Jaipur' },
    { id: 4, username: 'Vikas', email: 'vikas75@gmail.com', number: 9087654321, address: 'Hyderabad' }
];

const TotalUser = ({ isLoading }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const columns = [
        { title: 'ID', field: 'id', editable: false },
        { title: 'Name', field: 'username' },
        { title: 'Phone', field: 'number' },
        { title: 'City', field: 'address' },
        { title: 'Email', field: 'email' }
    ];

    const [data, setData] = useState(empList);

    useEffect(() => {
        const getUser = async () => {
            const res = await AllUserAPI();
            if (res.status == 200) {
                setData(res.data.data);
            }
        };
        getUser();
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <MaterialTable
                                title="Users Table"
                                icons={tableIcons}
                                columns={columns}
                                data={data}
                                editable={{
                                    onRowDelete: (selectedRow) =>
                                        new Promise((resolve, reject) => {
                                            const index = selectedRow.tableData.id;
                                            const id = selectedRow.id;
                                            const updatedRows = [...data];
                                            updatedRows.splice(index, 1);
                                            setTimeout(async () => {
                                                setData(updatedRows);
                                                const res = await DeleteUser(id);
                                                resolve();
                                            }, 2000);
                                        }),
                                    onRowUpdate: (updatedRow, oldRow) =>
                                        new Promise((resolve, reject) => {
                                            const index = oldRow.tableData.id;
                                            const id = oldRow.id;
                                            const updatedRows = [...data];
                                            updatedRows[index] = updatedRow;
                                            setTimeout(async () => {
                                                setData(updatedRows);
                                                const res = await UpdateUser(id, updatedRow);
                                                resolve();
                                            }, 2000);
                                        })
                                }}
                                options={{
                                    actionsColumnIndex: -1,
                                    addRowPosition: 'first'
                                }}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalUser.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalUser;
