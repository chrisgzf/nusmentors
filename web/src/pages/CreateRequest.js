import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "slices/requestsSlice";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchCareers, getCareers, getCareerState } from "slices/careerSlice";
import { selectAppIsOnline } from "slices/uiSlice";
import { Alert } from "@material-ui/lab";

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
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    resume: false,
    interview: false,
    general: false,
    career_types: [],
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const careers = useSelector(getCareers);
  const careerStatus = useSelector(getCareerState);
  const appIsOnline = useSelector(selectAppIsOnline);
  const theme = useTheme();

  useEffect(() => {
    if (careerStatus === "idle") {
      dispatch(fetchCareers());
    }
  }, [careerStatus, dispatch]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
  };

  const handleAutocompleteChange = (event, value) => {
    setFormData({ ...formData, career_types: value });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const selectedTypes = Object.entries({
      resume: formData.resume,
      interviews: formData.interview,
      general: formData.general,
    })
      .filter((entry) => {
        return entry[1];
      })
      .map((entry) => entry[0]);
    const flattened_careers = formData.career_types.map(
      (entry) => entry.career_type,
    );

    const requestData = {
      problem_type: selectedTypes,
      title: formData.title,
      description: formData.description,
      career_type: flattened_careers,
    };
    // @ts-ignore
    dispatch(addRequest(requestData))
      .then(() => setSubmitting(false))
      .then(() => {
        history.push("/requests");
      });
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
      <Helmet>
        <title>NUSMentors - Create Request</title>
      </Helmet>
      <Paper className={classes.paper}>
        {appIsOnline ? null : (
          <Alert severity="warning">
            NUSMentors is currently offline! You cannot create a request!
          </Alert>
        )}
        <Typography
          align="center"
          variant="h5"
          style={{ margin: `${theme.spacing(2)}px 0`, fontWeight: "500" }}
        >
          What would you like to request help on?
        </Typography>
        <form noValidate autoComplete="off" className={classes.form}>
          <FormControl required component="fieldset">
            <FormLabel
              component="legend"
              style={{ margin: `${theme.spacing(1.5)}px 0` }}
            >
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
          </FormControl>
          <TextField
            name="title"
            label="Add a title (15 words or less)"
            type="text"
            fullWidth
            margin="dense"
            required
            value={formData.title}
            onChange={handleInputChange}
            style={{ margin: `${theme.spacing(2)}px 0` }}
          />
          <TextField
            name="description"
            label="Describe your concerns"
            type="text"
            fullWidth
            required
            multiline
            rows={8}
            margin="dense"
            value={formData.description}
            onChange={handleInputChange}
            style={{ margin: `${theme.spacing(2)}px 0` }}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            loading={careerStatus === "loading"}
            options={careers}
            getOptionLabel={(option) => option.career_type}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select career tags (optional)"
                style={{ margin: `${theme.spacing(2)}px 0` }}
                placeholder="Relevant careers"
              />
            )}
            onChange={handleAutocompleteChange}
          />
          <div style={{ textAlign: "right" }}>
            <Button
              className={classes.buttons}
              disabled={
                !appIsOnline ||
                isSubmitting ||
                formData.title === "" ||
                formData.description === "" ||
                (!formData.interview && !formData.resume && !formData.general)
              }
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ margin: `${theme.spacing(2)}px 0`, right: "0" }}
            >
              Find a Mentor!
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default CreateRequest;
