import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import Collapse from "@kunukn/react-collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
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
  actions: {
    justifyContent: "flex-end",
  },
}));

const RequestCard = ({ request, match }) => {
  const { name, title, description, matric_date, major } = request;
  // https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-between-two-dates
  const currentYear =
    new Date(
      new Date().getTime() - new Date(matric_date).getTime(),
    ).getFullYear() -
    1970 +
    1;

  const toExpandDescription = description.length > 100;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const requestTitle = (
    <CardHeader
      title={
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
      }
      subheader={
        <>
          <Typography variant="subtitle1" color="textSecondary">
            by {name}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            Year {currentYear}, {major}
          </Typography>
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

  const requestBody = (
    <CardContent>
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
      {requestBody}
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to={`/accept-request/${request.req_id}`}
        >
          Match
        </Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
