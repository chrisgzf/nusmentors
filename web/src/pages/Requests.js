import {
  Box,
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
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
import { sendRequest } from "utils/backend";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
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

  const [careerOptions, setCareerOptions] = useState([]);
  const problemTypes = ["careers", "general", "interview"].concat(
    careerOptions,
  );
  // @ts-ignore
  const [filters, setFilters] = useState(problemTypes);
  const [isCareersLoading, setCareersLoading] = useState(true);
  const requests = useSelector(getRequests)
    .filter((request) => request.should_display)
    .sort((a, b) => b.date_created.localeCompare(a.date_created));
  const requestStatus = useSelector(getRequestState);

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
    if (isCareersLoading) {
      dispatch(sendRequest("careers", "GET")).then((result) => {
        const careerOptions = result.map((result) => result.career_type);
        setCareerOptions(careerOptions);
        // @ts-ignore
        setFilters([...new Set([...filters, ...careerOptions])]);
        setCareersLoading(false);
      });
    }
  }, [dispatch, filters, isCareersLoading, requestStatus]);

  const filterMenu = (
    <FormControl className={classes.formControl}>
      <InputLabel>Filters</InputLabel>
      <Select
        multiple
        value={filters}
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

  return requestStatus === "loading" || isCareersLoading ? (
    <Box>Loading</Box>
  ) : (
    <Box>
      <Helmet>
        <title>NUSMentors - Offer Help</title>
      </Helmet>
      <Typography align="center" variant="h4">
        These guys need help
      </Typography>
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
