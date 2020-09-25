//TODO: FIX MENTORS PAGE
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
import { fetchMentees, getMentees, getMenteeState } from "slices/menteesSlice";
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
      <title>NUSMentors - Mentees</title>
    </Helmet>
    {content}
  </Box>
);

const Mentees = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const mentees = useSelector(getMentees)
    .slice()
    .sort((a, b) => b.date_created.localeCompare(a.date_created));
  const menteeStatus = useSelector(getMenteeState);
  // runs once
  useEffect(() => {
    if (menteeStatus === "idle") {
      dispatch(fetchMentees());
    }
  }, [dispatch, menteeStatus]);

  if (menteeStatus === "loading") {
    return wrapper(<CircularProgress />);
  }

  if (mentees.length === 0) {
    return wrapper(
      <Typography align="center" variant="h4">
        No mentees yet
      </Typography>,
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const makeMenteeCard = (mentee, index) => (
    <RequestCard
      key={index}
      name={mentee.mentee_name}
      title={mentee.title}
      description={mentee.description}
      matricDate={mentee.matric_date}
      major={mentee.mentee_major}
      photoUrl={mentee.mentee_photo}
      dateCreated={mentee.date_created}
      action={
        <Button
          component={Link}
          variant="contained"
          to={`/mentees/${mentee.req_id}`}
        >
          Details
        </Button>
      }
      problemTypes={mentee.problem_type}
      careerTypes={mentee.career_type}
    />
  );

  const currentMentees = mentees
    .filter((mentee) => mentee.status === "current")
    .map(makeMenteeCard);

  const pastMentees = mentees
    .filter((mentee) => mentee.status !== "current")
    .map(makeMenteeCard);

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
          <Tab label="Current Mentees" />
          <Tab label="Past Mentees" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {currentMentees.length === 0 ? (
            <Typography align="center" variant="h4">
              No current mentees
            </Typography>
          ) : (
            currentMentees
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {pastMentees.length === 0 ? (
            <Typography align="center" variant="h4">
              No past mentees
            </Typography>
          ) : (
            pastMentees
          )}
        </TabPanel>
      </SwipeableViews>
    </Box>,
  );
};

export default Mentees;
