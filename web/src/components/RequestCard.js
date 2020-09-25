import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@material-ui/core";
import Collapse from "@kunukn/react-collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { timeSince } from "utils/time";
import UserAvatar from "components/UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  info: {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
  actions: {
    justifyContent: "flex-end",
  },
  problemChip: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  cardHeader: { paddingBottom: "0" },
}));

const RequestCard = ({
  name = "",
  title,
  description,
  matricDate = "",
  major = "",
  dateCreated,
  photoUrl = "",
  index = 0,
  problemTypes = [],
  careerTypes = [],
  contact = undefined,
  action = null,
}) => {
  // https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-between-two-dates
  const currentYear =
    new Date(Date.now() - new Date(matricDate).getTime()).getFullYear() -
    1970 +
    1;

  const toExpandDescription = description && description.length > 100;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const postedDuration = timeSince(new Date(dateCreated));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const requestTitle = (
    <CardHeader
      avatar={
        photoUrl ? (
          <UserAvatar photoUrl={photoUrl} name={name} index={index} />
        ) : null
      }
      title={
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
      }
      className={classes.cardHeader}
      subheader={
        <>
          <Typography variant="subtitle2" color="primary">
            {`${name ? "By " + name : ""}${
              currentYear ? ", Year " + currentYear : ""
            }${major ? ", Majoring in " + major : ""}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            posted {postedDuration} ago
          </Typography>
          {problemTypes?.map((problem, index) => (
            <Chip
              color="secondary"
              className={classes.problemChip}
              label={problem}
              key={index}
            />
          ))}
          {careerTypes?.map((problem, index) => (
            <Chip
              color="primary"
              className={classes.problemChip}
              label={problem}
              key={index}
            />
          ))}
        </>
      }
      action={
        toExpandDescription ? (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : null
      }
    />
  );

  const contactDetails = contact ? (
    <CardContent style={{ paddingBottom: "0" }}>
      <Typography variant="h6">
        <Box px={1}>{contact.title}</Box>
      </Typography>
      <Typography component={"span"}>
        <Box
          display="flex"
          alignItems="flex-start"
          flexWrap="wrap"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box className={classes.info} px={1}>
            Name: <b>{contact.name}</b>
          </Box>
          <Box className={classes.info} px={1}>
            Email: <b>{contact.email}</b>
          </Box>
          {contact.telegramHandle && (
            <Box className={classes.info} px={1}>
              Telegram: <b>@{contact.telegramHandle}</b>
            </Box>
          )}
          <Box className={classes.info} px={1}>
            Major: <b>{contact.major}</b>
          </Box>
        </Box>
      </Typography>
    </CardContent>
  ) : null;

  const requestBody = (
    <CardContent style={{ paddingBottom: "0" }}>
      {toExpandDescription ? (
        <Collapse
          collapseHeight="20px"
          isOpen={expanded}
          transition={`height 300ms cubic-bezier(.4, 0, .2, 1)`}
        >
          {description.split("\n").map((paragraph, index) => (
            <Typography paragraph key={index}>
              {paragraph}
            </Typography>
          ))}
        </Collapse>
      ) : (
        <Typography>{description}</Typography>
      )}
    </CardContent>
  );

  return (
    <Card className={classes.root}>
      {requestTitle}
      {contactDetails}
      {requestBody}
      <CardActions className={classes.actions}>{action}</CardActions>
    </Card>
  );
};

export default RequestCard;
