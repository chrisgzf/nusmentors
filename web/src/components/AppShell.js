import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import TopBar from "./TopBar";
import AppDrawer from "./AppDrawer";
import AuthRouter from "./AuthRouter";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const AppShell = () => {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <Box className={classes.container}>
        <AppDrawer />
        <Container className={classes.content} maxWidth="md">
          <Toolbar />
          <AuthRouter />
        </Container>
      </Box>
    </>
  );
};

export default AppShell;
