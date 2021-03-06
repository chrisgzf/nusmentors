import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeDrawer } from "slices/uiSlice";
import useIsMobile from "utils/useIsMobile";

const width = 200;

const useStyles = makeStyles((theme) => ({
  permanent: {
    flexShrink: 0,
    width,
  },
  list: {
    width,
  },
  selected: {
    fontWeight: "bold",
  },
}));

const routeItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/requests",
    label: "Be a Mentor",
  },
  {
    path: "/requests/create",
    label: "Look for a Mentor",
  },
  {
    path: "/mentees",
    label: "My Mentees",
  },
  {
    path: "/mentors",
    label: "My Mentors",
  },
];

const AppDrawer = () => {
  const classes = useStyles();
  const location = useLocation();

  // @ts-ignore
  const isDrawerOpen = useSelector((state) => state.ui.isDrawerOpen);
  const dispatch = useDispatch();

  // Event handlers
  const handleClick = () => {
    dispatch(closeDrawer());
  };

  const isMobile = useIsMobile();

  const list = (
    <List className={classes.list}>
      {routeItems.map((routeItem) => (
        <ListItem
          button
          selected={location.pathname === routeItem.path}
          key={routeItem.path}
          component={Link}
          to={routeItem.path}
        >
          <ListItemText>
            <span
              style={{
                fontWeight:
                  location.pathname === routeItem.path ? "bold" : "normal",
              }}
            >
              {routeItem.label}
            </span>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return isMobile ? (
    <Drawer open={isDrawerOpen} onClose={handleClick} variant="temporary">
      {list}
    </Drawer>
  ) : (
    <Drawer
      className={classes.permanent}
      open
      onClose={handleClick}
      variant="permanent"
    >
      <Toolbar />
      {list}
    </Drawer>
  );
};

export default AppDrawer;
