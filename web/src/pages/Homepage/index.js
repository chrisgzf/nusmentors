import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import LogoIcon from "components/LogoIcon";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const features = [
  {
    title: <>Easy to use </>,
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: <>Powered by React</>,
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: "white",
    textAlign: "left",
  },
  heroSubtitle: {
    color: "white",
    textAlign: "left",
  },
  button: {
    "&:hover": {
      backgroundColor: "aliceblue",
      color: "#1FAAFF",
      transitionDelay: "0.3",
    },
    color: "white",
    border: "solid",
    borderColor: "aliceblue",
    textAlign: "left",
  },
  appHeader: {
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    backgroundColor: "#1FAAFF",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            NUSMentors
          </Typography>
          <Button color="inherit" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <header className={classes.appHeader}>
        <Container maxwidth="sm">
        <Grid container className="container">
          <Grid item xs={3}>
            <LogoIcon scale="90%"/>
          </Grid>
          <Grid item xs={9}>
            <h1 className={classes.heroTitle}>Welcome to NUSMentors</h1>
            <p className={classes.heroSubtitle}>
              If you're looking for a mentorship, you've come to the right
              place.
            </p>
            <Button
              variant="outlined"
              size="large"
              href="/dashboard"
              className={classes.button}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
        </Container>
      </header>

      <h1>NUSMentors</h1>
      <span>This is a placeholder homepage.</span>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default App;
