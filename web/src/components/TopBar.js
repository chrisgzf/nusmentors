import {
  Toolbar,
  AppBar,
  makeStyles,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "slices/uiSlice";
import { clearUserState, selectName, selectPhotoURL } from "slices/userSlice";
import LogoNav from "./LogoNav";
import UserAvatar from "./UserAvatar";
import useIsMobile from "utils/useIsMobile";

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
  const dispatch = useDispatch();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const name = useSelector(selectName);
  const photoUrl = useSelector(selectPhotoURL);

  const handleUserMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogoutClick = () => {
    handleUserMenuClose();
    signOutAndRedirect();
  };

  const signOutAndRedirect = async () => {
    await firebase.logout();
    dispatch(clearUserState());
    history.push("/login");
  };

  const isMobile = useIsMobile();

  // Event handlers
  const handleMenuClick = () => {
    dispatch(openDrawer());
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box
          flexGrow="1"
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          flexShrink="0"
        >
          {isMobile ? (
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon color="inherit" />
            </IconButton>
          ) : null}
          <div style={{ height: isMobile ? "34px" : "40px" }}>
            <LogoNav height={isMobile ? "34px" : "40px"} />
          </div>

          <UserAvatar
            photoUrl={photoUrl}
            name={name}
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuClick}
          />
          <Menu
            id="user-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={!!menuAnchor}
            onClose={handleUserMenuClose}
          >
            {/* <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem> */}
            <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
