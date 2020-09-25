import React, { useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, Snackbar } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import Homepage from "pages/Homepage";
import UserAuth from "pages/UserAuth";
import AppShell from "../AppShell";
import { useDispatch, useSelector } from "react-redux";
import { setupFirebase } from "utils/firebase";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  appOffline,
  appOnline,
  clearSnackbar,
  selectAppIsOnline,
  selectAppWasOffline,
  selectSnackbar,
  showSnackbar,
} from "slices/uiSlice";
import Alert from "@material-ui/lab/Alert";

const theme = createMuiTheme();
const firebase = setupFirebase();
window.coolStuff = firebase;

function App() {
  const dispatch = useDispatch();
  const rrfProps = {
    firebase,
    config: {},
    dispatch,
  };

  const {
    open: snackbarOpen,
    type: snackbarType,
    message: snackbarMessage,
  } = useSelector(selectSnackbar);

  const appIsOnline = useSelector(selectAppIsOnline);
  const appWasOffline = useSelector(selectAppWasOffline);

  useEffect(() => {
    if (!appIsOnline) {
      dispatch(
        showSnackbar({
          type: "warning",
          message:
            "No internet connectivity. Your experience might be limited. You will be notified when internet connectivity is back.",
        }),
      );
    } else if (appIsOnline && appWasOffline) {
      dispatch(
        showSnackbar({
          type: "success",
          message:
            "Internet connectivity is restored. You may continue normal operation.",
        }),
      );
    }
  }, [appIsOnline, appWasOffline, dispatch]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbar());
  };

  const checkOnlineStatus = async () => {
    try {
      const online = await fetch("/ping?wow=" + Date.now(), {
        headers: {
          "cache-control": "no-cache",
        },
      });
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };

  useEffect(() => {
    setInterval(async () => {
      const online = await checkOnlineStatus();
      if (!online) {
        dispatch(appOffline());
      } else {
        dispatch(appOnline());
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // force this to run once only

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          {snackbarOpen && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert onClose={handleSnackbarClose} severity={snackbarType}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          )}
          <Router>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/register">
                <UserAuth isLoginPage={false} />
              </Route>
              <Route exact path="/login">
                <UserAuth isLoginPage />
              </Route>
              <Route component={AppShell} />
            </Switch>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ReactReduxFirebaseProvider>
  );
}

export default App;
