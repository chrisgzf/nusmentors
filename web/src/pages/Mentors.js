import { Box, Button, Typography } from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMentors, getMentors, getMentorState } from "slices/mentorsSlice";

const Mentors = () => {
  const dispatch = useDispatch();
  const mentors = useSelector(getMentors);
  const mentorStatus = useSelector(getMentorState);
  // runs once
  useEffect(() => {
    if (mentorStatus === "idle") {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentorStatus]);

  return (
    <Box>
      <Typography align="center" variant="h4">
        You have matched with these mentors
      </Typography>
      {mentors.map((mentor, index) => (
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
      ))}
    </Box>
  );
};

export default Mentors;
