import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addRequest } from "slices/requestsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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

function CreateRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resume: false,
    interview: false,
    general: false,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log({ [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const selectedTypes = Object.entries({
      resume: formData.resume,
      interview: formData.interview,
      general: formData.general,
    })
      .filter((entry) => {
        console.log(entry);
        return entry[1];
      })
      .map((entry) => entry[0]);
    const requestData = {
      problem_types: selectedTypes,
      title: formData.title,
      description: formData.description,
    };
    dispatch(addRequest(requestData))
      .then(unwrapResult)
      .then(console.log)
      .catch(console.log);
  };
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
          <FormControl component="fieldset">
            <FormLabel component="legend">
              What type of help do you need?
            </FormLabel>
            <FormGroup row>
              {types.map((type, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={formData[type.value]}
                      onChange={handleInputChange}
                      name={type.value}
                    />
                  }
                  label={type.label}
                />
              ))}
            </FormGroup>
            <FormHelperText>Select your career type help!</FormHelperText>
          </FormControl>
          <TextField
            name="title"
            label="Add a title (15 words or less)"
            type="text"
            fullWidth
            margin="dense"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Describe your concerns"
            type="text"
            fullWidth
            multiline
            rows={5}
            margin="dense"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Button
            className={classes.buttons}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Find a Mentor!
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default CreateRequest;
