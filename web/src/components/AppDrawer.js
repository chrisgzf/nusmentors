import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const width = 200;

const useStyles = makeStyles((theme) => ({
  permanent: {
    width,
    flexShrink: 0,
  },
  list: {
    width,
  },
}));
const AppDrawer = () => {
  const classes = useStyles();
  const location = useLocation();

  const routeItems = [
    {
      path: "/mentor-people",
      label: "Mentor People",
    },
    {
      path: "/request",
      label: "Look for a mentor",
    },
    {
      path: "/mentees",
      label: "My mentees",
    },
    {
      path: "/mentors",
      label: "My mentors",
    },
  ];

  return (
    <Drawer className={classes.permanent} variant="permanent">
      <Toolbar />
      <List className={classes.list}>
        {routeItems.map((routeItem) => (
          <ListItem
            button
            selected={location.pathname === routeItem.path}
            key={routeItem.path}
            component={Link}
            to={routeItem.path}
          >
            <ListItemText>{routeItem.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
