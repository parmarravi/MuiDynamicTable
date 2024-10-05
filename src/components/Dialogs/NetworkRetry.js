import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Lottie from 'lottie-react';
import NetworkErrorAnimation from 'assets/lottie/network-error';

function NetworkRetry({ showRetryDialog = false, retryCallback }) {
    return (
        <Dialog open={showRetryDialog} aria-labelledby="session-expired-dialog-title" aria-describedby="session-expired-dialog-description">
            <DialogTitle id="session-expired-dialog-title">Error Occurred</DialogTitle>
            <DialogContent>
                <Lottie animationData={NetworkErrorAnimation} style={{ height: 200 }} loop />

                <DialogContentText id="session-expired-dialog-description" textAlign="center">
                    An error has occurred. Would you like to retry?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={retryCallback} sx={{ color: 'red' }}>
                    Retry
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NetworkRetry;
