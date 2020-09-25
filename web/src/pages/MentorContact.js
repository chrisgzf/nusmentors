import { Typography } from "@material-ui/core";
//TODO: FIX MENTORS PAGE
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMentors, getMentor, getMentorState } from "slices/mentorsSlice";
import { Helmet } from "react-helmet";

const MentorContact = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();
  const mentorContact = useSelector(getMentor(id));
  const mentorStatus = useSelector(getMentorState);
  // runs once
  useEffect(() => {
    if (mentorStatus === "idle") {
      dispatch(fetchMentors());
    }
  }, [dispatch, mentorStatus]);

  if (!mentorContact) {
    return (
      <Typography align="center" variant="h5">
        Mentor not found
      </Typography>
    );
  }

  return (
    <>
      <Helmet>
        <title>NUSMentors - Mentor Details</title>
      </Helmet>
      <RequestCard
        name={mentorContact.name}
        title={mentorContact.title}
        description={mentorContact.description}
        matricDate={mentorContact.matric_date}
        major={mentorContact.major}
        dateCreated={mentorContact.date_created}
        contact={{
          title: "Contact your mentor here!",
          name: mentorContact.mentor_name,
          email: mentorContact.mentor_email,
          telegramHandle: mentorContact.mentor_tg,
          major: mentorContact.mentor_major,
        }}
      />
    </>
  );
};

export default MentorContact;
