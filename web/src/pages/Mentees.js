//TODO: FIX MENTORS PAGE
import { Box, Button, Typography } from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMentees, getMentees, getMenteeState } from "slices/menteesSlice";

const Mentees = () => {
  const dispatch = useDispatch();
  const mentees = useSelector(getMentees);
  const menteeStatus = useSelector(getMenteeState);
  // runs once
  useEffect(() => {
    if (menteeStatus === "idle") {
      dispatch(fetchMentees());
    }
  }, [dispatch, menteeStatus]);

  return (
    <Box>
      <Typography align="center" variant="h4">
        You have matched with these mentees
      </Typography>
      {mentees.map((mentee, index) => (
        <RequestCard
          key={index}
          name={mentee.name}
          title={mentee.title}
          description={mentee.description}
          matricDate={mentee.matric_date}
          major={mentee.major}
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
        />
      ))}
    </Box>
  );
};

export default Mentees;
