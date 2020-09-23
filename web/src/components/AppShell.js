import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import TopBar from "./TopBar";
import AppDrawer from "./AppDrawer";
import AuthRouter from "./AuthRouter";
import { fetchUserInfo, selectUserError } from "slices/userSlice";
import { isEmpty } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectFBEmailVerified } from "utils/firebase";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const dispatch = useDispatch();

  const fbLoggedIn = !isEmpty(useSelector(selectAuth));
  const fbEmailVerified = useSelector(selectFBEmailVerified);
  const userError = useSelector(selectUserError);

  // Fetch user data on mount
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // If user has insufficient details, kick them to login page
  useEffect(() => {
    if (userError) {
      history.push("/login");
      return;
    }
  }, [dispatch, history, userError]);

  // Kick users out of app if they are not logged in or email not verified
  useEffect(() => {
    if (!fbLoggedIn || !fbEmailVerified) {
      history.push("/login");
      return;
    }
  }, [fbLoggedIn, fbEmailVerified, history]);

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
