import { Box, Container, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import TopBar from "./TopBar";
import AppDrawer from "./AppDrawer";
import AuthRouter from "./AuthRouter";
import { fetchUserInfo, selectName } from "slices/userSlice";
import { isEmpty } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuth,
  selectFBEmailVerified,
  selectIsFBLoaded,
} from "utils/firebase";
import { useHistory } from "react-router-dom";
import LoadingSplash from "./LoadingSplash";

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

  const isFBLoaded = useSelector(selectIsFBLoaded);
  const fbLoggedIn = !isEmpty(useSelector(selectAuth));
  const fbEmailVerified = useSelector(selectFBEmailVerified);
  const userName = useSelector(selectName);

  // Fetch user data when logged in
  useEffect(() => {
    if (!isFBLoaded || !fbLoggedIn) return;
    dispatch(fetchUserInfo());
  }, [dispatch, isFBLoaded, fbLoggedIn]);

  // If user has insufficient details, kick them to login page
  useEffect(() => {
    if (!isFBLoaded || !fbLoggedIn) return;
    if (!userName) {
      history.push("/login");
    }
  }, [dispatch, history, isFBLoaded, fbLoggedIn, userName]);

  // Kick users out of app if they are not logged in or email not verified
  useEffect(() => {
    if (!isFBLoaded) {
      return;
    }
    if (!fbLoggedIn || !fbEmailVerified) {
      history.push("/login");
    }
  }, [isFBLoaded, fbLoggedIn, fbEmailVerified, history]);

  return (
    <>
      {userName ? (
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
      ) : (
        <LoadingSplash />
      )}
    </>
  );
};

export default AppShell;
