import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectFBDisplayName } from "utils/firebase";

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
  const displayName = useSelector(selectFBDisplayName);

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

  return (
    <Grid container spacing={2}>
      {welcomeMessage}
    </Grid>
  );
};

export default Dashboard;
