import { Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

function CardLoading() {
    return (
        <Card sx={{ mb: 2, p: 1, borderRadius: 2 }}>
            <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </CardContent>
        </Card>
    );
}

export default CardLoading;
