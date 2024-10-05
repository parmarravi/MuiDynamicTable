import { Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

function BannerListLoading() {
    return Array.from({ length: 10 }, (_, index) => (
        <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </CardContent>
        </Card>
    ));
}

export default BannerListLoading;
