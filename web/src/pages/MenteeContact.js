import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
//TODO: FIX MENTORS PAGE
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  dropMentee,
  completeMentee,
  fetchMentees,
  getMentee,
  getMenteeState,
} from "slices/menteesSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const MenteeContact = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();
  const menteeContact = useSelector(getMentee(id));
  const menteeStatus = useSelector(getMenteeState);
  const history = useHistory();
  // runs once
  useEffect(() => {
    if (menteeStatus === "idle") {
      dispatch(fetchMentees());
    }
  }, [dispatch, menteeStatus]);

  if (menteeStatus === "loading") {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  if (!menteeContact) {
    return (
      <Typography align="center" variant="h5">
        Mentee not found
      </Typography>
    );
  }

  const action =
    menteeContact.status === "completed" ||
    menteeContact.status === "dropped" ? null : (
      <Box p={2} display="flex">
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          // @ts-ignore
          onClick={() =>
            // @ts-ignore
            dispatch(dropMentee(id)).then(() => history.push("/mentees"))
          }
        >
          Drop Mentee
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          // @ts-ignore
          onClick={() =>
            // @ts-ignore
            dispatch(completeMentee(id)).then(() => history.push("/mentees"))
          }
        >
          Complete Mentorship
        </Button>
      </Box>
    );

  return (
    <>
      <Helmet>
        <title>NUSMentors - Mentee Details</title>
      </Helmet>
      <RequestCard
        name={menteeContact.name}
        title={menteeContact.title}
        description={menteeContact.description}
        matricDate={menteeContact.matric_date}
        major={menteeContact.major}
        dateCreated={menteeContact.date_created}
        contact={{
          title: "Contact your mentee here!",
          name: menteeContact.mentee_name,
          email: menteeContact.mentee_email,
          telegramHandle: menteeContact.mentee_tg,
          major: menteeContact.mentee_major,
        }}
        action={action}
        problemTypes={menteeContact.problem_type}
        careerTypes={menteeContact.career_type}
      />
    </>
  );
};

export default MenteeContact;
