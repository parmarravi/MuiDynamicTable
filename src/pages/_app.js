import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import themes from "../styles/theme";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
