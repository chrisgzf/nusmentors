import React, { useState, useEffect, useCallback } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import LogoHorizontal from "components/LogoHorizontal";
import {
  githubAuthProvider,
  selectAuth,
  // googleAuthProvider,
  // facebookAuthProvider,
} from "utils/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    margin: `${theme.spacing(4)}px auto`,
    maxWidth: theme.breakpoints.width("sm"),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  title: {
    margin: `${theme.spacing(4)}px auto`,
  },
  sectionTitle: {
    margin: `${theme.spacing(1)}px auto`,
  },
  socialLoginButtons: {
    margin: `${theme.spacing(1)}px auto`,
    width: "80%",
  },
  buttons: {
    margin: theme.spacing(1),
  },
  form: {
    margin: `${theme.spacing(1)}px auto`,
    width: "90%",
  },
}));

function UserAuth() {
  const classes = useStyles();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [fullName, setFullName] = useState("");

  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(true);
  const [authError, setAuthError] = useState();

  const history = useHistory();
  const auth = useSelector(selectAuth);
  const firebase = useFirebase();

  // Redirect user to dash if already logged in
  useEffect(() => {
    if (!isLoaded(auth) || isEmpty(auth)) return;
    console.log("User already signed in:", auth);
    history.push("/dashboard");
  }, [auth, history]);

  // useEffect(
  //   () => {
  //     getRedirectResult()
  //       .then(({ user, additionalUserInfo }) => {
  //         if (!user) {
  //           setIsLoadingRedirect(false);
  //         } else if (additionalUserInfo.isNewUser && !user.emailVerified) {
  //           sendEmailVerificationToUser(user);
  //         }
  //       })
  //       .catch((error) => {
  //         setIsLoadingRedirect(false);
  //         setAuthError(error.message);
  //       });
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [
  //     /* Intentionally empty: run only once */
  //   ],
  // );

  const handleSubmit = useCallback(async () => {
    setAuthError(null);

    let fut;
    if (isCreateAccount) {
      fut = firebase.createUser({ email, password });
    } else {
      fut = firebase.login({ email, password });
    }
    return fut.catch((error) => {
      console.log(error.message);
      setAuthError(error.message);
    });
  }, [email, password, isCreateAccount, firebase]);

  const handleSocial = useCallback(
    async (provider) => {
      setAuthError(null);
      return firebase.login(provider).catch((error) => {
        setAuthError(error.message);
      });
    },
    [firebase],
  );

  const handleGithub = useCallback(
    async () => handleSocial(githubAuthProvider),
    [handleSocial],
  );
  // const handleGoogle = useCallback(
  //   async () => handleSocial(googleAuthProvider),
  //   [handleSocial],
  // );
  // const handleFacebook = useCallback(
  //   async () => handleSocial(facebookAuthProvider),
  //   [handleSocial],
  // );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.logo}>
          <LogoHorizontal scale="100%" />
        </div>
        <Typography className={classes.title} variant="h4" component="h1">
          Sign in/Register
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.sectionTitle}
                variant="h6"
                component="h2"
              >
                Social Login
              </Typography>
              <Button
                className={classes.socialLoginButtons}
                variant="contained"
                color="primary"
                disabled
              >
                Sign in with Google
              </Button>
              <Button
                className={classes.socialLoginButtons}
                variant="contained"
                color="primary"
                onClick={handleGithub}
              >
                Sign in with GitHub
              </Button>
              <Button
                className={classes.socialLoginButtons}
                variant="contained"
                color="primary"
                disabled
              >
                Sign in with Facebook
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper
              className={classes.paper}
              style={{ paddingTop: "0", paddingBottom: "0" }}
            >
              <Tabs
                value={tabValue}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                style={{ width: "100%" }}
              >
                <Tab label="Sign in" />
                <Tab label="Register" />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={tabValue}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={tabValue} index={0} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.form}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      margin="dense"
                      value={email}
                      onClick={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="dense"
                      value={password}
                      onClick={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </form>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="default"
                  >
                    Forgot Password
                  </Button>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
                  >
                    Sign in
                  </Button>
                </TabPanel>
                <TabPanel value={tabValue} index={1} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.form}>
                    <TextField
                      id="name"
                      label="Full Name"
                      fullWidth
                      margin="dense"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      margin="dense"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="dense"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <TextField
                      id="password"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="dense"
                      value={passwordAgain}
                      onChange={(e) => {
                        setPasswordAgain(e.target.value);
                      }}
                    />
                  </form>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </TabPanel>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default UserAuth;
