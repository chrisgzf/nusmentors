import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import NotificationBox from "components/NotificationBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  getNotifications,
  getNotificationState,
} from "slices/notificationSlice";
import { selectName } from "slices/userSlice";
import { Helmet } from "react-helmet";
import Collapse from "@kunukn/react-collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const displayName = useSelector(selectName);
  const notifications = useSelector(getNotifications);
  const notificationStatus = useSelector(getNotificationState);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleExpandClick = () => setExpanded(!expanded);
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
      <Card>
        <CardHeader
          title={<Typography variant="h6">Notifications</Typography>}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <CardContent style={{ paddingTop: 0 }}>
          {notifications.length > 0 ? (
            <Collapse
              collapseHeight="400px"
              isOpen={expanded}
              transition={`height 300ms cubic-bezier(.4, 0, .2, 1)`}
            >
              {notifications.map((notification) => (
                <NotificationBox
                  key={notification.nid}
                  notification={notification}
                />
              ))}
            </Collapse>
          ) : (
            <Typography variant="body1">No notifications for now.</Typography>
          )}
        </CardContent>
      </Card>
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
