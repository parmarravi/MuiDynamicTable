import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material';
import { useTheme, width } from '@mui/system';

function LogoutDialogConfirmation({ msg, showLogoutDialogConfirmation = false, positiveCallback, cancelCallback }) {
    return (
        <Dialog open={showLogoutDialogConfirmation} aria-labelledby="logout-dialog-title" aria-describedby="logout-dialog-description">
            <DialogTitle id="logout-dialog-title" sx={{ fontSize: 18 }}>
                Logout
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="logout-dialog-description">{msg ? msg : 'Do you want to Logout?'}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelCallback} sx={{ color: 'black' }}>
                    No
                </Button>
                <Button onClick={positiveCallback} sx={{ color: 'red' }}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialogConfirmation;
