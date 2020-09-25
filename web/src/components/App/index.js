import React from "react";
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
import { clearSnackbar, selectSnackbar } from "slices/uiSlice";
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearSnackbar());
  };

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarType}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
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
