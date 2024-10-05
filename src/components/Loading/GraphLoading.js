import { Card, Skeleton } from '@mui/material';
import React from 'react';

function GraphLoadingWidget() {
    return (
        <Card sx={{ bgcolor: '#F2F2F2', height: '100', p: 3 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {[...Array(15)].map((_, index) => (
                        <Skeleton key={index} variant="rect" width={80} height={200} style={{ marginRight: 10 }} />
                    ))}
                </div>
                {/* <div style={{ display: 'flex', width: '40%', flexDirection: 'row', marginTop: 20 }}>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton key={`filter-${index}`} variant="rounded" width={100} height={30} style={{ marginRight: 10 }} />
                    ))}
                </div> */}
            </div>
        </Card>
    );
}

export default GraphLoadingWidget;
