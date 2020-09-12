import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "pages/Homepage";
import UserAuth from "pages/UserAuth";

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/register" component={UserAuth} />
          <Route exact path="/login" component={UserAuth} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
