import {
  Box,
  Drawer,
  IconButton,
  SwipeableDrawer,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#FFF" : grey[800],
}));

const StyledPaper = styled("div")({
  borderRadius: "10px 10px 0 0",
});

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function CustomDialog({
  window,
  dialogTitle,
  showDrawer,
  closeDrawer,
  isLoading = false,
  buttonLabel,
  onClickCallback,
  customFormUi,
  isButtonEnable,
}) {
  const theme = useTheme();

  const isMobileUi = useMediaQuery("(max-width:600px)");

  const closeDialog = () => {
    closeDrawer();
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const dialogForm = () => {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: 0,
            mt: 5,
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              flex: 1,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            {dialogTitle}
          </Typography>
          <Tooltip title="Close" sx={{ mr: 2 }}>
            <IconButton onClick={closeDialog}>
              <CloseIcon style={{ color: "black" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            flex: 1,
            mb: isMobileUi ? 2 : 0,
            overflowY: "scroll",
          }}
        >
          {customFormUi}
        </Box>
        <Box
          sx={{
            flex: 0,
            p: isMobileUi ? 3 : 5,
            boxShadow: "0px -5px 5px -5px rgba(0,0,0,0.2)",
          }}
        >
          <LoadingButton
            variant="contained"
            fullWidth
            disabled={!isButtonEnable}
            loading={isLoading}
            size="large"
            onClick={onClickCallback}
          >
            {buttonLabel}
          </LoadingButton>
        </Box>
      </Box>
    );
  };

  return isMobileUi ? (
    <Root>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        onOpen={() => {}}
        open={showDrawer}
        onClose={closeDialog}
        sx={{
          height: "100%",
        }}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledPaper>
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                overflow: "visible",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            }}
          />

          <StyledBox
            sx={{
              position: "relative",
              display: "flex",
              height: "70vh",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Puller />
            {dialogForm()}
          </StyledBox>
        </StyledPaper>
      </SwipeableDrawer>
    </Root>
  ) : (
    <Drawer anchor={"right"} open={showDrawer} onClose={closeDialog}>
      <Box
        sx={{
          width: 400,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.primary.light,
        }}
      >
        {dialogForm()}
      </Box>
    </Drawer>
  );
}

export default CustomDialog;
