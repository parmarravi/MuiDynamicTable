import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Lottie from 'lottie-react';
import LoaderAnimation from 'assets/lottie/loader';

function Loader({ showLoader }) {
    return (
        <Dialog
            open={showLoader}
            aria-labelledby="loader-dialog-title"
            aria-describedby="loader-dialog-description"
            PaperProps={{
                style: {
                    boxShadow: 'none'
                }
            }}
        >
            <DialogContent>
                <Lottie animationData={LoaderAnimation} style={{ height: 200, width: 200 }} loop />
            </DialogContent>
        </Dialog>
    );
}

export default Loader;
