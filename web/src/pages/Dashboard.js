import {
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

//Placeholder values
const mentees = [
  {
    name: "Kai Xin",
  },
  {
    name: "Thuya",
  },
  {
    name: "Clement",
  },
];

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

  const welcomeMessage = (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Welcome back Christopher!</Typography>
      </Paper>
    </Grid>
  );

  const menteeBoard = (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography variant="h5">You have paired up with</Typography>
        <List>
          {mentees.map((mentee, id) => (
            <ListItem key={id}>{mentee.name}</ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      {welcomeMessage}
      {menteeBoard}
    </Grid>
  );
};

export default Dashboard;
