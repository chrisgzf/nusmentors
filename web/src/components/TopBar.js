import {
  Toolbar,
  AppBar,
  makeStyles,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

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
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box flexGrow="1">
          <Button component={Link} to="/dashboard">
            <Typography variant="h5" className={classes.logo}>
              Dashboard
            </Typography>
          </Button>
        </Box>
        <Box flexGrow="1" textAlign="center">
          <Typography variant="h4">NUSMentors</Typography>
        </Box>
        <Box flexGrow="1" textAlign="right">
          Sign out
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
