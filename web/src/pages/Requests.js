import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRequests,
  getRequests,
  getRequestState,
} from "slices/requestsSlice";
import { Helmet } from "react-helmet";
import { fetchCareers, getCareers, getCareerState } from "slices/careerSlice";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const Requests = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const requests = useSelector(getRequests)
    .filter((request) => request.should_display)
    .sort((a, b) => b.date_created.localeCompare(a.date_created));
  const requestStatus = useSelector(getRequestState);
  const careers = useSelector(getCareers)
    .slice()
    .map((career) => career.career_type);
  const careerStatus = useSelector(getCareerState);

  const problemTypes = ["careers", "general", "interview"].concat(careers);
  // @ts-ignore
  const [filters, setFilters] = useState(problemTypes);
  const handleChange = (event) => {
    setFilters(event.target.value);
  };

  function getStyles(type) {
    return {
      fontWeight:
        filters?.indexOf(type) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // runs once
  useEffect(() => {
    if (requestStatus === "idle") {
      dispatch(fetchRequests());
    }
    if (careerStatus === "idle") {
      dispatch(fetchCareers());
    }
  }, [careerStatus, dispatch, requestStatus]);

  const filterMenu = (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel
        style={{
          marginBottom: theme.spacing(0.5),
          position: "relative",
          display: "block",
        }}
      >
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Showing requests that contain:
        </span>
      </InputLabel>
      <Select
        multiple
        value={filters}
        style={{ marginTop: "0" }}
        fullWidth
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected
              // @ts-ignore
              .map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
          </div>
        )}
      >
        {problemTypes.map((name) => (
          <MenuItem
            key={name}
            selected={filters.includes(name)}
            value={name}
            style={getStyles(name)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return requestStatus === "loading" || careerStatus === "loading" ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <Box>
      <Helmet>
        <title>NUSMentors - Be a Mentor</title>
      </Helmet>
      {filterMenu}
      {requests
        .filter((request) =>
          filters.some(
            (filter) =>
              request.problem_type?.includes(filter) ||
              request.career_type?.includes(filter),
          ),
        )
        .map((request, index) => (
          <RequestCard
            key={index}
            name={request.name}
            title={request.title}
            description={request.description}
            matricDate={request.matric_date}
            major={request.major}
            dateCreated={request.date_created}
            index={index}
            photoUrl={request.photo_url}
            action={
              <Button
                component={Link}
                variant="contained"
                style={{ margin: `4px` }}
                color="primary"
                to={`/accept-request/${request.req_id}`}
              >
                Match
              </Button>
            }
            problemTypes={request.problem_type}
            careerTypes={request.career_type}
          />
        ))}
    </Box>
  );
};

export default Requests;
