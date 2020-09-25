import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SwipeableViews from "react-swipeable-views";
import { useHistory } from "react-router-dom";
import { isEmpty, useFirebase } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";

import LogoHorizontal from "components/LogoHorizontal";
import fbInstance, { selectAuth, selectFBEmailVerified } from "utils/firebase";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Controller, useForm } from "react-hook-form";
import { fetchUserInfo, postUserInfo, selectName } from "slices/userSlice";
import useIsMobile from "utils/useIsMobile";
import { useOnlineStorage } from "utils/onlineStorage";
import { deepOrange } from "@material-ui/core/colors";
import Alert from "components/Alert";

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
  avatarOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function UserAuth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // step 0: firebase loading
  // step 1: social / email login
  // step 2: additional details
  // step 3: verify email address
  const [authStep, setAuthStep] = useState(0);
  const fbLoggedIn = !isEmpty(useSelector(selectAuth));
  const fbEmailVerified = useSelector(selectFBEmailVerified);
  const userName = useSelector(selectName);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch, fbLoggedIn]);

  useEffect(() => {
    if (!fbLoggedIn) {
      setAuthStep(1);
      return;
    }
    if (!userName) {
      setAuthStep(2);
      return;
    }
    if (!fbEmailVerified) {
      setAuthStep(3);
      return;
    }
    history.push("/dashboard");
  }, [fbLoggedIn, fbEmailVerified, userName, history]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.logo}>
          <LogoHorizontal scale="100%" />
        </div>
        {authStep === 0 && <CircularProgress />}
        {authStep === 1 && <AuthForm />}
        {authStep === 2 && <DetailsForm />}
        {authStep === 3 && <VerifyEmailPage />}
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

  const firebase = useFirebase();

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
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    watch,
  } = useForm();
  const isMobile = useIsMobile();

  const { uploadUserFile } = useOnlineStorage();

  const [matricDate, setMatricDate] = useState(new Date());
  const [gradDate, setGradDate] = useState(new Date());
  const [snackbar, setSnackbar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [nusEmailFromFB, setNusEmailFromFB] = useState("");

  const watchName = watch("name");
  const watchPhotoUrl = watch("photoUrl");

  const {
    uid,
    email: fbEmail,
    displayName: fbDisplayName,
    photoURL: fbPhotoUrl,
  } = useSelector(selectAuth);

  useEffect(() => {
    if (fbEmail && fbEmail.includes("nus.edu")) {
      setNusEmailFromFB(fbEmail);
    }
  }, [fbEmail]);

  useEffect(() => {
    register("matricDate", {
      required: true,
      validate: {
        invalidDate: (date) => date < gradDate,
      },
    });
    register("gradDate", {
      required: true,
      validate: {
        invalidDate: (date) => date > matricDate,
      },
    });
    register("photoUrl");
  }, [register, gradDate, matricDate]);

  useEffect(() => {
    setValue("photoUrl", fbPhotoUrl);
  }, [fbPhotoUrl, setValue]);

  const stripDateDay = (date) => {
    let newDate = date.toISOString().split("T")[0];
    newDate = newDate.slice(0, -2) + "01";
    return newDate;
  };

  const onDetailsFormSubmit = (data) => {
    data.email = data.email ? data.email : fbEmail;
    data.nusEmail = data.nusEmail ? data.nusEmail : nusEmailFromFB;
    data.matricDate = stripDateDay(data.matricDate);
    data.gradDate = stripDateDay(data.gradDate);
    const {
      email,
      gradDate: graduate_in,
      major,
      matricDate: matric_date,
      name,
      nusEmail: nus_email,
      photoUrl: photo_url,
      telegram: tg_handle,
    } = data;
    const payload = {
      email,
      graduate_in,
      major,
      matric_date,
      name,
      nus_email,
      photo_url,
      tg_handle,
    };
    firebase.reloadAuth().catch((e) => console.log(e.message));
    dispatch(postUserInfo(payload));
  };

  const uploadUserProfilePic = async (event) => {
    const file = event.target.files[0];
    let url;
    setIsUploading(true);
    try {
      const uploadedFile = await uploadUserFile(uid, file);
      url = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    } catch {
      setIsUploading(false);
      setSnackbar(
        <Alert
          onClose={() => {
            setSnackbar(null);
          }}
          severity="warning"
        >
          There were problems uploading your photo. Please try again.
        </Alert>,
      );
    }
    setValue("photoUrl", url);
    setIsUploading(false);

    setSnackbar(
      <Alert
        onClose={() => {
          setSnackbar(null);
        }}
        severity="success"
      >
        Photo uploaded successfully.
      </Alert>,
    );
  };

  const fieldRequired = (
    <span style={{ color: "red" }}>This field is required</span>
  );

  return (
    <Container
      maxWidth="md"
      style={{ padding: "0", marginBottom: theme.spacing(2) }}
    >
      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => {
          setSnackbar(null);
        }}
      >
        {snackbar}
      </Snackbar>
      <Typography className={classes.title} variant="h5" component="h1">
        Additional Details
      </Typography>
      <Paper className={classes.paper}>
        <p>
          Please fill these additional details to complete your NUSMentors
          profile:
        </p>
        <form
          noValidate
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit(onDetailsFormSubmit)}
        >
          <Avatar
            src={watchPhotoUrl}
            className={classes.avatarOrange}
            style={{
              height: isMobile ? "150px" : "200px",
              width: isMobile ? "150px" : "200px",
              margin: "0 auto",
            }}
          >
            {watchName &&
              watchName
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), "")
                .toUpperCase()}
          </Avatar>
          {/* dummy input to accept a file */}
          <input
            id="pic-upload"
            accept="image/*"
            hidden
            type="file"
            onChange={uploadUserProfilePic}
          />
          <label htmlFor="pic-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={isUploading}
              size="small"
              style={{ margin: `${theme.spacing(2)}px 0` }}
            >
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </label>

          <TextField
            label="Display Name"
            id="name"
            fullWidth
            required
            margin="dense"
            name="name"
            defaultValue={fbDisplayName}
            helperText={errors.name ? fieldRequired : null}
            inputRef={(ref) => register(ref, { required: true })}
          />
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={5}>
              {fbEmail && (
                <TextField
                  label="Email"
                  id="email"
                  required
                  type="email"
                  fullWidth
                  defaultValue={fbEmail}
                  disabled
                  margin="dense"
                  name="email"
                  inputRef={(ref) =>
                    register(ref, { required: true, pattern: /\S+@\S+\.\S+/ })
                  }
                  helperText={
                    errors.email ? (
                      errors.email.type === "required" ? (
                        fieldRequired
                      ) : (
                        <span style={{ color: "red" }}>
                          Please enter a valid email address
                        </span>
                      )
                    ) : (
                      "For login and contact purposes"
                    )
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="NUS Email"
                id="nus-email"
                required
                type="email"
                fullWidth
                margin="dense"
                name="nusEmail"
                defaultValue={nusEmailFromFB}
                disabled={!!nusEmailFromFB}
                helperText={
                  errors.nusEmail ? (
                    errors.nusEmail.type === "required" ? (
                      fieldRequired
                    ) : (
                      <span style={{ color: "red" }}>
                        Please enter a valid NUS email address
                      </span>
                    )
                  ) : (
                    "For NUS student/alumnus verification"
                  )
                }
                inputRef={(ref) =>
                  register(ref, {
                    required: true,
                    pattern: /\S+@\S*nus\.edu\S*/,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12} sm={5}>
              <KeyboardDatePicker
                disableToolbar
                margin="normal"
                fullWidth
                required
                id="matric-date-picker"
                label="Matriculation Month"
                views={["year", "month"]}
                value={matricDate}
                onChange={(date) => {
                  setMatricDate(date);
                  setValue("matricDate", date, { shouldValidate: true });
                }}
                helperText={
                  errors.matricDate ? (
                    errors.matricDate.type === "required" ? (
                      fieldRequired
                    ) : (
                      <span style={{ color: "red" }}>
                        Matriculation date must be before graduation date
                      </span>
                    )
                  ) : null
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <KeyboardDatePicker
                disableToolbar
                fullWidth
                required
                margin="normal"
                id="grad-date-picker"
                label="Graduation Month"
                views={["year", "month"]}
                value={gradDate}
                helperText={
                  errors.gradDate ? (
                    errors.gradDate.type === "required" ? (
                      fieldRequired
                    ) : (
                      <span style={{ color: "red" }}>
                        Graduation date must be after matriculation date
                      </span>
                    )
                  ) : null
                }
                onChange={(date) => {
                  setGradDate(date);
                  setValue("gradDate", date, { shouldValidate: true });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth required>
            <InputLabel id="major-label">Major</InputLabel>
            <Controller
              as={
                <Select fullWidth style={{ textAlign: "left" }}>
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
              }
              name="major"
              rules={{ required: true }}
              control={control}
              defaultValue=""
            />
            <FormHelperText>
              {errors.major ? fieldRequired : null}
            </FormHelperText>
          </FormControl>
          <TextField
            label="Telegram Handle (optional)"
            fullWidth
            margin="dense"
            name="telegram"
            helperText="To help your mentee/mentor contact you"
            inputRef={register}
            // TODO: check for @ in telegram handle
          />
          <div style={{ textAlign: "right", marginTop: theme.spacing(4) }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
}

function VerifyEmailPage() {
  const classes = useStyles();
  const theme = useTheme();

  const { email: fbEmail } = useSelector(selectAuth);

  useEffect(() => {
    fbInstance
      .auth()
      .currentUser.sendEmailVerification({
        url: "https://nusmentors.com/login",
      })
      .then(() => {
        console.log("Verification email sent.");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <Container
      maxWidth="md"
      style={{ padding: "0", marginBottom: theme.spacing(2) }}
    >
      <Typography className={classes.title} variant="h5" component="h1">
        Verify Email
      </Typography>
      <Paper className={classes.paper}>
        <p>
          We have sent you a verification email at <b>{fbEmail}</b>. Please open
          your inbox and verify your email address.
        </p>
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
