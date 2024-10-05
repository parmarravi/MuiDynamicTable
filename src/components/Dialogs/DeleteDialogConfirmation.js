import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function DeleteDialogConfirmation({ msg, showDeleteConfirmation = false, deleteCallback, cancelCallback }) {
    return (
        <Dialog
            open={showDeleteConfirmation}
            aria-labelledby="session-expired-dialog-title"
            aria-describedby="session-expired-dialog-description"
        >
            <DialogTitle id="session-expired-dialog-title" sx={{ fontSize: 18 }}>
                Delete
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="session-expired-dialog-description">
                    {msg ? msg : 'Do you want to Delete the data?'}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={cancelCallback} sx={{ color: 'black' }}>
                    No
                </Button>
                <Button onClick={deleteCallback} sx={{ color: 'red' }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialogConfirmation;
