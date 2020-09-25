import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMentors, getMentors, getMentorState } from "slices/mentorsSlice";
import { Helmet } from "react-helmet";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "components/TabPanel";
const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const wrapper = (content) => (
  <Box display="flex" justifyContent="center">
    <Helmet>
      <title>NUSMentors - Mentors</title>
    </Helmet>
    {content}
  </Box>
);
const Mentors = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const mentors = useSelector(getMentors).sort((a, b) =>
    b.date_created.localeCompare(a.date_created),
  );
  const mentorStatus = useSelector(getMentorState);
  // runs once
  useEffect(() => {
    if (mentorStatus === "idle") {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentorStatus]);

  if (mentorStatus === "loading") {
    return wrapper(<CircularProgress />);
  }

  if (mentors.length === 0) {
    return wrapper(
      <Typography align="center" variant="h4">
        No mentors yet
      </Typography>,
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const currentMentors = mentors
    .filter((mentor) => mentor.status === "current")
    .map((mentor, index) => (
      <RequestCard
        key={index}
        name={mentor.name}
        title={mentor.title}
        description={mentor.description}
        matricDate={mentor.matric_date}
        major={mentor.major}
        dateCreated={mentor.date_created}
        action={
          <Button
            component={Link}
            variant="contained"
            to={`/mentors/${mentor.req_id}`}
          >
            Details
          </Button>
        }
      />
    ));

  const pastMentors = mentors
    .filter((mentor) => mentor.status !== "current")
    .map((mentor, index) => (
      <RequestCard
        key={index}
        name={mentor.name}
        title={mentor.title}
        description={mentor.description}
        matricDate={mentor.matric_date}
        major={mentor.major}
        dateCreated={mentor.date_created}
        action={
          <Button
            component={Link}
            variant="contained"
            to={`/mentors/${mentor.req_id}`}
          >
            Details
          </Button>
        }
      />
    ));

  return wrapper(
    <Box width="100%" className={classes.tabs}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Current Mentors" />
          <Tab label="Past Mentors" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {currentMentors.length === 0 ? (
            <Typography align="center" variant="h4">
              No current mentors
            </Typography>
          ) : (
            currentMentors
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {pastMentors.length === 0 ? (
            <Typography align="center" variant="h4">
              No past mentors
            </Typography>
          ) : (
            pastMentors
          )}
        </TabPanel>
      </SwipeableViews>
    </Box>,
  );
};

export default Mentors;
