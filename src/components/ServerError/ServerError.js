import { Box, Button, Typography } from "@mui/material";
import React from "react";

function ServerError({ onCallback }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", width: "100%", p: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={"images/illustration_404.svg"}
          alt="not-found-logo"
          width={200}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        <Typography
          variant="h4"
          sx={{
            color: "text.secondary",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Sorry, we couldn’t load the data due to server issue!!
        </Typography>
        <Button
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onCallback}
        >
          Retry
        </Button>
      </Box>
    </Box>
  );
}

export default ServerError;
