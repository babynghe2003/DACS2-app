import { useEffect, useState } from 'react';

import TopicCard from './TopicCard';

import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

const SearchTopic = () => {
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
            </Grid>
        </>
    );
};

export default SearchTopic;
