import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import NotificationBox from "components/NotificationBox";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  getNotifications,
  getNotificationState,
} from "slices/notificationSlice";
import { selectName } from "slices/userSlice";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const displayName = useSelector(selectName);
  const notifications = useSelector(getNotifications);
  const notificationStatus = useSelector(getNotificationState);
  console.log(notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notificationStatus === "idle") {
      dispatch(fetchNotifications());
    }
  }, [dispatch, notificationStatus]);
  const welcomeMessage = (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography variant="h5">
          Welcome back,{" "}
          <span style={{ fontWeight: "bold" }}>{displayName}</span>!
        </Typography>
      </Paper>
    </Grid>
  );
  const notificationArea = (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        {notifications.length > 0 ? (
          <>
            <Typography variant="h5">Notifications</Typography>
            {notifications.map((notification) => (
              <NotificationBox
                key={notification.nid}
                notification={notification}
              />
            ))}
          </>
        ) : (
          <Typography variant="h5">No notifications so far!</Typography>
        )}
      </Paper>
    </Grid>
  );

  return (
    <>
      <Helmet>
        <title>NUSMentors - Dashboard</title>
      </Helmet>
      <Grid container spacing={2}>
        {welcomeMessage}
        {notificationArea}
      </Grid>
    </>
  );
};

export default Dashboard;
