import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import Homepage from "pages/Homepage";
import UserAuth from "pages/UserAuth";
import AppShell from "../AppShell";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFBLoaded, setupFirebase } from "utils/firebase";
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
  const isFBLoaded = useSelector(selectIsFBLoaded);

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          {isFBLoaded ? (
            <Router>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/register" component={UserAuth} />
                <Route exact path="/login" component={UserAuth} />
                <Route component={AppShell} />
              </Switch>
            </Router>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: `${window.innerHeight}px`,
              }}
            >
              <CircularProgress />
            </div>
          )}
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ReactReduxFirebaseProvider>
  );
}

export default App;
