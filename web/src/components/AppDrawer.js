import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeDrawer } from "slices/uiSlice";

const width = 200;

const useStyles = makeStyles((theme) => ({
  permanent: {
    flexShrink: 0,
    width,
  },
  list: {
    width,
  },
}));

const routeItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/requests",
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

const AppDrawer = () => {
  const classes = useStyles();
  const location = useLocation();

  const isDrawerOpen = useSelector((state) => state.ui.isDrawerOpen);
  const dispatch = useDispatch();

  // Event handlers
  const handleClick = () => {
    dispatch(closeDrawer());
  };

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

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
          <ListItemText>{routeItem.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return isDesktopView ? (
    <Drawer
      className={classes.permanent}
      open
      onClose={handleClick}
      variant="permanent"
    >
      <Toolbar />
      {list}
    </Drawer>
  ) : (
    <Drawer open={isDrawerOpen} onClose={handleClick} variant="temporary">
      {list}
    </Drawer>
  );
};

export default AppDrawer;
