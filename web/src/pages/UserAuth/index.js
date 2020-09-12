import React, { useState } from "react";

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
              >
                Sign in with Google
              </Button>
              <Button
                className={classes.socialLoginButtons}
                variant="contained"
                color="primary"
              >
                Sign in with GitHub
              </Button>
              <Button
                className={classes.socialLoginButtons}
                variant="contained"
                color="primary"
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
              {/* <Typography
                className={classes.sectionTitle}
                variant="h6"
                component="h2"
              >
                Email Login / Sign-up
              </Typography> */}
              {/* <AppBar position="static" color="default"> */}
              <Tabs
                value={value}
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
              {/* </AppBar> */}
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.form}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="dense"
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
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.form}>
                    <TextField
                      id="name"
                      label="Full Name"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      id="password"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="dense"
                    />
                  </form>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color="primary"
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default UserAuth;
