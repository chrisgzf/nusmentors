import React from "react";
import { CircularProgress, makeStyles, useTheme } from "@material-ui/core";
import LogoSquare from "./LogoSquare";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: `${window.innerHeight}px`,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default function LoadingSplash() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <LogoSquare scale="200px" />
      <CircularProgress style={{ marginTop: theme.spacing(6) }} />
    </div>
  );
}
