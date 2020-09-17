import React from "react";
import { Route, Switch } from "react-router-dom";
import RequestMentors from "pages/RequestMentors";
import Dashboard from "pages/Dashboard";
import MentorPeople from "pages/MentorPeople";

const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/request" component={RequestMentors} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/mentor-people" component={MentorPeople} />
    </Switch>
  );
};

export default AuthRouter;
