import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SwipeableViews from "react-swipeable-views";
import { useHistory } from "react-router-dom";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";

import LogoHorizontal from "components/LogoHorizontal";
import { selectAuth } from "utils/firebase";
import { KeyboardDatePicker } from "@material-ui/pickers";

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
  // step 0: firebase loading
  // step 1: social / email login
  // step 2: additional details
  const [authStep, setAuthStep] = useState(1);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.logo}>
          <LogoHorizontal scale="100%" />
        </div>
        {authStep === 0 && <CircularProgress />}
        {authStep === 1 && <AuthForm />}
        {authStep === 2 && <DetailsForm />}
      </Container>
    </div>
  );
}

function AuthForm() {
  const classes = useStyles();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [authError, setAuthError] = useState("");
  const [canSignIn, setCanSignIn] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const history = useHistory();
  const auth = useSelector(selectAuth);
  const firebase = useFirebase();

  // Redirect user to dash if already logged in
  useEffect(() => {
    if (!isLoaded(auth) || isEmpty(auth)) return;
    history.push("/dashboard");
  }, [auth, history]);

  const handleSubmit = async () => {
    if (isCreateAccount) {
      firebase.createUser({ email, password }).catch((error) => {
        setAuthError(error.message);
      });
    } else {
      firebase.login({ email, password }).catch((error) => {
        setAuthError(error.message);
      });
    }
  };

  const handleSocial = async (provider) => {
    return firebase.login({ provider, type: "popup" });
  };

  const handleTabChange = (event, newValue) => {
    handleChangeIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
    if (index === 0) {
      setIsCreateAccount(false);
    } else {
      setIsCreateAccount(true);
    }
    setAuthError("");
  };

  // login form validation
  useEffect(() => {
    if (isCreateAccount) return;
    if (!email && !password) return;
    if (email && /\S+@\S+\.\S+/.test(email) && password) {
      setAuthError("");
      setCanSignIn(true);
      return;
    }
    setCanSignIn(false);

    if (!email) {
      setAuthError("Please enter an email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAuthError("Please enter a valid email address");
      return;
    }
    setAuthError("Please enter a password");
  }, [isCreateAccount, email, password]);

  // registration form validation
  useEffect(() => {
    if (!isCreateAccount) return;
    if (!email && !password && !passwordAgain) return;
    if (email && /\S+@\S+\.\S+/.test(email) && password === passwordAgain) {
      setAuthError("");
      setCanRegister(true);
      return;
    }
    setCanRegister(false);

    if (!email) {
      setAuthError("Please enter an email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAuthError("Please enter a valid email address");
      return;
    }
    setAuthError("Passwords do not match");
  }, [isCreateAccount, email, passwordAgain, password]);

  return (
    <>
      <Typography className={classes.title} variant="h5" component="h1">
        Sign in/Register
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Paper className={classes.paper}>
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
              onClick={() => handleSocial("github")}
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
              onChange={handleTabChange}
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
                    label="Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </form>
                <Box p={1}>
                  <span style={{ color: "red" }}>{authError}&nbsp;</span>
                </Box>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="default"
                  disabled
                >
                  Forgot Password
                </Button>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="primary"
                  disabled={!canSignIn}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </TabPanel>
              <TabPanel value={tabValue} index={1} dir={theme.direction}>
                <form noValidate autoComplete="off" className={classes.form}>
                  <TextField
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
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    value={passwordAgain}
                    onChange={(e) => {
                      setPasswordAgain(e.target.value);
                    }}
                  />
                  <Box p={1}>
                    <span style={{ color: "red" }}>{authError}&nbsp;</span>
                  </Box>
                </form>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="primary"
                  disabled={!canRegister}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

function DetailsForm() {
  const classes = useStyles();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [nusEmail, setNusEmail] = useState("");
  const [name, setName] = useState("");
  const [matricDate, setMatricDate] = useState(new Date());
  const [gradDate, setGradDate] = useState(new Date());
  const [major, setMajor] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [telegram, setTelegram] = useState("");

  const stripDateDay = (date) => {
    let newDate = date.toISOString().split("T")[0];
    newDate = newDate.slice(0, -2) + "01";
    return newDate;
  };

  return (
    <Container
      maxWidth="md"
      style={{ padding: "0", marginBottom: theme.spacing(2) }}
    >
      <Typography className={classes.title} variant="h5" component="h1">
        Additional Details
      </Typography>
      <Paper className={classes.paper}>
        <p>
          Please fill these additional details to complete your NUSMentors
          profile:
        </p>
        <form noValidate autoComplete="off" className={classes.form}>
          <FormControl fullWidth>
            <TextField
              label="Display Name"
              id="name"
              fullWidth
              required
              margin="dense"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  id="email"
                  required
                  type="email"
                  fullWidth
                  margin="dense"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormHelperText>For login and contact purposes</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <TextField
                  label="NUS Email"
                  id="nus-email"
                  required
                  type="email"
                  fullWidth
                  margin="dense"
                  value={nusEmail}
                  onChange={(e) => {
                    setNusEmail(e.target.value);
                  }}
                />
                <FormHelperText>
                  For NUS student / alumnus verification
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  margin="normal"
                  fullWidth
                  id="matric-date-picker"
                  label="Matriculation Month"
                  views={["year", "month"]}
                  value={matricDate}
                  onChange={setMatricDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  fullWidth
                  margin="normal"
                  id="matric-date-picker"
                  label="Graduation Month"
                  views={["year", "month"]}
                  value={gradDate}
                  onChange={setGradDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth required>
            <InputLabel id="major-label">Major</InputLabel>
            <Select
              labelId="major-label"
              fullWidth
              displayEmpty
              value={major}
              style={{ textAlign: "left" }}
              onChange={(e) => {
                setMajor(e.target.value);
              }}
            >
              {[
                "Business Analytics",
                "Computer Science",
                "Information Security",
                "Information Systems",
                "Computer Engineering",
              ].map((major) => (
                <MenuItem key={major} value={major}>
                  {major}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Photo URL (todo replace this)"
              fullWidth
              margin="dense"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Telegram Handle (optional)"
              fullWidth
              margin="dense"
              value={telegram}
              onChange={(e) => {
                setTelegram(e.target.value);
              }}
            />
            <FormHelperText>
              To help your mentee/mentor contact you
            </FormHelperText>
          </FormControl>
          <div style={{ textAlign: "right", marginTop: theme.spacing(4) }}>
            <Button variant="contained" color="primary" onClick={null}>
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
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
