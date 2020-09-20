import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  actionArea: {
    justifyContent: "flex-end",
  },
}));

const MenteeCard = ({ name, description, title }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            by {name}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            Year 2, Computer Science
          </Typography>
        </CardContent>
        <CardContent>
          <Collapse in={!expanded} unmountOnExit>
            <Typography className={classes.initialText}>
              {description.slice(0, 150)}...
            </Typography>
          </Collapse>

          <Collapse in={expanded} unmountOnExit>
            {description.split("\n").map((paragraph, index) => (
              <Typography paragraph key={index}>
                {paragraph}
              </Typography>
            ))}
          </Collapse>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionArea}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/confirm"
        >
          Match
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenteeCard;
