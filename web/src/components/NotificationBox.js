import { Box, Button, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { markNotificationAsRead } from "slices/notificationSlice";
import { useDispatch } from "react-redux";

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
    <Typography>
      {`${name} has ${action} the mentorship request:`}{" "}
      <Link component={RouterLink} to={`/mentors/${req_id}`}>
        &quot;{title}&quot;
      </Link>
    </Typography>
  );

  const markAsRead = is_read ? null : (
    <Button
      size="small"
      // @ts-ignore
      onClick={() => dispatch(markNotificationAsRead(nid))}
    >
      Mark as Read
    </Button>
  );

  return (
    <Box
      display="flex"
      color="text.primary"
      justifyContent="space-between"
      border={1}
      p={1}
      my={1}
      borderRadius={16}
      width="100%"
    >
      {notificationMessage}
      {markAsRead}
    </Box>
  );
}

export default NotificationBox;
