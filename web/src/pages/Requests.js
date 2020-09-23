import { Box, Button, Typography } from "@material-ui/core";
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRequests,
  getRequests,
  getRequestState,
} from "slices/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(getRequests);
  const requestStatus = useSelector(getRequestState);

  // runs once
  useEffect(() => {
    if (requestStatus === "idle") {
      dispatch(fetchRequests());
    }
  }, [dispatch, requestStatus]);

  return requestStatus === "pending" ? (
    <Box>Loading</Box>
  ) : (
    <Box>
      <Typography align="center" variant="h4">
        These guys need help
      </Typography>
      {requests.map((request, index) => (
        <RequestCard
          key={index}
          name={request.name}
          title={request.title}
          description={request.description}
          matricDate={request.matric_date}
          major={request.major}
          dateCreated={request.date_created}
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
        />
      ))}
    </Box>
  );
};

export default Requests;
