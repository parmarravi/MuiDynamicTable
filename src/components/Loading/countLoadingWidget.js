import { Card, Skeleton } from '@mui/material';
import React from 'react';

function CountLoadingWidget() {
    return (
        <Card sx={{ bgcolor: '#F2F2F2', height: '100', p: 1 }}>
            <Skeleton sx={{ height: 30 }} />
            <Skeleton sx={{ height: 40 }} />
        </Card>
    );
}

export default CountLoadingWidget;
