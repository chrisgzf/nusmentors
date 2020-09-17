import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Paper, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    margin: `${theme.spacing(4)}px auto`,
    maxWidth: theme.breakpoints.width("sm"),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  buttons: {
    margin: theme.spacing(1),
  },
  form: {
    margin: `${theme.spacing(1)}px auto`,
    width: "90%",
  },
}));

function RequestMentors() {
  const classes = useStyles();
  const types = [
    {
      value: "resume",
      label: "Resume Screening",
    },
    {
      value: "interview",
      label: "Mock Interviews",
    },
    {
      value: "general",
      label: "General Career Chat",
    },
  ];
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography align="center" variant="h5">
          What would you like to request help on?
        </Typography>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            select
            id="type"
            label="Question Type"
            fullWidth
            margin="dense"
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="title"
            label="Add a title (15 words or less)"
            type="text"
            fullWidth
            margin="dense"
          />
          <TextField
            id="description"
            label="Describe your concerns"
            type="text"
            fullWidth
            multiline
            rows={5}
            margin="dense"
          />
        </form>
        <Button className={classes.buttons} variant="contained" color="primary">
          Find a Mentor!
        </Button>
      </Paper>
    </div>
  );
}

export default RequestMentors;
