import { Box, Button, IconButton, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { markNotificationAsRead } from "slices/notificationSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

function NotificationBox({ notification }) {
  const { name, req_id, notif_type, title, is_read, nid } = notification;
  const dispatch = useDispatch();
  let action;
  switch (notif_type) {
    case "accept":
      action = "accepted";
      break;
    case "dropped":
      action = "dropped";
      break;
    case "complete":
      action = "marked as completed";
      break;
    default:
      break;
  }
  const notificationMessage = (
    <Typography style={{ width: "90%" }}>
      <b>{name}</b> has {action} the mentorship request:{" "}
      <Link component={RouterLink} to={`/mentors/${req_id}`}>
        &quot;{title}&quot;
      </Link>
    </Typography>
  );

  const markAsRead = is_read ? (
    <IconButton size="small" style={{ padding: "8px" }}>
      <DoneIcon />
    </IconButton>
  ) : (
    <IconButton
      size="small"
      style={{ padding: "8px" }}
      onClick={() => dispatch(markNotificationAsRead(nid))}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <Box
      display="flex"
      color="text.primary"
      justifyContent="space-between"
      border={1}
      borderColor="#aaaaaa"
      p={2}
      my={2}
      borderRadius={8}
      width="100%"
    >
      {notificationMessage}
      {markAsRead}
    </Box>
  );
}

export default NotificationBox;
