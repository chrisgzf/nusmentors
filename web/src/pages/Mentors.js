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
  const mentors = useSelector(getMentors)
    .slice()
    .sort((a, b) => b.date_created.localeCompare(a.date_created));
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
      <div
        style={{
          maxWidth: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: window.innerHeight * 0.8,
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          No mentors yet 😟
        </div>
        <div style={{ fontSize: "1.2rem", textAlign: "center" }}>
          Put up a mentorship request via "Look for a Mentor" on your left! Be
          patient and wait for a mentor to match you.
        </div>
      </div>,
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const makeMentorCard = (mentor, index) => (
    <RequestCard
      key={index}
      title={mentor.title}
      description={mentor.description}
      matricDate={mentor.matric_date}
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
      problemTypes={mentor.problem_type}
      careerTypes={mentor.career_type}
    />
  );
  const currentMentors = mentors
    .filter((mentor) => mentor.status === "current")
    .map(makeMentorCard);

  const pastMentors = mentors
    .filter((mentor) => mentor.status !== "current")
    .map(makeMentorCard);

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
