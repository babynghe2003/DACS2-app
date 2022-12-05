import { useEffect, useState } from 'react';

import TopicCard from './TopicCard';
import UserCard from './UserCard';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

const Default = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <TopicCard isLoading={isLoading} />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <UserCard isLoading={isLoading} />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <BlogCard isLoading={isLoading} />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Default;
