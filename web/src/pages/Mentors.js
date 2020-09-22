//TODO: FIX MENTORS PAGE
import { Box, Typography } from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequests,
  getRequests,
  getRequestState,
} from "slices/requestsSlice";

const Mentors = () => {
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);
  const requestStatus = useSelector(getRequestState);

  // runs once
  useEffect(() => {
    if (requestStatus === "idle") {
      dispatch(fetchRequests());
    }
  }, [dispatch, requestStatus]);

  return (
    <Box>
      <Typography align="center" variant="h4">
        You have matched with these mentors
      </Typography>
      {requests.map((request, index) => (
        <RequestCard key={index} request={request} />
      ))}
    </Box>
  );
};

export default Mentors;
