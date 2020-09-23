//TODO: FIX MENTORS PAGE
import RequestCard from "components/RequestCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMentees, getMentee, getMenteeState } from "slices/menteesSlice";

const MenteeContact = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { id } = useParams();
  const menteeContact = useSelector(getMentee(id));
  const menteeStatus = useSelector(getMenteeState);
  // runs once
  useEffect(() => {
    if (menteeStatus === "idle") {
      dispatch(fetchMentees());
    }
  }, [dispatch, menteeStatus]);

  return (
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
    />
  );
};

export default MenteeContact;
