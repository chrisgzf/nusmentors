import {
  Toolbar,
  AppBar,
  makeStyles,
  Box,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { openDrawer } from "slices/uiSlice";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    fontFamily: "Roboto",
    color: "#fff",
    textTransform: "none",
    fontWeight: "bold",
  },
  signOutBtn: {
    color: "#fff",
    "&:hover": {
      // TODO: this is dam ugly
      backgroundColor: "#98b6e3",
    },
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();

  const signOutAndRedirect = async () => {
    await firebase.logout();
    history.push("/login");
  };
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));
  // Event handlers
  const handleMenuClick = () => {
    dispatch(openDrawer());
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {isDesktopView ? null : (
          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon color="inherit" />
          </IconButton>
        )}
        <Box flexGrow="1">
          <Typography variant="h4">NUSMentors</Typography>
        </Box>
        <Box flexGrow="1" textAlign="right">
          <Button
            className={classes.signOutBtn}
            onClick={signOutAndRedirect}
            color="default"
          >
            Sign out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
