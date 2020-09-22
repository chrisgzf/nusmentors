import React from "react";
import { Route, Switch } from "react-router-dom";
import RequestMentors from "pages/RequestMentors";
import Dashboard from "pages/Dashboard";
import Requests from "pages/Requests";
import AcceptRequest from "pages/AcceptRequest";
import Mentees from "pages/Mentees";
import Mentors from "pages/Mentors";

const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/request" component={RequestMentors} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/requests" component={Requests} />
      <Route exact path="/accept-request/:id" component={AcceptRequest} />
      <Route exact path="/mentees" component={Mentees} />
      <Route exact path="/mentors" component={Mentors} />
    </Switch>
  );
};

export default AuthRouter;
