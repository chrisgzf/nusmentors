import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import Homepage from "pages/Homepage";
import UserAuth from "pages/UserAuth";
import AppShell from "../AppShell";
import { useDispatch } from "react-redux";
import { setupFirebase } from "utils/firebase";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme();
const firebase = setupFirebase();

function App() {
  const dispatch = useDispatch();
  const rrfProps = {
    firebase,
    config: {},
    dispatch,
  };

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
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
